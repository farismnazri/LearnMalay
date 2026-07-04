import type {
  ArahJalanGraph,
  ArahJalanNodeId,
  Facing,
  LocalizedText,
} from "./engine";
import {
  ARAH_JALAN_LOCATION_CATALOG,
  ARAH_JALAN_LOCATION_IDS,
  type ArahJalanLocationId,
} from "./locations.ts";

export const ARAH_JALAN_DIFFICULTY_IDS = ["easy", "hard"] as const;
export type ArahJalanDifficultyId = (typeof ARAH_JALAN_DIFFICULTY_IDS)[number];

export type ArahJalanDifficulty = {
  id: ArahJalanDifficultyId;
  label: LocalizedText;
  gridSize: number;
  visibleUnits: number;
  locationCount: number;
  innerMinCell: number;
  innerMaxCell: number;
};

export type ArahJalanBoardCell = {
  row: number;
  col: number;
};

export type ArahJalanLocationPlacementInput = ArahJalanBoardCell & {
  locationId: ArahJalanLocationId;
};

export type ArahJalanLocationPlacement = ArahJalanLocationPlacementInput & {
  nodeId: ArahJalanNodeId;
};

export type ArahJalanBoardNode = ArahJalanBoardCell & {
  nodeId: ArahJalanNodeId;
  locationId: ArahJalanLocationId | null;
};

export type ArahJalanBoard = {
  difficulty: ArahJalanDifficulty;
  gridSize: number;
  visibleUnits: number;
  usableCells: ArahJalanBoardCell[];
  nodes: ArahJalanBoardNode[];
  placements: ArahJalanLocationPlacement[];
  graph: ArahJalanGraph;
};

export const ARAH_JALAN_DIFFICULTIES: Record<ArahJalanDifficultyId, ArahJalanDifficulty> = {
  easy: {
    id: "easy",
    label: { ms: "Mudah", en: "Easy", es: "Fácil" },
    gridSize: 5,
    visibleUnits: 4,
    locationCount: ARAH_JALAN_LOCATION_IDS.length,
    innerMinCell: 2,
    innerMaxCell: 4,
  },
  hard: {
    id: "hard",
    label: { ms: "Sukar", en: "Hard", es: "Difícil" },
    gridSize: 6,
    visibleUnits: 5,
    locationCount: ARAH_JALAN_LOCATION_IDS.length,
    innerMinCell: 2,
    innerMaxCell: 5,
  },
};

const CARDINAL_NEIGHBORS: Array<[Facing, number, number]> = [
  ["north", -1, 0],
  ["east", 0, 1],
  ["south", 1, 0],
  ["west", 0, -1],
];

function cellKey(cell: ArahJalanBoardCell) {
  return `${cell.row}:${cell.col}`;
}

function junctionNodeId(cell: ArahJalanBoardCell): ArahJalanNodeId {
  return `junction-${cell.row}-${cell.col}`;
}

function getDifficulty(difficultyId: ArahJalanDifficultyId) {
  return ARAH_JALAN_DIFFICULTIES[difficultyId];
}

function shuffled<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function getArahJalanUsableCells(difficultyId: ArahJalanDifficultyId): ArahJalanBoardCell[] {
  const difficulty = getDifficulty(difficultyId);
  const out: ArahJalanBoardCell[] = [];

  for (let row = difficulty.innerMinCell; row <= difficulty.innerMaxCell; row++) {
    for (let col = difficulty.innerMinCell; col <= difficulty.innerMaxCell; col++) {
      out.push({ row, col });
    }
  }

  return out;
}

export function isArahJalanUsableCell(
  difficultyId: ArahJalanDifficultyId,
  cell: ArahJalanBoardCell,
) {
  const difficulty = getDifficulty(difficultyId);
  return (
    Number.isInteger(cell.row) &&
    Number.isInteger(cell.col) &&
    cell.row >= difficulty.innerMinCell &&
    cell.row <= difficulty.innerMaxCell &&
    cell.col >= difficulty.innerMinCell &&
    cell.col <= difficulty.innerMaxCell
  );
}

export function validateArahJalanPlacements(
  difficultyId: ArahJalanDifficultyId,
  placements: readonly ArahJalanLocationPlacementInput[],
) {
  const errors: string[] = [];
  const occupiedCells = new Set<string>();
  const usedLocations = new Set<ArahJalanLocationId>();

  for (const placement of placements) {
    const location = ARAH_JALAN_LOCATION_CATALOG[placement.locationId];
    if (!location) {
      errors.push(`Unknown location id: ${placement.locationId}`);
    }

    if (!isArahJalanUsableCell(difficultyId, placement)) {
      errors.push(
        `Location ${placement.locationId} is outside the usable cells at row ${placement.row}, col ${placement.col}.`,
      );
    }

    const key = cellKey(placement);
    if (occupiedCells.has(key)) {
      errors.push(`Duplicate occupied cell at row ${placement.row}, col ${placement.col}.`);
    }
    occupiedCells.add(key);

    if (usedLocations.has(placement.locationId)) {
      errors.push(`Duplicate location id: ${placement.locationId}.`);
    }
    usedLocations.add(placement.locationId);
  }

  return errors;
}

export function assertValidArahJalanPlacements(
  difficultyId: ArahJalanDifficultyId,
  placements: readonly ArahJalanLocationPlacementInput[],
) {
  const errors = validateArahJalanPlacements(difficultyId, placements);
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
}

export function buildArahJalanBoard(
  difficultyId: ArahJalanDifficultyId,
  placements: readonly ArahJalanLocationPlacementInput[],
): ArahJalanBoard {
  const difficulty = getDifficulty(difficultyId);
  assertValidArahJalanPlacements(difficultyId, placements);

  const usableCells = getArahJalanUsableCells(difficultyId);
  const placementByCell = new Map<string, ArahJalanLocationPlacementInput>();
  for (const placement of placements) {
    placementByCell.set(cellKey(placement), placement);
  }

  const nodes = usableCells.map((cell): ArahJalanBoardNode => {
    const placement = placementByCell.get(cellKey(cell));
    return {
      ...cell,
      nodeId: placement?.locationId ?? junctionNodeId(cell),
      locationId: placement?.locationId ?? null,
    };
  });

  const nodeByCell = new Map(nodes.map((node) => [cellKey(node), node]));
  const graphNodes: ArahJalanGraph["nodes"] = {};
  const connections: ArahJalanGraph["connections"] = {};

  for (const node of nodes) {
    const location = node.locationId ? ARAH_JALAN_LOCATION_CATALOG[node.locationId] : null;
    graphNodes[node.nodeId] = {
      id: node.nodeId,
      label: location?.label ?? {
        ms: "simpang",
        en: "junction",
        es: "cruce",
      },
      x: (node.col / difficulty.gridSize) * 100,
      y: (node.row / difficulty.gridSize) * 100,
      isLandmark: Boolean(location),
    };

    const nodeConnections: Partial<Record<Facing, ArahJalanNodeId>> = {};
    for (const [facing, rowDelta, colDelta] of CARDINAL_NEIGHBORS) {
      const neighbor = nodeByCell.get(cellKey({ row: node.row + rowDelta, col: node.col + colDelta }));
      if (neighbor) nodeConnections[facing] = neighbor.nodeId;
    }
    connections[node.nodeId] = nodeConnections;
  }

  const fullPlacements = placements.map((placement): ArahJalanLocationPlacement => ({
    ...placement,
    nodeId: placement.locationId,
  }));

  return {
    difficulty,
    gridSize: difficulty.gridSize,
    visibleUnits: difficulty.visibleUnits,
    usableCells,
    nodes,
    placements: fullPlacements,
    graph: {
      nodes: graphNodes,
      connections,
      startNodeIds: nodes.map((node) => node.nodeId),
      destinationNodeIds: fullPlacements.map((placement) => placement.nodeId),
    },
  };
}

export function createRandomArahJalanBoard(
  difficultyId: ArahJalanDifficultyId = "easy",
  rng: () => number = Math.random,
): ArahJalanBoard {
  const difficulty = getDifficulty(difficultyId);
  const usableCells = shuffled(getArahJalanUsableCells(difficultyId), rng);
  const locationIds = shuffled(ARAH_JALAN_LOCATION_IDS, rng).slice(0, difficulty.locationCount);

  if (difficulty.locationCount > usableCells.length) {
    throw new Error(`Arah Jalan ${difficultyId} has more locations than usable cells.`);
  }

  const placements = locationIds.map((locationId, index): ArahJalanLocationPlacementInput => ({
    locationId,
    row: usableCells[index].row,
    col: usableCells[index].col,
  }));

  return buildArahJalanBoard(difficultyId, placements);
}

export type LocalizedText = { ms: string; en: string; es: string };

export const FACINGS = ["north", "east", "south", "west"] as const;
export type Facing = (typeof FACINGS)[number];

export const ARAH_JALAN_COMMAND_IDS = [
  "turn-left",
  "move-forward",
  "turn-right",
  "turn-back",
  "arrive",
] as const;
export type ArahJalanCommandId = (typeof ARAH_JALAN_COMMAND_IDS)[number];

export type ArahJalanNodeId = string;

export type ArahJalanNode = {
  id: ArahJalanNodeId;
  label: LocalizedText;
  x: number;
  y: number;
  isLandmark: boolean;
};

export type ArahJalanGraph = {
  nodes: Record<ArahJalanNodeId, ArahJalanNode>;
  connections: Record<ArahJalanNodeId, Partial<Record<Facing, ArahJalanNodeId>>>;
  startNodeIds: ArahJalanNodeId[];
  destinationNodeIds: ArahJalanNodeId[];
};

export type ArahJalanScenario = {
  startNodeId: ArahJalanNodeId;
  startFacing: Facing;
  destinationNodeId: ArahJalanNodeId;
};

export type ArahJalanState = {
  nodeId: ArahJalanNodeId;
  facing: Facing;
};

export type ArahJalanFailureReason =
  | "move-no-road"
  | "arrive-wrong-location"
  | "final-command-not-arrive"
  | "queue-ended-not-destination"
  | "reached-destination-without-arrive";

export type ArahJalanStep = {
  index: number;
  commandId: ArahJalanCommandId;
  from: ArahJalanState;
  to: ArahJalanState;
  reachedDestination: boolean;
  failed: boolean;
  failureReason: ArahJalanFailureReason | null;
  isTerminal: boolean;
};

export type ArahJalanRunResult = {
  start: ArahJalanState;
  destinationNodeId: ArahJalanNodeId;
  end: ArahJalanState;
  steps: ArahJalanStep[];
  success: boolean;
  failureReason: ArahJalanFailureReason | null;
  finalCommandId: ArahJalanCommandId | null;
  reachedDestination: boolean;
  reachedDestinationStepIndex: number | null;
};

export function turnLeft(facing: Facing): Facing {
  switch (facing) {
    case "north":
      return "west";
    case "west":
      return "south";
    case "south":
      return "east";
    case "east":
      return "north";
  }
}

export function turnRight(facing: Facing): Facing {
  switch (facing) {
    case "north":
      return "east";
    case "east":
      return "south";
    case "south":
      return "west";
    case "west":
      return "north";
  }
}

export function turnBack(facing: Facing): Facing {
  switch (facing) {
    case "north":
      return "south";
    case "east":
      return "west";
    case "south":
      return "north";
    case "west":
      return "east";
  }
}

function nextForwardNode(
  graph: ArahJalanGraph,
  nodeId: ArahJalanNodeId,
  facing: Facing,
): ArahJalanNodeId | null {
  const nodeConnections = graph.connections[nodeId];
  if (!nodeConnections) return null;
  return nodeConnections[facing] ?? null;
}

export function canAppendCommand(
  queue: readonly ArahJalanCommandId[],
  nextCommand: ArahJalanCommandId,
) {
  if (!ARAH_JALAN_COMMAND_IDS.includes(nextCommand)) return false;
  const hasTerminal = queue.includes("arrive");
  if (hasTerminal) return false;
  return true;
}

export function sanitizeCommandQueue(queue: readonly ArahJalanCommandId[]) {
  const out: ArahJalanCommandId[] = [];
  for (const commandId of queue) {
    if (out.includes("arrive")) break;
    out.push(commandId);
  }
  return out;
}

export function simulateArahJalanRun(
  graph: ArahJalanGraph,
  scenario: ArahJalanScenario,
  queue: readonly ArahJalanCommandId[],
): ArahJalanRunResult {
  const commands = sanitizeCommandQueue(queue);
  const start: ArahJalanState = {
    nodeId: scenario.startNodeId,
    facing: scenario.startFacing,
  };

  let current: ArahJalanState = { ...start };
  let reachedDestination = current.nodeId === scenario.destinationNodeId;
  let reachedDestinationStepIndex: number | null = reachedDestination ? -1 : null;
  let failureReason: ArahJalanFailureReason | null = null;
  const steps: ArahJalanStep[] = [];

  for (let i = 0; i < commands.length; i++) {
    const commandId = commands[i];
    const before: ArahJalanState = { ...current };
    let after: ArahJalanState = { ...current };
    let stepFailure: ArahJalanFailureReason | null = null;
    let isTerminal = false;

    if (commandId === "move-forward") {
      const nextNodeId = nextForwardNode(graph, current.nodeId, current.facing);
      if (!nextNodeId) {
        stepFailure = "move-no-road";
        isTerminal = true;
      } else {
        after = { ...current, nodeId: nextNodeId };
      }
    } else if (commandId === "turn-left") {
      after = { ...current, facing: turnLeft(current.facing) };
    } else if (commandId === "turn-right") {
      after = { ...current, facing: turnRight(current.facing) };
    } else if (commandId === "turn-back") {
      after = { ...current, facing: turnBack(current.facing) };
    } else if (commandId === "arrive") {
      isTerminal = true;
      if (current.nodeId !== scenario.destinationNodeId) {
        stepFailure = "arrive-wrong-location";
      }
    }

    current = after;
    const nowAtDestination = current.nodeId === scenario.destinationNodeId;
    if (nowAtDestination && reachedDestinationStepIndex === null) {
      reachedDestinationStepIndex = i;
    }
    reachedDestination = reachedDestination || nowAtDestination;

    steps.push({
      index: i,
      commandId,
      from: before,
      to: after,
      reachedDestination: nowAtDestination,
      failed: stepFailure !== null,
      failureReason: stepFailure,
      isTerminal,
    });

    if (stepFailure) {
      failureReason = stepFailure;
      break;
    }
    if (isTerminal) {
      break;
    }
  }

  const finalCommandId = steps.length > 0 ? steps[steps.length - 1].commandId : null;
  const arrivedAtDestination = current.nodeId === scenario.destinationNodeId;

  if (!failureReason) {
    if (finalCommandId !== "arrive") {
      if (arrivedAtDestination || reachedDestination) {
        failureReason = "reached-destination-without-arrive";
      } else {
        failureReason = "queue-ended-not-destination";
      }
    } else if (!arrivedAtDestination) {
      failureReason = "arrive-wrong-location";
    }
  }

  if (!failureReason && finalCommandId === "arrive" && !arrivedAtDestination) {
    failureReason = "arrive-wrong-location";
  }

  if (!failureReason && finalCommandId !== "arrive") {
    failureReason = "final-command-not-arrive";
  }

  const success = failureReason === null;

  return {
    start,
    destinationNodeId: scenario.destinationNodeId,
    end: current,
    steps,
    success,
    failureReason,
    finalCommandId,
    reachedDestination,
    reachedDestinationStepIndex,
  };
}

export function pickRandomScenario(
  graph: ArahJalanGraph,
  rng: () => number = Math.random,
): ArahJalanScenario {
  const startPool = graph.startNodeIds.filter((id) => Boolean(graph.nodes[id]));
  const destinationPool = graph.destinationNodeIds.filter((id) => Boolean(graph.nodes[id]));
  const fallbackPool = Object.keys(graph.nodes);
  const starts = startPool.length > 0 ? startPool : fallbackPool;
  const destinations = destinationPool.length > 0 ? destinationPool : fallbackPool;

  const startNodeId = starts[Math.floor(rng() * starts.length)] ?? fallbackPool[0];
  const destinationCandidates = destinations.filter((id) => id !== startNodeId);
  const safeDestinationPool =
    destinationCandidates.length > 0
      ? destinationCandidates
      : fallbackPool.filter((id) => id !== startNodeId);
  const destinationNodeId = safeDestinationPool[Math.floor(rng() * safeDestinationPool.length)] ?? startNodeId;

  const startFacing = FACINGS[Math.floor(rng() * FACINGS.length)] ?? "north";

  return {
    startNodeId,
    startFacing,
    destinationNodeId,
  };
}

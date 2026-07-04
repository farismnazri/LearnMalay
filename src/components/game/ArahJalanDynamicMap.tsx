import Image from "next/image";
import type { CSSProperties } from "react";
import type { ArahJalanBoard } from "@/lib/arahJalan/board";
import type {
  ArahJalanNode,
  ArahJalanNodeId,
  ArahJalanState,
  Facing,
} from "@/lib/arahJalan/engine";
import { ARAH_JALAN_LOCATION_CATALOG } from "@/lib/arahJalan/locations";

const BASE_TILE_SRC = "/assets/minigames/arah-jalan/base.webp";
const LOCATION_FRAME_STROKE = "#f0aa2b";

type RoadSegment = {
  id: string;
  from: ArahJalanNode;
  to: ArahJalanNode;
};

function facingAngle(facing: Facing) {
  switch (facing) {
    case "north":
      return 0;
    case "east":
      return 90;
    case "south":
      return 180;
    case "west":
      return 270;
  }
}

function buildRoadSegments(board: ArahJalanBoard): RoadSegment[] {
  const out: RoadSegment[] = [];
  const seen = new Set<string>();

  for (const [fromId, directions] of Object.entries(board.graph.connections)) {
    const fromNode = board.graph.nodes[fromId];
    if (!fromNode) continue;

    for (const toId of Object.values(directions)) {
      if (!toId) continue;
      const toNode = board.graph.nodes[toId];
      if (!toNode) continue;

      const key = [fromId, toId].sort().join("--");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ id: key, from: fromNode, to: toNode });
    }
  }

  return out;
}

function locationCellStyle(board: ArahJalanBoard, row: number, col: number): CSSProperties {
  const cellPercent = 100 / board.gridSize;
  return {
    left: `${(col - 1) * cellPercent}%`,
    top: `${(row - 1) * cellPercent}%`,
    width: `${cellPercent}%`,
    height: `${cellPercent}%`,
  };
}

function markerStyle(board: ArahJalanBoard, row: number, col: number): CSSProperties {
  return {
    left: `${(col / board.gridSize) * 100}%`,
    top: `${(row / board.gridSize) * 100}%`,
  };
}

export default function ArahJalanDynamicMap({
  board,
  playerState,
  destinationNodeId,
  stepDelayMs,
}: {
  board: ArahJalanBoard;
  playerState: ArahJalanState;
  destinationNodeId: ArahJalanNodeId;
  stepDelayMs: number;
}) {
  const roads = buildRoadSegments(board);
  const playerNode = board.graph.nodes[playerState.nodeId];
  const boardScale = (board.gridSize / board.visibleUnits) * 100;
  const boardOffset = 50 / board.gridSize;
  const playerTransitionMs = Math.max(120, stepDelayMs - 120);

  const boardStyle: CSSProperties = {
    width: `${boardScale}%`,
    height: `${boardScale}%`,
    gridTemplateColumns: `repeat(${board.gridSize}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${board.gridSize}, minmax(0, 1fr))`,
    transform: `translate(-${boardOffset}%, -${boardOffset}%)`,
  };

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[680px] overflow-hidden rounded-2xl border border-[#d6c48d] bg-[#eed59d] shadow-inner"
      aria-label="Arah Jalan map"
    >
      <div className="absolute left-0 top-0 grid" style={boardStyle}>
        {Array.from({ length: board.gridSize * board.gridSize }, (_, index) => (
          <div
            key={`tile-${index}`}
            aria-hidden="true"
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${BASE_TILE_SRC})` }}
          />
        ))}

        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100">
          <g stroke="#d6a04b" strokeLinecap="round" strokeWidth={1.25} opacity={0.48}>
            {roads.map((road) => (
              <line
                key={road.id}
                x1={road.from.x}
                y1={road.from.y}
                x2={road.to.x}
                y2={road.to.y}
              />
            ))}
          </g>

          <g stroke="#f0aa2b" strokeLinecap="round" strokeWidth={0.95}>
            {board.placements.map((placement) => {
              const markerX = (placement.col / board.gridSize) * 100;
              const markerY = (placement.row / board.gridSize) * 100;
              const pull = (0.42 / board.gridSize) * 100;
              return (
                <line
                  key={`${placement.locationId}-connector`}
                  x1={markerX}
                  y1={markerY}
                  x2={markerX - pull}
                  y2={markerY - pull}
                />
              );
            })}
          </g>
        </svg>

        {board.placements.map((placement) => {
          const location = ARAH_JALAN_LOCATION_CATALOG[placement.locationId];
          const isDestination = placement.nodeId === destinationNodeId;
          return (
            <div
              key={placement.locationId}
              className="absolute z-20 flex items-center justify-center"
              style={locationCellStyle(board, placement.row, placement.col)}
            >
              <div
                className={[
                  "relative h-[69%] w-[69%] overflow-hidden rounded-[18px] border-2 bg-white/70 drop-shadow-[0_4px_6px_rgba(78,48,10,0.25)]",
                  isDestination ? "scale-[1.04]" : "",
                ].join(" ")}
                style={{ borderColor: LOCATION_FRAME_STROKE }}
              >
                <Image
                  src={location.imageSrc}
                  alt={location.label.ms}
                  fill
                  sizes="(min-width: 1024px) 150px, 30vw"
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}

        {board.placements.map((placement) => {
          const isDestination = placement.nodeId === destinationNodeId;
          return (
            <span
              key={`${placement.locationId}-marker`}
              aria-hidden="true"
              className={[
                "absolute z-30 h-[clamp(14px,2.2vw,22px)] w-[clamp(14px,2.2vw,22px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8d5c00] bg-[#ffc64a] shadow-[0_2px_0_rgba(93,57,0,0.35)]",
                isDestination ? "ring-4 ring-[#ffe8a3]/80" : "",
              ].join(" ")}
              style={markerStyle(board, placement.row, placement.col)}
            />
          );
        })}

        {playerNode && (
          <div
            className="absolute z-40 h-[clamp(24px,3.4vw,34px)] w-[clamp(24px,3.4vw,34px)]"
            style={{
              left: `${playerNode.x}%`,
              top: `${playerNode.y}%`,
              transform: `translate(-50%, -50%) rotate(${facingAngle(playerState.facing)}deg)`,
              transition: `left ${playerTransitionMs}ms ease-in-out, top ${playerTransitionMs}ms ease-in-out, transform ${playerTransitionMs}ms ease-in-out`,
            }}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full border-2 border-[#2b160a] bg-white shadow-[0_2px_0_rgba(0,0,0,0.22)]" />
              <div
                className="absolute left-1/2 top-[8%] h-[58%] w-[56%] -translate-x-1/2 rounded-t-full bg-[#e94a3f]"
                style={{
                  clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                  filter: "drop-shadow(0 1px 0 rgba(43,22,10,0.45))",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

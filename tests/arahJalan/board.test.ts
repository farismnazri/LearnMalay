import test from "node:test";
import assert from "node:assert/strict";
import {
  buildArahJalanBoard,
  createRandomArahJalanBoard,
  getArahJalanUsableCells,
  isArahJalanUsableCell,
  type ArahJalanLocationPlacementInput,
} from "../../src/lib/arahJalan/board.ts";

function uniqueCellCount(placements: readonly ArahJalanLocationPlacementInput[]) {
  return new Set(placements.map((placement) => `${placement.row}:${placement.col}`)).size;
}

function uniqueLocationCount(placements: readonly ArahJalanLocationPlacementInput[]) {
  return new Set(placements.map((placement) => placement.locationId)).size;
}

test("easy boards use a 5x5 grid with 9 usable points and all 9 locations", () => {
  const board = createRandomArahJalanBoard("easy");

  assert.equal(board.gridSize, 5);
  assert.equal(board.visibleUnits, 4);
  assert.equal(getArahJalanUsableCells("easy").length, 9);
  assert.equal(board.placements.length, 9);
  assert.equal(uniqueCellCount(board.placements), 9);
  assert.equal(uniqueLocationCount(board.placements), 9);
  assert.equal(board.graph.destinationNodeIds.length, 9);

  for (const placement of board.placements) {
    assert.equal(isArahJalanUsableCell("easy", placement), true);
    assert.ok(board.graph.nodes[placement.nodeId]);
  }
});

test("hard boards use a 6x6 grid with 16 usable points and all 9 locations", () => {
  const board = createRandomArahJalanBoard("hard");

  assert.equal(board.gridSize, 6);
  assert.equal(board.visibleUnits, 5);
  assert.equal(getArahJalanUsableCells("hard").length, 16);
  assert.equal(board.placements.length, 9);
  assert.equal(uniqueCellCount(board.placements), 9);
  assert.equal(uniqueLocationCount(board.placements), 9);
  assert.equal(board.graph.destinationNodeIds.length, 9);

  for (const placement of board.placements) {
    assert.equal(isArahJalanUsableCell("hard", placement), true);
    assert.ok(board.graph.nodes[placement.nodeId]);
  }
});

test("placement validation rejects duplicate occupied cells", () => {
  assert.throws(
    () =>
      buildArahJalanBoard("easy", [
        { locationId: "hospital", row: 2, col: 2 },
        { locationId: "kedai", row: 2, col: 2 },
      ]),
    /Duplicate occupied cell/,
  );
});

test("placement validation rejects duplicate location ids", () => {
  assert.throws(
    () =>
      buildArahJalanBoard("easy", [
        { locationId: "hospital", row: 2, col: 2 },
        { locationId: "hospital", row: 3, col: 3 },
      ]),
    /Duplicate location id/,
  );
});

test("placement validation rejects cells outside the usable inner range", () => {
  assert.throws(
    () => buildArahJalanBoard("easy", [{ locationId: "hospital", row: 1, col: 2 }]),
    /outside the usable cells/,
  );
});

import { eachDirection, isGated, isSpaceOccupied } from './board';
import { hexesEqual, relativeHexCoordinate } from './hex';
import { GameBoard, HexCoordinate } from './types';

/**
 * Get all coordinates that are valid moves for a tile at the given coordinate
 * acting as a grasshopper. The grasshopper rules state that the grasshopper
 * jumps from its space over any number of pieces (at least one) to the next
 * unoccupied space along a straight row of joined pieces.
 *
 * @param board A game board.
 * @param coordinate The hex coordinate where the given tile is located.
 * @return An array of hex coordinates.
 */
export function getValidGrasshopperMoveCoordinates(
  board: GameBoard,
  coordinate: HexCoordinate
): HexCoordinate[] {
  const valid: HexCoordinate[] = [];
  eachDirection((direction) => {
    const neighbor = relativeHexCoordinate(coordinate, direction);
    let current = neighbor;
    // check if there is a gate between the grasshopper and first hex
    var gateFound:boolean = isGated(board, coordinate, direction);
    while (isSpaceOccupied(board, current) && !gateFound) {
      // check for each gate along path
      if (isGated(board, current, direction)) {
        gateFound = true;
      }
      current = relativeHexCoordinate(current, direction);
    }

    // check for gate in last dropdown
    if (isGated(board, current, direction)) {
      gateFound = true;
    }
    if (!hexesEqual(current, neighbor) && !gateFound) {
      valid.push(current);
    }
  });
  return valid;
}

import {abs} from './math'

/**
 * Manhattan Distance measures the distance between two points in a grid based on a strictly
 * horizontal and/or vertical path (like the grid-based streets of Manhattan).
 */
export const manhattanDistance = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
) => abs(x2 - x1) + abs(y2 - y1)

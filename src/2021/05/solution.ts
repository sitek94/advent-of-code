import { Line, parseInput } from './input'
import { abs, max, min } from '../../../utils'

export const solvePartOne = (input: string) =>
  solve(input, drawHorizontalOrVerticalLine)
export const solvePartTwo = (input: string) => solve(input, drawLine)

export function solve(
  input: string,
  drawLineFn: (grid: Grid, line: Line) => void,
) {
  const lines = parseInput(input)
  const edges = findEdgePoints(lines)
  const grid = createGrid(...edges)

  lines.forEach(line => {
    drawLineFn(grid, line)
  })

  const overlappingPoints = grid.flat().filter(n => n >= 2)

  return overlappingPoints.length
}

/**
 * Creates a drawLine fn that️ MUTATES the grid
 */
const drawLineFactory = (diagonal: boolean) => (grid: Grid, line: Line) => {
  const points = getPoints(line, { diagonal })
  points.forEach(([x, y]) => {
    grid[x][y]++
  })
}

export const drawHorizontalOrVerticalLine = drawLineFactory(false)
export const drawLine = drawLineFactory(true)

type Point = [number, number]

export function getPoints(line: Line, config: { diagonal: boolean }): Point[] {
  const [x0, y0, x1, y1] = line

  const points: Point[] = []
  // Vertical line
  if (x0 === x1) {
    for (let y = min(y0, y1); y <= max(y0, y1); y++) {
      points.push([x0, y])
    }
    return points
  }

  // Horizontal line
  if (y0 === y1) {
    for (let x = min(x0, x1); x <= max(x0, x1); x++) {
      points.push([x, y0])
    }
    return points
  }

  if (config.diagonal) {
    let x = x0
    let y = y0
    for (let i = 0; i <= abs(x0 - x1); i++) {
      points.push([x, y])

      if (x0 < x1) {
        x++
      } else {
        x--
      }
      if (y0 < y1) {
        y++
      } else {
        y--
      }
    }
    return points
  }

  return []
}

type Grid = number[][]

/**
 * Creates square grid of given size, including the edges
 */
export function createGrid(x0, y0, x1, y1): Grid {
  let grid = []

  for (let x = x0; x <= x1; x++) {
    grid.push([])
    for (let y = y0; y <= y1; y++) {
      grid[x].push(0)
    }
  }
  return grid
}

export function findEdgePoints(lines: Line[]) {
  let edges = {
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0,
  }

  for (const [x0, y0, x1, y1] of lines) {
    // Left edge
    if (x0 < edges.x0) edges.x0 = x0
    if (x1 < edges.x0) edges.x0 = x1

    // Right edge
    if (x0 > edges.x1) edges.x1 = x0
    if (x1 > edges.x1) edges.x1 = x1

    // Top edge
    if (y0 < edges.y0) edges.y0 = y0
    if (y1 < edges.y0) edges.y0 = y1

    // Bottom edge
    if (y0 > edges.y1) edges.y1 = y0
    if (y1 > edges.y1) edges.y1 = y1
  }

  return [edges.x0, edges.y0, edges.x1, edges.y1] as const
}

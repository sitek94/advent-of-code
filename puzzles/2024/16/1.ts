import {run} from '~/run'
import {PriorityQueue} from '~/utils/priority-queue'

function solve(input: string) {
  const {grid, start, end} = parseInput(input)

  const best = findBestPath(grid, {...start, dir: 'right'}, end)

  return best.cost
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 7036},
    {input: 'test2.txt', expected: 11048},
    {input: 'input.txt', expected: 95476},
  ],
})

const DIRECTIONS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
} as const

type Direction = keyof typeof DIRECTIONS
type Point = {x: number; y: number}

/**
 * Dijkstra to find the best cost to reach the end
 */
function findBestPath(
  grid: string[][],
  start: Point & {dir: Direction},
  end: Point,
) {
  const bestCost = new Map<string, number>()
  const queue = new PriorityQueue(
    [{...start, cost: 0}],
    (a, b) => a.cost < b.cost,
  )

  while (!queue.isEmpty()) {
    const current = queue.dequeue()

    if (current.x === end.x && current.y === end.y) {
      return current
    }

    const possibleDirections = getPossibleDirections(current.dir)

    for (const nextDir of possibleDirections) {
      const [dx, dy] = DIRECTIONS[nextDir]
      const [x, y] = [current.x + dx, current.y + dy]
      const isWall = grid[y][x] === '#'
      if (isWall) continue

      const nextKey = key(x, y, nextDir)
      const nextCost = current.cost + getCost(current.dir, nextDir)

      // There is already a path that is less expensive
      if (bestCost.has(nextKey) && bestCost.get(nextKey) < nextCost) {
        continue
      }

      bestCost.set(nextKey, nextCost)
      queue.enqueue({x, y, dir: nextDir, cost: nextCost})
    }
  }
}

/**
 * Assumptions:
 * `1` - for moving forward
 * `1000` - for rotating 90deg
 *
 * So for moving forward it's just `1` and for moving left/right it's `1000 + 1`
 */
function getCost(currentDir: Direction, nextDir: Direction) {
  if (currentDir === nextDir) return 1
  return 1000 + 1
}

/**
 * It should not be possible to go back
 */
function getPossibleDirections(direction: Direction): Direction[] {
  if (direction === 'up') return ['up', 'left', 'right']
  if (direction === 'down') return ['down', 'left', 'right']
  if (direction === 'left') return ['left', 'up', 'down']
  if (direction === 'right') return ['right', 'up', 'down']
}

function key(x: number, y: number, dir: string) {
  return `${x},${y},${dir}`
}

function parseInput(input: string) {
  const start = {x: 0, y: 0}
  const end = {x: 0, y: 0}

  const grid = input.split('\n').map((row, y) =>
    row.split('').map((char, x) => {
      if (char === 'S') {
        start.x = x
        start.y = y
      }
      if (char === 'E') {
        end.x = x
        end.y = y
      }
      return char
    }),
  )

  return {start, end, grid}
}

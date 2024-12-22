import {run} from '~/run'
import {printGrid, transformGrid} from '~/utils/index'
import {PriorityQueue} from '~/utils/priority-queue'

function solve(input: string) {
  const {grid, start, end} = parseInput(input)

  const best = findBestPath(grid, {...start, dir: 'right'}, end)
  const visited = findAllUniqueVisitedPoints(best.current, best.cameFrom)

  printGrid(
    transformGrid(grid, ({value, x, y}) =>
      visited.has(key({x, y})) ? 'O' : value,
    ),
  )

  return visited.size
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 45},
    {input: 'test2.txt', expected: 64},
    {input: 'test3.txt', expected: 12},
    {input: 'input.txt', expected: 511},
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

function findAllUniqueVisitedPoints(
  start: Point & {dir: Direction},
  cameFrom: Map<string, string[]>,
) {
  const visited = new Set<string>()
  const queue = [key(start, start.dir)]

  while (queue.length) {
    const current = queue.shift()
    const {x, y} = fromKey(current || '')
    visited.add(key({x, y}))

    const from = cameFrom.get(current)
    from?.forEach(key => {
      queue.push(key)
    })
  }

  return visited
}

/**
 * Dijkstra to find the best cost to reach the end
 */
function findBestPath(
  grid: string[][],
  start: Point & {dir: Direction},
  end: Point,
) {
  const bestCost = new Map<string, number>()
  const parents = new Map<string, string[]>()

  const queue = new PriorityQueue(
    [{...start, cost: 0}],
    (a, b) => a.cost < b.cost,
  )

  while (!queue.isEmpty()) {
    const current = queue.dequeue()

    if (current.x === end.x && current.y === end.y) {
      return {current, cameFrom: parents}
    }

    const possibleDirections = getPossibleDirections(current.dir)

    for (const nextDir of possibleDirections) {
      const [dx, dy] = DIRECTIONS[nextDir]
      const [x, y] = [current.x + dx, current.y + dy]
      const isWall = grid[y][x] === '#'
      if (isWall) continue

      const nextKey = key({x, y}, nextDir)
      const nextCost = current.cost + getCost(current.dir, nextDir)
      const currentKey = key(current, current.dir)

      // There is already a path that is less expensive
      if (bestCost.has(nextKey) && bestCost.get(nextKey) < nextCost) {
        continue
      }

      const parentKeys = parents.get(nextKey) || []

      if (!parentKeys.includes(currentKey)) {
        parents.set(nextKey, [...parentKeys, currentKey])
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

function fromKey(k: string) {
  const [x, y, dir] = k.split(',')
  return {x: +x, y: +y, dir}
}

function key({x, y}: Point, dir?: string) {
  if (dir) return `${x},${y},${dir}`
  return `${x},${y}`
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

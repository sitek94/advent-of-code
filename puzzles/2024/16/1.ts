import {run} from '~/run'
import {PriorityQueue} from '~/utils/priority-queue'

const DIRECTIONS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
} as const
type Direction = keyof typeof DIRECTIONS

function solve(input: string) {
  const start = {x: 0, y: 0, dir: 'right' as Direction, cost: 0}

  const grid = input.split('\n').map((row, y) =>
    row.split('').map((char, x) => {
      if (char === 'S') {
        start.x = x
        start.y = y
      }
      return char
    }),
  )

  const queue = new PriorityQueue([start], (a, b) => a.cost < b.cost)
  const bestCost = new Map<string, number>()

  while (!queue.isEmpty()) {
    const state = queue.dequeue()
    const isEnd = grid[state.y][state.x] === 'E'
    if (isEnd) {
      return state.cost
    }

    const possibleDirections = getPossibleDirections(state.dir)

    for (const nextDir of possibleDirections) {
      const [dx, dy] = DIRECTIONS[nextDir]
      const [x, y] = [state.x + dx, state.y + dy]
      const isWall = grid[y][x] === '#'
      if (isWall) continue

      const key = toKey(x, y, nextDir)
      const cost = state.cost + getCost(state.dir, nextDir)

      // There is already a path that is less expensive
      if (bestCost.has(key) && bestCost.get(key) < cost) {
        continue
      }

      bestCost.set(key, cost)
      queue.enqueue({x, y, dir: nextDir, cost})
    }
  }

  console.log(`Haven't found the end`)

  return 0
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 7036},
    {input: 'test2.txt', expected: 11048},
    {input: 'input.txt', expected: 95476},
  ],
})

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

function toKey(x: number, y: number, dir: string) {
  return `${x},${y},${dir}`
}

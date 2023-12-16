import {run} from '~/run'

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'
const directions = [UP, DOWN, LEFT, RIGHT]

type Point = {x: number; y: number}
type Direction = (typeof directions)[number]
type Destination = '/' | '\\' | '|' | '-' | '.'

function solve(input: string) {
  const grid = input.split('\n').map(line => line.split(''))
  const starts = getStarts(grid)

  let max = 0

  for (const [start, direction] of starts) {
    max = Math.max(max, getScore(start, direction, grid))
  }

  return max
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 51,
    },
    {
      input: 'input.txt',
      expected: 7632,
    },
  ],
})

const getStarts = (grid: string[][]) => {
  const starts = [] as [Point, Direction][]
  for (let x = 0; x < grid[0].length; x++) {
    starts.push([{x, y: -1}, DOWN])
    starts.push([{x, y: grid.length}, UP])
  }
  for (let y = 0; y < grid.length; y++) {
    starts.push([{x: -1, y}, RIGHT])
    starts.push([{x: grid[0].length, y}, LEFT])
  }
  return starts
}

const getScore = (start: Point, direction: Direction, grid: string[][]) => {
  const visited = new Map<string, boolean>()

  const queue = [[start, direction] satisfies [Point, Direction]]

  while (queue.length) {
    const [p, direction] = queue.shift() as [Point, Direction]

    let x = p.x
    let y = p.y

    if (direction === UP) y--
    if (direction === DOWN) y++
    if (direction === LEFT) x--
    if (direction === RIGHT) x++

    const destination = grid[y]?.[x] as Destination | undefined

    // Outside grid
    if (!destination) continue

    const key = getKey({x, y}, direction)

    const isVisited = visited.get(key)
    if (isVisited) continue

    // Mark as visited
    visited.set(key, true)

    // Continue
    if (destination === '.') {
      queue.push([{x, y}, direction])
    }

    // Mirror
    if (destination === '/' || destination === `\\`) {
      const newDirection = getMirroredDirection(direction, destination)
      queue.push([{x, y}, newDirection])
    }

    // Splitter
    if (destination === '|' || destination === '-') {
      const newDirections = getSplitterDirections(direction, destination)

      for (const newDirection of newDirections) {
        queue.push([{x, y}, newDirection])
      }
    }
  }

  const unique = new Set([...visited.keys()].map(fromKey).map(p => p.key))

  return unique.size
}

const getKey = (p: Point, direction: Direction) => `${p.x},${p.y}:${direction}`

const fromKey = (key: string) => {
  const pointKey = key.split(':')[0]
  const [x, y] = pointKey.split(',')
  return {key: pointKey, x: Number(x), y: Number(y)}
}

const getMirroredDirection = (current: Direction, mirror: '\\' | '/') => {
  if (current === UP) {
    if (mirror === '/') return RIGHT
    if (mirror === `\\`) return LEFT
  }
  if (current === DOWN) {
    if (mirror === '/') return LEFT
    if (mirror === `\\`) return RIGHT
  }
  if (current === LEFT) {
    if (mirror === '/') return DOWN
    if (mirror === `\\`) return UP
  }
  if (current === RIGHT) {
    if (mirror === '/') return UP
    if (mirror === `\\`) return DOWN
  }

  throw new Error(`Unknown mirror: ${mirror}`)
}

const getSplitterDirections = (current: Direction, splitter: '|' | '-') => {
  if (current === UP || current === DOWN) {
    if (splitter === '|') return [current]
    if (splitter === '-') return [LEFT, RIGHT]
  }
  if (current === LEFT || current === RIGHT) {
    if (splitter === '|') return [UP, DOWN]
    if (splitter === '-') return [current]
  }

  throw new Error(`Unknown splitter: ${splitter}`)
}

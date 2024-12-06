import {run} from '~/run'

type Direction = '^' | 'v' | '<' | '>'
type Point = {x: number; y: number}

function solve(input: string) {
  const grid = input.split('\n').map(line => line.split(''))
  const width = grid[0].length
  const height = grid.length

  let startPos = {x: 0, y: 0}
  let startDirection: Direction = '^'

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '^') {
        startPos = {x, y}
      }
    }
  }

  const initial = simulate(grid, startPos, startDirection)

  let loops = 0

  for (const distinctPositions of initial.distinct) {
    const [x, y] = distinctPositions.split(',').map(Number)

    const isStart = x === startPos.x && y === startPos.y
    if (isStart) continue

    const testGrid = grid.map(row => [...row])
    testGrid[y][x] = '#'

    const {hasLoop} = simulate(testGrid, startPos, startDirection)
    if (hasLoop) {
      loops++
    }
  }

  return loops
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 6,
    },
    {
      input: 'input.txt',
      expected: 1575,
    },
  ],
})

function simulate(
  grid: string[][],
  startPos: Point,
  startDirection: Direction,
) {
  const width = grid[0].length
  const height = grid.length
  const visited = new Set<string>()
  const distinct = new Set<string>()
  let pos = {...startPos}
  let direction = startDirection
  let hasLoop = false

  const isGuardInside = (p: Point) =>
    p.x >= 0 && p.x < width && p.y >= 0 && p.y < height

  while (isGuardInside(pos)) {
    const k = key(pos.x, pos.y, direction)
    if (visited.has(k)) {
      hasLoop = true
      break
    }
    visited.add(k)
    distinct.add(key(pos.x, pos.y))
    const next = getNextPos(pos, direction)
    const value = grid[next.y]?.[next.x]

    if (value === '#') {
      direction = getNextDirection(direction)
    } else {
      pos = next
    }
  }

  return {visited, distinct, hasLoop}
}

function getNextPos(pos: Point, direction: Direction): Point {
  if (direction === '^') return {x: pos.x, y: pos.y - 1}
  if (direction === 'v') return {x: pos.x, y: pos.y + 1}
  if (direction === '<') return {x: pos.x - 1, y: pos.y}
  if (direction === '>') return {x: pos.x + 1, y: pos.y}
}

function getNextDirection(direction: Direction): Direction {
  switch (direction) {
    case '^':
      return '>'
    case '>':
      return 'v'
    case 'v':
      return '<'
    case '<':
      return '^'
  }
}

function key(x: number, y: number, direction?: Direction) {
  if (direction) return `${x},${y},${direction}`
  return `${x},${y}`
}

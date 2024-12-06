import {run} from '~/run'

function solve(input: string) {
  const grid = input.split('\n').map(line => line.split(''))
  const width = grid[0].length
  const height = grid.length
  const OBSTACLE = '#'
  const obstacles = new Map<string, string>()
  const positions = new Map<string, boolean>()
  let pos = {x: 0, y: 0}

  printGrid(grid)

  const key = (x: number, y: number) => `${x},${y}`
  const isGuardInside = (p: Point) =>
    p.x >= 0 && p.x < width && p.y >= 0 && p.y < height

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const v = grid[y][x]
      if (v === OBSTACLE) obstacles.set(key(x, y), v)
      if (v === '^') pos = {x, y}
    }
  }

  let direction: '^' | 'v' | '<' | '>' = '^'

  while (isGuardInside(pos)) {
    const success = move()
    if (!success) break
  }

  function move() {
    const next = getNextPos()
    const value = grid[next.y]?.[next.x]
    if (!value) {
      return false
    }
    if (value === '#') {
      direction = getNextDirection()
    } else {
      grid[pos.y][pos.x] = '.'
      pos = next
      const k = key(pos.x, pos.y)
      if (!positions.has(k)) positions.set(k, true)
      grid[pos.y][pos.x] = direction
    }
    return true
  }

  function getNextPos() {
    if (direction === '^') return {x: pos.x, y: pos.y - 1}
    if (direction === 'v') return {x: pos.x, y: pos.y + 1}
    if (direction === '<') return {x: pos.x - 1, y: pos.y}
    if (direction === '>') return {x: pos.x + 1, y: pos.y}
  }

  function getNextDirection() {
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

  return positions.size
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 41,
    },
    {
      input: 'input.txt',
      expected: 4656,
    },
  ],
})

type Point = {x: number; y: number}

function printGrid(grid: string[][]) {
  console.log(grid.map(row => row.join('')).join('\n'))
}

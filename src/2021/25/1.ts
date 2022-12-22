import { run } from '../../runner'
import { range } from '../../../utils'

const EMPTY = '.'

enum Direction {
  SOUTH = 'v',
  EAST = '>',
}

const { SOUTH, EAST } = Direction

function solve(input: string) {
  const lines = input.split('\n')
  const HEIGHT = lines.length
  const WIDTH = lines[0].length

  const grid = {}
  type Grid = Record<string, string>

  lines.forEach((line, y) =>
    line.split('').forEach((value, x) => {
      if (value !== EMPTY) {
        grid[toKey(x, y)] = value
      }
    }),
  )

  run(grid)

  function run(grid) {
    let newGrid = grid

    let steps = 0
    while (true) {
      steps++
      let next = move(newGrid, EAST)
      next = move(next, SOUTH)

      if (isEqual(next, newGrid)) {
        break
      }

      newGrid = next
    }

    console.log(steps)
  }

  function move(grid, direction: Direction) {
    const newGrid: Grid = {}

    for (const [key, value] of Object.entries(grid)) {
      if (value !== direction) {
        newGrid[key] = grid[key]
        continue
      }

      const { x, y } = fromKey(key)

      const nextFieldKey = getNextFieldKey(grid, x, y)
      const nextFieldValue = grid[nextFieldKey]

      if (!nextFieldValue) {
        newGrid[nextFieldKey] = direction
      } else {
        newGrid[key] = grid[key]
      }
    }

    return newGrid
  }

  function getNextFieldKey(grid: Grid, x: number, y: number) {
    const value = grid[toKey(x, y)]

    if (value === EAST) {
      return toKey((x + 1) % WIDTH, y)
    }

    if (value === SOUTH) {
      return toKey(x, (y + 1) % HEIGHT)
    }

    throw new Error(`Unknown value: ${value} for ${x}, ${y}`)
  }

  function print(grid: Grid) {
    let output = ''
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        output += grid[toKey(x, y)] || EMPTY
      }
      output += '\n'
    }
    console.log(output)
  }

  return 'solution'
}

function fromKey(key: string) {
  const [x, y] = key.split(',')
  return { x: parseInt(x), y: parseInt(y) }
}

function toKey(x: number, y: number) {
  return `${x},${y}`
}

function isEqual(grid1, grid2) {
  return JSON.stringify(grid1) === JSON.stringify(grid2)
}

run({
  solve,
  tests: [
    {
      input: `
        v...>>.vv>
        .vv>>.vv..
        >>.>v>...v
        >>v>>.>.v.
        v>v.vv.v..
        >.>>..v...
        .vv..>.>v.
        v.v..>>v.v
        ....v..v.>
      `,
      expected: 10,
    },
  ],
  // onlyTests: true,
})

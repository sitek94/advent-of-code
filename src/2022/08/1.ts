import { run } from '../../runner'

function solve(input: string) {
  let GRID = input.split('\n').map(l => l.split('').map(Number))
  let WIDTH = GRID[0].length
  let HEIGHT = GRID.length
  let LAST_X = WIDTH - 1
  let LAST_Y = HEIGHT - 1

  let count = 0

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (
        isEdge(x, y) ||
        isVisFromBottom(x, y) ||
        isVisFromTop(x, y) ||
        isVisFromLeft(x, y) ||
        isVisFromRight(x, y)
      ) {
        count++
      }
    }
  }

  function isEdge(x: number, y: number) {
    return x === 0 || x === LAST_X || y === 0 || y === LAST_Y
  }

  function isVisFromTop(x, y) {
    let value = GRID[y][x]
    for (let i = 0; i < y; i++) {
      if (value <= GRID[i][x]) return false
    }
    return true
  }

  function isVisFromBottom(x, y) {
    let value = GRID[y][x]
    for (let i = y + 1; i < HEIGHT; i++) {
      if (value <= GRID[i][x]) return false
    }
    return true
  }

  function isVisFromLeft(x, y) {
    let value = GRID[y][x]
    for (let i = 0; i < x; i++) {
      if (value <= GRID[y][i]) return false
    }
    return true
  }

  function isVisFromRight(x, y) {
    let value = GRID[y][x]
    for (let i = x + 1; i < WIDTH; i++) {
      if (value <= GRID[y][i]) return false
    }
    return true
  }

  return count
}

run({
  solve,
  tests: [
    {
      input: `30373
25512
65332
33549
35390`,
      expected: 21,
    },
  ],
  // onlyTests: true,
})

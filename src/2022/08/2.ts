import { run } from '../../runner'

function solve(input: string) {
  let GRID = input.split('\n').map(l => l.split('').map(Number))
  let WIDTH = GRID[0].length
  let HEIGHT = GRID.length

  let bestScore = 0

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      let newScore = getScore(x, y)
      if (newScore > bestScore) {
        bestScore = newScore
      }
    }
  }

  /**
   * Gets the score by multiplying top, bottom, right and left scores
   */
  function getScore(x, y) {
    let value = GRID[y][x]
    let top = getCount(x, y, 0, -1, value)
    let bottom = getCount(x, y, 0, 1, value)
    let left = getCount(x, y, -1, 0, value)
    let right = getCount(x, y, 1, 0, value)

    return top * bottom * left * right
  }

  /**
   * Recursively goes to the direction specified by the offset and counts the trees.
   */
  function getCount(
    x: number,
    y: number,
    offsetX: number,
    offsetY: number,
    value: number,
  ) {
    let newX = x + offsetX
    let newY = y + offsetY
    let nextValue = GRID[newY]?.[newX]

    // Edge
    if (nextValue === undefined) {
      return 0
      // Tree of the same size
    } else if (value <= nextValue) {
      return 1
    } else {
      return 1 + getCount(newX, newY, offsetX, offsetY, value)
    }
  }

  return bestScore
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
      expected: 8,
    },
  ],
  // onlyTests: true,
})

import {run} from '~/runner'

function solve(input: string) {
  let lines = input.split('\n')

  let trees = {}
  lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      let hasTree = char === '#'
      if (hasTree) {
        trees[`${x},${y}`] = true
      }
    })
  })

  let width = lines[0].length
  let height = lines.length
  let treesCount = 0

  let currentX = 0
  let currentY = 0

  while (currentY < height) {
    currentX = (currentX + 3) % width
    currentY = currentY + 1

    let hasTree = trees[`${currentX},${currentY}`]
    if (hasTree) {
      treesCount++
    }
  }

  return treesCount
}

run({
  solve,
  tests: [
    {
      input: `
        ..##.......
        #...#...#..
        .#....#..#.
        ..#.#...#.#
        .#...##..#.
        ..#.##.....
        .#.#.#....#
        .#........#
        #.##...#...
        #...##....#
        .#..#...#.#
      `,
      expected: 7,
    },
  ],
  // onlyTests: true,
})

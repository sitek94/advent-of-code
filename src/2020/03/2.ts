import { run } from '~/runner'

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

  function findTrees(right: number, down: number) {
    let treesCount = 0

    let currentX = 0
    let currentY = 0

    while (currentY < height) {
      currentX = (currentX + right) % width
      currentY = currentY + down

      let hasTree = trees[`${currentX},${currentY}`]
      if (hasTree) {
        treesCount++
      }
    }

    return treesCount
  }

  let slopes: [number, number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  let results = []
  for (let slope of slopes) {
    results.push(findTrees(...slope))
  }

  return results.reduce((a, b) => a * b)
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
      expected: 336,
    },
  ],
  // onlyTests: true,
})

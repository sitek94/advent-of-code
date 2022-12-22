import { run } from '../../runner'
import { range } from '../../../utils'

const parse = input => input.split('\n').map(row => row.split('').map(Number))

function solve(input) {
  let map: number[][] = input.split('\n').map(r => r.split('').map(Number))
  let height = map.length
  let width = map[0].length
  const expandedMap = [...Array(map.length * 5)].map((_, y) =>
    [...Array(map[0].length * 5)].map(
      (_, x) =>
        1 +
        ((map[y % map.length][x % map[0].length] -
          1 +
          Math.trunc(x / map[0].length) +
          Math.trunc(y / map.length)) %
          9),
    ),
  )
  let largeMap = range(height * 5).map(y =>
    range(width * 5).map(x => {
      let value = map[y % height][x % width]
      let incX = Math.trunc(x / width)
      let incY = Math.trunc(y / height)

      return (value + incX + incY) % 9
    }),
  )

  print(largeMap)
  print(expandedMap)
  let cost = shortestPath(expandedMap)
  return cost
}

export const part2 = input =>
  (map => {
    const expandedMap = [...Array(map.length * 5)].map((_, y) =>
      [...Array(map[0].length * 5)].map(
        (_, x) =>
          1 +
          ((map[y % map.length][x % map[0].length] -
            1 +
            Math.trunc(x / map[0].length) +
            Math.trunc(y / map.length)) %
            9),
      ),
    )
    return shortestPath(expandedMap)
  })(parse(input))

const shortestPath = (map, startPos = [0, 0]) => {
  const ADJ = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  const queue = [{ pos: startPos, cost: 0 }]
  const visited = new Set()
  while (queue.length) {
    const {
      pos: [x, y],
      cost,
    } = queue.shift()
    if (y === map.length - 1 && x === map[0].length - 1) return cost

    ADJ.map(([dx, dy]) => [dx + x, dy + y])
      .filter(([x, y]) => map[y]?.[x] && map[y]?.[x])
      .filter(pos => !visited.has(pos + ''))
      .forEach(pos => {
        visited.add(pos + '')
        queue.push({ pos, cost: cost + map[pos[1]][pos[0]] })
      })
    queue.sort((a, b) => a.cost - b.cost)
  }
}

run({
  solve,
  tests: [
    {
      input: `
        1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581`,
      expected: 40,
    },
  ],
  // onlyTests: true,
})

export function print(grid: number[][]) {
  let output = ''
  for (let y = 0; y < grid.length; y++) {
    let line = ''
    for (let x = 0; x < grid[0].length; x++) {
      line += grid[y][x]
    }
    line += '\n'
    output += line
  }
  console.log(output)
}

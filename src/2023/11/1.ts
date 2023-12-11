import {run} from '~/run'
import {manhattanDistance} from '~/utils/manhattan-distance'
import {abs, max, min} from '~/utils/math'

function solve(input: string, {factor}: {factor: number}) {
  const grid = input.split('\n').map(line => line.split(''))

  const emptyRows = getEmptyRows(grid)
  const emptyCols = getEmptyCols(grid)
  const galaxies = getGalaxies(grid)
  const pairs = getUniquePairKeys(galaxies)

  let answer = 0

  pairs.forEach(key => {
    const [p1, p2] = getPair(key)
    const [x1, y1] = p1
    const [x2, y2] = p2

    const distance = manhattanDistance(p1, p2)

    const minX = min(x1, x2)
    const maxX = max(x1, x2)
    const minY = min(y1, y2)
    const maxY = max(y1, y2)

    const extraX = emptyCols.filter(x => x >= minX && x <= maxX).length
    const extraY = emptyRows.filter(y => y >= minY && y <= maxY).length

    answer += distance + (extraX + extraY) * (factor - 1)
  })

  return answer
}

run({
  solve,
  tests: [
    // Part one
    {
      input: 'test.txt',
      expected: 374,
      factor: 2,
    },
    {
      input: 'input.txt',
      expected: 9521550,
      factor: 2,
    },

    // Part two
    {
      input: 'test.txt',
      expected: 1030,
      factor: 10,
    },
    {
      input: 'test.txt',
      expected: 8410,
      factor: 100,
    },
    {
      input: 'input.txt',
      expected: 298932923702,
      factor: 1_000_000,
    },
  ],
})

/**
 * (x,y)
 */
type Point = [number, number]
type Grid = string[][]

const getKey = ([x, y]: Point) => `${x},${y}`
const getPoint = (key: string) => key.split(',').map(Number)

const getPairKey = (a: Point, b: Point) => `${getKey(a)}-${getKey(b)}`
const getPair = (key: string) => key.split('-').map(getPoint) as [Point, Point]

const getEmptyRows = (grid: Grid) => {
  const emptyRows = grid
    .map((row, y) => ({row, y}))
    .filter(({row}) => row.every(v => v === '.'))
    .map(({y}) => y)

  return emptyRows
}

const getEmptyCols = (grid: Grid) => {
  const emptyCols = grid[0]
    .map((_, x) => ({x}))
    .filter(({x}) => grid.every(row => row[x] === '.'))
    .map(({x}) => x)

  return emptyCols
}

const getGalaxies = (grid: Grid) => {
  const galaxies = grid
    .map((row, y) => row.map((value, x) => ({value, x, y})))
    .flat()
    .filter(({value}) => value === '#')
    .map(({x, y}) => [x, y] as [number, number])

  return galaxies
}

const getUniquePairKeys = (galaxies: [number, number][]) => {
  const pairs = [] as string[]

  galaxies.forEach(([x1, y1], i) => {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [x2, y2] = galaxies[j]
      const pair = getPairKey([x1, y1], [x2, y2])

      pairs.push(pair)
    }
  })

  return pairs
}

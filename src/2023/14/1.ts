import {run} from '~/run'

function solve(input: string) {
  const {width, height, canMoveUp, isMoveable, moveUp} = getGrid(input)

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let point = {x, y}

      while (isMoveable(point) && canMoveUp(point)) {
        point = moveUp(point)
      }
    }
  }

  let score = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      score += isMoveable({x, y}) ? height - y : 0
    }
  }

  return score
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 136,
    },
    {
      input: 'input.txt',
      expected: 106186,
    },
  ],
})

type Point = {x: number; y: number}

const getGrid = (input: string) => {
  const ROUND_ROCK = 'O'
  const EMPTY_SPACE = '.'

  const rows = input.split('\n')
  const grid = rows.map(row => row.split(''))
  const width = grid[0].length
  const height = grid.length

  const columns = [] as string[]

  for (let i = 0; i < rows[0].length; i++) {
    columns.push(rows.map(line => line[i]).join(''))
  }

  return {
    grid,
    width,
    height,
    columns,
    rows,
    canMoveUp: (p: Point) => {
      return grid[p.y - 1]?.[p.x] === EMPTY_SPACE
    },
    isMoveable: (p: Point) => {
      return grid[p.y][p.x] === ROUND_ROCK
    },
    moveUp: (p: Point) => {
      const newX = p.x
      const newY = p.y - 1

      grid[newY][newX] = ROUND_ROCK
      grid[p.y][p.x] = EMPTY_SPACE

      return {x: newX, y: newY}
    },
    printGrid: () => {
      console.log(grid.map(row => row.join('')).join('\n'))
    },
  }
}

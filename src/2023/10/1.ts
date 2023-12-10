import {run} from '~/run'
import {logger} from '~/utils/logger'

type Point = {x: number; y: number}
type Grid = string[][]

function solve(input: string) {
  const grid = input.split('\n').map(line => line.split(''))
  const start = findStart(grid)

  const loop = getMainLoop(start, grid)

  return loop.length / 2
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 4,
    },
    {
      input: 'test2.txt',
      expected: 8,
    },
    {
      input: 'input.txt',
      expected: 7030,
    },
  ],
})

const getMainLoop = (start: Point, grid: Grid) => {
  const loop: Point[] = [start]

  let previous = start
  let current = findFirstNext(start, grid)

  while (!isEqual(start, current)) {
    let next = getNext(current, previous, grid)

    loop.push(next)

    previous = {...current}
    current = {...next}
  }

  return loop
}

const getNext = (current: Point, previous: Point, grid: Grid) => {
  const isCurrentBelow = current.y > previous.y
  const isCurrentAbove = current.y < previous.y
  const isCurrentLeft = current.x < previous.x
  const isCurrentRight = current.x > previous.x
  const value = grid[current.y][current.x]
  const next = {...current}

  if (value === '|') {
    if (isCurrentAbove) next.y--
    if (isCurrentBelow) next.y++
  }
  if (value === '-') {
    if (isCurrentLeft) next.x--
    if (isCurrentRight) next.x++
  }
  if (value === 'L') {
    if (isCurrentBelow) next.x++
    if (isCurrentLeft) next.y--
  }
  if (value === 'J') {
    if (isCurrentBelow) next.x--
    if (isCurrentRight) next.y--
  }
  if (value === '7') {
    if (isCurrentAbove) next.x--
    if (isCurrentRight) next.y++
  }
  if (value === 'F') {
    if (isCurrentAbove) next.x++
    if (isCurrentLeft) next.y++
  }

  return next
}

const findStart = (grid: Grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const value = grid[row][col]
      if (value === 'S') {
        return {x: col, y: row}
      }
    }
  }

  throw new Error('Could not find start')
}

const findFirstNext = (start: Point, grid: Grid) => {
  const neighbors = [
    {x: start.x, y: start.y - 1}, // north
    {x: start.x, y: start.y + 1}, // south
    {x: start.x - 1, y: start.y}, // west
    {x: start.x + 1, y: start.y}, // east
  ]

  for (const {x, y} of neighbors) {
    const value = grid[y][x]
    const isAbove = y < start.y
    const isBelow = y > start.y
    const isLeft = x < start.x
    const isRight = x > start.x

    if (value === '|') {
      if (isAbove) return {x, y}
      if (isBelow) return {x, y}
    }
    if (value === '-') {
      if (isLeft) return {x, y}
      if (isRight) return {x, y}
    }
    if (value === 'L') {
      if (isBelow) return {x, y}
      if (isLeft) return {x, y}
    }
    if (value === 'J') {
      if (isBelow) return {x, y}
      if (isRight) return {x, y}
    }
    if (value === '7') {
      if (isAbove) return {x, y}
      if (isRight) return {x, y}
    }
  }

  throw new Error('Could not find first next')
}

const isEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y

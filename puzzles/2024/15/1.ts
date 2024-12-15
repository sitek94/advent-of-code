import {run} from '~/run'

function solve(input: string) {
  const {grid, steps} = setup(input)

  grid.print()
  for (const step of steps) {
    grid.moveRobot(step)
  }
  grid.print()

  const boxes = grid.getAllBoxes()

  let total = 0

  for (const box of boxes) {
    total += box.x + box.y * 100
  }

  return total
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 10092},
    {input: 'input.txt', expected: 1552463},
  ],
})

type Point = {x: number; y: number}
type GridPoint = Point & {value: string}

const UP = '^'
const DOWN = 'v'
const LEFT = '<'
const RIGHT = '>'
type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT

function setup(input: string) {
  const [gridInput, stepsInput] = input.split('\n\n')

  const steps = stepsInput.split('\n').join('').split('')
  const grid = gridInput
    .split('\n')
    .map((line, y) => line.split('').map((value, x) => ({x, y, value})))

  const getGridPoint = (p: Point) => {
    const point = grid[p.y]?.[p.x]
    if (!point) return null
    return point
  }
  const isWall = (p: Point) => getGridPoint(p)?.value === '#'
  const isEmpty = (p: Point) => getGridPoint(p)?.value === '.'
  const isRobot = (p: Point) => getGridPoint(p).value === '@'
  const isBox = (p: Point) => getGridPoint(p).value === 'O'

  const setValue = (p: Point, value: string) => {
    grid[p.y][p.x].value = value
  }

  const getTarget = (p: Point, direction: Direction) => {
    const directions = {
      '^': [0, -1],
      v: [0, 1],
      '<': [-1, 0],
      '>': [1, 0],
    }
    const [dx, dy] = directions[direction]
    return getGridPoint({x: p.x + dx, y: p.y + dy})
  }

  const move = (p: GridPoint, direction: Direction) => {
    const target = getTarget(p, direction)

    if (isWall(target)) {
      return {success: false} as const
    }

    if (isEmpty(target)) {
      setValue(target, p.value)
      setValue(p, '.')

      return {success: true, newPos: getGridPoint(target)} as const
    }

    if (isBox(target)) {
      const result = move(target, direction)
      if (result.success) {
        // try again
        return move(p, direction)
      } else {
        return {success: false} as const
      }
    }
  }

  const print = () => {
    console.log(grid.map(row => row.map(p => p.value).join('')).join('\n'))
  }

  const initialRobot = grid.flat().find(p => isRobot(p))
  let robotX = initialRobot.x
  let robotY = initialRobot.y

  const moveRobot = (direction: Direction) => {
    const result = move(getGridPoint({x: robotX, y: robotY}), direction)
    if (result.success) {
      robotX = result.newPos.x
      robotY = result.newPos.y
    }
    return result.success
  }

  const getAllBoxes = () => grid.flat().filter(isBox)

  return {
    grid: {
      moveRobot,
      print,
      getAllBoxes,
    },
    steps: steps as ('>' | '<' | '^' | 'v')[],
  }
}

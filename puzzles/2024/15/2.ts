import {run} from '~/run'

function solve(input: string) {
  const {grid, directions, initialRobot} = parseInput(input)

  let robot = initialRobot

  for (let dir of directions) {
    robot = move(grid, robot, dir)
  }

  return countBoxesCoordinates(grid)
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 9021},
    {input: 'input.txt', expected: 1552463},
  ],
})

type Point = {x: number; y: number}
type Grid = string[][]
type Dir = 'up' | 'down' | 'left' | 'right'
const DIRECTIONS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}
const ROBOT = '@'
const WALL = '#'
const EMPTY = '.'
const BOX = 'O'
const BOX_LEFT = '['
const BOX_RIGHT = ']'

function countBoxesCoordinates(grid: Grid) {
  let total = 0

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      // ❗️ The coordinate is only counted for the left part of the box!
      if (cell === BOX_LEFT) {
        total += 100 * y + x
      }
    })
  })

  return total
}

function move(grid: Grid, robot: Point, dir: Dir) {
  let hasMoved = false
  if (dir === 'left' || dir === 'right')
    hasMoved = moveHorizontal(grid, robot, dir)
  if (dir === 'up' || dir === 'down') hasMoved = moveVertical(grid, robot, dir)

  return hasMoved ? getTargetPoint(robot, dir) : robot
}

function moveVertical(grid: Grid, point: Point, dir: Dir) {
  const visited = new Set<string>()

  const queue = [point]

  while (queue.length) {
    const current = queue.shift()
    if (visited.has(key(current))) {
      continue
    } else {
      visited.add(key(current))
    }

    const target = getTargetPoint(current, dir)
    const targetValue = grid[target.y]?.[target.x]
    if (targetValue === WALL) {
      // If anything can't be moved, terminate immediately
      return false
    }

    if (targetValue === BOX_RIGHT) {
      queue.push(target)
      queue.push({...target, x: target.x - 1})
    }
    if (targetValue === BOX_LEFT) {
      queue.push(target)
      queue.push({...target, x: target.x + 1})
    }
  }

  // If we reached here, it was not terminated, so we can apply the moves
  const points = [...visited].map(fromKey).toSorted(
    // If moving, sort we the topmost points first
    dir === 'up' ? (a, b) => a.y - b.y : (a, b) => b.y - a.y,
  )

  points.forEach(point => {
    const target = getTargetPoint(point, dir)
    grid[target.y][target.x] = grid[point.y][point.x]
    grid[point.y][point.x] = EMPTY
  })

  return true
}

function moveHorizontal(grid: Grid, point: Point, dir: Dir) {
  const target = getTargetPoint(point, dir)
  const targetValue = grid[target.y]?.[target.x]
  const newValue = grid[point.y][point.x]

  if (targetValue === EMPTY) {
    grid[target.y][target.x] = newValue
    grid[point.y][point.x] = EMPTY
    return true
  }
  if (targetValue === WALL) {
    return false
  }
  if (targetValue === BOX_LEFT || targetValue === BOX_RIGHT) {
    // Try moving box, then retry
    if (moveHorizontal(grid, {x: target.x, y: target.y}, dir)) {
      return moveHorizontal(grid, point, dir)
    }
    return false
  }
  throw new Error(`Impossible ${targetValue}`)
}

function key(point: Point) {
  return `${point.x},${point.y}`
}

function fromKey(key: string) {
  const [x, y] = key.split(',').map(Number)
  return {x, y}
}

function getTargetPoint(point: Point, dir: Dir) {
  const [dx, dy] = DIRECTIONS[dir]
  return {x: point.x + dx, y: point.y + dy}
}

function parseInput(input: string) {
  const [gridInput, directionsInput] = input.split('\n\n')
  const initialGrid = gridInput.split('\n')

  const expandedGrid: Grid = initialGrid.map(row =>
    Array.from({length: row.length * 2}),
  )

  const robot = {x: 0, y: 0}

  initialGrid.forEach((row, y) => {
    row.split('').forEach((char, x) => {
      x *= 2
      let left = ''
      let right = ''
      if (char === ROBOT) {
        robot.x = x
        robot.y = y
        left = ROBOT
        right = EMPTY
      }
      if (char === WALL) {
        left = WALL
        right = WALL
      }
      if (char === EMPTY) {
        left = EMPTY
        right = EMPTY
      }
      if (char === BOX) {
        left = BOX_LEFT
        right = BOX_RIGHT
      }
      expandedGrid[y][x] = left
      expandedGrid[y][x + 1] = right
    })
  })

  return {
    grid: expandedGrid,
    initialRobot: robot,
    directions: directionsInput.split('').map(
      d =>
        ({
          '^': 'up',
          v: 'down',
          '<': 'left',
          '>': 'right',
        })[d] as Dir,
    ),
  }
}

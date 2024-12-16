import {run} from '~/run'
import {abs} from '~/utils/index'
import {PriorityQueue} from '~/utils/priority-queue'

type Position = {x: number; y: number}
type Point = {
  id: string
  value: number
  fScore: number
  gScore: number
  neighbours: Point[]
  cameFrom?: Point
} & Position

const getValue = (lowercaseLetter: string) => lowercaseLetter.charCodeAt(0) - 97
const manhattanDistance = (current: Point, goal: Point) =>
  abs(current.x - goal.x) + abs(current.y - goal.y)
const canMove = (current: Point, target: Point) =>
  target.value - current.value <= 1

const tracePath = (point: Point) => {
  if (!point) {
    return []
  }
  return [point.id, ...tracePath(point.cameFrom)]
}

function solve(input: string) {
  let END: Point

  // Init grid
  const GRID = input.split('\n').map((row, y) => {
    return row.split('').map((letter, x) => {
      const point: Point = {
        id: `${x},${y}`,
        x,
        y,
        value: getValue(letter),
        fScore: Infinity,
        gScore: Infinity,
        neighbours: [],
      }
      if (letter === 'E') {
        point.value = getValue('z')
        END = point
      }
      return point
    })
  })

  // Grid constants
  const WIDTH = GRID[0].length
  const HEIGHT = GRID.length
  const EDGE_WEIGHT = 1
  const DIRECTIONS = [
    {x: 0, y: -1},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 1, y: 0},
  ]

  // Grid based utils
  const heuristic = (point: Point) => manhattanDistance(point, END)
  const getPoint = (p: Position) => GRID[p.y]?.[p.x]
  const isWithinGrid = (p: Position) =>
    p?.x >= 0 && p?.x < WIDTH && p?.y >= 0 && p?.y < HEIGHT
  const isEnd = (p: Point) => p.x === END.x && p.y === END.y
  const resetGrid = () => {
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const point = getPoint({x, y})
        point.fScore = Infinity
        point.gScore = Infinity
        point.cameFrom = undefined
      }
    }
  }

  // Add neighbours for each point
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const point = getPoint({x, y})
      for (let direction of DIRECTIONS) {
        const neighbour = getPoint({x: x + direction.x, y: y + direction.y})
        if (isWithinGrid(neighbour) && canMove(point, neighbour)) {
          point.neighbours.push(neighbour)
        }
      }
    }
  }

  const aStarSearch = (startPosition: Position) => {
    const START = getPoint(startPosition)
    START.fScore = heuristic(START)
    START.gScore = 0

    const openList = new PriorityQueue([START], (a, b) => a.fScore < b.fScore)

    openList.enqueue(START)

    while (!openList.isEmpty()) {
      const current = openList.dequeue()
      if (isEnd(current)) {
        return current
      }
      for (let neighbour of current.neighbours) {
        let tentativeGScore = current.gScore + EDGE_WEIGHT
        if (tentativeGScore < neighbour.gScore) {
          neighbour.cameFrom = current
          neighbour.gScore = tentativeGScore
          neighbour.fScore = tentativeGScore + heuristic(neighbour)
          if (!openList.has(neighbour)) {
            openList.enqueue(neighbour)
          }
        }
      }
    }
  }

  const getStepsFromPosition = (position: Position) => {
    const winner = aStarSearch(position)
    const path = tracePath(winner)

    // Grid is mutable, so after finding each path, reset values of each point
    resetGrid()

    // Don't count START point
    return path.length - 1
  }

  const possibleLowestPoints = GRID.flat().filter(
    p =>
      p.value === 0 &&
      // I only now this condition because I noticed that there is a "wall" of "b" letters,
      // so the starting point will have to be one of the points next to it.
      p.neighbours.some(n => n.value === 1),
  )

  let bestSteps = Infinity
  for (let point of possibleLowestPoints) {
    const steps = getStepsFromPosition(point)
    if (steps < bestSteps) {
      bestSteps = steps
    }
  }

  return bestSteps
}

run({
  solve,
  tests: [{expected: 454, input: 'input.txt'}],
})

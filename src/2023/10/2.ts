import {run} from '~/run'
import {logger} from '~/utils/logger'

type SimplePoint = {x: number; y: number}
type SimpleGrid = string[][]
type Grid = ReturnType<typeof enhanceGrid>['grid']
type Point = Grid[number][number]

function solve(input: string) {
  const smallGrid = input.split('\n').map(line => line.split(''))

  const {grid, start} = enhanceGrid(enlargeGrid(smallGrid))
  const topLeft = grid[0][0]

  floodFill({
    start,
    grid,
    shouldStop: point => point.value === '.',
    mutatePoint: point => (point.isMainLoop = true),
  })

  floodFill({
    start: topLeft,
    grid,
    shouldStop: point => point.isMainLoop,
    mutatePoint: point => (point.isOutsideLoop = true),
  })

  printGrid(grid, tile => {
    if (tile.isMainLoop) return 'X'
    if (tile.isOutsideLoop) return ' '
    return tile.value
  })

  const middle = getMiddlePoints(grid)

  const count = middle.filter(p => !p.isOutsideLoop && !p.isMainLoop).length

  return count
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 1,
    },
    {
      input: 'test3.txt',
      expected: 4,
    },
    {
      input: 'test4.txt',
      expected: 8,
    },
    {
      input: 'test5.txt',
      expected: 10,
    },
    {
      input: 'input.txt',
      expected: 285,
    },
  ],
})

const floodFill = ({
  start,
  grid,
  shouldStop,
  mutatePoint,
}: {
  start: SimplePoint
  grid: Grid
  shouldStop: (point: Point) => boolean
  mutatePoint: (point: Point) => void
}) => {
  const visitedKeys = [] as string[]
  const queue = [start]

  while (queue.length) {
    const {x, y} = queue.shift()!
    if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length) {
      continue
    }
    const point = grid[y][x]

    const isVisited = visitedKeys.includes(point.key)
    if (isVisited || shouldStop(point)) {
      continue
    }

    mutatePoint(point)

    visitedKeys.push(point.key)

    queue.push({x: x + 1, y})
    queue.push({x: x - 1, y})
    queue.push({x, y: y + 1})
    queue.push({x, y: y - 1})
  }
}

const getMiddlePoints = (grid: Grid) => {
  const middlePoints = [] as Point[]

  for (let y = 1; y < grid.length; y += 3) {
    for (let x = 1; x < grid[0].length; x += 3) {
      const tile = grid[y][x]

      middlePoints.push(tile)
    }
  }

  return middlePoints
}

const enhanceGrid = (grid: SimpleGrid) => {
  const enhanced = grid.map((row, y) => {
    return row.map((col, x) => {
      return {
        key: toKey({x, y}),
        x,
        y,
        value: col,
        isStart: col === 'S',
        isVisited: false,
        isMainLoop: false,
        isOutsideLoop: false,
      }
    })
  })

  fillStart(enhanced)

  const start = enhanced.flat().find(tile => tile.isStart)
  if (!start) throw new Error('Could not find start')

  return {grid: enhanced, start}
}

const fillStart = (grid: Grid) => {
  const start = grid.flat().find(tile => tile.isStart)
  if (!start) throw new Error('Could not find start')

  const outerTop = grid[start.y - 2]?.[start.x]
  const outerBottom = grid[start.y + 2]?.[start.x]
  const outerLeft = grid[start.y]?.[start.x - 2]
  const outerRight = grid[start.y]?.[start.x + 2]

  if (outerTop?.value === '|') grid[start.y - 1][start.x].value = '|'
  if (outerBottom?.value === '|') grid[start.y + 1][start.x].value = '|'
  if (outerLeft?.value === '-') grid[start.y][start.x - 1].value = '-'
  if (outerRight?.value === '-') grid[start.y][start.x + 1].value = '-'
  grid[start.y][start.x].value = '+'
}

// prettier-ignore
const gridTransformation = {
  'L': [['.', '|', '.'], ['.', '+', '-'], ['.', '.', '.']],
  '|': [['.', '|', '.'], ['.', '|', '.'], ['.', '|', '.']],
  '-': [['.', '.', '.'], ['-', '-', '-'], ['.', '.', '.']],
  'J': [['.', '|', '.'], ['-', '+', '.'], ['.', '.', '.']],
  '7': [['.', '.', '.'], ['-', '+', '.'], ['.', '|', '.']],
  'F': [['.', '.', '.'], ['.', '+', '-'], ['.', '|', '.']],
  '.': [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']],
  'S': [['.', '.', '.'], ['.', 'S', '.'], ['.', '.', '.']],
} as Record<string, string[][]>;

const enlargeGrid = (originalGrid: string[][]): string[][] => {
  const enlargedGrid: string[][] = []

  for (let row = 0; row < originalGrid.length; row++) {
    const newRow1: string[] = []
    const newRow2: string[] = []
    const newRow3: string[] = []

    for (let col = 0; col < originalGrid[row].length; col++) {
      const cell = originalGrid[row][col]
      const transformedBlock =
        gridTransformation[cell] || gridTransformation['.'] // Default to '.' if unknown character

      newRow1.push(...transformedBlock[0])
      newRow2.push(...transformedBlock[1])
      newRow3.push(...transformedBlock[2])
    }

    enlargedGrid.push(newRow1, newRow2, newRow3)
  }

  return enlargedGrid
}

const toKey = (point: SimplePoint) => `${point.x},${point.y}`

const printGrid = <T>(grid: T[][], transform: (cell: T) => string) => {
  const lines = grid.map(row => row.map(transform).join('')).join('\n')
  logger.log(lines)
}

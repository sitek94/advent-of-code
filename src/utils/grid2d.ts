export type Coords = {
  x: number
  y: number
}

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'
export type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT

export const DIRECTIONS: Direction[] = [UP, DOWN, LEFT, RIGHT]

export type Point<T> = {
  value: T
} & Coords

/**
 * Creates a 2D grid from given array of arrays and exposes some useful methods.
 *
 * Top left corner is (0, 0). X-axis goes right, Y-axis goes down.
 */
export class Grid2d<T = any> {
  readonly grid: T[][]
  readonly width: number
  readonly height: number
  readonly lastX: number
  readonly lastY: number

  constructor(grid: T[][]) {
    const width = grid[0].length
    const height = grid.length

    this.grid = grid
    this.width = width
    this.height = height
    this.lastX = width - 1
    this.lastY = height - 1
  }

  forEachPoint(callbackFn: (point: Point<T>) => void) {
    this.forEachRow((row, y) => {
      row.forEach((value, x) => {
        callbackFn({ x, y, value })
      })
    })
  }

  forEachRow(callbackFn: (row: T[], index: number) => void) {
    this.grid.forEach((row, index) => {
      callbackFn(row, index)
    })
  }

  forEachColumn(callbackFn: (column: T[], index: number) => void) {
    for (let x = 0; x < this.width; x++) {
      let column: T[] = []
      for (let y = 0; y < this.height; y++) {
        column.push(this.grid[y][x])
      }
      callbackFn(column, x)
    }
  }

  forEachPointInDirection(
    direction: Direction,
    start: Coords,
    callbackFn: (point: Point<T>) => void,
    { includeStart = true } = {},
  ) {
    let coords = includeStart
      ? start
      : this.getCoordsInDirection(start, direction)

    while (this.isWithinGrid(coords)) {
      callbackFn({ ...coords, value: this.getValue(coords) })
      coords = this.getCoordsInDirection(coords, direction)
    }
  }

  forEachDirection(
    from: Coords,
    callbackFn: (point: Point<T>) => void,
    distance = 1,
  ) {
    DIRECTIONS.forEach(direction => {
      const coords = this.getCoordsInDirection(from, direction, distance)
      if (this.isWithinGrid(coords)) {
        callbackFn({ ...coords, value: this.getValue(coords) })
      }
    })
  }

  getCoordsInDirection(from: Coords, direction: Direction, distance = 1) {
    switch (direction) {
      case UP:
        return { x: from.x, y: from.y - distance }
      case DOWN:
        return { x: from.x, y: from.y + distance }
      case LEFT:
        return { x: from.x - distance, y: from.y }
      case RIGHT:
        return { x: from.x + distance, y: from.y }
    }
  }

  isPointEdge({ x, y }: Coords) {
    return x === 0 || x === this.lastX || y === 0 || y === this.lastY
  }

  isWithinGrid({ x, y }: Coords) {
    return this.grid[y]?.[x] !== undefined
  }

  getValue({ x, y }: Coords) {
    return this.grid[y][x]
  }

  print() {
    console.log(this.grid)
  }
}

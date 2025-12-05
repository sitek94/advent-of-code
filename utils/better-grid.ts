export type Coords = {x: number; y: number}

export type Direction = 'up' | 'down' | 'left' | 'right'
export type DiagonalDirection =
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
export type AllDirection = Direction | DiagonalDirection

export const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right']
export const DIAGONAL_DIRECTIONS: DiagonalDirection[] = [
  'up-left',
  'up-right',
  'down-left',
  'down-right',
]
export const ALL_DIRECTIONS: AllDirection[] = [
  ...DIRECTIONS,
  ...DIAGONAL_DIRECTIONS,
]

const DIRECTION_DELTAS: Record<AllDirection, Coords> = {
  up: {x: 0, y: -1},
  down: {x: 0, y: 1},
  left: {x: -1, y: 0},
  right: {x: 1, y: 0},
  'up-left': {x: -1, y: -1},
  'up-right': {x: 1, y: -1},
  'down-left': {x: -1, y: 1},
  'down-right': {x: 1, y: 1},
}

/**
 * A point in a 2D grid. Holds reference to parent grid for navigation.
 */
export class Point<T = string> {
  constructor(
    public readonly x: number,
    public readonly y: number,
    private readonly grid: Grid<T>,
  ) {}

  /** Current value at this point */
  get value(): T {
    return this.grid.get(this.x, this.y)
  }

  /** Set value at this point */
  set value(v: T) {
    this.grid.set(this.x, this.y, v)
  }

  // ─────────────────────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────────────────────

  /** Get point in direction, or null if out of bounds */
  move(direction: AllDirection, distance = 1): Point<T> | null {
    const delta = DIRECTION_DELTAS[direction]
    return this.grid.at(
      this.x + delta.x * distance,
      this.y + delta.y * distance,
    )
  }

  up(distance = 1): Point<T> | null {
    return this.move('up', distance)
  }
  down(distance = 1): Point<T> | null {
    return this.move('down', distance)
  }
  left(distance = 1): Point<T> | null {
    return this.move('left', distance)
  }
  right(distance = 1): Point<T> | null {
    return this.move('right', distance)
  }
  upLeft(distance = 1): Point<T> | null {
    return this.move('up-left', distance)
  }
  upRight(distance = 1): Point<T> | null {
    return this.move('up-right', distance)
  }
  downLeft(distance = 1): Point<T> | null {
    return this.move('down-left', distance)
  }
  downRight(distance = 1): Point<T> | null {
    return this.move('down-right', distance)
  }

  // ─────────────────────────────────────────────────────────────
  // Neighbors
  // ─────────────────────────────────────────────────────────────

  /** Get 4-directional neighbors (up, down, left, right) */
  neighbors(): Point<T>[] {
    return DIRECTIONS.map(dir => this.move(dir)).filter(
      (p): p is Point<T> => p !== null,
    )
  }

  /** Get 8-directional neighbors (includes diagonals) */
  surrounding(): Point<T>[] {
    return ALL_DIRECTIONS.map(dir => this.move(dir)).filter(
      (p): p is Point<T> => p !== null,
    )
  }

  /** Iterate over 4-directional neighbors */
  forEachNeighbor(
    callback: (point: Point<T>, direction: Direction) => void,
  ): void {
    for (const dir of DIRECTIONS) {
      const point = this.move(dir)
      if (point) callback(point, dir)
    }
  }

  /** Iterate over 8-directional neighbors */
  forEachSurrounding(
    callback: (point: Point<T>, direction: AllDirection) => void,
  ): void {
    for (const dir of ALL_DIRECTIONS) {
      const point = this.move(dir)
      if (point) callback(point, dir)
    }
  }

  /** Walk in a direction until edge, calling callback for each point */
  walk(
    direction: AllDirection,
    callback: (point: Point<T>) => void | false,
    {includeStart = false} = {},
  ): void {
    let current: Point<T> | null = includeStart ? this : this.move(direction)
    while (current) {
      if (callback(current) === false) break
      current = current.move(direction)
    }
  }

  /** Collect all points in a direction */
  line(direction: AllDirection, {includeStart = false} = {}): Point<T>[] {
    const points: Point<T>[] = []
    this.walk(
      direction,
      p => {
        points.push(p)
      },
      {includeStart},
    )
    return points
  }

  // ─────────────────────────────────────────────────────────────
  // Utility
  // ─────────────────────────────────────────────────────────────

  /** Is this point on the edge of the grid? */
  isEdge(): boolean {
    return (
      this.x === 0 ||
      this.y === 0 ||
      this.x === this.grid.width - 1 ||
      this.y === this.grid.height - 1
    )
  }

  /** Is this point in a corner? */
  isCorner(): boolean {
    return (
      (this.x === 0 || this.x === this.grid.width - 1) &&
      (this.y === 0 || this.y === this.grid.height - 1)
    )
  }

  /** Manhattan distance to another point */
  distanceTo(other: Coords): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y)
  }

  /** Check if same position as another point/coords */
  equals(other: Coords): boolean {
    return this.x === other.x && this.y === other.y
  }

  /** Get coords as simple object (useful for Set keys, etc) */
  toCoords(): Coords {
    return {x: this.x, y: this.y}
  }

  /** String key for use in Maps/Sets */
  key(): string {
    return `${this.x},${this.y}`
  }

  toString(): string {
    return `Point(${this.x}, ${this.y}) = ${this.value}`
  }
}

/**
 * 2D Grid with Point-based navigation.
 * Top-left is (0,0). X increases right, Y increases down.
 */
export class Grid<T = string> {
  private data: T[][]

  readonly width: number
  readonly height: number

  constructor(data: T[][]) {
    this.data = data
    this.height = data.length
    this.width = data[0]?.length ?? 0
  }

  // ─────────────────────────────────────────────────────────────
  // Factory Methods
  // ─────────────────────────────────────────────────────────────

  /** Create grid from multiline string (splits by newline, then each char) */
  static fromString(input: string): Grid<string> {
    const lines = input.trim().split('\n')
    return new Grid(lines.map(line => [...line]))
  }

  /** Create grid from array of strings (each string becomes a row of chars) */
  static fromLines(lines: string[]): Grid<string> {
    return new Grid(lines.map(line => [...line]))
  }

  /** Create grid from multiline string, parsing each cell */
  static fromStringWith<T>(
    input: string,
    parser: (char: string, x: number, y: number) => T,
  ): Grid<T> {
    const lines = input.trim().split('\n')
    return new Grid(
      lines.map((line, y) => [...line].map((char, x) => parser(char, x, y))),
    )
  }

  /** Create grid of given dimensions filled with value */
  static create<T>(
    width: number,
    height: number,
    fill: T | ((x: number, y: number) => T),
  ): Grid<T> {
    const data: T[][] = []
    for (let y = 0; y < height; y++) {
      const row: T[] = []
      for (let x = 0; x < width; x++) {
        row.push(typeof fill === 'function' ? (fill as Function)(x, y) : fill)
      }
      data.push(row)
    }
    return new Grid(data)
  }

  // ─────────────────────────────────────────────────────────────
  // Access
  // ─────────────────────────────────────────────────────────────

  /** Get Point at coords, or null if out of bounds */
  at(x: number, y: number): Point<T> | null {
    if (!this.inBounds(x, y)) return null
    return new Point(x, y, this)
  }

  /** Get raw value at coords (throws if out of bounds) */
  get(x: number, y: number): T {
    return this.data[y][x]
  }

  /** Set value at coords */
  set(x: number, y: number, value: T): void {
    this.data[y][x] = value
  }

  /** Check if coords are within grid bounds */
  inBounds(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.width && y < this.height
  }

  /** Get row at index */
  row(y: number): T[] {
    return this.data[y]
  }

  /** Get column at index */
  column(x: number): T[] {
    return this.data.map(row => row[x])
  }

  /** Get all rows */
  rows(): T[][] {
    return this.data
  }

  /** Get all columns */
  columns(): T[][] {
    const cols: T[][] = []
    for (let x = 0; x < this.width; x++) {
      cols.push(this.column(x))
    }
    return cols
  }

  // ─────────────────────────────────────────────────────────────
  // Iteration
  // ─────────────────────────────────────────────────────────────

  /** Iterate over all points (row by row, left to right) */
  forEach(callback: (point: Point<T>) => void): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(new Point(x, y, this))
      }
    }
  }

  /** Find first point matching predicate */
  find(predicate: (point: Point<T>) => boolean): Point<T> | null {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const point = new Point(x, y, this)
        if (predicate(point)) return point
      }
    }
    return null
  }

  /** Find all points matching predicate */
  filter(predicate: (point: Point<T>) => boolean): Point<T>[] {
    const results: Point<T>[] = []
    this.forEach(point => {
      if (predicate(point)) results.push(point)
    })
    return results
  }

  /** Check if any point matches predicate */
  some(predicate: (point: Point<T>) => boolean): boolean {
    return this.find(predicate) !== null
  }

  /** Check if all points match predicate */
  every(predicate: (point: Point<T>) => boolean): boolean {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!predicate(new Point(x, y, this))) return false
      }
    }
    return true
  }

  /** Create new grid by mapping each point */
  map<U>(callback: (point: Point<T>) => U): Grid<U> {
    const newData: U[][] = []
    for (let y = 0; y < this.height; y++) {
      const row: U[] = []
      for (let x = 0; x < this.width; x++) {
        row.push(callback(new Point(x, y, this)))
      }
      newData.push(row)
    }
    return new Grid(newData)
  }

  /** Reduce grid to single value */
  reduce<U>(callback: (acc: U, point: Point<T>) => U, initial: U): U {
    let acc = initial
    this.forEach(point => {
      acc = callback(acc, point)
    })
    return acc
  }

  /** Iterate over rows */
  forEachRow(callback: (row: T[], y: number) => void): void {
    this.data.forEach((row, y) => callback(row, y))
  }

  /** Iterate over columns */
  forEachColumn(callback: (column: T[], x: number) => void): void {
    for (let x = 0; x < this.width; x++) {
      callback(this.column(x), x)
    }
  }

  /** Count points matching predicate */
  count(predicate: (point: Point<T>) => boolean): number {
    return this.filter(predicate).length
  }

  // ─────────────────────────────────────────────────────────────
  // Transformation
  // ─────────────────────────────────────────────────────────────

  /** Create a deep copy of this grid */
  clone(): Grid<T> {
    return new Grid(this.data.map(row => [...row]))
  }

  /** Rotate grid 90 degrees clockwise */
  rotateClockwise(): Grid<T> {
    const newData: T[][] = []
    for (let x = 0; x < this.width; x++) {
      const row: T[] = []
      for (let y = this.height - 1; y >= 0; y--) {
        row.push(this.data[y][x])
      }
      newData.push(row)
    }
    return new Grid(newData)
  }

  /** Rotate grid 90 degrees counter-clockwise */
  rotateCounterClockwise(): Grid<T> {
    const newData: T[][] = []
    for (let x = this.width - 1; x >= 0; x--) {
      const row: T[] = []
      for (let y = 0; y < this.height; y++) {
        row.push(this.data[y][x])
      }
      newData.push(row)
    }
    return new Grid(newData)
  }

  /** Flip grid horizontally */
  flipHorizontal(): Grid<T> {
    return new Grid(this.data.map(row => [...row].reverse()))
  }

  /** Flip grid vertically */
  flipVertical(): Grid<T> {
    return new Grid([...this.data].reverse().map(row => [...row]))
  }

  // ─────────────────────────────────────────────────────────────
  // Utility
  // ─────────────────────────────────────────────────────────────

  /** Get raw 2D array */
  toArray(): T[][] {
    return this.data.map(row => [...row])
  }

  /** Print grid to console */
  print(formatter?: (value: T) => string): void {
    const format = formatter ?? String
    console.log(this.data.map(row => row.map(format).join('')).join('\n'))
  }

  /** Convert to string representation */
  toString(formatter?: (value: T) => string): string {
    const format = formatter ?? String
    return this.data.map(row => row.map(format).join('')).join('\n')
  }
}

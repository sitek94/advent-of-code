import {run} from '~/run'

const DIRECTIONS = ['up', 'down', 'left', 'right'] as const

function solve(input: string) {
  const G = new Helpers(input)

  let cache: any = {}

  let startIndexOfOrganized = -1
  let previousCacheCount = -1
  let score = -1

  const serialize = (grid: string[][]) =>
    grid.map(row => row.join('')).join('\n')

  for (let i = 0; score === -1; i++) {
    G.tilt('up')
    G.tilt('left')
    G.tilt('down')
    G.tilt('right')

    const key = serialize(G.grid)
    const cacheValue = cache[key] || 0

    cache[key] = cacheValue + 1

    // It got organized
    if (cacheValue > 1) {
      startIndexOfOrganized = i
    }

    // Count possibilities after organized
    if (startIndexOfOrganized !== -1) {
      const cacheValues = Object.values(cache)
      const currentCacheCount = cacheValues.length

      if (currentCacheCount === previousCacheCount) {
        const insignificantCacheValues = cacheValues.filter(v => v === 1)

        const possibilities =
          currentCacheCount - insignificantCacheValues.length

        let cacheIndexToCheck =
          insignificantCacheValues.length +
          ((1_000_000_000 - startIndexOfOrganized) % possibilities)

        const cacheKeys = Object.keys(cache)

        const newGrid = new Helpers(cacheKeys[cacheIndexToCheck])

        score = newGrid.getScore()

        break
      }

      previousCacheCount = Object.values(cache).length
    }
  }

  return score
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 64,
    },
    {
      input: 'input.txt',
      expected: 106390,
    },
  ],
})

type Point = {x: number; y: number}
type Direction = (typeof DIRECTIONS)[number]

class Helpers {
  private ROUND_ROCK = 'O'
  private EMPTY_SPACE = '.'

  public grid: string[][]

  private width: number
  private height: number

  constructor(input: string) {
    const rows = input.split('\n')
    const grid = rows.map(row => row.split(''))

    this.grid = grid
    this.width = grid[0].length
    this.height = grid.length
  }

  getScore() {
    let score = 0

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        score += this.isMoveable({x, y}) ? this.height - y : 0
      }
    }

    return score
  }

  tilt(direction: Direction) {
    switch (direction) {
      case 'up':
        this.tiltUp()
        break
      case 'down':
        this.tiltDown()
        break
      case 'left':
        this.tiltLeft()
        break
      case 'right':
        this.tiltRight()
        break
    }
  }

  tiltUp() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let point = {x, y}

        while (this.isMoveable(point) && this.canMoveTo(point, 'up')) {
          point = this.move(point, 'up')
        }
      }
    }
  }

  tiltDown() {
    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 1; y >= 0; y--) {
        let point = {x, y}

        while (this.isMoveable(point) && this.canMoveTo(point, 'down')) {
          point = this.move(point, 'down')
        }
      }
    }
  }

  tiltLeft() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let point = {x, y}

        while (this.isMoveable(point) && this.canMoveTo(point, 'left')) {
          point = this.move(point, 'left')
        }
      }
    }
  }

  tiltRight() {
    for (let y = 0; y < this.height; y++) {
      for (let x = this.width - 1; x >= 0; x--) {
        let point = {x, y}

        while (this.isMoveable(point) && this.canMoveTo(point, 'right')) {
          point = this.move(point, 'right')
        }
      }
    }
  }

  getNeighbor(p: Point, direction: Direction) {
    switch (direction) {
      case 'up':
        return {x: p.x, y: p.y - 1}
      case 'down':
        return {x: p.x, y: p.y + 1}
      case 'left':
        return {x: p.x - 1, y: p.y}
      case 'right':
        return {x: p.x + 1, y: p.y}
    }
  }

  canMoveTo(target: Point, direction: Direction) {
    const neighbor = this.getNeighbor(target, direction)

    return this.grid[neighbor.y]?.[neighbor.x] === this.EMPTY_SPACE
  }

  isMoveable(p: Point) {
    return this.grid[p.y][p.x] === this.ROUND_ROCK
  }

  move(p: Point, direction: 'up' | 'down' | 'left' | 'right') {
    const neighbor = this.getNeighbor(p, direction)

    this.grid[neighbor.y][neighbor.x] = this.ROUND_ROCK
    this.grid[p.y][p.x] = this.EMPTY_SPACE

    return neighbor
  }

  print() {
    console.log(this.grid.map(row => row.join('')).join('\n'))
    console.log()
  }
}

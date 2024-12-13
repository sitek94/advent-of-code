import {run} from '~/run'

type Point = {x: number; y: number; key: string; char: string}
type Grid = Point[][]

function solve(input: string) {
  const grid = parseGrid(input)
  const regions = findRegions(grid)

  const totalPrice = regions.reduce((sum, region) => {
    const area = computeRegionArea(region)
    const perimeter = computeRegionPerimeter(region, grid)
    return sum + area * perimeter
  }, 0)

  return totalPrice
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 1930,
    },
    {
      input: 'input.txt',
      expected: 1477762,
    },
  ],
})

function parseGrid(input: string) {
  return input
    .trim()
    .split('\n')
    .map((l, y) =>
      l.split('').map((char, x) => ({x, y, char, key: `${x},${y}`})),
    )
}

function floodFillRegion(start: Point, grid: Grid, visitedGlobal: Set<string>) {
  const visitedLocal = new Set<string>()
  const queue: Point[] = [start]
  const regionChar = start.char
  const region: Point[] = []

  while (queue.length) {
    const p = queue.shift()!
    if (visitedLocal.has(p.key) || visitedGlobal.has(p.key)) continue
    if (p.char !== regionChar) continue

    visitedLocal.add(p.key)
    visitedGlobal.add(p.key)
    region.push(p)

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = p.x + dx
      const ny = p.y + dy
      if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length)
        continue
      const neighbor = grid[ny][nx]
      if (!visitedLocal.has(neighbor.key) && neighbor.char === regionChar) {
        queue.push(neighbor)
      }
    }
  }

  return region
}

function findRegions(grid: Grid) {
  const visitedGlobal = new Set<string>()
  const regions: Point[][] = []

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const start = grid[y][x]
      if (visitedGlobal.has(start.key)) continue
      const region = floodFillRegion(start, grid, visitedGlobal)
      if (region.length > 0) regions.push(region)
    }
  }

  return regions
}

function computeRegionArea(region: Point[]) {
  return region.length
}

function computeRegionPerimeter(region: Point[], grid: Grid) {
  const pointSet = new Set(region.map(p => p.key))
  let perimeter = 0

  for (const p of region) {
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = p.x + dx
      const ny = p.y + dy
      if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) {
        perimeter++
      } else if (!pointSet.has(`${nx},${ny}`)) {
        perimeter++
      }
    }
  }

  return perimeter
}

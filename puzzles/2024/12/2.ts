import {run} from '~/run'

type Point = {x: number; y: number; key: string; char: string}
type Grid = Point[][]
const DIRS = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
]

function solve(input: string) {
  const grid = parseGrid(input)
  const regions = findRegions(grid)

  let totalPrice = 0
  for (const region of regions) {
    const area = computeArea(region)
    const {perimDirsMap} = computePerimeter(region, grid)
    const sides = computeSides(perimDirsMap)
    totalPrice += area * sides
  }

  return totalPrice
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 1206,
    },
    {
      input: 'input.txt',
      expected: 923480,
    },
  ],
})

function parseGrid(input: string): Grid {
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

    for (const [dx, dy] of DIRS) {
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

function computeArea(region: Point[]) {
  return region.length
}

function computePerimeter(region: Point[], grid: Grid) {
  const R = grid.length
  const C = grid[0].length
  const perimDirsMap = new Map<string, Set<string>>()
  let perimeter = 0

  for (const p of region) {
    const {x, y} = p
    for (const [dr, dc] of DIRS) {
      const nx = x + dc
      const ny = y + dr
      if (
        ny < 0 ||
        ny >= R ||
        nx < 0 ||
        nx >= C ||
        grid[ny][nx].char !== p.char
      ) {
        perimeter++
        const dirKey = `${dr},${dc}`
        if (!perimDirsMap.has(dirKey)) perimDirsMap.set(dirKey, new Set())
        perimDirsMap.get(dirKey)!.add(`${x},${y}`)
      }
    }
  }

  return {perimeter, perimDirsMap}
}

function computeSides(perimDirsMap: Map<string, Set<string>>) {
  let sides = 0
  for (const [, cells] of perimDirsMap) {
    const visited = new Set<string>()
    for (const cell of cells) {
      if (!visited.has(cell)) {
        sides++
        const q = [cell]
        while (q.length) {
          const cur = q.pop()!
          if (visited.has(cur)) continue
          visited.add(cur)
          const [cx, cy] = cur.split(',').map(Number)
          for (const [dr, dc] of DIRS) {
            const nx = cx + dc
            const ny = cy + dr
            const nk = `${nx},${ny}`
            if (cells.has(nk) && !visited.has(nk)) {
              q.push(nk)
            }
          }
        }
      }
    }
  }
  return sides
}

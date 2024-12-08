import groupBy from 'just-group-by'
import {run} from '~/run'

function solve(input: string) {
  const grid = input.split('\n').map(line => line.split(''))
  const width = grid[0].length
  const height = grid.length
  const allAntennas = [] as {x: number; y: number; char: string}[]

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = grid[y][x]
      if (char !== '.') {
        allAntennas.push({x, y, char})
      }
    }
  }

  const sameFrequencyAntennas = Object.values(groupBy(allAntennas, a => a.char))

  let edges = new Set<string>()

  for (let antennas of sameFrequencyAntennas) {
    for (let i = 0; i < antennas.length; i++) {
      let p1 = antennas[i]
      for (let j = i + 1; j < antennas.length; j++) {
        let p2 = antennas[j]
        edges.add(edgeKey(p1, p2))
      }
    }
  }

  console.log(allAntennas)
  console.log(sameFrequencyAntennas)

  console.log({width, height})
  console.log(edges)

  let uniqueAntinodes = new Set<string>()

  edges.forEach(edge => {
    const antinodes = getAntinodes(edge)
    for (let {x, y} of antinodes) {
      const isInGrid = x >= 0 && x < width && y >= 0 && y < height
      if (isInGrid) {
        grid[y][x] = '#'
        uniqueAntinodes.add(key(x, y))
      }
    }
  })

  printGrid(grid)

  return uniqueAntinodes.size
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 100,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})

function getAntinodes(edgeKey: string) {
  const [p1, p2] = fromEdgeKey(edgeKey)
  const disX = 2 * Math.abs(p1.x - p2.x)
  const disY = 2 * Math.abs(p1.y - p2.y)

  const isUpward = p1.y > p2.y

  if (isUpward) {
    const a = {x: p2.x - disX, y: p2.y + disY}
    const b = {x: p1.x + disX, y: p1.y - disY}
    return [a, b]
  } else {
    const a = {x: p2.x - disX, y: p2.y - disY}
    const b = {x: p1.x + disX, y: p1.y + disY}
    return [a, b]
  }
}

type Point = {x: number; y: number}

/**
 * No matter the direction
 */
function edgeKey(p1: Point, p2: Point) {
  return p1.x < p2.x
    ? `${p1.x},${p1.y},${p2.x},${p2.y}`
    : `${p2.x},${p2.y},${p1.x},${p1.y}`
}

function fromEdgeKey(key: string) {
  const [x1, y1, x2, y2] = key.split(',').map(Number)
  return [
    {x: x1, y: y1},
    {x: x2, y: y2},
  ]
}

function key(x: number, y: number, value?: string) {
  if (value) return `${x},${y},${value}`
  return `${x},${y}`
}

function printGrid(grid: string[][]) {
  console.log(grid.map(row => row.join('')).join('\n'))
}

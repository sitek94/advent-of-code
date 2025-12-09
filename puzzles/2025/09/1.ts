import {run} from '~/run'

type Point = {x: number; y: number}

function solve(input: string) {
  const points = input.split('\n').map(line => {
    const [x, y] = line.split(',').map(Number)
    return {x, y}
  })

  let maxArea = 0

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i]
      const p2 = points[j]
      maxArea = Math.max(maxArea, calcArea(p1, p2))
    }
  }

  return maxArea
}

// Calc area including the border
function calcArea(p1: Point, p2: Point) {
  const width = Math.abs(p2.x - p1.x) + 1
  const height = Math.abs(p2.y - p1.y) + 1
  return width * height
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 100},
    {input: 'input.txt', expected: 100},
  ],
})

import {run} from '~/run'
import {isInteger, range} from '~/utils/index'

function solve(input: string) {
  const machines = input.split('\n\n').map(parseChunk)

  let score = 0

  for (const [[ax, ay], [bx, by], [prizeX, prizeY]] of machines) {
    const [solutions] = findSolutions(ax, bx, ay, by, prizeX, prizeY)
    if (solutions?.length) {
      const [a, b] = solutions

      score += 3 * a + b
    }
  }

  return score
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 100},
    {input: 'input.txt', expected: 100},
  ],
})

function findSolutions(
  ax: number,
  bx: number,
  ay: number,
  by: number,
  prizeX: number,
  prizeY: number,
) {
  const solutions = [] as [number, number][]
  // a * ax + b * bx = prizeX
  // a * ay + b * by = prizeY
  // a,b > 0 && is integer
  range(100).forEach(i => {
    let a = i + 1
    let b = (prizeX - a * ax) / bx
    if (isInteger(b) && b > 0) {
      const isOk = a * ay + b * by === prizeY
      if (isOk) {
        solutions.push([a, b])
      }
    }
  })
  return solutions
}

function parseChunk(machine: string) {
  return machine.split('\n').map(l =>
    l
      .split(': ')[1]
      .split(', ')
      .map(l => l.split(/\+|=/)[1])
      .map(Number),
  )
}

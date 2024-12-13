import {run} from '~/run'
import {isInteger, range} from '~/utils/index'

function solve(input: string) {
  const machines = input.split('\n\n').map(parseChunk)

  let score = 0

  for (const [[ax, ay], [bx, by], [prizeX, prizeY]] of machines) {
    const [solutions] = findSolutions(
      ax,
      bx,
      ay,
      by,
      prizeX + 10000000000000,
      prizeY + 10000000000000,
    )
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
    {input: 'test.txt', expected: 875318608908},
    {input: 'input.txt', expected: 89013607072065},
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

  const D = ax * by - ay * bx
  if (D !== 0) {
    const a = (prizeX * by - prizeY * bx) / D
    const b = (prizeY * ax - prizeX * ay) / D
    if (isInteger(a) && isInteger(b) && a > 0 && b > 0) {
      solutions.push([a, b])
    }
  }

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

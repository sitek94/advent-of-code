import {run} from '~/run'
import {Grid} from '~/utils/better-grid'
import {multiply, sum} from '~/utils/index'

function solve(input: string) {
  const lines = input
    .split('\n')
    .map(line => line.split(/\s+/))
    .map(line => line.filter(Boolean))

  const grid = new Grid(lines)

  const results: number[] = []

  grid.forEachColumn(c => {
    const operands = c.slice(0, -1).map(Number)
    const operator = c.at(-1)
    const operationFn = operator === '+' ? sum : multiply

    results.push(operationFn(operands))
  })

  return sum(results)
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 4277556},
    {input: 'input.txt', expected: 4693159084994},
  ],
})

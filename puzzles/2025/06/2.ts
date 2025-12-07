import {run} from '~/run'
import {Grid} from '~/utils/better-grid'
import {multiply, sum} from '~/utils/index'

function solve(input: string) {
  const grid = Grid.fromString(input)

  const results: number[] = []

  let current = 0
  let operationFn = sum
  let isNewColumn = true

  grid.forEachColumn(c => {
    const isSeparatorColumn = c.every(n => n === ' ')
    const operand = Number(
      c
        .slice(0, -1)
        .filter(n => n !== ' ')
        .join(''),
    )

    if (isSeparatorColumn) {
      isNewColumn = true
      results.push(current)
    } else if (isNewColumn) {
      current = operand
      operationFn = c.at(-1) === '+' ? sum : multiply
      isNewColumn = false
    } else {
      current = operationFn([current, operand])
    }
  })

  // Cover the leftover result when for loop finishes
  results.push(current)

  return sum(results)
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 3263827},
    {input: 'input.txt', expected: 4693159084994},
  ],
})

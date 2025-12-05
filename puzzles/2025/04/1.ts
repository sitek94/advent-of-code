import {run} from '~/run'
import {Grid} from '~/utils/better-grid'

function solve(input: string) {
  const EMPTY = '.'
  const PAPER = '@'
  const grid = Grid.fromString(input)

  let total = 0

  grid.forEach(point => {
    if (point.value === EMPTY) {
      return
    }

    let paper = 0

    point.forEachSurrounding(p => {
      if (p.value === PAPER) {
        paper++
      }
    })

    if (paper < 4) {
      total++
    }
  })

  return total
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 13},
    {input: 'input.txt', expected: 1523},
  ],
})

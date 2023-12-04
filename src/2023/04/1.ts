import { log } from '../../../utils'
import { run } from '../../runner'

function solve(input: string) {
  let score = 0

  input.split('\n').forEach((line, i) => {
    let points = 0

    let [winning, own] = line
      .split(': ')[1]
      .split(' | ')
      .map(l => l.trim())
      .map(l => l.split(/\s+/).map(Number))

    log(winning, own)

    own.forEach(n => {
      if (winning.includes(n)) {
        if (points === 0) points = 1
        else points *= 2
      }
    })

    log(i + 1, points)

    score += points
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 13,
    },
  ],
  onlyTests: false,
})

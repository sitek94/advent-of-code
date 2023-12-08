import {range} from '~/utils'
import {run} from '~/runner'

function solve(input: string) {
  let cards = {} as Record<string, number>

  input.split('\n').forEach((line, i) => {
    if (cards[i] === undefined) cards[i] = 1
    else cards[i] += 1

    let [winning, own] = line
      .split(': ')[1]
      .split(' | ')
      .map(l => l.trim())
      .map(l => l.split(/\s+/).map(Number))

    let points = 0

    own.forEach(n => {
      if (winning.includes(n)) {
        points++
      }
    })

    let copies = cards[i]
    range(points).forEach(n => {
      let nextIndex = n + i + 1
      if (cards[nextIndex] === undefined) cards[nextIndex] = copies
      else cards[nextIndex] += copies
    })
  })

  return Object.values(cards).reduce((acc, n) => acc + +n, 0)
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 30,
    },
  ],
  onlyTests: false,
})

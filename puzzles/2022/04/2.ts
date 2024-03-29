import {run} from '~/runner'

function solve(input: string) {
  let pairs = input.split('\n').map(p => p.split(','))

  let count = 0

  const notContains = (a1: number, a2: number, b1: number, b2: number) =>
    a2 < b1 || b2 < a1

  for (let [a, b] of pairs) {
    let [a1, a2] = a.split('-').map(Number)
    let [b1, b2] = b.split('-').map(Number)

    if (!notContains(a1, a2, b1, b2)) {
      count++
    }
  }

  return count
}

run({
  solve,
  tests: [
    {
      input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
      expected: 4,
    },
  ],
  // onlyTests: true,
})

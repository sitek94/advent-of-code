import {run} from '~/run'

function solve(input: string) {
  const lines = input.split('\n')
  const left = {} as Record<number, number>
  const right = {} as Record<number, number>
  const lefts = [] as number[]
  const rights = [] as number[]
  for (const line of lines) {
    const [l, r] = line.split('  ').map(Number)

    left[l] = (left[l] || 0) + 1
    right[r] = (right[r] || 0) + 1
    lefts.push(l)
    rights.push(r)
  }

  let total = 0

  for (let i = 0; i < lefts.length; i++) {
    const value = lefts[i]
    const multiplier = right[value] || 0
    const score = value * multiplier

    total += score
  }

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 31,
    },
    {
      input: 'input.txt',
      expected: 18934359,
    },
  ],
})

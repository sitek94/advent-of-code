import {run} from '~/run'

function solve(input: string) {
  const lines = input.split('\n')
  const left = []
  const right = []
  for (const line of lines) {
    const [l, r] = line.split('  ').map(Number)
    left.push(l)
    right.push(r)
  }

  left.sort()
  right.sort()

  let total = 0

  for (let i = 0; i < left.length; i++) {
    const distance = Math.abs(left[i] - right[i])
    total += distance
  }

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 11,
    },
    {
      input: 'input.txt',
      expected: 2378066,
    },
  ],
})

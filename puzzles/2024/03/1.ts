import {run} from '~/run'

function solve(input: string) {
  const regex = /mul\((\d\d?\d?),(\d\d?\d?)\)/g
  const matches = Array.from(input.matchAll(regex))

  let total = 0

  matches.forEach(([, a, b]) => {
    total += +a * +b
  })

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 161,
    },
    {
      input: 'input.txt',
      expected: 196826776,
    },
  ],
})

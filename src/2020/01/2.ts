import { run } from '~/runner'

function solve(input: string) {
  let numbers = input.split('\n').map(Number)

  let answer
  for (let a of numbers) {
    for (let b of numbers) {
      for (let c of numbers) {
        if (a + b + c === 2020) {
          answer = a * b * c
        }
      }
    }
  }

  return answer
}

run({
  solve,
  tests: [
    {
      input: `
        1721
        979
        366
        299
        675
        1456
      `,
      expected: 241861950,
    },
  ],
  // onlyTests: true,
})

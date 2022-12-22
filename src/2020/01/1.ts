import { run } from '../../runner'

function solve(input: string) {
  let numbers = input.split('\n').map(Number)

  let answer
  for (let a of numbers) {
    for (let b of numbers) {
      if (a + b === 2020) {
        answer = a * b
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
      expected: 514579,
    },
  ],
  // onlyTests: true,
})

import {run} from '~/runner'

function solve(input: string) {
  let lines = input.split('\n')

  let validCount = 0

  for (let line of lines) {
    let [rule, password] = line.split(': ')
    let [positions, letter] = rule.split(' ')
    let [pos1, pos2] = positions.split('-').map(Number)

    let count = password
      .split('')
      .reduce(
        (count, c, i) =>
          c === letter && (i + 1 === pos1 || i + 1 === pos2)
            ? count + 1
            : count,
        0,
      )

    if (count === 1) {
      validCount++
    }
  }

  return validCount
}

run({
  solve,
  tests: [
    {
      input: `
        1-3 a: abcde
        1-3 b: cdefg
        2-9 c: ccccccccc
      `,
      expected: 1,
    },
  ],
  // onlyTests: true,
})

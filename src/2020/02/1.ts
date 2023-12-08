import { run } from '~/runner'

function solve(input: string) {
  let lines = input.split('\n')

  let validCount = 0

  for (let line of lines) {
    let [rule, password] = line.split(': ')
    let [counts, letter] = rule.split(' ')
    let [min, max] = counts.split('-').map(Number)

    let count = password.split('').filter(x => x === letter).length
    if (count >= min && count <= max) {
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
      expected: 2,
    },
  ],
  // onlyTests: true,
})

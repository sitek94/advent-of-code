import { run } from '../../runner'

function solve(input: string) {
  let elves = input.split('\n\n')

  let max = 0

  for (let elf of elves) {
    let sum = elf.split('\n').reduce((a, b) => a + Number(b), 0)
    if (sum > max) max = sum
  }

  return max
}

run({
  solve,
  tests: [
    {
      input: `1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000`,
      expected: 10,
    },
  ],
  onlyTests: false,
})

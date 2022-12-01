import { run } from '../../runner'

function solve(input: string) {
  let elves = input
    .split('\n\n')
    .reduce((acc, elf) => {
      const sum = elf.split('\n').reduce((a, b) => a + Number(b), 0)

      return [...acc, sum]
    }, [])
    .sort((a, b) => b - a)

  let topThreeSum = elves.slice(0, 3).reduce((a, b) => a + b, 0)

  return topThreeSum
}

run({
  solve,
  tests: [
    {
      input: `1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000`,
      expected: 10,
    },
  ],
  //onlyTests: true,
})

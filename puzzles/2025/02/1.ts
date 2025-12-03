import {run} from '~/run'

function solve(input: string) {
  const ranges = input
    .split(',')
    .map(r => r.split('-'))
    .map(([left, right]) => [+left, +right])

  let sum = 0

  ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      const number = `${i}`

      if (number.length % 2 !== 0) {
        continue
      }

      const left = number.substring(0, number.length / 2)
      const right = number.substring(number.length / 2, number.length)

      if (left === right) {
        sum += i
      }
    }
  })

  return sum
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 1227775554},
    {input: 'input.txt', expected: 100},
  ],
})

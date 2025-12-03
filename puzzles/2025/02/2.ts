import split from 'just-split'
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

      if (isInvalid(number)) {
        sum += i
      }
    }
  })

  return sum
}

function isInvalid(number: string) {
  const digits = number.split('')

  for (let i = 1; i <= number.length / 2; i++) {
    const elements = split(digits, i).map(p => p.join(''))

    if (elements.every(el => el === elements[0])) {
      return true
    }
  }
  return false
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 1227775554},
    {input: 'input.txt', expected: 100},
  ],
})

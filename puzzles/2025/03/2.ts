import {run} from '~/run'
import {range} from '~/utils/index'

const JOLTAGE_LENGTH = 12

function solve(input: string) {
  const lines = input.split('\n')

  let total = 0

  lines.forEach(line => {
    const max = findMax(line)
    console.log(max, max.toString().length)
    total += max
  })

  return total
}

function findMax(line: string) {
  const elements = line.split('').map(Number)
  const result = range(12).map(() => 0)

  let leftMostIndex = -1

  for (let currentDigit = 0; currentDigit < JOLTAGE_LENGTH; currentDigit++) {
    for (
      let i = leftMostIndex + 1;
      i <= elements.length - JOLTAGE_LENGTH + currentDigit;
      i++
    ) {
      if (elements[i] > result[currentDigit]) {
        leftMostIndex = i
        result[currentDigit] = elements[i]
      }
    }
  }

  return +result.join('')
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 100},
    {input: 'input.txt', expected: 100},
  ],
})

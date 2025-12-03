import groupBy from 'just-group-by'
import {run} from '~/run'

function solve(input: string) {
  const lines = input.split('\n')

  let total = 0

  lines.forEach(line => {
    const max = findMax(line)
    total += max
  })

  return total
}

function findMax(line: string) {
  const elements = line.split('').map(Number)

  let max = 0

  for (let i = 0; i < line.length - 1; i++) {
    for (let j = i + 1; j < line.length; j++) {
      let a = elements[i]
      let b = elements[j]

      const newMax = +`${a}${b}`

      if (newMax > max) {
        max = newMax
      }
    }
  }

  return max
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 100},
    {input: 'input.txt', expected: 100},
  ],
})

import {run} from '~/run'

function solve(input: string) {
  const strings = input.split(',')

  let score = 0

  strings.forEach(string => {
    score += hash(string)
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 1320,
    },
    {
      input: 'input.txt',
      expected: 514025,
    },
  ],
})

const hash = (str: string) => {
  const chars = str.split('')

  let currentValue = 0

  for (let char of chars) {
    currentValue += char.charCodeAt(0)
    currentValue *= 17
    currentValue %= 256
  }

  return currentValue
}

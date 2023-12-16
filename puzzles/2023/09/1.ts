import {run} from '~/run'

const isAllZero = (arr: number[]) => arr.every(n => n === 0)

function solve(input: string) {
  let score = 0
  input.split('\n').forEach(line => {
    let numbers = line.split(' ').map(Number)
    let history = []

    while (!isAllZero(numbers)) {
      history.push(numbers)
      let next = [] as number[]
      for (let i = 0; i < numbers.length - 1; i++) {
        let n = numbers[i + 1] - numbers[i]

        next.push(n)
      }

      numbers = next
    }

    for (let i = 0; i < history.length; i++) {
      const numbers = history[i]
      const last = numbers[numbers.length - 1]

      score += last
    }
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: `test.txt`,
      expected: 114,
    },
    {
      input: `input.txt`,
      expected: 2174807968,
    },
  ],
})

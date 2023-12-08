import {run} from '~/runner'
import {isNumber} from '../../utils'

function solve(input: string) {
  let total = 0

  const isCharNumber = (char: string) => {
    const n = +char
    return !isNaN(n) && isNumber(n)
  }

  input.split('\n').forEach(line => {
    const chars = line.split('')

    const firstNumber = chars.find(isCharNumber)
    const lastNumber = chars.findLast(isCharNumber)

    const number = +(firstNumber + lastNumber)

    total += number
  })

  return total
}

run({
  solve,
  tests: [
    {
      expected: 142,
    },
  ],
  onlyTests: false,
})

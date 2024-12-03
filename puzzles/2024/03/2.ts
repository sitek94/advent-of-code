import {run} from '~/run'

function solve(input: string) {
  let total = 0
  let enabled = true // Enabled as per instructions

  const chunks = input.split(/(do\(\)|don't\(\))/)

  chunks.forEach(chunk => {
    if (chunk === `do()`) {
      enabled = true
    } else if (chunk === `don't()`) {
      enabled = false
    } else if (enabled) {
      total += calc(chunk)
    }
  })
  console.log(chunks)

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test2.txt',
      expected: 48,
    },
    {
      input: 'input.txt',
      expected: 106780429,
    },
  ],
})

function calc(part: string) {
  const regex = /mul\((\d\d?\d?),(\d\d?\d?)\)/g
  if (part === undefined) return 0
  let subtotal = 0
  const matches = Array.from(part.matchAll(regex))
  matches.forEach(([, a, b]) => {
    subtotal += +a * +b
  })
  return subtotal
}

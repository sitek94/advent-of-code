import {run} from '~/run'

function solve(input: string) {
  let dial = 50
  let count = 0

  function rotate(instruction: string) {
    const direction = instruction[0] as 'L' | 'R'
    const number = +instruction.slice(1) % 100

    if (direction === 'L') {
      dial = dial - number
      if (dial < 0) {
        dial += 100
      }
    } else {
      dial = dial + number
      if (dial >= 100) {
        dial = dial % 100
      }
    }

    if (dial === 0) {
      count++
    }
  }

  input.split('\n').forEach(instr => {
    rotate(instr)
  })

  return count
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 3},
    {input: 'input.txt', expected: 1195},
  ],
})

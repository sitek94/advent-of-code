import {run} from '~/run'

function solve(input: string) {
  let dial = 50
  let count = 0

  function rotate(instruction: string) {
    const direction = instruction[0] as 'L' | 'R'
    const number = +instruction.slice(1)

    if (direction === 'L') {
      // We hit 0 when k ≡ dial (mod 100) for k in [1, number]
      if (dial === 0) {
        count += Math.floor(number / 100)
      } else if (number >= dial) {
        count += 1 + Math.floor((number - dial) / 100)
      }
      dial = (((dial - number) % 100) + 100) % 100
    } else {
      // We hit 0 when k ≡ (100 - dial) (mod 100) for k in [1, number]
      if (dial === 0) {
        count += Math.floor(number / 100)
      } else {
        const firstHit = 100 - dial
        if (number >= firstHit) {
          count += 1 + Math.floor((number - firstHit) / 100)
        }
      }
      dial = (dial + number) % 100
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
    {input: 'test.txt', expected: 6},
    {input: 'input.txt', expected: 6770},
  ],
})

import {lcms} from '~/utils/lcm'
import {run} from '~/runner'

function solve(input: string) {
  const [instructionsRaw, lines] = input.split('\n\n')
  const instructions = instructionsRaw.split('')

  const map = {} as Record<string, {left: string; right: string}>

  lines.split('\n').forEach(line => {
    const [key, values] = line.split(' = (')
    const left = values.slice(0, 3)
    const right = values.slice(5, 8)

    map[key] = {left, right}
  })

  let current = Object.keys(map).filter(key => key[2] === 'A')

  let stepsToZ = [] as number[]

  current.forEach(key => {
    let steps = 0
    while (key[2] !== 'Z') {
      instructions.forEach(instruction => {
        const newPos = instruction === 'L' ? map[key].left : map[key].right

        steps++
        key = newPos
      })
    }
    stepsToZ.push(steps)
  })

  return lcms(stepsToZ)
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 6,
    },
    {
      useOriginalInput: true,
      expected: 21003205388413,
    },
  ],
  onlyTests: false,
})

import {run} from '~/runner'

function solve(input: string) {
  let score = 0

  input.split('\n').forEach(line => {
    const sets = line.split(': ')[1].split('; ')

    let minGreen = -Infinity
    let minRed = -Infinity
    let minBlue = -Infinity

    for (const set of sets) {
      const v = {blue: 0, red: 0, green: 0}

      set.split(', ').flatMap(cube => {
        const [value, color] = cube.split(' ')

        v[color] += Number(value)
      })

      if (v.green > minGreen) minGreen = v.green
      if (v.blue > minBlue) minBlue = v.blue
      if (v.red > minRed) minRed = v.red
    }

    const power = minGreen * minBlue * minRed
    score += power
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 2286,
    },
  ],
  onlyTests: true,
})

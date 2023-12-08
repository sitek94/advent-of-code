import {run} from '~/runner'

function solve(input: string) {
  let score = 0

  input.split('\n').forEach(line => {
    const id = +line.split('Game ').pop().split(':')[0]
    const sets = line.split(': ')[1].split('; ')

    let isPossible = true

    for (const set of sets) {
      if (!isPossible) {
        continue
      }

      const values = {blue: 0, red: 0, green: 0}

      set.split(', ').flatMap(cube => {
        const [value, color] = cube.split(' ')

        values[color] += Number(value)
      })

      isPossible = values.red <= 12 && values.green <= 13 && values.blue <= 14
    }

    if (isPossible) {
      score += id
    }
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 8,
    },
  ],
  onlyTests: false,
})

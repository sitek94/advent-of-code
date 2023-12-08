import {run} from '~/runner'

function solve(input: string) {
  let rounds = input.split('\n')

  const ROCK = 'A'
  const PAPER = 'B'
  const SCISSORS = 'C'

  const NEED_TO_LOOSE = 'X'

  const NEED_TO_WIN = 'Z'

  let points = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
  }

  let winMap = {
    [ROCK]: PAPER,
    [PAPER]: SCISSORS,
    [SCISSORS]: ROCK,
  }

  let looseMap = {
    [ROCK]: SCISSORS,
    [PAPER]: ROCK,
    [SCISSORS]: PAPER,
  }

  let score = 0

  for (let round of rounds) {
    let [opponent, instruction] = round.split(' ')

    let me

    if (instruction === NEED_TO_LOOSE) {
      me = looseMap[opponent]
    } else if (instruction === NEED_TO_WIN) {
      me = winMap[opponent]
      score += 6
    } else {
      me = opponent
      score += 3
    }

    score += points[me]
  }

  return score
}

run({
  solve,
  tests: [
    {
      input: `A Y
B X
C Z`,
      expected: 12,
    },
  ],
  //   onlyTests: true,
})

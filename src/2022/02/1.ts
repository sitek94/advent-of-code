import { run } from '~/runner'

function solve(input: string) {
  let rounds = input.split('\n')

  const ROCK = 'A'
  const PAPER = 'B'
  const SCISSORS = 'C'

  let meToOpponentMap = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
  }

  let points = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
  }

  let score = 0

  for (let round of rounds) {
    let [opponent, me] = round.split(' ')

    me = meToOpponentMap[me]

    score += points[me]

    const draw = opponent === me
    const won =
      (me === ROCK && opponent === SCISSORS) ||
      (me === PAPER && opponent === ROCK) ||
      (me === SCISSORS && opponent === PAPER)

    if (draw) {
      score += 3
    } else if (won) {
      score += 6
    }
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
      expected: 15,
    },
  ],
  // onlyTests: true,
})

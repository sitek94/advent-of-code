import { log } from 'console'
import { run } from '../../runner'
import zip from 'just-zip-it'

function solve(input: string) {
  const [times, distances] = input
    .split('\n')
    .map(line => line.split(/\s+/).slice(1).map(Number))

  const pairs = zip(times, distances)
  let score = 1

  for (let [time, distance] of pairs) {
    let winningCount = 0

    for (let i = 1; i < time; i++) {
      let holdTime = i
      let speed = holdTime
      let timeLeft = time - i
      let currentDistance = speed * timeLeft

      let beatsTheRecord = currentDistance > distance
      if (beatsTheRecord) {
        winningCount++
      }
    }

    score *= winningCount
  }

  return score
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 10,
    },
  ],
  onlyTests: false,
})

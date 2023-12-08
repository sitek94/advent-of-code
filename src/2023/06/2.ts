import { run } from '~/runner'

function solve() {
  const time = 61709066
  const distance = 643118413621041

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

  return winningCount
}

run({
  solve,
  tests: [],
})

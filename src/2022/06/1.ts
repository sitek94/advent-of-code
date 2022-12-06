import { run } from '../../runner'

const unique = arr => arr.every((c, i) => arr.lastIndexOf(c) === i)

function solve(input: string) {
  let index = 4
  let keepProcessing = true

  let lastFourChars = input.slice(0, 4)

  while (keepProcessing) {
    if (unique(lastFourChars.split(''))) {
      return index
    }

    index++
    lastFourChars = input.slice(index - 4, index)
  }

  return index
}

run({
  solve,
  tests: [],
  // onlyTests: true,
})

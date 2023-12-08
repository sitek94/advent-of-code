import { run } from '~/runner'

const unique = arr => arr.every((c, i) => arr.lastIndexOf(c) === i)

function solve(input: string) {
  let index = 14
  let keepProcessing = true

  let lastFourteenChars = input.slice(0, 14)

  while (keepProcessing) {
    if (unique(lastFourteenChars.split(''))) {
      return index
    }

    index++
    lastFourteenChars = input.slice(index - 14, index)
  }

  return index
}

run({
  solve,
  tests: [],
  // onlyTests: true,
})

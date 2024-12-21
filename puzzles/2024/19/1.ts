import {run} from '~/run'

function solve(input: string) {
  let {designs, patterns} = parseInput(input)

  let count = 0

  patterns.forEach((p, i) => {
    if (isValid(p, designs)) {
      count++
    }
  })

  return count
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 6},
    {input: 'input.txt', expected: 100},
  ],
})

let cache = new Map<string, boolean>()

function isValid(pattern: string, designs: string[]) {
  if (cache.has(pattern)) {
    return cache.get(pattern)
  }
  const starts = designs.filter(d => pattern.startsWith(d))
  if (!starts.length) {
    cache.set(pattern, false)
    return false
  }

  const isSomeValid = starts.some(start => {
    if (start === pattern) {
      return true
    }
    return isValid(pattern.substring(start.length), designs)
  })

  cache.set(pattern, isSomeValid)

  return isSomeValid
}

function parseInput(input: string) {
  const [designs, patterns] = input.split('\n\n')

  return {
    designs: designs.split(', '),
    patterns: patterns.split('\n'),
  }
}

import {run} from '~/run'

let counts = new Map<string, number>()

function solve(input: string) {
  let {designs, patterns} = parseInput(input)

  return patterns.reduce(
    (count, pattern) => count + getValidCount(pattern, designs),
    0,
  )
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 16},
    {input: 'input.txt', expected: 601201576113503},
  ],
})

function getValidCount(pattern: string, designs: string[]) {
  if (counts.has(pattern)) {
    return counts.get(pattern) as number
  }
  const subs = designs.filter(d => pattern.startsWith(d))
  if (!subs.length) {
    counts.set(pattern, 0)
    return 0
  }

  let validCounts = 0

  subs.forEach(sub => {
    if (sub === pattern) {
      validCounts++
    } else {
      validCounts += getValidCount(pattern.substring(sub.length), designs)
    }
  })

  counts.set(pattern, validCounts)

  return validCounts
}

function parseInput(input: string) {
  const [designs, patterns] = input.split('\n\n')

  return {
    designs: designs.split(', '),
    patterns: patterns.split('\n'),
  }
}

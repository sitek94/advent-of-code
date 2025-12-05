import {run} from '~/run'
import {mergeRanges} from '~/utils/merge-ranges'

function solve(input: string) {
  const [rangesRaw] = input.split('\n\n')
  const ranges = rangesRaw
    .split('\n')
    .map(r => r.split('-').map(Number) as [number, number])

  const mergedRanges = mergeRanges(ranges)

  let sum = 0

  for (let [left, right] of mergedRanges) {
    const count = right - left + 1
    sum += count
  }

  return sum
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 14},
    {input: 'input.txt', expected: 353863745078671},
  ],
})

import {run} from '~/run'

function solve(input: string) {
  const [rangesRaw, idsRaw] = input.split('\n\n')

  const ranges = rangesRaw
    .split('\n')
    .map(r => r.split('-').map(Number) as [number, number])
  const ids = idsRaw.split('\n').map(Number)

  let count = 0

  for (let i = 0; i < ids.length; i++) {
    if (isFresh(ids[i])) count++
  }

  function isFresh(n: number) {
    for (let [left, right] of ranges) {
      if (n >= left && n <= right) {
        return true
      }
    }
    return false
  }

  return count
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 3},
    {input: 'input.txt', expected: 782},
  ],
})

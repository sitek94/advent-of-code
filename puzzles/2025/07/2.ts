import {run} from '~/run'
import {Grid} from '~/utils/better-grid'

const SPLITTER = '^'
const START = 'S'

function solve(input: string) {
  const grid = Grid.fromString(input)
  const start = grid.find(p => p.value === START)
  const memo = new Map<string, number>()

  function countTimelines(point: typeof start) {
    if (!point) return 1

    const key = point.key()

    if (memo.has(key)) return memo.get(key)!

    let result: number

    if (point.value === SPLITTER) {
      result = countTimelines(point.left()) + countTimelines(point.right())
    } else {
      result = countTimelines(point.down())
    }

    memo.set(key, result)

    return result
  }

  return countTimelines(start)
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 40},
    {input: 'input.txt', expected: 13883459503480},
  ],
})

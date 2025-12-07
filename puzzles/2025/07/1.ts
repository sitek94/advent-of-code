import {run} from '~/run'
import {Grid} from '~/utils/better-grid'
import {createQueue} from '~/utils/collections'

const SPLITTER = '^'
const START = 'S'

function solve(input: string) {
  const grid = Grid.fromString(input)
  const start = grid.find(p => p.value === START)
  const visited = new Set<string>()

  const queue = createQueue([start])

  let count = 0

  while (queue.isNotEmpty()) {
    const point = queue.dequeue()

    if (!point || visited.has(point.key())) {
      continue
    }

    visited.add(point.key())

    if (point.value === SPLITTER) {
      count++
      queue.enqueue(point.left())
      queue.enqueue(point.right())
    } else {
      queue.enqueue(point.down())
    }
  }

  return count
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 21},
    {input: 'input.txt', expected: 100},
  ],
})

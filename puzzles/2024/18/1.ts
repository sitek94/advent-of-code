import {run} from '~/run'
import {PriorityQueue} from '~/utils/priority-queue'

function solve(input: string, {size, bytes}: {size: number; bytes: number}) {
  const grid = createGrid(input, size, bytes)
  const start = {x: 0, y: 0}
  const end = {x: size - 1, y: size - 1}

  const best = findBestPath(grid, start, end)

  return best.gCost
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 22, size: 7, bytes: 12},
    {input: 'input.txt', expected: 334, size: 71, bytes: 1024},
  ],
})

type Point = {x: number; y: number}

/**
 * A* search
 */
function findBestPath(grid: string[][], start: Point, end: Point) {
  const heuristic = (p: Point) => manhattanDistance(p, end)

  const queue = new PriorityQueue(
    [{...start, gCost: 0, fCost: heuristic(start)}],
    (a, b) => a.fCost < b.fCost,
  )
  const visited = new Map<string, number>()

  while (!queue.isEmpty()) {
    const current = queue.dequeue()
    const currentKey = key(current)

    if (current.x === end.x && current.y === end.y) {
      return current
    }

    visited.set(currentKey, current.gCost)

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]

    for (let [dx, dy] of directions) {
      const [x, y] = [dx + current.x, dy + current.y]
      const target = grid[y]?.[x]

      const isOutsideOrWall = !target || target === '#'
      if (isOutsideOrWall) {
        continue
      }

      const targetKey = key({x, y})
      const newG = current.gCost + 1
      const recordedG = visited.get(targetKey)

      const isNotVisitedOrHasFoundCheaperPath =
        recordedG === undefined || newG < recordedG
      if (isNotVisitedOrHasFoundCheaperPath) {
        visited.set(targetKey, newG)

        queue.enqueue({x, y, gCost: newG, fCost: newG + heuristic({x, y})})
      }
    }
  }
}

function manhattanDistance(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function key(p: Point) {
  return `${p.x},${p.y}`
}

function createGrid(input: string, size: number, bytes: number) {
  const grid = Array.from({length: size}, () =>
    Array.from({length: size}, () => '.'),
  )

  input
    .split('\n')
    .slice(0, bytes)
    .map(line => line.split(',').map(Number))
    .forEach(([x, y]) => {
      grid[y][x] = '#'
    })

  return grid
}

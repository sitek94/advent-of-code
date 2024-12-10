import {run} from '~/run'

type Point = [x: number, y: number]
const START = 0
const END = 9

function solve(input: string) {
  const starts: string[] = []
  const ends: string[] = []
  const G = input.split('\n').map((line, y) =>
    line
      .split('')
      .map(Number)
      .map((n, x) => {
        if (n === START) starts.push(toKey([x, y]))
        if (n === END) ends.push(toKey([x, y]))
        return n
      }),
  )

  let total = 0

  starts.forEach(start => {
    const heads = new Set<string>()
    evaluateTrail(fromKey(start), [start], heads)
    total += heads.size
  })

  function evaluateTrail(start: Point, visited: string[], heads: Set<string>) {
    if (isEnd(start)) {
      heads.add(toKey(start))
      return
    }

    const [x, y] = start

    const up: Point = [x, y - 1]
    const down: Point = [x, y + 1]
    const right: Point = [x + 1, y]
    const left: Point = [x - 1, y]

    for (const dir of [up, down, right, left]) {
      if (canMove(start, dir)) {
        evaluateTrail(dir, visited.concat(toKey(dir)), heads)
      }
    }

    function canMove(p1: Point, p2: Point) {
      if (getValue(p2) === undefined) false
      if (visited.includes(toKey(p2))) return false
      return getValue(p2) - getValue(p1) === 1
    }

    function getValue([x, y]: Point) {
      return G[y]?.[x]
    }

    function isEnd(p: Point) {
      return getValue(p) === END
    }
  }

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 100,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})

function toKey([x, y]: Point) {
  return `${x},${y}`
}

function fromKey(key: string): Point {
  return key.split(',').map(Number) as Point
}

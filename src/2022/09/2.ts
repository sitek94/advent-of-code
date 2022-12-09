import { run } from '../../runner'

const { abs, sign } = Math

function solve(input: string) {
  const moves = input
    .split('\n')
    .map(m => m.split(' ').map((item, i) => (i === 1 ? Number(item) : item)))

  type Point = { x: number; y: number }

  const [HEAD, ...LINE] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ] as Point[]

  const areTouching = (t: Point, h: Point) =>
    (h.y === t.y && h.x === t.x) ||
    (h.y === t.y && abs(h.x - t.x) === 1) ||
    (h.x === t.x && abs(h.y - t.y) === 1) ||
    (abs(h.y - t.y) === 1 && abs(h.x - t.x) === 1)

  const sameRow = (t: Point, h: Point) => h.y === t.y
  const sameColumn = (t: Point, h: Point) => h.x === t.x

  const moveTail = (t: Point, h: Point) => {
    if (!areTouching(t, h)) {
      if (sameColumn(t, h)) {
        t.y = t.y + sign(h.y - t.y)
      } else if (sameRow(t, h)) {
        t.x = t.x + sign(h.x - t.x)
      } else {
        t.y = t.y + sign(h.y - t.y)
        t.x = t.x + sign(h.x - t.x)
      }
    }
  }

  let DIR_MAP = {
    U: -1,
    D: 1,
    L: -1,
    R: 1,
  }

  let tailMap = new Map()
  tailMap.set('0,0', true)

  for (let [dir, distance] of moves) {
    for (let i = 0; i < distance; i++) {
      // Move head
      if (dir === 'U' || dir === 'D') {
        HEAD.y = HEAD.y + DIR_MAP[dir]
      } else {
        HEAD.x = HEAD.x + DIR_MAP[dir]
      }

      let currentHead = HEAD
      for (let i = 0; i < LINE.length; i++) {
        let nextKnot = LINE[i]

        moveTail(nextKnot, currentHead)

        if (i === LINE.length - 1) {
          tailMap.set(`${nextKnot.x},${nextKnot.y}`, true)
        }
        currentHead = nextKnot
      }
    }
  }

  return Array.from(tailMap.values()).length
}

run({
  solve,
  tests: [],
  // onlyTests: true,
})

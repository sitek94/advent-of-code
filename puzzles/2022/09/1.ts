import {run} from '~/runner'

const {abs, sign} = Math

function solve(input: string) {
  const moves = input
    .split('\n')
    .map(m => m.split(' ').map((item, i) => (i === 1 ? Number(item) : item)))

  // head
  const h = {x: 0, y: 0}
  // tail
  const t = {x: 0, y: 0}

  const areTouching = () =>
    (h.y === t.y && h.x === t.x) ||
    (h.y === t.y && abs(h.x - t.x) === 1) ||
    (h.x === t.x && abs(h.y - t.y) === 1) ||
    (abs(h.y - t.y) === 1 && abs(h.x - t.x) === 1)

  const sameRow = () => h.y === t.y
  const sameColumn = () => h.x === t.x

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
        h.y = h.y + DIR_MAP[dir]
      } else {
        h.x = h.x + DIR_MAP[dir]
      }

      if (!areTouching()) {
        if (sameColumn()) {
          t.y = t.y + sign(h.y - t.y)
        } else if (sameRow()) {
          t.x = t.x + sign(h.x - t.x)
        } else {
          t.y = t.y + sign(h.y - t.y)
          t.x = t.x + sign(h.x - t.x)
        }
      }
      tailMap.set(`${t.x},${t.y}`, true)
    }
  }

  return Array.from(tailMap.values()).length
}

run({
  solve,
  tests: [],
  // onlyTests: true,
})

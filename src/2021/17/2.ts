import { run } from '../../runner'
import { max, range } from '../../../utils'

function solve(input: string) {
  let [_, coords] = input.split(': ')
  let [[x1, x2], [y1, y2]] = coords
    .split(', ')
    .map(s => s.split('=')[1].split('..').map(Number))

  let x = 0
  let y = 0
  let count = 0
  let values = new Set()

  for (let vx = x2; vx > 0; vx--) {
    for (let vy = y1; vy < -y1; vy++) {
      test(vx, vy)
    }
  }

  function test(vx, vy) {
    let x = 0
    let y = 0
    let cur_y_max = 0
    let ok = false
    for (let _ of range(500)) {
      x += vx
      y += vy

      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        ok = true
      }

      if (vx > 0) vx--
      else if (vx < 0) vx++

      vy--
    }
    if (ok) {
      count++
    }
  }
  return count
  // return Object.values(C).reduce((a, b) => a + b);
}

run({
  solve,
  tests: [
    {
      input: `target area: x=20..30, y=-10..-5`,
      expected: 45,
    },
  ],
  // onlyTests: true,
})

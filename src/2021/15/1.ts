import { run } from '../../runner'

function solve(input: string) {
  let lines = input.split('\n')
  let w = lines[0].length
  let h = lines.length

  let G = new Map()

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      G.set(p(x, y), Number(lines[y][x]))
    }
  }

  console.log(G)
  let count = 0
  let R = null
  go(p(0, 0), ['00'])

  function go(start, path) {
    if (!G.has(start)) {
      return
    }
    let [x, y] = get(start)

    let r = p(x + 1, y)
    let d = p(x, y + 1)

    for (let next of [r, d]) {
      if (!G.has(next) || path.includes(next)) {
        return
      }

      if (next === p(w - 1, h - 1)) {
        console.log('FOUND')
        let risk = path.map(p => G.get(p)).reduce((a, b) => a + b)
        if (!R || risk < R) {
          R = risk
        }
      }

      go(next, [...path, next])
    }
  }

  console.log(R)
  function p(x, y) {
    return `${x}${y}`
  }
  function get(p) {
    return p.split('').map(Number)
  }

  let lowestRisk = null

  return R
}

run({
  solve,
  tests: [
    {
      input: `
        1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581`,
      expected: 10,
    },
  ],
  onlyTests: true,
})

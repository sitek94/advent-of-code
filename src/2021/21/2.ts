import { run } from '~/runner'

function solve(input: string) {
  let [pos1, pos2] = input.split('\n').map(l => Number(l.split(': ')[1]))
  pos1 = pos1 - 1
  pos2 = pos2 - 1
  const cache = {}

  function play(...args: number[]) {
    let [p1, p2, s1, s2] = args

    if (s1 >= 21) {
      return [1, 0]
    }
    if (s2 >= 21) {
      return [0, 1]
    }
    let key = JSON.stringify(args)
    if (key in cache) {
      return cache[key]
    }

    let ans = [0, 0]

    for (let d1 of [1, 2, 3]) {
      for (let d2 of [1, 2, 3]) {
        for (let d3 of [1, 2, 3]) {
          let newP1 = (p1 + d1 + d2 + d3) % 10
          let newS1 = 1 + s1 + newP1

          let [x1, y1] = play(p2, newP1, s2, newS1)
          ans = [ans[0] + y1, ans[1] + x1]
        }
      }
    }
    cache[key] = ans
    return ans
  }

  let winCounts = play(pos1, pos2, 0, 0)

  return Math.max(...winCounts)
}

run({
  solve,
  tests: [
    {
      input: `
        Player 1 starting position: 4
        Player 2 starting position: 8
      `,
      expected: 444356092776315,
    },
  ],
  // onlyTests: true,
})

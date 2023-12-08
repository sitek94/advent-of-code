import { run } from '~/runner'

function solve(input: string) {
  let paths = input.split('\n').map(line => line.split('-'))
  const P = {}

  for (let [from, to] of paths) {
    if (!P[from]) {
      P[from] = [to]
    } else {
      P[from].push(to)
    }
    if (!P[to]) {
      P[to] = [from]
    } else {
      P[to].push(from)
    }
  }

  let answer = 0

  go('start', [])

  function go(to: string, path: string[]) {
    if (isSmall(to) && path.includes(to)) {
      return
    }
    let newPath = [...path]
    newPath.push(to)
    if (to === 'end') {
      answer++
      return
    } else {
      let paths = P[to]
      for (let p of paths) {
        go(p, newPath)
      }
    }
  }

  function isSmall(cave: string) {
    return cave === cave.toLowerCase()
  }

  return answer
}

run({
  solve,
  tests: [
    {
      input: `
        start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end`,
      expected: 10,
    },
  ],
})

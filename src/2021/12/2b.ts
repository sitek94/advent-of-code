/**
 * @fileoverview
 *
 * Author:
 * https://github.com/thejan14
 *
 * After I solved the problem, I was looking for other ways to do it, and I came
 * across this solution. I really liked, and wanted to have a quick reference to
 * it.
 */

import { run } from '../../runner'

function solve(input) {
  let graph = {}
  input
    .split('\n')
    .map(line => line.split('-'))
    .forEach(([from, to]) => {
      if (graph[from]) {
        graph[from].push(to)
      } else {
        graph[from] = [to]
      }

      if (graph[to]) {
        graph[to].push(from)
      } else {
        graph[to] = [from]
      }
    })

  let paths = 0
  findPaths('start', [], null)

  const answer = paths

  function findPaths(cave, visited, revisit) {
    if (cave === cave.toLowerCase()) {
      visited.push(cave)
    }

    graph[cave].forEach(c => {
      if (c === 'end') {
        paths += 1
      } else {
        const isVisited = visited.includes(c)
        if (isVisited && !revisit && c !== 'start') {
          findPaths(c, [...visited], c)
        } else if (!isVisited && c !== revisit) {
          findPaths(c, [...visited], revisit)
        }
      }
    })
  }

  return answer
}

const testInput1 = `
  start-A
  start-b
  A-c
  A-b
  b-d
  A-end
  b-end`

const testInput2 = `
  dc-end
  HN-start
  start-kj
  dc-start
  dc-HN
  LN-dc
  HN-end
  kj-sa
  kj-HN
  kj-dc`

const testInput3 = `
  fs-end
  he-DX
  fs-he
  start-DX
  pj-DX
  end-zg
  zg-sl
  zg-pj
  pj-he
  RW-he
  fs-DX
  pj-RW
  zg-RW
  start-pj
  he-WI
  zg-he
  pj-fs
  start-RW`

run({
  solve,
  tests: [
    {
      input: testInput1,
      name: 'very small',
      expected: 36,
    },
    {
      input: testInput2,
      name: 'small',
      expected: 103,
    },
    {
      input: testInput3,
      name: 'medium',
      expected: 3509,
    },
  ],
  onlyTests: false,
})

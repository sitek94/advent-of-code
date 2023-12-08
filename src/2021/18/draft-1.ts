import { run } from '~/runner'
import { range } from '~/utils'

type N = Pair | number
type Pair = [number | N, number | N]
function solve(input: string) {
  let a: N = [1, 2]
  let b: N = [[3, 4], 5]
  let c: N = [
    [1, 2],
    [[3, 4], 5],
  ]
  let d: N = [[[[[9, 8], 1], 2], 3], 4]
  let e: N = [
    [
      [[[4, 3], 4], 4],
      [7, [[8, 4], 9]],
    ],
    [1, 1],
  ]
  let x = [
    [
      [[[4, 3], 4], 4],
      [7, [[8, 4], 9]],
    ],
    [1, 1],
  ]

  console.log(canExplode(d))
  start([
    [[[4, 3], 4], 4],
    [7, [[8, 4], 9]],
  ])
  function start(n: N) {
    for (let _ of range(5)) {
      if (canExplode(n)) {
        n = tryToExplode(n)
        console.log(JSON.stringify(n))
      }
    }

    // if (canExplode(n)) {
    //   let sth = tryToExplode(n);
    //   console.log(sth.toString());
    // }
  }

  // reduce(e);

  function reduce(n: N, nestedLevel = 0) {
    // SPLIT
    if (isNumber(n) && n > 10) {
      // console.log('Splitting', n);
    }
    // REDUCE
    if (isPair(n)) {
      // EXPLODE
      // if (nestedLevel === 4) {
      //   let firstPair = n.find(isPair);
      //   console.log('First pair:', firstPair);
      // }

      for (let i = 0; i < n.length; i++) {
        let currentNumber = n[i]
        // EXPLODE
        if (nestedLevel + 1 === 4 && isPair(currentNumber)) {
          console.log('Going to explode:', currentNumber)
          let left = n[i - 1]
          let right = n[i + 1]
          console.log('Left:', left)
          console.log('Right:', right)
        }

        reduce(currentNumber, nestedLevel + 1)
      }
    }
  }

  function add(n1: N, n2: N) {
    return reduce([n1, n2])
  }

  function r(n: N, nestedLevel: number) {
    if (nestedLevel === 4) {
      return explode(n as PairToExplode)
    } else {
      if (typeof n === 'number') {
        return n
      } else {
        return n.map(r(n, nestedLevel + 1))
      }
    }
  }

  explode([[4, 3], 4])

  return 'solution'
}

type PairToExplode = [[number, number], number] | [number, [number, number]]

function explode(pair: PairToExplode) {
  let result = [0, 0]

  let [left, right] = pair
  // [1, [2, 3]]
  if (isNumber(left) && isArray(right)) {
    result[0] += left + right[0]
  }
  // [[2, 3], 1]
  if (isNumber(right) && isArray(left)) {
    result[1] += right + left[1]
  }

  return result
}

function testExplode() {}

function canExplode(n: N, depth = 1) {
  if (depth === 4) {
    return true
  }
  if (typeof n === 'number') {
    return false
  } else {
    if (Array.isArray(n)) {
      let [a, b] = n
      return canExplode(a, depth + 1) || canExplode(b, depth + 1)
    }
  }
}

function tryToExplode(n: N, depth = 1) {
  if (depth === 4 && typeof n !== 'number') {
    return explode(n as PairToExplode)
  }
  if (typeof n === 'number') {
    return n
  } else {
    if (Array.isArray(n)) {
      let [a, b] = n
      return [tryToExplode(a, depth + 1), tryToExplode(b, depth + 1)]
    }
  }
}

function isArray(n: number | [number, number]): n is [number, number] {
  return Array.isArray(n)
}

function isPair(n: N): n is Pair {
  return Array.isArray(n)
}

function isNumber(n: N): n is number {
  return typeof n === 'number'
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 10,
    },
  ],
  onlyTests: true,
})

import { run } from '~/runner'
import * as util from 'util'

const isNumber = (n): n is number => typeof n === 'number'
const isArray = (n): n is typeof Array => Array.isArray(n)

type SnailNumber =
  | [number, number | SnailNumber]
  | [number | SnailNumber, number]

type Node = {
  a: Node | [number, number] | number | null
  b: Node | [number, number] | number | null
  value: SnailNumber | [number, number] | number
  parent: Node | null
  depth: number
}

function solve() {}
let input: SnailNumber = [[[[[9, 8], 1], 2], 3], 4]

const tree = createNode(input, null, 0)
console.log(util.inspect(tree, { depth: 5 }))
tryExplode(tree)

function tryExplode(node: Node | [number, number] | number | null) {
  if (!node || isNumber(node) || Array.isArray(node)) {
    return
  }
  if (
    node.depth === 4 &&
    Array.isArray(node.value) &&
    node.value.flat().length === 2
  ) {
    console.log('Explode', node.value)
    return node.value
  }
  tryExplode(node.a)
  tryExplode(node.b)
}

function createNode(
  n: SnailNumber | [number, number] | number,
  parent: Node | null,
  depth = 0,
): Node {
  let node: Node = {
    a: null,
    b: null,
    parent,
    depth,
    value: n,
  }

  if (typeof n === 'number' || (isArray(n) && n.flat().length === 2)) {
    return node
  }

  let [a, b] = n

  node.a = createNode(a, node, depth + 1)
  node.b = createNode(b, node, depth + 1)

  return node
}

function tryToExplode(node: Node) {
  if (node.depth === 4) {
    console.log('Exploded!')
    return
  }
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

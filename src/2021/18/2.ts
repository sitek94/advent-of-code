import {isNumber} from '../../utils'
import util from 'util'
import {run} from '~/runner'

type Node = {
  left: Node | null
  right: Node | null
  parent: Node | null
  value: number | null
}

function Node(value = null): Node {
  const node = {
    left: null,
    right: null,
    value,
    parent: null,
  }

  return node
}

function add(a: Node, b: Node) {
  let root = Node()
  root.left = a
  root.right = b
  root.left.parent = root
  root.right.parent = root
  reduce(root)
  return root
}

function parse(input) {
  // Create new node
  const node = Node()

  if (isNumber(input)) {
    node.value = input
    return node
  } else {
    const [left, right] = input

    node.left = parse(left)
    node.left.parent = node
    node.right = parse(right)
    node.right.parent = node

    reduce(node)

    return node
  }
}

function reduce(root: Node) {
  let done = true

  let stack = [{node: root, depth: 0}]

  while (stack.length > 0) {
    const {node, depth} = stack.pop()

    if (!node) {
      continue
    }

    const condition =
      (node.left === null && node.right === null) ||
      (node.left.value !== null && node.right.value !== null)

    // We're at the correct depth, and node doesn't have value, so it can be
    // exploded
    if (depth >= 4 && node.value === null && condition) {
      // Go up and find left node, use a loop, because it doesn't have to be the
      // first node up in the stack
      let previous = node.left
      let current = node
      while (
        current !== null &&
        (current.left === previous || current.left === null)
      ) {
        previous = current
        current = current.parent
      }

      if (current) {
        current = current.left
        while (current.value === null) {
          if (current.right !== null) {
            current = current.right
          } else {
            current = current.left
          }
        }
        console.assert(node.left !== null, 'Watch out for NaN')
        current.value += node?.left.value
      }

      previous = node.right
      current = node
      while (
        current !== null &&
        (current.right === previous || current.right === null)
      ) {
        previous = current
        current = current.parent
      }

      if (current) {
        current = current.right
        while (current.value === null) {
          if (current.left !== null) {
            current = current.left
          } else {
            current = current.right
          }
        }
        console.assert(node.right !== null, 'Watch out for NaN')
        current.value += node?.right.value
      }

      node.value = 0
      node.left = null
      node.right = null

      // STOP
      done = false
      break
    }

    stack.push({node: node.right, depth: depth + 1})
    stack.push({node: node.left, depth: depth + 1})
  }

  if (!done) {
    reduce(root)
    return
  }

  stack = [{node: root, depth: null}]

  while (stack.length > 0) {
    const {node} = stack.pop()
    if (!node) {
      continue
    }
    if (node.value !== null) {
      // SPLIT
      console.assert(node.left === null && node.right === null)
      if (node.value >= 10) {
        node.left = Node(Math.floor(node.value / 2))
        node.right = Node(Math.ceil(node.value / 2))
        node.left.parent = node
        node.right.parent = node
        node.value = null

        done = false
        break
      }
    }

    stack.push({node: node.right, depth: null})
    stack.push({node: node.left, depth: null})
  }

  if (!done) {
    reduce(root)
  }
}

function log(sth: any) {
  console.log(util.inspect(sth, {depth: 5, colors: true}))
}

function solve(input) {
  let lines = input.split('\n')

  const answers = []
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i === j) {
        continue
      }
      let n1 = parse(JSON.parse(lines[i]))
      let n2 = parse(JSON.parse(lines[j]))
      let n11 = parse(JSON.parse(lines[i]))
      let n22 = parse(JSON.parse(lines[j]))

      let sum1 = add(n1, n2)
      let sum2 = add(n22, n11)
      answers.push(magnitude(sum1))
      answers.push(magnitude(sum2))
    }
  }

  let ans = Math.max(...answers)
  return ans
}

function magnitude(node: Node) {
  if (typeof node.value === 'number') {
    return node.value
  }
  return magnitude(node.left) * 3 + magnitude(node.right) * 2
}

run({
  solve,
  tests: [
    {
      input: `
        [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
        [[[5,[2,8]],4],[5,[[9,9],0]]]
        [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
        [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
        [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
        [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
        [[[[5,4],[7,7]],8],[[8,3],8]]
        [[9,3],[[9,9],[6,[4,9]]]]
        [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
        [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
    `,
      expected: 3993,
    },
  ],
  // onlyTests: true,
})

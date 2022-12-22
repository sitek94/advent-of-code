// import { run } from '../../runner';
// import { range } from '../../../utils';
// import * as util from 'util';
//
// const isNumber = (n): n is number => typeof n === 'number';
// const isArray = (n): n is typeof Array => Array.isArray(n);
//
// type Node = {
//   a: Node | null;
//   b: Node | null;
//   value: number;
//   parent: Node | null;
//   depth: number;
// };
//
// let input = [[[[[9, 8], 1], 2], 3], 4];
//
// const tree = createNode(input, null, 0);
// console.log(util.inspect(tree, { depth: 5 }));
//
// tryExplode(tree);
//
// function tryExplode(node: Node | [number, number] | number | null) {
//   if (!node || isNumber(node) || Array.isArray(node)) {
//     return;
//   }
//   if (
//     node.depth === 4 &&
//     Array.isArray(node.value) &&
//     node.value.flat().length === 2
//   ) {
//     console.log('Explode', node.value);
//     return node.value;
//   }
//   tryExplode(node.a);
//   tryExplode(node.b);
// }
//
// function createNode(
//   n: Node | null,
//   parent: Node | null,
//   depth = 0,
// ): Node {
//   let node: Node = {
//     a: null,
//     b: null,
//     parent,
//     depth,
//     value: n,
//   };
//
//   if (typeof n === 'number' || (isArray(n) && n.flat().length === 2)) {
//     return node;
//   }
//
//   let [a, b] = n;
//
//   node.a = createNode(a, node, depth + 1);
//   node.b = createNode(b, node, depth + 1);
//
//   return node;
// }
//
// function tryToExplode(node: Node) {
//   if (node.depth === 4) {
//     console.log('Exploded!');
//     return;
//   }
// }
//
// run({
//   solve,
//   tests: [
//     {
//       input: ``,
//       expected: 10,
//     },
//   ],
//   onlyTests: true,
// });
//
// type PairToExplode = [[number, number], number] | [number, [number, number]];
//
// function explode(pair: PairToExplode) {
//   let result = [0, 0];
//
//   let [left, right] = pair;
//   // [1, [2, 3]]
//   if (isNumber(left) && isArray(right)) {
//     result[0] += left + right[0];
//   }
//   // [[2, 3], 1]
//   if (isNumber(right) && isArray(left)) {
//     result[1] += right + left[1];
//   }
//
//   return result;
// }

import * as util from 'util'

let data = [[[[[9, 8], 1], 2], 3], 4]

type Node = {
  left: Node | null
  right: Node | null
  value: number | null
  parent: Node | null
  depth: number
}

function createNode(n: any, parent: Node, depth = 0): Node {
  if (typeof n === 'number') {
    let node: Node = {
      left: null,
      right: null,
      parent,
      value: n,
      depth,
    }
    return node
  } else {
    let [a, b] = n
    let node: Node = {
      left: null,
      right: null,
      value: null,
      parent,
      depth: depth,
    }

    node.left = createNode(a, node, depth + 1)
    node.right = createNode(b, node, depth + 1)

    return node
  }
}

function tryToExplode(node: Node, state: { hasExploded: boolean }) {
  if (state.hasExploded) {
    return true
  }
  if (node.depth === 4) {
    let [a, b] = explode(node.parent)

    node.parent.left = createNode(a, node.parent, node.parent.depth + 1)
    node.parent.right = createNode(b, node.parent, node.parent.depth + 1)

    state.hasExploded = true
    console.log('TRUE')
    return true
  }

  tryToExplode(node.left, state)
  tryToExplode(node.right, state)

  return false
}

function log(sth: any) {
  console.log(util.inspect(sth, { depth: 5, colors: true }))
}

export {}

function explode(node: Node) {
  let result = [0, 0]

  if (node.left.value) {
    result[0] += node.left.value + node.right.left.value
  }
  if (node.right.value) {
    result[1] += node.right.value + node.left.right.value
  }

  return result
}
const rootNode = createNode(data, null)
log(rootNode)
const hasExploded = tryToExplode(rootNode, { hasExploded: false })
log(rootNode)
console.log({ hasExploded })
if (hasExploded) {
  let again = tryToExplode(rootNode, { hasExploded: false })
  console.log({ again })
}

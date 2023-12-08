/**
 * @fileoverview
 *
 * This solution uses BFS (Breadth-First Search) algorithm and is quite slow.
 * It takes nearly 3 minutes to solve the actual challenge input, but it works!
 */

import { createQueue } from '../../utils/collections'
import { getInput } from '../../utils'

const realInput = getInput()

const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const testInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`

const testInput3 = `fs-end
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

function run() {
  const lines = realInput.split('\n').map(l => l.split('-'))

  const AdjacencyList = lines.reduce((acc, [a, b]) => {
    if (acc[a]) {
      acc[a].push(b)
    } else {
      acc[a] = [b]
    }
    if (acc[b]) {
      acc[b].push(a)
    } else {
      acc[b] = [a]
    }
    return acc
  }, {})

  console.log(AdjacencyList)

  const Queue = createQueue([
    { node: 'start', smallNodes: ['start'], smallNodeThatAppearedTwice: null },
  ])

  let count = 0

  while (Queue.isNotEmpty()) {
    let {
      node: currentNode,
      smallNodes,
      smallNodeThatAppearedTwice,
    } = Queue.dequeue()
    if (currentNode === 'end') {
      if (count % 1000 === 0) {
        console.log(count)
      }
      count++
      continue
    }

    const adjacentNodes = AdjacencyList[currentNode]

    for (let node of adjacentNodes) {
      // Copy small nodes, so that they're not shared between the paths
      let smallNodesCopy = smallNodes.slice()

      if (!smallNodes.includes(node)) {
        // Append small node to the list of all small nodes encountered
        if (isSmall(node)) {
          smallNodesCopy.push(node)
        }

        Queue.enqueue({
          node,
          smallNodes: smallNodesCopy,
          smallNodeThatAppearedTwice,
        })
      } else if (isNotStartOrEnd(node) && !smallNodeThatAppearedTwice) {
        Queue.enqueue({
          node,
          smallNodes: smallNodesCopy,
          smallNodeThatAppearedTwice: node,
        })
      }
    }
  }

  function isSmall(node) {
    return node === node.toLowerCase()
  }

  function isNotStartOrEnd(node) {
    return node !== 'start' && node !== 'end'
  }

  console.log(count)
}

console.time('test')
run()
console.timeEnd('test')

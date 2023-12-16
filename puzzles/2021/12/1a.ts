import {createDefaultObj, createQueue} from '../../../utils/collections'
import {run} from '~/runner'

// Test data
const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

function solve(input: string) {
  const lines = input.split('\n').map(l => l.split('-'))

  const AdjacencyList = createDefaultObj([])

  for (let [a, b] of lines) {
    AdjacencyList[a].push(b)
    AdjacencyList[b].push(a)
  }

  const Queue = createQueue([{node: 'start', smallNodes: ['start']}])

  let answer = 0

  while (Queue.isNotEmpty()) {
    let {node: currentNode, smallNodes} = Queue.dequeue()
    if (currentNode === 'end') {
      answer++
      continue
    }

    const adjacentNodes = AdjacencyList[currentNode]

    for (let node of adjacentNodes) {
      if (smallNodes.includes(node)) {
        continue
      }

      let smallNodesCopy = smallNodes.slice()

      if (isSmall(node)) {
        smallNodesCopy.push(node)
      }

      Queue.enqueue({node, smallNodes: smallNodesCopy})
    }
  }

  return answer
}

function isSmall(node) {
  return node === node.toLowerCase()
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

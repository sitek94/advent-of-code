import {run} from '~/run'

function solve(input: string) {
  const edges = new Map<string, Set<string>>()
  const nodes = new Set<string>()

  input
    .split('\n')
    .map(line => line.split('-'))
    .forEach(([a, b]) => {
      if (!edges.has(a)) edges.set(a, new Set())
      if (!edges.has(b)) edges.set(b, new Set())
      edges.get(a)!.add(b)
      edges.get(b)!.add(a)
      nodes.add(a)
      nodes.add(b)
    })

  const sets = new Set<string>()

  nodes.forEach(a => {
    const edgesA = edges.get(a)
    edgesA.forEach(b => {
      const edgesB = edges.get(b)
      const commonEdges = edgesA.intersection(edgesB)
      commonEdges.forEach(c => {
        sets.add(key(a, b, c))
      })
    })
  })

  // Count of three inter-connected computers where at least one starts with `t`
  const count = [...sets].filter(s => {
    const nodes = s.split(',')
    return nodes.some(n => n.startsWith('t'))
  }).length

  return count
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 7},
    {input: 'input.txt', expected: 1043},
  ],
})

function key(a: string, b: string, c: string) {
  return [a, b, c].toSorted().join(',')
}

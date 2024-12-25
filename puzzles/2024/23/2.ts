import {run} from '~/run'

function solve(input: string) {
  const {nodesSets} = parseInput(input)

  const valid = new Set<string>()

  nodesSets.forEach((nodesA, keyA) => {
    const intersections = new Map<string, Set<string>>()

    nodesSets.forEach((nodesB, keyB) => {
      intersections.set(`${keyA}-${keyB}`, nodesA.intersection(nodesB))
    })

    intersections.forEach(interA => {
      const counts = new Map<string, number>()

      intersections.forEach(interB => {
        const intersection = interA.intersection(interB)
        if (intersection.size) {
          const key = toKey(intersection)
          counts.set(key, (counts.get(key) || 0) + 1)
        }
      })

      counts.forEach((count, key) => {
        const parts = key.split(',')
        const isValid = count === parts.length
        if (isValid) {
          valid.add(key)
        }
      })
    })
  })

  // Password is the name of every computer at the LAN party, sorted alphabetically,
  // then joined together with commas.
  let password = ''

  valid.forEach(key => {
    if (key.length > password.length) {
      password = key
    }
  })

  return password
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 'co,de,ka,ta'},
    {input: 'input.txt', expected: 'ai,bk,dc,dx,fo,gx,hk,kd,os,uz,xn,yk,zs'},
  ],
})

function parseInput(input: string) {
  const nodesSets = new Map<string, Set<string>>()
  const nodes = new Set<string>()

  input
    .split('\n')
    .map(line => line.split('-'))
    .forEach(([a, b]) => {
      if (!nodesSets.has(a)) nodesSets.set(a, new Set([a]))
      if (!nodesSets.has(b)) nodesSets.set(b, new Set([b]))

      nodesSets.get(a)!.add(b)
      nodesSets.get(b)!.add(a)
      nodes.add(a)
      nodes.add(b)
    })

  // const edges = [...edgesMap.values()]

  return {nodes, nodesSets}
}

function toKey(set: Set<string>) {
  return [...set].toSorted().join(',')
}

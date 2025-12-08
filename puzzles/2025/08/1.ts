import {run} from '~/run'

type Point = {x: number; y: number; z: number; key: string}
type Edge = {a: Point; b: Point; distance: number; key: string}

function solve(input: string, {limit}: {limit: number}) {
  const allBoxesKeys = new Set<string>()
  const edges = new Map<string, Edge>()

  const boxes = input.split('\n').map(line => {
    const [x, y, z] = line.split(',').map(Number)
    const key = line
    const point = {x, y, z, key} as Point

    allBoxesKeys.add(key)

    return point
  })

  boxes.forEach(a => {
    boxes.forEach(b => {
      if (a.key === b.key) return

      const distance = euclideanDistance(a, b)
      const key = [a.key, b.key].toSorted().join(' - ')

      if (!edges.has(key)) {
        edges.set(key, {a, b, key, distance})
      }
    })
  })

  const circuits = [] as Set<string>[]
  const edgesList = edges
    .values()
    .toArray()
    .toSorted((a, b) => a.distance - b.distance)

  let connectionsMade = 0

  for (let {a, b} of edgesList.slice(0, limit)) {
    const circuitA = circuits.find(c => c.has(a.key))
    const circuitB = circuits.find(c => c.has(b.key))

    if (circuitA && circuitB) {
      if (circuitA === circuitB) continue // same circuit, skip
      // merge B into A
      for (const key of circuitB) circuitA.add(key)
      circuits.splice(circuits.indexOf(circuitB), 1)
    } else if (circuitA) {
      circuitA.add(b.key)
    } else if (circuitB) {
      circuitB.add(a.key)
    } else {
      circuits.push(new Set([a.key, b.key]))
    }
    connectionsMade++
  }

  console.log(circuits)

  // remaining single boxes are circuits of size 1
  const allSizes = [
    ...circuits.map(c => c.size),
    ...Array.from(allBoxesKeys).map(() => 1),
  ]
  allSizes.sort((a, b) => b - a)

  return allSizes[0] * allSizes[1] * allSizes[2]
}

function euclideanDistance(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2)
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 40, limit: 10},
    {input: 'input.txt', expected: 100, limit: 1000},
  ],
})

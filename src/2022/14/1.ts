import range from 'just-range'

import { run } from '../../runner'

type Coords = {
  x: number
  y: number
}
type Node = {
  id: string
} & Coords

const getId = (coords: Coords) => `${coords.x},${coords.y}`
const createNode = (coords: Coords) => ({
  ...coords,
  id: getId(coords),
})

const paddingY = 10
const paddingX = 2

const parseRocksInput = (input: string) => {
  const initialMap = new Map<string, Node>()

  input.split('\n').forEach(line => {
    const points = line.split(' -> ').map(point => {
      const [x, y] = point.split(',').map(Number)
      return {
        x: +x,
        y: +y,
      }
    })

    for (let i = 0; i < points.length; i++) {
      const current = points[i]
      const next = points[i + 1]

      if (next) {
        if (current.y === next.y) {
          for (let x of range(
            current.x,
            next.x + Math.sign(next.x - current.x),
          )) {
            const node = { x, y: current.y }
            const id = getId(node)
            initialMap.set(id, { ...node, id })
          }
        }
        if (current.x === next.x) {
          for (let y of range(
            current.y,
            next.y + Math.sign(next.y - current.y),
          )) {
            const node = { x: current.x, y }
            const id = getId(node)
            initialMap.set(id, { ...node, id })
          }
        }
      }
    }
  })

  const rocksList: Node[] = Array.from(initialMap.values())

  const minX = Math.min(...rocksList.map(rock => rock.x))
  const minY = Math.min(...rocksList.map(rock => rock.y))
  const maxX = Math.max(...rocksList.map(rock => rock.x))
  const maxY = Math.max(...rocksList.map(rock => rock.y))

  const width = maxX - minX + paddingX * 2
  const height = maxY - minY + paddingY * 2

  const rocksMap = new Map<string, Node>()

  for (let { x, y } of initialMap.values()) {
    const node = createNode({
      x: x - minX + paddingX,
      y: y,
    })
    rocksMap.set(node.id, node)
  }

  return {
    map: rocksMap,
    width,
    height,
    minX,
  }
}

function solve(input: string) {
  const { map: rocksMap, width, height, minX } = parseRocksInput(input)

  const sandStart = { x: 500 - minX + paddingX, y: 0 }
  const createStartSand = () => createNode(sandStart)

  const sandsMap = new Map<string, Node>()

  const isRock = (node: Node) => rocksMap.has(node.id)
  const isOutside = (node: Coords) =>
    node.x < 0 || node.x >= width || node.y < 0 || node.y >= height
  const isSand = (node: Node) => sandsMap.has(node.id)
  const isEqual = (a: Node, b: Node | null) => a?.x === b?.x && a?.y === b?.y

  const canMoveTo = (node: Node) =>
    !isOutside(node) && !isRock(node) && !isSand(node)

  const gravity = (sand: Node) => {
    const below = createNode({ x: sand.x, y: sand.y + 1 })
    const belowLeft = createNode({ x: sand.x - 1, y: sand.y + 1 })
    const belowRight = createNode({ x: sand.x + 1, y: sand.y + 1 })

    if (isOutside(below)) {
      return null
    }

    if (canMoveTo(below)) {
      return below
    }

    if (canMoveTo(belowLeft)) {
      return belowLeft
    }

    if (canMoveTo(belowRight)) {
      return belowRight
    }

    return sand
  }

  const simulate = (current: Node) => {
    const next = gravity(current)
    if (next === null) {
      return null
    }

    if (isEqual(current, next)) {
      sandsMap.set(current.id, current)
      return current
    } else {
      return simulate(next)
    }
  }

  let sand = simulate(createStartSand())

  while (sand) {
    sand = simulate(createStartSand())
  }

  return sandsMap.size
}

run({
  solve,
  tests: [
    {
      expected: 24,
    },
    {
      useOriginalInput: true,
      expected: 728,
    },
  ],
  onlyTests: true,
})

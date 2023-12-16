<script lang="ts">
  import {cn} from '~/lib/utils'

  export let input: string

  const UP = 'up'
  const DOWN = 'down'
  const LEFT = 'left'
  const RIGHT = 'right'
  const directions = [UP, DOWN, LEFT, RIGHT]

  type Point = {x: number; y: number}
  type Direction = (typeof directions)[number]
  type Destination = '/' | '\\' | '|' | '-' | '.'

  const grid = input.split('\n').map(line => line.split(''))
  const width = grid[0].length
  const height = grid.length
  const start: Point = {x: -1, y: 0}

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  let current = start
  let visited = new Map<string, boolean>()
  let visitedPoints = [] as string[]

  const getScore = async (
    start: Point,
    direction: Direction,
    grid: string[][],
  ) => {
    const queue = [[start, direction] satisfies [Point, Direction]]

    while (queue.length) {
      if (!running) break

      await sleep(50)

      const [p, direction] = queue.shift() as [Point, Direction]

      current = p

      let x = p.x
      let y = p.y

      if (direction === UP) y--
      if (direction === DOWN) y++
      if (direction === LEFT) x--
      if (direction === RIGHT) x++

      const destination = grid[y]?.[x] as Destination | undefined

      // Outside grid
      if (!destination) continue

      const key = getKey({x, y}, direction)

      const isVisited = visited.get(key)
      if (isVisited) continue

      // Mark as visited
      visited.set(key, true)
      visitedPoints = [...visitedPoints, getSimpleKey({x, y})]

      // Continue
      if (destination === '.') {
        queue.push([{x, y}, direction])
      }

      // Mirror
      if (destination === '/' || destination === `\\`) {
        const newDirection = getMirroredDirection(direction, destination)
        queue.push([{x, y}, newDirection])
      }

      // Splitter
      if (destination === '|' || destination === '-') {
        const newDirections = getSplitterDirections(direction, destination)

        for (const newDirection of newDirections) {
          queue.push([{x, y}, newDirection])
        }
      }
    }

    const unique = new Set([...visited.keys()].map(fromKey).map(p => p.key))

    return unique.size
  }

  const getKey = (p: Point, direction: Direction) =>
    `${p.x},${p.y}:${direction}`

  const fromKey = (key: string) => {
    const pointKey = key.split(':')[0]
    const [x, y] = pointKey.split(',')
    return {key: pointKey, x: Number(x), y: Number(y)}
  }

  const getSimpleKey = (p: Point) => `${p.x},${p.y}`

  const getMirroredDirection = (current: Direction, mirror: '\\' | '/') => {
    if (current === UP) {
      if (mirror === '/') return RIGHT
      if (mirror === `\\`) return LEFT
    }
    if (current === DOWN) {
      if (mirror === '/') return LEFT
      if (mirror === `\\`) return RIGHT
    }
    if (current === LEFT) {
      if (mirror === '/') return DOWN
      if (mirror === `\\`) return UP
    }
    if (current === RIGHT) {
      if (mirror === '/') return UP
      if (mirror === `\\`) return DOWN
    }

    throw new Error(`Unknown mirror: ${mirror}`)
  }

  const getSplitterDirections = (current: Direction, splitter: '|' | '-') => {
    if (current === UP || current === DOWN) {
      if (splitter === '|') return [current]
      if (splitter === '-') return [LEFT, RIGHT]
    }
    if (current === LEFT || current === RIGHT) {
      if (splitter === '|') return [UP, DOWN]
      if (splitter === '-') return [current]
    }

    throw new Error(`Unknown splitter: ${splitter}`)
  }

  let running = false

  let toggleStartStop = () => {
    if (running) {
      running = false
      visited = new Map()
      visitedPoints = []

      return
    }

    running = true
    getScore(start, RIGHT, grid)
  }

  const isVisitedPoint = (p: Point) => visitedPoints.includes(getSimpleKey(p))
</script>

<aside class="absolute p-4">
  <button
    class={cn(
      'border px-4 py-2 bg-blue-500 text-white rounded',
      running && 'border-blue-500 bg-transparent',
    )}
    on:click={toggleStartStop}
  >
    {running ? 'Stop' : 'Start'}
  </button>
</aside>

<div class="container h-screen flex items-center justify-center">
  <div
    class="grid"
    style="width: 80%; height: 80%; grid-template-columns: repeat({width}, 1fr); grid-template-rows: repeat({height}, 1fr);"
  >
    {#each grid as row, y}
      {#each row as cell, x}
        <span
          class={cn(
            'flex items-center justify-center border-gray-400 border text-4xl font-mono text-gray-400',
            isVisitedPoint({x, y}) && 'bg-gray-800',
            current.x === x && current.y === y && 'bg-blue-500 text-white',
          )}
        >
          {cell}
        </span>
      {/each}
    {/each}
  </div>
</div>

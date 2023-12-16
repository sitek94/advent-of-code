<script lang="ts">
  export let input: string

  const UP = 'up'
  const DOWN = 'down'
  const LEFT = 'left'
  const RIGHT = 'right'
  const directions = [UP, DOWN, LEFT, RIGHT]

  type Point = {x: number; y: number}
  type Direction = (typeof directions)[number]
  type Destination = '/' | '\\' | '|' | '-' | '.'

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const grid = input.split('\n').map(line => line.split(''))

  const WIDTH = grid[0].length
  const HEIGHT = grid.length

  const getKey = (p: Point) => `${p.x},${p.y}`

  const start: Point = {x: -1, y: 0}

  const energized = {[getKey(start)]: 1} as Record<string, number>

  let current = start
  let steps = 0

  const go = async (p: Point, direction: Direction) => {
    console.log(p, direction)

    if (steps++ > 10000) return

    current = p

    await sleep(0)

    let x = p.x
    let y = p.y

    if (direction === UP) y--
    if (direction === DOWN) y++
    if (direction === LEFT) x--
    if (direction === RIGHT) x++

    const destination = grid[y]?.[x] as Destination | undefined

    // Outside grid
    if (!destination) return

    // Mark as energized
    const key = getKey({x, y})
    energized[key] = (energized[key] ?? 0) + 1

    // Continue
    if (destination === '.') {
      go({x, y}, direction)
      return
    }

    // Mirror
    if (destination === '/' || destination === `\\`) {
      const newDirection = getMirroredDirection(direction, destination)
      go({x, y}, newDirection)
      return
    }

    // Splitter
    if (destination === '|' || destination === '-') {
      const newDirections = getSplitterDirections(direction, destination)

      for (const newDirection of newDirections) {
        go({x, y}, newDirection)
      }

      return
    }
  }

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
</script>

<!-- Grid -->

<button
  on:click={() => {
    go(start, RIGHT)
  }}>Start</button
>

<div class="container">
  <div
    class="grid"
    style="grid-template-columns: repeat({WIDTH}, 1fr); grid-template-rows: repeat({HEIGHT}, 1fr);"
  >
    {#each grid as row, y}
      {#each row as cell, x}
        <span
          class="cell"
          class:current={current.x === x && current.y === y}
          style="background: rgba(255, 255, 255, {energized[getKey({x, y})] *
            1});"
        >
          {cell}
        </span>
      {/each}
    {/each}
  </div>
</div>

<style>
  button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .grid {
    /* width: 1000px;
    height: 1000px; */
    display: grid;
  }

  .cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.5px solid #ccc;
    font-size: 0.3rem;
    width: 10px;
    height: 10px;
    line-height: 1;
  }

  .cell.current {
    background: #ccc;
  }
</style>

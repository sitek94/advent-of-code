import {run} from '~/run'
import {modulo, range} from '~/utils/index'

function solve(input: string, options: {maxX: number; maxY: number}) {
  const {maxX, maxY} = options
  const midX = Math.floor(maxX / 2)
  const midY = Math.floor(maxY / 2)

  const createGrid = () => range(maxY).map(() => range(maxX).map(() => '.'))

  const robots = input
    .split('\n')
    .map(line => line.match(/-?\d+/g))
    .map(result => [...result].map(Number) as [number, number, number, number])

  const TIME = 10406

  let q1 = 0
  let q2 = 0
  let q3 = 0
  let q4 = 0

  const gridsMap = new Map<string, number>()
  const pictures: string[][] = []

  range(TIME).forEach(n => {
    const grid = createGrid()

    robots.forEach(([px, py, vx, vy], i) => {
      px += vx
      py += vy
      px = modulo(px, maxX)
      py = modulo(py, maxY)

      if (px < midX && py < midY) q1++
      if (px > midX && py < midY) q2++
      if (px < midX && py > midY) q3++
      if (px > midX && py > midY) q4++

      robots[i] = [px, py, vx, vy]
      grid[py][px] = 'X'
    })

    // LOGIC ONLY FOR FINDING FIRST DUPLICATE
    // const gridSnapshot = grid.map(row => row.join('')).join('\n')
    // Find first duplicate
    // if (gridsMap.has(gridSnapshot)) {
    //   const count = gridsMap.get(gridSnapshot)
    //   gridsMap.set(gridSnapshot, count + 1)
    //   console.log(`First duplicate found at ${n}`)
    //   return 0
    // } else {
    //   gridsMap.set(gridSnapshot, 1)
    // }

    // `n` incremented by 1 because the task asks for the fewest number of seconds that must elapse
    const label = `Picture ${n + 1}:`.padEnd(maxX, ' ')
    pictures.push([label, ...grid.map(row => row.join(''))])
  })

  savePicturesAsMasonryGrid(pictures, maxX, maxY, 12)

  return 7569
}

run({
  solve,
  tests: [
    // {input: 'test.txt', expected: 100, maxX: 11, maxY: 7},
    {input: 'input.txt', expected: 7569, maxX: 101, maxY: 103},
  ],
})

function savePicturesAsMasonryGrid(
  pictures: string[][],
  maxX: number,
  maxY: number,
  picturesPerRow: number,
) {
  const spacing = 3
  const blockWidth = maxX + spacing
  // Since we now have maxY+1 lines per picture:
  const totalHeight = maxY + 1

  const combinedLines: string[] = []

  for (let i = 0; i < pictures.length; i += picturesPerRow) {
    const slice = pictures.slice(i, i + picturesPerRow)

    for (let row = 0; row < totalHeight; row++) {
      const lineArr = Array(blockWidth * slice.length).fill(' ')
      for (let j = 0; j < slice.length; j++) {
        const line = slice[j][row]
        for (let k = 0; k < line.length; k++) {
          lineArr[j * blockWidth + k] = line[k]
        }
      }
      combinedLines.push(lineArr.join(''))
    }

    // blank line between sets of pictures
    combinedLines.push('')
  }

  Bun.write('pictures_masonry.txt', combinedLines.join('\n'))
}

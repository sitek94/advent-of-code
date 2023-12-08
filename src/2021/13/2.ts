import {run} from '~/runner'
import {abs} from '../../utils'

function solve(input: string) {
  let [dotsInput, instructionsInput] = input.split('\n\n')

  let instructions = instructionsInput
    .split('\n')
    .map(l => l.split(' ').at(-1).split('='))

  let dots = dotsInput.split('\n').map(l => l.split(',').map(Number))

  let lastX = -1
  let lastY = -1
  dots.forEach(([x, y]) => {
    if (x > lastX) lastX = x
    if (y > lastY) lastY = y
  })
  let width = lastX + 1
  let height = lastY + 1

  let grid = new Array(height).fill(null).map(() => new Array(width).fill('.'))

  dots.forEach(([x, y]) => {
    grid[y][x] = '#'
  })

  let foldedX = 1
  let foldedY = 1

  instructions.forEach(([dir, val], i) => {
    if (dir === 'x') {
      foldX(Number(val), height / foldedY, width / foldedX)
      foldedX *= 2
    } else {
      foldY(Number(val), height / foldedY, width / foldedX)
      foldedY *= 2
    }
  })

  function foldX(xPos: number, h: number, w: number) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (grid[y][x] === '.') continue
        if (x > xPos) {
          let newX = abs(x - xPos * 2)
          grid[y][newX] = '#'
        }
      }
    }
  }

  function foldY(yPos: number, h: number, w: number) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (grid[y][x] === '.') continue
        if (y > yPos) {
          let newY = abs(y - yPos * 2)
          grid[newY][x] = '#'
        }
      }
    }
  }

  let count = 0
  for (let y = 0; y < height / foldedY; y++) {
    for (let x = 0; x < width / foldedX; x++) {
      let v = grid[y][x]

      if (v !== '.') {
        count++
      }
    }
  }
  let newH = height / foldedY
  let newW = width / foldedX

  print(grid, newH, newW)

  return count
}

run({
  solve,
  tests: [
    {
      input: `
        6,10
        0,14
        9,10
        0,3
        10,4
        4,11
        6,0
        6,12
        4,1
        0,13
        10,12
        3,4
        3,0
        8,4
        1,10
        2,14
        8,10
        9,0
        
        fold along y=7
        fold along x=5`,
      expected: 16,
    },
  ],
  // onlyTests: true,
})

function print(grid: string[][], h: number, w: number) {
  let toPrint = ''
  for (let y = 0; y < h; y++) {
    let line = ''
    for (let x = 0; x < w; x++) {
      line += grid[y][x]
    }
    line += '\n'
    toPrint += line
  }
  console.log(toPrint)
}

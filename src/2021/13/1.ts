import { run } from '~/runner'
import { abs } from '../../utils'

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

  let [dir, val] = instructions[0]
  let foldPos = +val

  if (dir === 'x') {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === '.') continue
        if (x > foldPos) {
          let newX = abs(x - foldPos * 2)
          grid[y][newX] = '#'
        }
      }
    }
  } else if (dir === 'y') {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === '.') continue

        if (y > foldPos) {
          let newY = abs(y - foldPos * 2)
          grid[newY][x] = '#'
        }
      }
    }
  }

  let count = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let v = grid[y][x]

      if (v !== '.') {
        if (dir === 'x' && x < foldPos) {
          count++
        }
        if (dir === 'y' && y < foldPos) {
          count++
        }
      }
    }
  }

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
      expected: 17,
    },
  ],
  // onlyTests: true,
})

function print(grid: string[][]) {
  let toPrint = ''
  for (let y = 0; y < grid.length; y++) {
    let line = ''
    for (let x = 0; x < grid[0].length; x++) {
      line += grid[y][x]
    }
    line += '\n'
    toPrint += line
  }
  console.log(toPrint)
}

import { run } from '~/runner'
import util from 'util'

const isDigit = (c: string) => c >= '0' && c <= '9'
const isSymbol = (c: string) => c !== undefined && c !== '.'
const log = (...args: any[]) => {
  console.log(
    util.inspect(args, { showHidden: false, depth: null, colors: true }),
  )
}

function solve(input: string) {
  const lines = input.split('\n')

  type PotentialPart = {
    number: string
    coords: { x: number; y: number }[]
  }

  const grid = []
  const parts = [] as PotentialPart[]

  lines.forEach((line, y) => {
    grid.push(line)
    let number = ''
    let coords = []

    line.split('').forEach((char, x) => {
      if (isDigit(char)) {
        number += char
        coords.push({ x, y })
      } else if (number.length) {
        parts.push({ number, coords })
        number = ''
        coords = []

        // Consider last number in line
      } else if (x === line.length - 1 && number.length) {
        parts.push({ number, coords })
        number = ''
        coords = []
      }
    })
  })

  let score = 0

  parts.forEach(({ coords, number }) => {
    let isValid = false

    coords.forEach(({ x, y }, i) => {
      if (isValid) return

      // first coord
      if (i === 0) {
        let topLeft = grid[y - 1]?.[x - 1]
        let left = grid[y]?.[x - 1]
        let bottomLeft = grid[y + 1]?.[x - 1]
        if (isSymbol(topLeft) || isSymbol(left) || isSymbol(bottomLeft)) {
          isValid = true
        }
      }

      // middle coords
      let top = grid[y - 1]?.[x]
      let bottom = grid[y + 1]?.[x]
      if (isSymbol(top) || isSymbol(bottom)) {
        isValid = true
      }

      // last coord
      if (i === coords.length - 1) {
        let topRight = grid[y - 1]?.[x + 1]
        let right = grid[y]?.[x + 1]
        let bottomRight = grid[y + 1]?.[x + 1]
        if (isSymbol(topRight) || isSymbol(right) || isSymbol(bottomRight)) {
          isValid = true
        }
      }
    })

    if (isValid) {
      score += +number
    }
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 4361,
    },
  ],
  onlyTests: false,
})

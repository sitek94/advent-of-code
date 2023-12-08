import { run } from '~/runner'
import groupBy from 'just-group-by'

const isDigit = (c: string) => c >= '0' && c <= '9'
const isSymbol = (c: string) => c !== undefined && c !== '.'

function solve(input: string) {
  const lines = input.split('\n')

  type PotentialPart = {
    number: string
    coords: { x: number; y: number }[]
    gear: { x: number; y: number } | null
  }

  const grid = []
  const parts = [] as PotentialPart[]

  const check = (x: number, y: number) => {
    const value = grid[y]?.[x]
    return {
      isSymbol: isSymbol(value),
      gear: value === '*' ? { x, y } : null,
    }
  }

  lines.forEach((line, y) => {
    grid.push(line)
    let number = ''
    let coords = []

    line.split('').forEach((char, x) => {
      if (isDigit(char)) {
        number += char
        coords.push({ x, y })
      } else if (number.length) {
        parts.push({ number, coords, gear: null })
        number = ''
        coords = []
      }
      // Consider last number in line
      if (x === line.length - 1 && number.length) {
        parts.push({ number, coords, gear: null })
        number = ''
        coords = []
      }
    })
  })

  const withGear = [] as PotentialPart[]

  parts.forEach(({ coords, number }) => {
    let isValid = false
    let gear: PotentialPart['gear'] = null

    coords.forEach(({ x, y }, i) => {
      if (isValid) return

      // first coord
      if (i === 0) {
        let topLeft = check(x - 1, y - 1)
        let left = check(x - 1, y)
        let bottomLeft = check(x - 1, y + 1)

        if (topLeft.isSymbol || left.isSymbol || bottomLeft.isSymbol) {
          isValid = true
        }
        if (topLeft.gear || left.gear || bottomLeft.gear) {
          gear = topLeft.gear || left.gear || bottomLeft.gear
        }
      }

      // middle coords
      let top = check(x, y - 1)
      let bottom = check(x, y + 1)
      if (top.isSymbol || bottom.isSymbol) {
        isValid = true
      }
      if (top.gear || bottom.gear) {
        gear = top.gear || bottom.gear
      }

      // last coord
      if (i === coords.length - 1) {
        let topRight = check(x + 1, y - 1)
        let right = check(x + 1, y)
        let bottomRight = check(x + 1, y + 1)

        if (topRight.isSymbol || right.isSymbol || bottomRight.isSymbol) {
          isValid = true
        }
        if (topRight.gear || right.gear || bottomRight.gear) {
          gear = topRight.gear || right.gear || bottomRight.gear
        }
      }
    })

    if (gear) {
      withGear.push({ number, coords, gear })
    }
  })

  const grouped = Object.values(
    groupBy(withGear, ({ gear: { x, y } }) => `${x},${y}`),
  )

  const atLeastTwo = grouped.filter(group => group.length > 1)

  const score2 = atLeastTwo.reduce((sum, parts) => {
    return sum + parts.reduce((result, { number }) => result * +number, 1)
  }, 0)

  return score2
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 467835,
    },
  ],
  onlyTests: false,
})

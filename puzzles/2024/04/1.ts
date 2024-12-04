import {run} from '~/run'

function solve(input: string) {
  const lines = input.split('\n')
  const width = lines[0].length
  const height = lines.length

  let total = 0

  // horizontals
  for (const line of lines) {
    total += countXmas(line)
  }

  // verticals
  for (let x = 0; x < width; x++) {
    let vertical = ''
    for (let y = 0; y < height; y++) {
      vertical += lines[y][x]
    }
    total += countXmas(vertical)
  }

  // diagonals top left to bottom right
  for (let startX = -height + 1; startX < width; startX++) {
    let diagonal = ''
    for (let i = 0; i < height; i++) {
      const x = startX + i
      if (x >= 0 && x < width) {
        diagonal += lines[i][x]
      }
    }
    total += countXmas(diagonal)
  }

  // diagonals top right to bottom left
  for (let startX = 0; startX < width + height - 1; startX++) {
    let diagonal = ''
    for (let i = 0; i < height; i++) {
      const x = startX - i
      if (x >= 0 && x < width) {
        diagonal += lines[i][x]
      }
    }
    total += countXmas(diagonal)
  }

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 18,
    },
    {
      input: 'input.txt',
      expected: 2427,
    },
  ],
})

function countXmas(input: string) {
  const forward = (input.match(/XMAS/g) || []).length
  const backward = (input.match(/SAMX/g) || []).length
  return forward + backward
}

import {run} from '~/run'

/*
Possible patterns:
M S 
 A 
M S 

M M
 A
S S

S M
 A
S M

S S 
 A
M M
*/

function solve(input: string) {
  const lines = input.split('\n')
  const width = lines[0].length
  const height = lines.length
  let total = 0

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const top = lines[y - 1].slice(x - 1, x + 2)
      const middle = lines[y].slice(x - 1, x + 2)
      const bottom = lines[y + 1].slice(x - 1, x + 2)

      const box = top + middle + bottom

      const patterns = [/M.M.A.S.S/, /S.M.A.S.M/, /S.S.A.M.M/, /M.S.A.M.S/]

      const isXmas = patterns.some(pattern => box.match(pattern))

      if (isXmas) {
        total++
      }
    }
  }

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 9,
    },
    {
      input: 'input.txt',
      expected: 1900,
    },
  ],
})

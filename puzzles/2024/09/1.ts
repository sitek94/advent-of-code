import {run} from '~/run'

function solve(input: string) {
  const disk: number[] = []

  let fileId = 0

  input
    .split('')
    .map(Number)
    .forEach((length, i) => {
      let isFile = i % 2 === 0
      for (let j = 0; j < length; j++) {
        disk.push(isFile ? fileId : -1)
      }
      if (isFile) fileId++
    })

  let first = 0
  let last = disk.length - 1

  while (first !== last) {
    if (disk[first] === -1) {
      if (disk[last] !== -1) {
        disk[first] = disk[last]
        disk[last] = -1
      }
      last--
    } else {
      first++
    }
  }

  const final = disk.filter(i => i !== -1)
  const checksum = final.reduce((acc, n, i) => acc + n * i, 0)

  return checksum
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 1928,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})

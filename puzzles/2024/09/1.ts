import {run} from '~/run'

function solve(input: string) {
  let newString = ''

  let id = 0

  input
    .split('')
    .map(Number)
    .forEach((n, i) => {
      let isFile = i % 2 === 0
      newString += `${isFile ? id : '.'}`.repeat(n)
      if (isFile) id++
    })

  const arr = newString.split('')
  console.log(arr.join(''))
  let first = 0
  let last = arr.length - 1

  while (first !== last) {
    if (arr[first] === '.') {
      if (arr[last] !== '.') {
        arr[first] = arr[last]
        arr[last] = '.'
      }
      last--
    } else {
      first++
    }
  }

  const final = arr.filter(i => i !== '.').map(Number)
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

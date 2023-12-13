import {run} from '~/run'

function solve(input: string) {
  const inputs = input.split('\n\n')

  let score = 0

  inputs.forEach((input, i) => {
    const {rows, columns} = getColumnsAndRows(input)

    let inputScore = 0

    let rowReflectionCount = getReflectionCount(rows)
    if (rowReflectionCount === 0) {
      rowReflectionCount = getReflectionCountAlt(rows)
    }

    inputScore += rowReflectionCount * 100

    let columnReflectionCount = getReflectionCount(columns)

    if (columnReflectionCount === 0) {
      columnReflectionCount = getReflectionCountAlt(columns)
    }

    inputScore += columnReflectionCount

    score += inputScore
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 405,
    },
    {
      input: 'test2.txt',
      expected: 19,
    },
    {
      input: 'test3.txt',
      expected: 300,
    },
    {
      input: 'test4.txt',
      expected: 1300,
    },
    {
      input: 'test5.txt',
      expected: 100,
    },
    {
      input: 'test6.txt',
      expected: 12,
    },
    {
      input: 'test7.txt',
      expected: 300,
    },
    {
      input: 'test8.txt',
      expected: 1300,
    },
    {
      input: 'test9.txt',
      expected: 800,
    },
    {
      input: 'input.txt',
      expected: 37113,
    },
  ],
})

const getReflectionCount = (lines: string[]) => {
  let start = 0
  let end = lines.length - 1
  let isMirror = false

  while (start < end) {
    if (lines[start] === lines[end]) {
      isMirror = true
      start++
      end--
    } else {
      if (isMirror) {
        isMirror = false
        end = lines.length - 1
      }
      start++
    }
  }

  if (start === 1 && end === 1) {
    return 0
  }

  return isMirror ? start : 0
}

const getReflectionCountAlt = (lines: string[]) => {
  let start = 0
  let end = lines.length - 1
  let isMirror = false

  while (start < end) {
    if (lines[start] === lines[end]) {
      isMirror = true
      start++
      end--
    } else {
      if (isMirror) {
        isMirror = false
        start = 0
      }
      end--
    }
  }

  if (start === 1 && end === 1) {
    return 0
  }

  return isMirror ? start : 0
}

const getColumnsAndRows = (input: string) => {
  const rows = input.split('\n')

  const columns = [] as string[]

  for (let i = 0; i < rows[0].length; i++) {
    columns.push(rows.map(line => line[i]).join(''))
  }

  return {
    rows,
    columns,
  }
}

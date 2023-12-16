import {run} from '~/run'

function solve(input: string) {
  const inputs = input.split('\n\n')

  let score = 0

  inputs.forEach((input, i) => {
    const {rows, columns} = getColumnsAndRows(input)

    score += checkSymmetry(rows) * 100
    score += checkSymmetry(columns)
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 400,
    },
    // {
    //   input: 'test2.txt',
    //   expected: 19,
    // },
    // {
    //   input: 'test9.txt',
    //   expected: 800,
    // },
    // {
    //   input: 'input.txt',
    //   expected: 37113,
    // },
  ],
})

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

const checkSymmetry = (columns: string[]) => {
  let score = 0

  for (let columnIndex = 0; columnIndex < columns.length - 1; columnIndex++) {
    let unSymmetryScore = 0

    let column = columns[columnIndex]

    for (let offset = 0; offset < column.length; offset++) {
      let leftIndex = columnIndex - offset
      let rightIndex = columnIndex + offset + 1

      if (leftIndex >= 0 && rightIndex <= column.length) {
        let left = columns[leftIndex]
        let right = columns[rightIndex]

        for (let charIndex = 0; charIndex < left.length; charIndex++) {
          if (left?.[charIndex] !== right?.[charIndex]) {
            unSymmetryScore++
          }
        }
      }
    }

    if (unSymmetryScore === 1) {
      score = columnIndex
    }
  }

  return score
}

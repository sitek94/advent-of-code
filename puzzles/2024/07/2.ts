import {run} from '~/run'

function solve(input: string) {
  const lines = input.split('\n')

  let score = 0

  for (const line of lines) {
    console.log(line)
    const [testValue, ...numbers] = line
      .split(': ')
      .map(p => p.split(' '))
      .flat()
      .map(Number)

    if (isSomePermutationTruthy(testValue, numbers)) {
      score += testValue
      continue
    }
  }

  return score
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 100,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})

function isSomePermutationTruthy(testValue: number, numbers: number[]) {
  const operatorPermutations = allPermutations(
    ['*', '+', 'c'],
    numbers.length - 1,
  )

  for (const operators of operatorPermutations) {
    if (isTruthyEquation(testValue, numbers, operators)) {
      return true
    }
  }
  return false
}

function isTruthyEquation(
  testValue: number,
  numbers: number[],
  operators: string[],
) {
  let [total, ...restNumbers] = numbers

  restNumbers.forEach((n, i) => {
    let operator = operators[i]
    if (operator === '*') total = total * n
    if (operator === '+') total = total + n
    if (operator === 'c') total = +`${total}${n}`

    if (total > testValue) return false
  })

  if (total === testValue) {
    return true
  }

  return false
}

function allPermutations<T extends string | number>(arr: T[], length: number) {
  const result = [] as T[][]

  function generate(current: T[]) {
    if (current.length === length) {
      result.push([...current])
      return
    }

    for (let i = 0; i < arr.length; i++) {
      current.push(arr[i])
      generate(current)
      current.pop()
    }
  }

  generate([])
  return result
}

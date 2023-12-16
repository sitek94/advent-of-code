import {run} from '~/runner'

/**
 *  ⚠️ This solution is super slow, it took ~10 minutes to run. But it's
 *  the only thing I came up without checking other solutions. I might refactor
 *  it, when I check how others have solved it.
 */

const STATE = [
  [74, 73, 57, 77, 74],
  [99, 77, 79],
  [64, 67, 50, 96, 89, 82, 82],
  [88],
  [80, 66, 98, 83, 70, 63, 57, 66],
  [81, 93, 90, 61, 62, 64],
  [69, 97, 88, 93],
  [59, 80],
].map(row =>
  row.map(item => ({
    value: item,
    history: [],
  })),
)

const MONKEYS = [
  {
    operation: '* 11',
    modulo: 19,
    ifTrue: 6,
    ifFalse: 7,
    inspectionsCount: 0,
  },
  {
    operation: '+ 8',
    modulo: 2,
    ifTrue: 6,
    ifFalse: 0,
    inspectionsCount: 0,
  },
  {
    operation: '+ 1',
    modulo: 3,
    ifTrue: 5,
    ifFalse: 3,
    inspectionsCount: 0,
  },
  {
    operation: '* 7',
    modulo: 17,
    ifTrue: 5,
    ifFalse: 4,
    inspectionsCount: 0,
  },
  {
    operation: '+ 4',
    modulo: 13,
    ifTrue: 0,
    ifFalse: 1,
    inspectionsCount: 0,
  },

  {
    operation: '+ 7',
    modulo: 7,
    ifTrue: 1,
    ifFalse: 4,
    inspectionsCount: 0,
  },
  {
    operation: '** 2',
    modulo: 5,
    ifTrue: 7,
    ifFalse: 2,
    inspectionsCount: 0,
  },
  {
    operation: '+ 6',
    modulo: 11,
    ifTrue: 2,
    ifFalse: 3,
    inspectionsCount: 0,
  },
]

const add = (a: number, b: number, divisor: number) =>
  ((a % divisor) + (b % divisor)) % divisor

const multiply = (a: number, b: number, divisor: number) =>
  ((a % divisor) * (b % divisor)) % divisor

const CACHE = {}

const evaluate = (a: number, b: number, operator: string, divisor: number) => {
  const key = `${a} ${operator} ${b} % ${divisor}`
  const cached = CACHE[key]
  if (cached) {
    return cached
  }

  let result
  if (operator === '+') {
    result = add(+a, +b, divisor)
  }
  if (operator === '*') {
    result = multiply(+a, +b, divisor)
  }
  if (operator === '**' && b === 2) {
    result = multiply(+a, +a, divisor)
  }
  CACHE[key] = result
  return result
}

const getModulo = (start: number, history: string[], divisor: number) => {
  let newValue = start

  for (let item of history) {
    const [operator, value] = item.split(' ')
    newValue = evaluate(newValue, +value, operator, divisor)
  }

  return newValue
}

function solve(input: string) {
  const ROUNDS_LIMIT = 10000

  for (let round = 0; round < ROUNDS_LIMIT; round++) {
    for (let i = 0; i < MONKEYS.length; i++) {
      const monkey = MONKEYS[i]

      while (STATE[i].length) {
        const item = STATE[i].shift()

        monkey.inspectionsCount++

        item.history.push(monkey.operation)

        const isDivisible =
          getModulo(item.value, item.history, monkey.modulo) === 0

        const nextMonkey = isDivisible ? monkey.ifTrue : monkey.ifFalse

        STATE[nextMonkey].push(item)
      }
    }
  }

  const [a, b] = MONKEYS.map(m => m.inspectionsCount)
    .sort((a, b) => b - a)
    .slice(0, 2)

  console.log(CACHE)
  console.log(STATE.map(row => row.map(i => i.history)))

  return a * b
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 19573408701,
    },
  ],
  onlyTests: true,
})

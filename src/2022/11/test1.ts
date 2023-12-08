import { run } from '~/runner'

const MONKEYS = [
  {
    startingItems: [79, 98],
    operation: old => old * 19,
    test: value => value % 23 === 0,
    ifTrue: 2,
    ifFalse: 3,
    inspectionsCount: 0,
  },
  {
    startingItems: [54, 65, 75, 74],
    operation: old => old + 6,
    test: value => value % 19 === 0,
    ifTrue: 2,
    ifFalse: 0,
    inspectionsCount: 0,
  },
  {
    startingItems: [79, 60, 97],
    operation: old => old * old,
    test: value => value % 13 === 0,
    ifTrue: 1,
    ifFalse: 3,
    inspectionsCount: 0,
  },
  {
    startingItems: [74],
    operation: old => old + 3,
    test: value => value % 17 === 0,
    ifTrue: 0,
    ifFalse: 1,
    inspectionsCount: 0,
  },
]

function solve(input: string) {
  const ROUNDS_LIMIT = 20

  let worryLevel = 0

  for (let round = 0; round < ROUNDS_LIMIT; round++) {
    for (let monkey of MONKEYS) {
      while (monkey.startingItems.length) {
        const item = monkey.startingItems.shift()

        monkey.inspectionsCount++

        worryLevel = monkey.operation(item)
        worryLevel = Math.floor(worryLevel / 3)

        const nextMonkey = monkey.test(worryLevel)
          ? monkey.ifTrue
          : monkey.ifFalse

        MONKEYS[nextMonkey].startingItems.push(worryLevel)
      }
    }
  }

  const [a, b] = MONKEYS.map(m => m.inspectionsCount)
    .sort((a, b) => b - a)
    .slice(0, 2)

  return a * b
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 10605,
    },
  ],
  onlyTests: true,
})

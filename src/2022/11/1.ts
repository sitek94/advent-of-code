import { run } from '../../runner'

const MONKEYS = [
  {
    startingItems: [74, 73, 57, 77, 74],
    operation: old => old * 11,
    test: value => value % 19 === 0,
    ifTrue: 6,
    ifFalse: 7,
    inspectionsCount: 0,
  },

  {
    startingItems: [99, 77, 79],
    operation: old => old + 8,
    test: value => value % 2 === 0,
    ifTrue: 6,
    ifFalse: 0,
    inspectionsCount: 0,
  },

  {
    startingItems: [64, 67, 50, 96, 89, 82, 82],
    operation: old => old + 1,
    test: value => value % 3 === 0,
    ifTrue: 5,
    ifFalse: 3,
    inspectionsCount: 0,
  },

  {
    startingItems: [88],
    operation: old => old * 7,
    test: value => value % 17 === 0,
    ifTrue: 5,
    ifFalse: 4,
    inspectionsCount: 0,
  },

  {
    startingItems: [80, 66, 98, 83, 70, 63, 57, 66],
    operation: old => old + 4,
    test: value => value % 13 === 0,
    ifTrue: 0,
    ifFalse: 1,
    inspectionsCount: 0,
  },

  {
    startingItems: [81, 93, 90, 61, 62, 64],
    operation: old => old + 7,
    test: value => value % 7 === 0,
    ifTrue: 1,
    ifFalse: 4,
    inspectionsCount: 0,
  },

  {
    startingItems: [69, 97, 88, 93],
    operation: old => old * old,
    test: value => value % 5 === 0,
    ifTrue: 7,
    ifFalse: 2,
    inspectionsCount: 0,
  },

  {
    startingItems: [59, 80],
    operation: old => old + 6,
    test: value => value % 11 === 0,
    ifTrue: 2,
    ifFalse: 3,
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
      expected: 10,
    },
  ],
  onlyTests: true,
})

import { run } from '~/runner'

function solve(input: string) {
  const MONKEYS = input.split('\n\n').map(monkey => {
    const lines = monkey.split('\n')
    const operation = lines[2].split(' ')

    // Transform "old * old" into "** 2"
    const value = operation.at(-1) === 'old' ? 2 : +operation.at(-1)
    const sign = operation.at(-1) === 'old' ? '**' : operation.at(-2)

    return {
      id: lines[0].at(-2),
      items: lines[1].split(': ')[1].split(', ').map(Number),
      value,
      sign,
      divisor: +lines[3].split(' ').at(-1),
      ifTrue: +lines[4].at(-1),
      ifFalse: +lines[5].at(-1),

      // Answer related
      inspectionsCount: 0,
    }
  })

  const exec = (sign: string, a: number, b: number) => {
    if (sign === '+') return a + b
    if (sign === '*') return a * b
    if (sign === '**') return a ** b
    throw new Error(`Unsupported sign: ${sign}!`)
  }
  const test = (value: number, divisor: number) => value % divisor === 0

  const ROUNDS_LIMIT = 20

  let worryLevel = 0

  for (let round = 0; round < ROUNDS_LIMIT; round++) {
    for (let monkey of MONKEYS) {
      while (monkey.items.length) {
        const item = monkey.items.shift()

        monkey.inspectionsCount++

        worryLevel = exec(monkey.sign, item, monkey.value)
        worryLevel = Math.floor(worryLevel / 3)

        const nextMonkey = test(worryLevel, monkey.divisor)
          ? monkey.ifTrue
          : monkey.ifFalse

        MONKEYS[nextMonkey].items.push(worryLevel)
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
      expected: 10605,
    },
  ],
  onlyTests: true,
})

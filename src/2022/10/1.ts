import { run } from '~/runner'

function solve(input: string) {
  const instructions = input
    .split('\n')
    .map(i => (i.startsWith('addx') ? Number(i.split(' ')[1]) : i))

  let X = 1
  let signalStrength = 0

  const next = () => {
    let instruction = instructions.shift()

    return !instruction
      ? null
      : instruction === 'noop'
      ? {
          tick: 0,
        }
      : {
          tick: 1,
          exec: () => {
            X += Number(instruction)
          },
        }
  }
  let current = next()
  let cycle = 1

  while (current) {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      signalStrength += X * cycle
    }

    if (current.tick === 0) {
      current?.exec?.()
      current = next()
    } else {
      current.tick--
    }

    cycle++
  }

  return signalStrength
}

run({
  solve,
  tests: [
    {
      input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
      expected: 13140,
    },
  ],
  onlyTests: true,
})

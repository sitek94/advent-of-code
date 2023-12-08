import { run } from '~/runner'

function solve(input: string) {
  const [instructions, lines] = input.split('\n\n')

  const map = {} as Record<string, { left: string; right: string }>

  lines.split('\n').forEach(line => {
    const [key, values] = line.split(' = (')
    const left = values.slice(0, 3)
    const right = values.slice(5, 8)

    map[key] = { left, right }
  })

  let steps = 0
  let current = 'AAA'

  while (current !== 'ZZZ') {
    instructions.split('').forEach(instruction => {
      current = instruction === 'L' ? map[current]!.left : map[current]!.right
      steps++
    })
  }

  return steps
}

run({
  solve,
  tests: [
    {
      useOriginalInput: true,
      expected: 19631,
    },
  ],
  onlyTests: false,
})

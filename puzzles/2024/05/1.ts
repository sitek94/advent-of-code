import {run} from '~/run'

function solve(input: string) {
  const [rulesInput, updatesInput] = input.split('\n\n')
  const pagesPerUpdate = updatesInput.split('\n').map(line => line.split(','))
  const rules = {} as Record<string, string[]>
  rulesInput.split('\n').forEach(line => {
    const [p1, p2] = line.split('|')
    rules[p1] = (rules[p1] || []).concat(p2)
  })

  const isOrderCorrect = (pages: string[]) => {
    for (let i = 0; i < pages.length - 1; i++) {
      for (let j = i + 1; j < pages.length; j++) {
        let current = pages[i]
        let next = pages[j]

        const isCorrect = rules[current]?.includes(next)
        if (!isCorrect) {
          return false
        }
      }
    }
    return true
  }

  let total = 0

  pagesPerUpdate.forEach((pages, i) => {
    if (isOrderCorrect(pages)) {
      const middle = pages.at(Math.floor(pages.length / 2))
      total += Number(middle)
    }
  })

  return total
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 143,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})

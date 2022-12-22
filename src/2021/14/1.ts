import { run } from '../../runner'
import { max, min, range } from '../../../utils'

function solve(input: string) {
  let [template, rulesInput] = input.split('\n\n')
  let rulesLines = rulesInput.split('\n')

  const rules = {}

  for (let line of rulesLines) {
    let [pair, x] = line.split(' -> ')
    rules[pair] = x
  }

  let counts: Record<string, number> = {}
  template.split('').forEach((letter, i) => {
    let a = letter
    let b = template[i + 1]
    if (b) {
      let pair = a + b
      counts[pair] = 1
    }
  })

  for (let i of range(40)) {
    let newCounts = {}
    for (let [pair, x] of Object.entries(rules)) {
      if (pair in counts) {
        let [a, b] = pair
        let newPairs = [a + x, x + b]
        for (let newPair of newPairs) {
          newCounts[newPair] = (newCounts[newPair] || 0) + counts[pair]
        }
      }
    }
    counts = newCounts
  }

  let C: Record<string, number> = {}
  // Count first letter of each pair
  for (let [[a], value] of Object.entries(counts)) {
    if (a in C) {
      C[a] += value
    } else {
      C[a] = value
    }
  }
  let t = template

  // Count last letter
  C[t[t.length - 1]] += 1

  let least = min(...Object.values(C))
  let most = max(...Object.values(C))

  let answer = most - least

  let count = 0
  let newTemplate = ''

  return answer
}

run({
  solve,
  tests: [
    {
      input: `
        NNCB

        CH -> B
        HH -> N
        CB -> H
        NH -> C
        HB -> C
        HC -> B
        HN -> C
        NN -> C
        BH -> H
        NC -> B
        NB -> B
        BN -> B
        BB -> N
        BC -> B
        CC -> N
        CN -> C`,
      expected: 2188189693529,
    },
  ],
  onlyTests: false,
})

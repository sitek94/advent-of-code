import { run } from '~/runner'

function solve(input: string) {
  let total = 0

  const WORDS = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]

  input.split('\n').forEach(line => {
    const digits = [] as string[]

    line.split('').forEach((c, i) => {
      if (isDigit(c)) digits.push(c)

      let subline = line.slice(i)

      WORDS.forEach((word, wordIndex) => {
        if (subline.startsWith(word)) digits.push(String(wordIndex))
      })
    })

    total += +(digits.at(0) + digits.at(-1))
  })

  return total
}

run({
  solve,
  tests: [
    {
      expected: 281,
    },
  ],
  onlyTests: false,
})

function isDigit(char: string) {
  const n = +char
  return !isNaN(n)
}

import { run } from '~/runner'

function solve(input: string) {
  let score = 0

  const A_CHAR_CODE = 65
  const a_CHAR_CODE = 97

  const getPriority = (item: string) => {
    const charCode = item.charCodeAt(0)
    const isLowercase = charCode >= a_CHAR_CODE

    // Lowercase priorities 1-26
    if (isLowercase) {
      return charCode - a_CHAR_CODE + 1
    } else {
      // Uppercase priorities 27 - 52
      return charCode - A_CHAR_CODE + 27
    }
  }

  input.split('\n').forEach(bag => {
    let comp1 = bag.slice(0, bag.length / 2)
    let comp2 = bag.slice(bag.length / 2)

    const find = () => {
      for (let item of comp1.split('')) {
        if (comp2.includes(item)) {
          return item
        }
      }
    }

    score += getPriority(find())
  })

  return score
}

run({
  solve,
  tests: [
    {
      input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
      expected: 157,
    },
  ],
  // onlyTests: true,
})

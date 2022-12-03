import { run } from '../../runner'

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

function solve(input: string) {
  const bags = input.split('\n')

  const groups = bags.reduce((acc, bag) => {
    const lastGroup = acc.at(-1)
    if (!lastGroup || lastGroup.length >= 3) {
      return [...acc, [bag]]
    } else {
      lastGroup.push(bag)
      return acc
    }
  }, [])

  const find = (group: [string, string, string]) => {
    let [bag1, bag2, bag3] = group

    for (let item of bag1.split('')) {
      if (bag2.includes(item) && bag3.includes(item)) {
        return item
      }
    }
  }

  let score = groups.reduce((acc, group) => acc + getPriority(find(group)), 0)

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
      expected: 70,
    },
  ],
  //   onlyTests: true,
})

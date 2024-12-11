import {run} from '~/run'
import {isEven} from '~/utils/index'

function solve(input: string) {
  const stones = input.split(' ')

  const STEPS = 25

  let count = 0

  stones.forEach(stone => {
    count += countStones(stone, STEPS)
  })

  return count
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 55312,
    },
    {
      input: 'input.txt',
      expected: 213625,
    },
  ],
})

const cache = new Map<string, number>()

function countStones(stone: string, steps: number) {
  const key = `${stone}-${steps}`
  if (cache.has(key)) return cache.get(key)

  if (steps === 0) {
    cache.set(key, 1)
    return 1
  }

  if (stone === '0') {
    const result = countStones('1', steps - 1)
    cache.set(key, result)
    return result
  }

  if (isEven(stone.length)) {
    const left = stone.slice(0, stone.length / 2).replace(/^0+/, '') || '0'
    const right = stone.slice(stone.length / 2).replace(/^0+/, '') || '0'
    const result = countStones(left, steps - 1) + countStones(right, steps - 1)
    cache.set(key, result)
    return result
  }

  const multiplied = (Number(stone) * 2024).toString()
  const result = countStones(multiplied, steps - 1)
  cache.set(key, result)
  return result
}

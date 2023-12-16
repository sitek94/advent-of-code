import {run} from '~/runner'
import {isArray, isNumber, max} from '../../../utils'

/**
 * If both values are integers, the lower integer should come first. If the left integer is lower than the right integer,
 * the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order.
 * Otherwise, the inputs are the same integer; continue checking the next part of the input.
 *
 * If both values are lists, compare the first value of each list, then the second value, and so on.
 * If the left list runs out of items first, the inputs are in the right order. If the right list runs out of
 * items first, the inputs are not in the right order. If the lists are the same length and no comparison makes
 * a decision about the order, continue checking the next part of the input.
 *
 * If exactly one value is an integer, convert the integer to a list which contains that integer as its only value,
 * then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2);
 * the result is then found by instead comparing [0,0,0] and [2].
 */
function solve(input: string) {
  type Value = number | number[] | Value[]

  const packetPairs: Value[][] = input
    .split('\n\n')
    .map(pair => pair.split('\n').map(v => JSON.parse(v)))

  function compare(left: Value, right: Value) {
    if (isNumber(left) && isNumber(right)) {
      if (left > right) {
        return 1
      }
      if (left < right) {
        return -1
      }
      return 0
    } else if (isArray(left) && isArray(right)) {
      const length = max(left.length, right.length)

      for (let i = 0; i < length; i++) {
        const leftItem = left[i]
        const rightItem = right[i]

        const value = compare(leftItem, rightItem)

        if (value === -1) {
          return -1
        }
        if (value === 1) {
          return 1
        }
      }

      if (left.length < right.length) {
        return -1
      }
      if (right.length < left.length) {
        return 1
      }
      return 0
    } else if (isNumber(left) && isArray(right)) {
      return compare([left], right)
    } else if (isArray(left) && isNumber(right)) {
      return compare(left, [right])
    }
  }

  function getSumOfCorrectIndexes() {
    const indexes = []

    for (let i = 0; i < packetPairs.length; i++) {
      const [left, right] = packetPairs[i]
      const value = compare(left, right)

      if (value === -1) {
        indexes.push(i + 1)
      }
    }
    return indexes.reduce((a, b) => a + b)
  }

  return getSumOfCorrectIndexes()
}

run({
  solve,
  tests: [
    {
      expected: 13,
    },
    {
      expected: 5843,
      useOriginalInput: true,
    },
  ],
  onlyTests: true,
})

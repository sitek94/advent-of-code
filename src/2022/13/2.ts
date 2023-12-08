import { run } from '~/runner'
import { isArray, isNumber, max } from '../../utils'

function solve(input: string) {
  type Value = number | number[] | Value[]

  const EXTRA_PACKETS = ['[[2]]', '[[6]]']

  const packets: Value[] = input
    .replaceAll('\n\n', '\n')
    .split('\n')
    .concat(EXTRA_PACKETS)
    .map(v => JSON.parse(v))

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

  function getMultipliedIndexesOfExtraPacketsAfterSorting() {
    const sorted = packets.sort((a, b) => compare(a, b))

    let result = 1

    sorted.forEach((packet, i) => {
      const packetString = JSON.stringify(packet)
      if (EXTRA_PACKETS.includes(packetString)) {
        const index = i + 1
        result *= index
      }
    })

    return result
  }

  return getMultipliedIndexesOfExtraPacketsAfterSorting()
}

run({
  solve,
  tests: [
    {
      expected: 140,
    },
    {
      expected: 26289,
      useOriginalInput: true,
    },
  ],
  onlyTests: true,
})

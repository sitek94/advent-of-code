import {range} from '~/utils'

export function partOne(numbers: string[]) {
  let gamma = ''
  let epsilon = ''

  for (const bitIndex of range(numbers[0].length)) {
    const {zeros, ones} = getBitCountsAtIndex(numbers, bitIndex)
    if (ones > zeros) {
      gamma += '1'
      epsilon += '0'
    } else if (zeros > ones) {
      gamma += '0'
      epsilon += '1'
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

export function partTwo(numbers: string[]) {
  const oxygen = findNumber(numbers, getMostCommonBitAtIndex)
  const scrubber = findNumber(numbers, getLeastCommonBitAtIndex)

  return parseInt(oxygen, 2) * parseInt(scrubber, 2)
}

function findNumber(
  numbers: string[],
  criteriaFn: (numbers: string[], index: number) => '1' | '0',
) {
  let result = null
  let index = 0

  while (!result) {
    const bit = criteriaFn(numbers, index)
    const newNumbers = numbers.filter(number => number[index] === bit)
    index++

    if (newNumbers.length === 1) {
      result = newNumbers[0]
    } else {
      numbers = newNumbers
    }
  }

  return result
}

function getMostCommonBitAtIndex(numbers: string[], index: number) {
  const {zeros, ones} = getBitCountsAtIndex(numbers, index)
  return ones >= zeros ? '1' : '0'
}

function getLeastCommonBitAtIndex(numbers: string[], index: number) {
  const {zeros, ones} = getBitCountsAtIndex(numbers, index)
  return ones >= zeros ? '0' : '1'
}

export function getBitCountsAtIndex(numbers: string[], index: number) {
  let ones = 0
  let zeros = 0

  for (const number of numbers) {
    if (number[index] === '1') {
      ones++
    } else {
      zeros++
    }
  }

  return {ones, zeros}
}

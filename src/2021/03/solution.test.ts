import { getBitCountsAtIndex, partOne, partTwo } from './solution'
import { exampleRawInput, parseInput, realRawInput } from './input'

const exampleInput = parseInput(exampleRawInput)
const realInput = parseInput(realRawInput)

test('partOne works with example data', () => {
  expect(partOne(exampleInput)).toBe(198)
})

test('partOne works with real data', () => {
  expect(partOne(realInput)).toBe(4103154)
})

test('partTwo works with example data', () => {
  expect(partTwo(exampleInput)).toBe(230)
})

test('partTwo works with real data', () => {
  expect(partTwo(realInput)).toBe(4245351)
})

test('getBitCountsAtIndex works', () => {
  expect(
    // prettier-ignore
    getBitCountsAtIndex([
      '1000',
      '1000',
      '1000',
      '1000',
    ], 0),
  ).toEqual({ ones: 4, zeros: 0 })

  expect(
    // prettier-ignore
    getBitCountsAtIndex([
      '1000',
      '0100',
      '0000',
      '0100',
    ], 1),
  ).toEqual({ ones: 2, zeros: 2 })
})

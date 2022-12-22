import { partOne, partTwo } from './solution'
import { exampleRawInput, realRawInput, parseInput } from './input'

const realInput = parseInput(realRawInput)
const exampleInput = parseInput(exampleRawInput)

test('partOne works with example data', () => {
  expect(partOne(exampleInput)).toBe(7)
})

test('partOne works with real data', () => {
  expect(partOne(realInput)).toBe(1791)
})

test('partTwo works with example data', () => {
  expect(partTwo(exampleInput)).toBe(5)
})

test('partTwo works with real data', () => {
  expect(partTwo(realInput)).toBe(1822)
})

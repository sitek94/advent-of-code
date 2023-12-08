import {partOne, partTwo} from './solution'
import {exampleRawInput, realRawInput, parseInput} from './input'

const realInput = parseInput(realRawInput)
const exampleInput = parseInput(exampleRawInput)

test('partOne works with example data', () => {
  expect(partOne(exampleInput)).toBe(150)
})

test('partOne works with real data', () => {
  expect(partOne(realInput)).toBe(1561344)
})

test('partTwo works with example data', () => {
  expect(partTwo(exampleInput)).toBe(900)
})

test('partTwo works with real data', () => {
  expect(partTwo(realInput)).toBe(1848454425)
})

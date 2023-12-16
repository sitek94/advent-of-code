import {lcm, lcms} from './lcm'
import {describe, expect, it} from 'bun:test'

describe(`${lcm.name}`, () => {
  const cases: [[number, number], number][] = [
    [[1, 2], 2],
    [[12, 18], 36],
  ]

  it.each(cases)(``, ([a, b], result) => {
    expect(lcm(a, b)).toBe(result)
  })
})

describe(`${lcms.name}`, () => {
  const cases: [number[], number][] = [
    [[1, 2, 3], 6],
    [[12, 18, 24], 72],
  ]

  it.each(cases)(``, (input, result) => {
    expect(lcms(input)).toBe(result)
  })
})

import {describe, expect, it} from 'bun:test'
import {gcd} from './gcd'

describe(`${gcd.name}`, () => {
  it('works', () => {
    expect(gcd(270, 192)).toBe(6)
  })
})

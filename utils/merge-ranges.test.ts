import {describe, expect, it} from 'bun:test'
import {mergeRanges} from './merge-ranges'

describe(mergeRanges.name, () => {
  it('merges overlapping ranges', () => {
    expect(
      mergeRanges([
        [2, 4],
        [1, 3],
      ]),
    ).toEqual([[1, 4]])
  })

  it('merges non-overlapping ranges', () => {
    expect(
      mergeRanges([
        [1, 3],
        [4, 5],
      ]),
    ).toEqual([
      [1, 3],
      [4, 5],
    ])
  })

  it('merges ranges with the same start', () => {
    expect(
      mergeRanges([
        [1, 3],
        [1, 4],
      ]),
    ).toEqual([[1, 4]])
  })

  it('merges ranges with the same end', () => {
    expect(
      mergeRanges([
        [1, 3],
        [2, 3],
      ]),
    ).toEqual([[1, 3]])
  })
})

import {expect, test} from 'bun:test'

export const getHashGroups = (input: string) => {
  const matches = input.match(/#+/g)
  if (!matches) return ''

  const groups = matches.map(match => match.length)
  return groups.join(',')
}

test.each([
  ['???.###', '3'],
  ['?#?.###.???', '1,3'],
  ['##?#?.###.???', '2,1,3'],
])(`getHashGroups`, (input, expected) => {
  expect(getHashGroups(input)).toBe(expected)
})

export const isValid = (input: string, groups: string) => {
  const hashGroups = getHashGroups(input)
  return groups.includes(hashGroups)
}

const isFinalValid = (input: string, groups: string) => {
  const hashGroups = getHashGroups(input)
  return hashGroups === groups
}

test.each([
  ['???.###', '3', true],
  ['?#?.###.???', '1,3', true],
  ['##?#?.###.???', '2,1,3', true],
  ['##?#?.###.???', '2,3', false],
])(`isValid`, (input, groups, expected) => {
  expect(isValid(input, groups)).toBe(expected)
})

const parse = (input: string, groups: string): string[] => {
  if (!isValid(input, groups)) return []
  if (!input.includes('?') && isFinalValid(input, groups)) {
    return [input]
  }

  return [
    ...parse(input.replace('?', '.'), groups),
    ...parse(input.replace('?', '#'), groups),
  ]
}

test.each([['???.###', '1,1,3', ['#.#.###']]])(
  `parse`,
  (input, groups, expected) => {
    expect(parse(input, groups)).toEqual(expected)
  },
)

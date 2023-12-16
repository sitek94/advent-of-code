import {run} from '~/run'

function solve(input: string) {
  const lines = input.split('\n')

  console.log(lines.length)

  let answer = 0

  lines.forEach(line => {
    const [springConditions, contiguousGroups] = line.split(' ')

    parse(springConditions, contiguousGroups)
  })

  function parse(input: string, groups: string) {
    const unknownIndex = input.indexOf('?')

    if (unknownIndex === -1) {
      if (isValid(input, groups)) {
        answer++
      }

      return
    }

    const subInput = input.slice(0, unknownIndex + 1)

    if (!isPossible(subInput, groups)) {
      return
    }

    parse(input.replace('?', '.'), groups)
    parse(input.replace('?', '#'), groups)
  }

  return answer
}

run({
  solve,
  tests: [
    {
      input: 'test1.txt',
      expected: 1,
    },
    {
      input: 'test2.txt',
      expected: 4,
    },
    {
      input: 'test3.txt',
      expected: 10,
    },
    {
      input: 'input.txt',
      expected: 7402,
    },
  ],
})

const getHashGroups = (input: string) => {
  const matches = input.match(/#+/g)
  if (!matches) return ''

  const groups = matches.map(match => match.length)
  return groups.join(',')
}

const isPossible = (input: string, groupsStr: string) => {
  const hashGroups = getHashGroups(input).split(',').map(Number)
  const groups = groupsStr.split(',').map(Number)

  for (let i = 0; i < hashGroups.length; i++) {
    const h = hashGroups[i]
    const g = groups[i]

    if (h > g) return false
  }

  return true
}

const isValid = (input: string, groups: string) => {
  const hashGroups = getHashGroups(input)
  return hashGroups === groups
}

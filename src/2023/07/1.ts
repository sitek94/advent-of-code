import { run } from '~/runner'

const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

const isFiveOfAKind = (cards: string[]) =>
  cards.every(card => card === cards[0])

const isFourOfAKind = (cards: string[]) => {
  const cardCounts = cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1
    return acc
  }, {} as Record<string, number>)

  return Object.values(cardCounts).includes(4)
}

const isFullHouse = (cards: string[]) => {
  const cardCounts = cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1
    return acc
  }, {} as Record<string, number>)

  return (
    Object.values(cardCounts).includes(3) &&
    Object.values(cardCounts).includes(2)
  )
}

const isThreeOfAKind = (cards: string[]) => {
  const cardCounts = cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1
    return acc
  }, {} as Record<string, number>)

  return Object.values(cardCounts).includes(3)
}

const isTwoPairs = (cards: string[]) => {
  const cardCounts = cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1
    return acc
  }, {} as Record<string, number>)

  return Object.values(cardCounts).filter(count => count === 2).length === 2
}

const isPair = (cards: string[]) => {
  const cardCounts = cards.reduce((acc, card) => {
    acc[card] = acc[card] ? acc[card] + 1 : 1
    return acc
  }, {} as Record<string, number>)

  return Object.values(cardCounts).includes(2)
}

const compareOneByOne = (a: string[], b: string[]) => {
  for (let i = 0; i < 5; i++) {
    let valA = CARDS.indexOf(a[i])
    let valB = CARDS.indexOf(b[i])

    if (valA > valB) return 1
    if (valA < valB) return -1
  }

  return 0
}

function solve(input: string) {
  const lines = input
    .split('\n')
    .map(line => line.split(' '))
    .map(line => {
      const [hand, bid] = line

      return { hand: hand.split(''), bid: +bid }
    })

  console.log(lines)

  const compare = (a: string[], b: string[]) => {
    if (isFiveOfAKind(a) && isFiveOfAKind(b)) {
      return compareOneByOne(a, b)
    }
    if (isFiveOfAKind(a) && !isFiveOfAKind(b)) return 1
    if (!isFiveOfAKind(a) && isFiveOfAKind(b)) return -1

    if (isFourOfAKind(a) && isFourOfAKind(b)) {
      return compareOneByOne(a, b)
    }
    if (isFourOfAKind(a) && !isFourOfAKind(b)) return 1
    if (!isFourOfAKind(a) && isFourOfAKind(b)) return -1

    if (isFullHouse(a) && isFullHouse(b)) {
      return compareOneByOne(a, b)
    }
    if (isFullHouse(a) && !isFullHouse(b)) return 1
    if (!isFullHouse(a) && isFullHouse(b)) return -1

    if (isThreeOfAKind(a) && isThreeOfAKind(b)) {
      return compareOneByOne(a, b)
    }
    if (isThreeOfAKind(a) && !isThreeOfAKind(b)) return 1
    if (!isThreeOfAKind(a) && isThreeOfAKind(b)) return -1

    if (isTwoPairs(a) && isTwoPairs(b)) {
      return compareOneByOne(a, b)
    }
    if (isTwoPairs(a) && !isTwoPairs(b)) return 1
    if (!isTwoPairs(a) && isTwoPairs(b)) return -1

    if (isPair(a) && isPair(b)) {
      return compareOneByOne(a, b)
    }
    if (isPair(a) && !isPair(b)) return 1
    if (!isPair(a) && isPair(b)) return -1

    return compareOneByOne(a, b)
  }

  const sorted = lines.toSorted((a, b) => {
    const result = compare(a.hand, b.hand)
    console.log(a.hand, b.hand, result)

    return result
  })

  console.log(sorted)

  let totalScore = 0

  sorted.forEach((result, index) => {
    totalScore += result.bid * (index + 1)
  })

  return totalScore
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 6440,
    },
  ],
  onlyTests: false,
})

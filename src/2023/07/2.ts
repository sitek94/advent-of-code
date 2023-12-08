import { run } from '~/runner'

const CARDS = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

type Line = {
  hand: string[]
  newHand: string[]
  bid: number
}

const getCounts = (cards: string[]) => {
  const cardCounts = cards.reduce((acc, card) => {
    if (card === 'J') {
      acc[card] = 0
      return acc
    }
    acc[card] = acc[card] ? acc[card] + 1 : 1
    return acc
  }, {} as Record<string, number>)

  return cardCounts
}

const isFiveOfAKind = (cards: string[]) =>
  cards.every(card => card === cards[0])

const isFourOfAKind = (cards: string[]) => {
  const cardCounts = getCounts(cards)

  return Object.values(cardCounts).includes(4)
}

const isFullHouse = (cards: string[]) => {
  const cardCounts = getCounts(cards)

  return (
    Object.values(cardCounts).includes(3) &&
    Object.values(cardCounts).includes(2)
  )
}

const isThreeOfAKind = (cards: string[]) => {
  const cardCounts = getCounts(cards)

  return Object.values(cardCounts).includes(3)
}

const isTwoPairs = (cards: string[]) => {
  const cardCounts = getCounts(cards)

  return Object.values(cardCounts).filter(count => count === 2).length === 2
}

const isPair = (cards: string[]) => {
  const cardCounts = getCounts(cards)

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

const hasJoker = (cards: string[]) => cards?.includes('J') ?? false

/**   
 
trading Joker

5 ->  not possible

4 -> change to 5 of a kind
3 -> change to 4 of a kind

2 pairs -> change to higher pair

pair -> make 3 of a kind



 */

const tradeJoker = (cards: string[]) => {
  if (isFiveOfAKind(cards)) return cards

  if (isFourOfAKind(cards)) {
    const type = cards.find(c => c !== 'J')!
    return [type, type, type, type, type]
  }

  // Change first from pair to same type as 3 of a kind
  if (isFullHouse(cards)) {
    const counts = getCounts(cards)
    const pairType = Object.keys(counts).find(key => counts[key] === 2)!
    const threeType = Object.keys(counts).find(key => counts[key] === 3)!

    const jokerIndex = cards.indexOf('J')

    return cards.map((card, i) => (i === jokerIndex ? threeType : card))
  }

  if (isThreeOfAKind(cards)) {
    const counts = getCounts(cards)
    const threeType = Object.keys(counts).find(key => counts[key] === 3)!

    const jokerIndex = cards.indexOf('J')

    return cards.map((card, i) => (i === jokerIndex ? threeType : card))
  }

  if (isTwoPairs(cards)) {
    const counts = getCounts(cards)
    const pairType1 = Object.keys(counts).find(key => counts[key] === 2)!
    const pairType2 = Object.keys(counts).find(key => counts[key] === 2)!

    const highestPairType =
      CARDS.indexOf(pairType1) > CARDS.indexOf(pairType2)
        ? pairType1
        : pairType2

    const jokerIndex = cards.indexOf('J')

    return cards.map((card, i) => (i === jokerIndex ? highestPairType : card))
  }

  if (isPair(cards)) {
    const counts = getCounts(cards)
    const pairType = Object.keys(counts).find(key => counts[key] === 2)!

    const jokerIndex = cards.indexOf('J')

    return cards.map((card, i) => (i === jokerIndex ? pairType : card))
  }

  const jokerIndex = cards.indexOf('J')

  const highestCard = cards
    .filter(card => card !== 'J')
    .sort((a, b) => CARDS.indexOf(b) - CARDS.indexOf(a))[0]

  return cards.map((card, i) => (i === jokerIndex ? highestCard : card))
}

const tradeAllJokers = (cards: string[]) => {
  if (cards.every(card => card === 'J')) return ['A', 'A', 'A', 'A', 'A']

  let newCards = cards

  while (hasJoker(newCards)) {
    newCards = tradeJoker(newCards)
  }

  return newCards
}

function solve(input: string) {
  const lines = input
    .split('\n')
    .map(line => line.split(' '))
    .map(line => {
      const [hand, bid] = line

      return { hand: hand.split(''), bid: +bid }
    })

  const converted = lines.map(line => {
    const newHand = tradeAllJokers(line.hand)

    return {
      newHand,
      hand: line.hand,
      bid: line.bid,
    } as Line
  })

  const compare = (aLine: Line, bLine: Line) => {
    const a = aLine.newHand
    const b = bLine.newHand
    const aOld = aLine.hand
    const bOld = bLine.hand

    if (isFiveOfAKind(a) && isFiveOfAKind(b)) {
      return compareOneByOne(aOld, bOld)
    }
    if (isFiveOfAKind(a) && !isFiveOfAKind(b)) return 1
    if (!isFiveOfAKind(a) && isFiveOfAKind(b)) return -1

    if (isFourOfAKind(a) && isFourOfAKind(b)) {
      return compareOneByOne(aOld, bOld)
    }
    if (isFourOfAKind(a) && !isFourOfAKind(b)) return 1
    if (!isFourOfAKind(a) && isFourOfAKind(b)) return -1

    if (isFullHouse(a) && isFullHouse(b)) {
      return compareOneByOne(aOld, bOld)
    }
    if (isFullHouse(a) && !isFullHouse(b)) return 1
    if (!isFullHouse(a) && isFullHouse(b)) return -1

    if (isThreeOfAKind(a) && isThreeOfAKind(b)) {
      return compareOneByOne(aOld, bOld)
    }
    if (isThreeOfAKind(a) && !isThreeOfAKind(b)) return 1
    if (!isThreeOfAKind(a) && isThreeOfAKind(b)) return -1

    if (isTwoPairs(a) && isTwoPairs(b)) {
      return compareOneByOne(aOld, bOld)
    }
    if (isTwoPairs(a) && !isTwoPairs(b)) return 1
    if (!isTwoPairs(a) && isTwoPairs(b)) return -1

    if (isPair(a) && isPair(b)) {
      return compareOneByOne(aOld, bOld)
    }
    if (isPair(a) && !isPair(b)) return 1
    if (!isPair(a) && isPair(b)) return -1

    return compareOneByOne(aOld, bOld)
  }

  const sorted = converted.toSorted((a, b) => {
    const result = compare(a, b)

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
      expected: 5905,
    },
  ],
  onlyTests: false,
})

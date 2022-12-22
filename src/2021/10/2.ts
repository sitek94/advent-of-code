import { realInput } from './input'

const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

let lines = realInput.split('\n')

let l1 = '('
let l2 = '['
let l3 = '{'
let l4 = '<'
let r1 = ')'
let r2 = ']'
let r3 = '}'
let r4 = '>'

const map = {
  [l1]: [r1],
  [l2]: [r2],
  [l3]: [r3],
  [l4]: [r4],
}

const isLeft = b => '({[<'.includes(b)
const isRight = b => ')}]>'.includes(b)

const matches = (left, right) => {
  if (left === l1 && right === r1) return true
  if (left === l2 && right === r2) return true
  if (left === l3 && right === r3) return true
  if (left === l4 && right === r4) return true
  return false
}

const points = {
  [r1]: 1,
  [r2]: 2,
  [r3]: 3,
  [r4]: 4,
}

let scores = []

for (let line of lines) {
  let index = 0
  let error = false
  let stack = []
  for (let b of line) {
    if (isLeft(b)) {
      stack.push(b)
    }
    if (isRight(b)) {
      if (matches(stack.at(-1), b)) {
        stack.pop()
      } else {
        error = true
        break
      }
    }
    index++
  }
  if (!error) {
    let completion = []
    for (let b of stack) {
      completion.unshift(map[b])
    }
    let score = 0
    for (let b of completion) {
      score *= 5
      score += points[b]
    }
    scores.push(score)
  }
}

scores.sort((a, b) => b - a)

let middle = scores.at(scores.length / 2)

console.log('Answer: ', middle)

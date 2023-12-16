import {abs} from '../../../utils'

import {realInput} from './input'

const input = realInput.sort((a, b) => a - b)

const M = {}
console.log(input)
let median = input[input.length / 2]
let ans = 0
for (const x of input) {
  ans += abs(x - median)
}
console.log(ans)

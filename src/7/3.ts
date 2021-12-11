// ONLY HORIZONTALLY

import { abs, max, min } from '../../utils';

import { realInput } from './input';

// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14].sort((a, b) => a - b);
const input = realInput.sort((a, b) => a - b);

// console.log(input);

const M = {};
console.log(input);
let median = input[input.length / 2];
let ans = 0;
for (const x of input) {
  ans += abs(x - median);
}
console.log(ans);

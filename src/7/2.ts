// ONLY HORIZONTALLY

import { abs, max, min } from '../../utils';

import { realInput } from './input';

// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14].sort((a, b) => a - b);
const input = realInput.sort((a, b) => a - b);

// console.log(input);

const M = {};

for (let n = 0; n <= max(...input); n++) {
  let count = 0;
  for (let crabPos of input) {
    count += factorial(abs(crabPos - n));
  }
  M[n] = count;
}

console.log(M);

let res = min(...(Object.values(M) as number[]));
console.log(res);

function factorial(n) {
  if (n === 0) return 0;
  if (n === 1) {
    return 1;
  }
  return n + factorial(n - 1);
}

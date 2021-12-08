import { realRawInput } from './input';
export function partOne() {
  return true;
}

const ONE = 2;
const FOUR = 4;
const SEVEN = 3;
const EIGHT = 7;

const inputshort = realRawInput.split('\n').map(l => l.split(' | ')[1]);
console.log(inputshort);
// const lines = inputshort.map(line => line.split(' '));
// console.log(lines);
let words = inputshort.reduce((acc, cur) => acc + ' ' + cur).split(' ');

let count = 0;
for (let w of words) {
  let word = w.length;
  if (word === 2 || word === 3 || word === 4 || word === 7) {
    count += 1;
  }
}

console.log(count);

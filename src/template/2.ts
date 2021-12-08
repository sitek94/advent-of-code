import { realRawInput } from './input';
export function partOne() {
  return true;
}

const ONE = 2;
const FOUR = 4;
const SEVEN = 3;
const EIGHT = 7;

const lines = realRawInput.split('\n').map(l => l.split(' | '));
// console.log(inputshort);
// const lines = inputshort.map(line => line.split(' '));
// console.log(lines);
// let words = inputshort.reduce((acc, cur) => acc + ' ' + cur).split(' ');

let count = 0;

const input1 =
  'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(' ');
const input2 = 'cdfeb fcadb cdfeb cdbaf'.split(' ');

let w1 = input1.find(w => w.length === 2);
let w4 = input1.find(w => w.length === 4);
let w7 = input1.find(w => w.length === 3);
let w8 = input1.find(w => w.length === 7);
let w0 = '';
let w6 = '';
let w9 = '';
let w5 = '';
let w3 = '';

for (let w of input1) {
  if (w.length === 6) {
    let letters = w.split('');

    if (letters.filter(w => w4.includes(w)).length === 4) {
      w9 = w;
    } else if (letters.filter(w => w7.includes(w)).length === 3) {
      w0 = w;
    } else {
      w6 = w;
    }
  }
}
for (let w of input1) {
  if (w.length === 5) {
    let letters = w.split('');
    console.log({ w });
    if (letters.filter(w => w6.includes(w)).length === 5) {
      w5 = w;
    } else {
      w3 = w;
    }
  }
}

console.log({
  w0,
  w6,
  w9,
  w3,
  w5,
});
let c = 0;
for (let [inputStr, valuesStr] of lines) {
  let input = inputStr.split(' ');
  let values = valuesStr.split(' ');
  let w1 = input.find(w => w.length === 2);
  let w4 = input.find(w => w.length === 4);
  let w7 = input.find(w => w.length === 3);
  let w8 = input.find(w => w.length === 7);
  let w0 = '';
  let w6 = '';
  let w9 = '';
  let w5 = '';
  let w3 = '';
  let w2 = '';

  for (let w of input) {
    if (w.length === 6) {
      let letters = w.split('');

      if (letters.filter(w => w4.includes(w)).length === 4) {
        w9 = w;
      } else if (letters.filter(w => w7.includes(w)).length === 3) {
        w0 = w;
      } else {
        w6 = w;
      }
    }
  }
  for (let w of input) {
    if (w.length === 5) {
      let letters = w.split('');
      if (letters.filter(w => w6.includes(w)).length === 5) {
        w5 = w;
      } else if (letters.filter(w => w9.includes(w)).length === 5) {
        w3 = w;
      } else {
        w2 = w;
      }
    }
  }

  let res = '';
  console.log(values);
  for (let v of values) {
    if (v.length === 2) res += '1';
    else if (v.length === 4) res += '4';
    else if (v.length === 3) res += '7';
    else if (v.length === 7) res += '8';
    else {
      let letters = v.split('');
      if (letters.filter(l => w9.includes(l)).length === 6) res += '9';
      else if (letters.filter(l => w0.includes(l)).length === 6) res += '0';
      else if (letters.filter(l => w6.includes(l)).length === 6) res += '6';
      else if (letters.filter(l => w5.includes(l)).length === 5) res += '5';
      else if (letters.filter(l => w3.includes(l)).length === 5) res += '3';
      else if (letters.filter(l => w2.includes(l)).length === 5) res += '2';
    }
  }
  console.log(res);
  c += parseInt(res);
}

console.log(c);

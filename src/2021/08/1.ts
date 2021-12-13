import { realRawInput } from './input';
import { assert } from '../../../utils';

const shortInput = realRawInput.split('\n').map(l => l.split(' | ')[1]);

let words = shortInput.reduce((acc, cur) => acc + ' ' + cur).split(' ');

let count = 0;
for (let w of words) {
  let word = w.length;
  if (word === 2 || word === 3 || word === 4 || word === 7) {
    count += 1;
  }
}

assert(count === 330);

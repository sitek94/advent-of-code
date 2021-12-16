// @ts-nocheck */
import { run } from '../../runner';

let data = require('fs')
  .readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' })
  .trim();

function toBinary(input: string): string {
  return input
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('')
    .replace(/0+$/, '');
}

function parsePacket(data: string) {
  let chars = data.split('');

  let version = parseInt(readBits(3), 2);
  let type = parseInt(readBits(3), 2);
  console.log(chars, version, type);
  // Literal value
  if (type === 4) {
    let value = '';

    // Keep parsing the groups until prefix is zero
    // Padding zero is important!
    while (true) {
      let group = readBits(5).padEnd(5, '0');
      let prefix = group[0];
      value += group.substring(1);

      if (prefix === '0') {
        break;
      }
    }

    let packet = { version, type, value: parseInt(value, 2) };
    return packet;
  }

  let lengthTypeID = chars.splice(0, 1)[0];

  if (lengthTypeID === '0') {
    return packet;
  }

  function readBits(n) {
    return chars.splice(0, n).join('');
  }
}

function solve(input) {
  let packet = parsePacket(toBinary(input));
  console.log(packet);
}

run({
  solve,
  tests: [
    {
      input: `D2FE28`,
      // input: `D2FE28`,
      expected: 10,
    },
  ],
  onlyTests: true,
});

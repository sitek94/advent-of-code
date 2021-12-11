import { range } from '../../utils';
import { realInput } from './input';

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const G = realInput.split('\n').map(row => row.split('').map(Number));

// console.log(G);

let sizes = [];

for (let y = 0; y < G.length; y++) {
  let row = G[y];
  let lastX = row.length - 1;
  let lastY = G.length - 1;

  for (let x = 0; x < row.length; x++) {
    // let sum = s(x - 1, y) + s(x + 1, y) + s(y - 1, x) + s(y + 1, x);
    if (isLow(x, y)) {
      console.log(`(${x},${y}) = ${G[y][x]}`);

      let low = s(x, y);
      let map = {};
      find(x, y, map);
      // @ts-ignore
      let size = Object.values(map).length;
      sizes.push(size);

      console.log(map);
    }
  }
}

sizes = sizes.sort((a, b) => a - b);
console.log(sizes.slice(-3).reduce((a, b) => a * b));

function s(x, y) {
  let Y = G[y];
  if (Y !== undefined) {
    let X = Y[x];
    if (X !== undefined) {
      return G[y][x];
    } else return -1;
  } else {
    return -1;
  }
}

function isLow(x, y) {
  let l = s(x - 1, y);
  let r = s(x + 1, y);
  let t = s(x, y + 1);
  let b = s(x, y - 1);

  let p = s(x, y);

  return [l, r, t, b].filter(n => n !== -1).every(n => n > p);
}

function find(x, y, map) {
  if (map[`${x},${y}`] !== undefined) {
    return;
  }
  let p = s(x, y);
  if (p === -1) {
    return;
  }
  if (p === 9) {
    return;
  }
  console.log(`(${x},${y}) = ${p}`);
  map[`${x},${y}`] = p;

  find(x - 1, y, map);
  find(x + 1, y, map);
  find(x, y + 1, map);
  find(x, y - 1, map);
}

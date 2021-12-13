import { realInput } from './input';

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const G = realInput.split('\n').map(row => row.split('').map(Number));

let risk = 0;

for (let y = 0; y < G.length; y++) {
  let row = G[y];

  for (let x = 0; x < row.length; x++) {
    if (isLow(x, y)) {
      console.log(`(${x},${y}) = ${G[y][x]}`);
      risk += 1 + p(x, y);
    }
  }
}

console.log(risk);

function p(x, y) {
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
  let l = p(x - 1, y);
  let r = p(x + 1, y);
  let t = p(x, y + 1);
  let b = p(x, y - 1);

  return [l, r, t, b].filter(n => n !== -1).every(n => n > p(x, y));
}

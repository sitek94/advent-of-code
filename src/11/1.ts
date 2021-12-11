export {};

const input = `2138862165
2726378448
3235172758
6281242643
4256223158
1112268142
1162836182
1543525861
1882656326
8844263151`;

const G = [];

let lines = input.split('\n');

for (let line of lines) {
  let row = line.split('').map(Number);
  G.push(row);
}

let w = G[0].length;
let h = G.length;

let count = 0;

function step() {
  increaseEach();
  let map = {};
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = p(x, y);

      if (v > 9) {
        flash(x, y, map);
      }
    }
  }
}

function run() {
  for (let i = 0; i < 100; i++) {
    step();
    print();
  }
}

run();

function flash(x, y, map) {
  if (map[`${x},${y}`] !== undefined) {
    return;
  }
  let v = p(x, y);
  if (v === -1) {
    return;
  }
  G[y][x]++;
  if (G[y][x] <= 9) {
    return;
  }
  count++;
  map[`${x},${y}`] = true;

  flash(x - 1, y - 1, map);
  flash(x + 1, y + 1, map);
  flash(x + 1, y - 1, map);
  flash(x - 1, y + 1, map);
  flash(x - 1, y, map);
  flash(x + 1, y, map);
  flash(x, y + 1, map);
  flash(x, y - 1, map);

  G[y][x] = 0;
}

function increaseEach() {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      G[y][x] += 1;
    }
  }
}

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

function print() {
  let grid = '';
  for (let y = 0; y < h; y++) {
    let line = '';
    for (let x = 0; x < w; x++) {
      if (p(x, y) > 9) {
        line += ' ';
      } else {
        line += p(x, y);
      }
    }
    line += '\n';
    grid += line;
  }
  console.log(grid);
}

console.log(count);

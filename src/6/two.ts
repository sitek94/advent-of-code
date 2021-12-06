// day % 7 === 0
// new fish

// each fish, a number of days until it creates a new fish

// when created two more days

import { range } from '../utils';

let fish = [
  2, 1, 1, 4, 4, 1, 3, 4, 2, 4, 2, 1, 1, 4, 3, 5, 1, 1, 5, 1, 1, 5, 4, 5, 4, 1,
  5, 1, 3, 1, 4, 2, 3, 2, 1, 2, 5, 5, 2, 3, 1, 2, 3, 3, 1, 4, 3, 1, 1, 1, 1, 5,
  2, 1, 1, 1, 5, 3, 3, 2, 1, 4, 1, 1, 1, 3, 1, 1, 5, 5, 1, 4, 4, 4, 4, 5, 1, 5,
  1, 1, 5, 5, 2, 2, 5, 4, 1, 5, 4, 1, 4, 1, 1, 1, 1, 5, 3, 2, 4, 1, 1, 1, 4, 4,
  1, 2, 1, 1, 5, 2, 1, 1, 1, 4, 4, 4, 4, 3, 3, 1, 1, 5, 1, 5, 2, 1, 4, 1, 2, 4,
  4, 4, 4, 2, 2, 2, 4, 4, 4, 2, 1, 5, 5, 2, 1, 1, 1, 4, 4, 1, 4, 2, 3, 3, 3, 3,
  3, 5, 4, 1, 5, 1, 4, 5, 5, 1, 1, 1, 4, 1, 2, 4, 4, 1, 2, 3, 3, 3, 3, 5, 1, 4,
  2, 5, 5, 2, 1, 1, 1, 1, 3, 3, 1, 1, 2, 3, 2, 5, 4, 2, 1, 1, 2, 2, 2, 1, 3, 1,
  5, 4, 1, 1, 5, 3, 3, 2, 2, 3, 1, 1, 1, 1, 2, 4, 2, 2, 5, 1, 2, 4, 2, 1, 1, 3,
  2, 5, 5, 3, 1, 3, 3, 1, 4, 1, 1, 5, 5, 1, 5, 4, 1, 1, 1, 1, 2, 3, 3, 1, 2, 3,
  1, 5, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 5, 2, 1, 1, 5, 2, 4, 5, 5,
  1, 1, 5, 1, 5, 5, 1, 1, 3, 3, 1, 1, 3, 1,
];

let map: Record<string, number> = {};
for (let i = 0; i < fish.length; i++) {
  let value = fish[i];

  if (map[value] === undefined) {
    map[value] = 1;
  } else {
    map[value]++;
  }
}

console.log(map);

// console.log(map);
// let newMap = {};
// for (let i = 0; i < 9; i++) {
//   newMap[i] = 0;
// }

for (let day of range(256)) {
  let currentMap = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  for (let [left, count] of Object.entries(map)) {
    let daysLeft = Number(left);
    // console.log(currentMap);
    // console.log(daysLeft, count);

    if (daysLeft === 0) {
      currentMap['8'] += count;
      currentMap['6'] += count;
    } else {
      currentMap[daysLeft - 1] += count;
    }
  }
  map = currentMap;
}

const sum = Object.values(map).reduce((a, b) => a + b);
console.log(sum);

// console.log('Part one: ', fish.length);
//

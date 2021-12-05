import { createLine, exampleRawInput, realRawInput } from './input';
import { abs, max, range } from '../utils';

const p = (x, y) => `${x},${y}`;

function solve(input: string) {
  const lines = input.split('\n');
  const gridOne: Record<string, number> = {};
  const gridTwo: Record<string, number> = {};

  for (let line of lines) {
    let [x0, y0, x1, y1] = createLine(line);

    // Vector direction and distance
    let dx = x1 - x0;
    let dy = y1 - y0;

    let lineLength = 1 + max(abs(dx), abs(dy));

    for (let i of range(lineLength)) {
      let x = x0 + (dx > 0 ? 1 : dx < 0 ? -1 : 0) * i;
      let y = y0 + (dy > 0 ? 1 : dy < 0 ? -1 : 0) * i;

      // Only vertical and horizontal vectors - part one
      if (dx === 0 || dy === 0) {
        if (gridOne[p(x, y)] === undefined) {
          gridOne[p(x, y)] = 1;
        } else {
          gridOne[p(x, y)]++;
        }
      }

      // All vectors - part two
      if (gridTwo[p(x, y)] === undefined) {
        gridTwo[p(x, y)] = 1;
      } else {
        gridTwo[p(x, y)]++;
      }
    }
  }

  let countOne = Object.values(gridOne).filter(n => n >= 2).length;
  let countTwo = Object.values(gridTwo).filter(n => n >= 2).length;
  console.log('Part one: ', countOne);
  console.log('Part two: ', countTwo);
}

solve(exampleRawInput);
solve(realRawInput);

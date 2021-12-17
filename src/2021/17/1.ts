import { run } from '../../runner';
import { max, range } from '../../../utils';

function solve(input: string) {
  let [_, coords] = input.split(': ');
  let [[x1, x2], [y1, y2]] = coords
    .split(', ')
    .map(s => s.split('=')[1].split('..').map(Number));

  const TIME = 1000;
  const MIN_VX = 1;
  const MAX_VX = 250;
  const MIN_VY = 1;
  const MAX_VY = 500;

  let x = 0;
  let y = 0;
  let y_max = 0;

  for (let VX = MIN_VX; VX < MAX_VX; VX++) {
    for (let VY = MIN_VY; VY < MAX_VY; VY++) {
      test(VX, VY);
    }
  }

  function test(vx, vy) {
    let x = 0;
    let y = 0;
    let cur_y_max = 0;

    for (let _ of range(TIME)) {
      x += vx;
      y += vy;
      cur_y_max = max(cur_y_max, y);
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        y_max = max(y_max, cur_y_max);
      }

      if (vx > 0) vx--;
      else if (vx < 0) vx++;

      vy--;
    }
  }

  return y_max;
}

run({
  solve,
  tests: [
    {
      input: `target area: x=20..30, y=-10..-5`,
      expected: 45,
    },
  ],
  // onlyTests: true,
});

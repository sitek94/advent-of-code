import { run } from '../../runner';
import { abs, max, range } from '../../../utils';

function solve(input: string) {
  let [dotsInput, instructionsInput] = input.split('\n\n');

  let instructions = instructionsInput
    .split('\n')
    .map(l => l.split(' ').at(-1).split('='));

  let dots = dotsInput.split('\n').map(l => l.split(',').map(Number));

  const G = new Set();

  dots.forEach(([x, y]) => G.add([x, y]));

  const maxX = max(...[...G].map(([x]) => x));
  const maxY = max(...[...G].map(([_, y]) => y));

  instructions.forEach(([dir, val]) => {
    let foldPos = Number(val);

    G.forEach(([x, y]) => {
      if (dir === 'x' && x > foldPos) {
        G.add([abs(x - 2 * foldPos), y]);
      }
      if (dir === 'y' && y > foldPos) {
        G.add([x, abs(y - 2 * foldPos)]);
      }
    });
  });

  function print(width: number, height: number) {
    for (let y of range(height)) {
      for (let x of range(width)) {
        if (G.has([x, y])) {
          process.stdout.write('#');
        } else {
          process.stdout.write('.');
        }
      }
      process.stdout.write('\n');
    }
  }

  print(maxX, maxY);
  console.log(maxX, maxY);
}

run({
  solve,
  tests: [
    {
      input: `
        6,10
        0,14
        9,10
        0,3
        10,4
        4,11
        6,0
        6,12
        4,1
        0,13
        10,12
        3,4
        3,0
        8,4
        1,10
        2,14
        8,10
        9,0
        
        fold along y=7
        fold along x=5`,
      expected: 16,
    },
  ],
  onlyTests: true,
});

function print(grid: string[][], h: number, w: number) {
  let toPrint = '';
  for (let y = 0; y < h; y++) {
    let line = '';
    for (let x = 0; x < w; x++) {
      line += grid[y][x];
    }
    line += '\n';
    toPrint += line;
  }
  console.log(toPrint);
}

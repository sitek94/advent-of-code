import { run } from '../../runner';

function solve(input: string) {
  let [algorithm, picture] = input.split('\n\n');

  let img = picture.split('\n').map(row => row.split(''));
  algorithm = algorithm.split('\n').join('');
  console.assert(algorithm.length === 512);
  let initialGrid = {};
  picture.split('\n').forEach((row, y) => {
    row.split('').forEach((value, x) => {
      initialGrid[`${x},${y}`] = value;
    });
  });

  function solve(n, initialGrid) {
    let grid = initialGrid;
    let offset = 10;
    for (let i = 1; i <= n; i++) {
      grid = transform(grid, offset, i % 2 === 0);
      offset -= 3;
    }
    const count = Object.values(grid).filter(v => v === '#').length;

    return count;
  }

  function transform(grid, offset, on) {
    const newGrid = {};
    let coords = Object.keys(grid);
    let coordsX = coords.map(coord => coord.split(',')[0]).map(Number);
    let coordsY = coords.map(coord => coord.split(',')[1]).map(Number);
    let xMin = Math.min(...coordsX);
    let xMax = Math.max(...coordsX);
    let yMin = Math.min(...coordsY);
    let yMax = Math.max(...coordsY);

    for (let y = yMin - offset; y <= yMax + offset; y++) {
      for (let x = xMin - offset; x <= xMax + offset; x++) {
        let bit = getBit(grid, x, y, on);
        let number = parseInt(bit, 2);
        let newValue = algorithm[number];

        newGrid[`${x},${y}`] = newValue;
      }
    }
    print(newGrid);
    return newGrid;
  }

  function getNewValue(bit) {
    return algorithm[parseInt(bit, 2)];
  }

  function getBit(grid, x, y, on) {
    let bit = '';

    for (let row = y - 1; row <= y + 1; row++) {
      for (let col = x - 1; col <= x + 1; col++) {
        let value = grid[`${col},${row}`];
        if (value === undefined) {
          bit += on ? '1' : '0';
        } else {
          bit += value === '#' ? '1' : '0';
        }
      }
    }
    return bit;
  }

  return solve(2, initialGrid);
}

function print(grid, offset = 5) {
  let coords = Object.keys(grid);
  let coordsX = coords.map(coord => coord.split(',')[0]).map(Number);
  let coordsY = coords.map(coord => coord.split(',')[1]).map(Number);
  let xMin = Math.min(...coordsX);
  let xMax = Math.max(...coordsX);
  let yMin = Math.min(...coordsY);
  let yMax = Math.max(...coordsY);

  let output = '';
  for (let y = yMin - offset; y <= yMax + offset; y++) {
    let row = '';
    for (let x = xMin - offset; x <= xMax + offset; x++) {
      row += grid[`${x},${y}`] || ' ';
    }
    output += row + '\n';
  }
  console.log(output);
}

run({
  solve,
  tests: [
    {
      input: `
        ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
        #..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
        .######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
        .#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
        .#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
        ...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
        ..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

        #..#.
        #....
        ##..#
        ..#..
        ..###        
      `,
      expected: 35,
    },
  ],
  // onlyTests: true,
});

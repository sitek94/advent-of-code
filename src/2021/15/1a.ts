import { run } from '~/runner'

// function solve(input: string) {
//   let lines = input.split('\n');
//   let w = lines[0].length;
//   let h = lines.length;
//
//   let G = new Map();
//
//   for (let y = 0; y < h; y++) {
//     for (let x = 0; x < w; x++) {
//       G.set(p(x, y), Number(lines[y][x]));
//     }
//   }
//
//   console.log(G);
//   let count = 0;
//   let R = null;
//   go(p(0, 0), ['00']);
//
//   function go(start, path) {
//     if (!G.has(start)) {
//       return;
//     }
//     let [x, y] = get(start);
//
//     let r = p(x + 1, y);
//     let d = p(x, y + 1);
//
//     for (let next of [r, d]) {
//       if (!G.has(next) || path.includes(next)) {
//         return;
//       }
//
//       if (next === p(w - 1, h - 1)) {
//         console.log('FOUND');
//         let risk = path.map(p => G.get(p)).reduce((a, b) => a + b);
//         if (!R || risk < R) {
//           R = risk;
//         }
//       }
//
//       go(next, [...path, next]);
//     }
//   }
//
//   console.log(R);
//   function p(x, y) {
//     return `${x}${y}`;
//   }
//   function get(p) {
//     return p.split('').map(Number);
//   }
//
//   let lowestRisk = null;
//
//   return R;
// }

const parse = input => input.split('\n').map(row => row.split('').map(Number))

export const solve = input => (map => shortestPath(map))(parse(input))

const shortestPath = (map, startPos = [0, 0]) => {
  const ADJ = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  const queue = [{ pos: startPos, cost: 0 }]
  const visited = new Set()
  while (queue.length) {
    const {
      pos: [x, y],
      cost,
    } = queue.shift()
    if (y === map.length - 1 && x === map[0].length - 1) return cost

    ADJ.map(([dx, dy]) => [dx + x, dy + y])
      .filter(([x, y]) => map[y]?.[x] && map[y]?.[x])
      .filter(pos => !visited.has(pos + ''))
      .forEach(pos => {
        visited.add(pos + '')
        queue.push({ pos, cost: cost + map[pos[1]][pos[0]] })
      })
    queue.sort((a, b) => a.cost - b.cost)
  }
}

run({
  solve,
  tests: [
    {
      input: `
        1163751742
        1381373672
        2136511328
        3694931569
        7463417111
        1319128137
        1359912421
        3125421639
        1293138521
        2311944581`,
      expected: 40,
    },
  ],
  onlyTests: false,
})

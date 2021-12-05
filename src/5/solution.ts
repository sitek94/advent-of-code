import { createLine, Line, parseInput, Point, realRawInput } from './input';

export function partOne(input: string) {
  const grid = drawGrid(999);
  const lines = parseInput(input);

  lines.forEach(line => {
    drawLine(grid, line);
  });

  const count = grid.flat().filter(n => n >= 2).length;
  console.log(count);
}

partOne(realRawInput);

type Grid = number[][];

export function drawGrid(size: number) {
  let grid = [];

  for (let i = 0; i < size; i++) {
    grid.push([]);
    for (let j = 0; j < size; j++) {
      grid[i].push(0);
    }
  }

  return grid;
}

const s = createLinePoints(createLine('2,0 -> 0,2'));
console.log(s);

export function createLinePoints(line: Line): Point[] | null {
  const { a, b } = line;

  const points: Point[] = [];
  // Vertical line
  if (a.x === b.x) {
    for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) {
      points.push({ x: a.x, y });
    }
    return points;
  }
  if (a.y === b.y) {
    for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) {
      points.push({ x, y: a.y });
    }
    return points;
  }

  let x0 = a.x;
  let y0 = a.y;
  let x1 = b.x;
  let y1 = b.y;
  let x = a.x;
  let y = a.y;
  for (let i = 0; i <= Math.abs(a.x - b.x); i++) {
    points.push({ x, y });

    if (x0 < x1) {
      x++;
    } else {
      x--;
    }
    if (y0 < y1) {
      y++;
    } else {
      y--;
    }
  }

  // Skip others
  return points.length ? points : null;
}

// Mutate the grid
export function drawLine(grid: Grid, line: Line) {
  const points = createLinePoints(line);
  points?.forEach(point => {
    grid[point.x][point.y]++;
  });
}

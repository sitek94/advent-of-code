import { createLinePoints, drawGrid, drawLine } from './solution';
import { createLine, parseInput } from './input';

test('parseInput works', () => {
  const input = `0,9 -> 5,9
8,0 -> 0,8`;

  expect(parseInput(input)).toEqual([
    { a: { x: 0, y: 9 }, b: { x: 5, y: 9 } },
    { a: { x: 8, y: 0 }, b: { x: 0, y: 8 } },
  ]);
});

test('createLinePoints works', () => {
  expect(createLinePoints({ a: { x: 1, y: 1 }, b: { x: 1, y: 3 } })).toEqual([
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
  ]);

  expect(
    createLinePoints({
      a: { x: 9, y: 7 },
      b: { x: 7, y: 7 },
    }),
  ).toEqual([
    { x: 7, y: 7 },
    { x: 8, y: 7 },
    { x: 9, y: 7 },
  ]);

  expect(
    createLinePoints({
      a: { x: 0, y: 0 },
      b: { x: 2, y: 2 },
    }),
  ).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ]);

  expect(
    createLinePoints({
      a: { x: 9, y: 7 },
      b: { x: 7, y: 9 },
    }),
  ).toEqual([
    { x: 9, y: 7 },
    { x: 8, y: 8 },
    { x: 7, y: 9 },
  ]);
});

test('drawGrid works', () => {
  expect(drawGrid(3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test('drawLine works', () => {
  const grid = drawGrid(3);
  const horizontal = createLine(`0,0 -> 0,2`);
  const vertical = createLine(`2,2 -> 0,2`);

  drawLine(grid, horizontal);
  drawLine(grid, vertical);

  expect(grid).toEqual([
    [1, 1, 2],
    [0, 0, 1],
    [0, 0, 1],
  ]);
});

test('drawLine works', () => {
  const grid = drawGrid(3);
  const line = createLine(`2,0 -> 0,2`);

  drawLine(grid, line);

  expect(grid).toEqual([
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ]);
});

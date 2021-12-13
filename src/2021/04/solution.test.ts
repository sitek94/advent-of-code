import {
  partOne,
  hasWinningRow,
  hasWinningCol,
  toNumbers,
  partTwo,
} from './solution';
import {
  exampleNumbersToDraw,
  exampleRawInput,
  realNumbersToDraw,
  realRawInput,
} from './input';

test('partTwo works with real data', () => {
  expect(partTwo(realNumbersToDraw, realRawInput)).toBe(3178);
});

test('partTwo works with example data', () => {
  expect(partTwo(exampleNumbersToDraw, exampleRawInput)).toBe(1924);
});

test('partOne works with real data', () => {
  expect(partOne(realNumbersToDraw, realRawInput)).toBe(41503);
});

test('partOne works with example data', () => {
  expect(partOne(exampleNumbersToDraw, exampleRawInput)).toBe(4512);
});

test('hasWinningRow', () => {
  expect(
    // prettier-ignore
    hasWinningRow([
      -1, -1, -1, -1, -1,
      33, 55, 73, 27, 69,
      88, 80, 9, 7, 59,
      98, 63, 42, 84, 37,
      87, 28, 97, 66, 79,
    ]),
  ).toBe(true);

  expect(
    // prettier-ignore
    hasWinningRow(
      [
      33, 55, 73, 27, 69,
      88, 80, 9, 7, 59,
      98, 63, 42, 84, 37,
      87, 28, 97, 66, 79
      -1, -1, -1, -1, -1,
    ]),
  ).toBe(true);

  expect(
    // prettier-ignore
    hasWinningRow([
      33, 55, 73, 27, 69,
      88, 80, 9, 7, 59,
      -1, -1, -1, -1, -1,
      98, 63, 42, 84, 37,
      87, 28, 97, 66, 79
    ]),
  ).toBe(true);

  expect(
    // prettier-ignore
    hasWinningRow([
      33, 55, 73, 27, 69,
      88, 80, 9, 7, 59,
      88, 80, 9, 7, 59,
      98, 63, 42, 84, 37,
      87, 28, 97, 66, 79,
    ]),
  ).toBe(false);
});

test('hasWinningCol', () => {
  expect(
    // prettier-ignore
    hasWinningCol([
      -1, 55, 73, 27, 69,
      -1, 55, 73, 27, 69,
      -1, 80, 9, 7, 59,
      -1, 63, 42, 84, 37,
      -1, 28, 97, 66, 79,
    ]),
  ).toBe(true);

  expect(
    // prettier-ignore
    hasWinningCol([
      33, 55, -1, 27, 69,
      88, 80, -1, 7, 59,
      98, 63, -1, 84, 37,
      98, 63, -1, 84, 37,
      87, 28, -1, 66, 79,
    ]),
  ).toBe(true);

  expect(
    // prettier-ignore
    hasWinningCol([
      33, 55, 73, 27, -1,
      88, 80, 9, 7, -1,
      22, 1, 22, 13, -1,
      98, 63, 42, 84, -1,
      87, 28, 97, 66, -1,
    ]),
  ).toBe(true);

  expect(
    // prettier-ignore
    hasWinningCol([
      33, 55, 73, 27, 69,
      88, 80, 9, 7, 59,
      88, 80, 9, 7, 59,
      98, 63, 42, 84, 37,
      87, 28, 97, 66, 79,
    ]),
  ).toBe(false);
});

test('toNumbers', () => {
  expect(toNumbers(exampleRawInput)).toHaveLength(75);
});

import split from 'just-split';
import { range, sum } from '../../utils';

const MARKED = -1;
const BOARD_SIDE = 5;
const BOARD_SIZE = BOARD_SIDE * BOARD_SIDE;

export function partTwo(numbersToDraw: number[], rawInput: string) {
  const allBoardsNumbers = toNumbers(rawInput);
  let boards = split(allBoardsNumbers, BOARD_SIZE);

  for (const drawnNumber of numbersToDraw) {
    boards = boards
      // Remove null boards (the ones that have won)
      .filter(Boolean)
      .map(board => markNumbers(board, drawnNumber));

    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];

      if (hasWinningRow(board) || hasWinningCol(board)) {
        // Last board standing
        if (boards.filter(b => b !== null).length === 1) {
          return calcScore(board, drawnNumber);
        }
        boards[i] = null;
      }
    }
  }
}

export function partOne(numbersToDraw: number[], rawInput: string) {
  let allBoards = toNumbers(rawInput);
  let boards = split(allBoards, BOARD_SIZE);

  for (const drawnNumber of numbersToDraw) {
    // Mark and update all numbers
    boards = boards.map(board => markNumbers(board, drawnNumber));

    for (const board of boards) {
      if (hasWinningRow(board) || hasWinningCol(board)) {
        return calcScore(board, drawnNumber);
      }
    }
  }
}

export function markNumbers(numbers: number[], number: number): number[] {
  return numbers.map(n => (n === number || isMarked(n) ? MARKED : n));
}

export function hasWinningRow(numbers: number[]) {
  for (const row of split(numbers, BOARD_SIDE)) {
    if (row.every(isMarked)) {
      return true;
    }
  }
  return false;
}

export function hasWinningCol(numbers: number[]) {
  for (const colIndex of range(BOARD_SIDE)) {
    const col = numbers.filter((n, i) => (i - colIndex) % BOARD_SIDE === 0);
    if (col.every(isMarked)) {
      return true;
    }
  }
  return false;
}

function isMarked(number: number): boolean {
  return number === MARKED;
}

function isNotMarked(number: number): boolean {
  return number !== MARKED;
}

export function toNumbers(input: string) {
  return input.split(/\s+/).map(Number);
}

export function sumNotMarkedNumbers(numbers: number[]) {
  return sum(numbers.filter(isNotMarked));
}

export function calcScore(numbers: number[], n: number) {
  return sum(numbers.filter(isNotMarked)) * n;
}

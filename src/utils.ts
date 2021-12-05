export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}

// d3-shape
// https://github.com/d3/d3-shape/blob/main/src/math.js
export const max = Math.max;
export const min = Math.min;
export const abs = Math.abs;

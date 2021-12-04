export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}

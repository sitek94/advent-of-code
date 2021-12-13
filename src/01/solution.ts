export function partOne(numbers: number[]) {
  let last = null;
  let current = 0;
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    current = numbers[i];

    if (last && current > last) {
      count++;
    }

    last = current;
  }

  return count;
}

export function partTwo(numbers: number[]) {
  let last = null;
  let current = 0;
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    let [a, b, c] = numbers.slice(i, i + 3);
    if (!a || !b || !c) {
      continue;
    }

    current = a + b + c;
    if (last && current > last) {
      count++;
    }
    last = current;
  }

  return count;
}

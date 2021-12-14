import { run } from '../../runner';
import { max, min, range } from '../../../utils';

function solve(input: string) {
  let [template, rulesInput] = input.split('\n\n');
  let rulesLines = rulesInput.split('\n');

  const rules = {};

  for (let line of rulesLines) {
    let [pair, x] = line.split(' -> ');
    rules[pair] = x;
  }

  let counts: Record<string, number> = {};
  template.split('').forEach((letter, i) => {
    let a = letter;
    let b = template[i + 1];
    if (b) {
      let pair = a + b;
      counts[pair] = 1;
    }
  });

  for (let i of range(40)) {
    let newCounts = {};
    for (let [pair, x] of Object.entries(rules)) {
      if (pair in counts) {
        let [a, b] = pair;
        let newPairs = [a + x, x + b];
        for (let newPair of newPairs) {
          newCounts[newPair] = (newCounts[newPair] || 0) + counts[pair];
        }
      }
    }
    counts = newCounts;
  }

  console.log(counts);

  // for (let step of range(10)) {
  //   console.log(step, counts);
  //   let countsCopy = { ...counts };
  //
  //   for (let [pair, insertion] of Object.entries(rules)) {
  //     let newCounts = { ...countsCopy };
  //
  //     if (counts[pair]) {
  //       let [a, b] = pair;
  //       for (let newPair of [a + insertion, insertion + b]) {
  //         if (newCounts[newPair]) {
  //           newCounts[newPair]++;
  //         } else {
  //           newCounts[newPair] = 1;
  //         }
  //       }
  //     }
  //
  //     for (let [pair, value] of Object.entries(newCounts)) {
  //       if (counts[pair]) {
  //         counts[pair] += value;
  //       } else {
  //         counts[pair] = value;
  //       }
  //     }
  //   }
  // }

  let C: Record<string, number> = {};
  for (let [[a], value] of Object.entries(counts)) {
    if (a in C) {
      C[a] += value;
    } else {
      C[a] = value;
    }
  }
  let t = template;

  C[t[t.length - 1]] += 1;
  console.log(C);

  //
  let least = min(...Object.values(C));
  let most = max(...Object.values(C));
  //
  console.log(least, most);
  let answer = most - least;
  console.log(answer);
  //
  // console.log(counts);
  let count = 0;
  let newTemplate = '';
  // for (let i = 0; i < template.length; i++) {}

  // console.log(insertions);

  // for (let i = 0; i < template.length; i++) {
  //   let pair = template[i] + template.at(i + 1);
  // }

  // console.log(template);
  // console.log(rules);

  return 'solution';
}

run({
  solve,
  tests: [
    {
      input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
      expected: 10,
    },
  ],
  onlyTests: false,
});

function getAllIndexes(substring, string) {
  let a = [],
    i = -1;
  while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
  return a;
}

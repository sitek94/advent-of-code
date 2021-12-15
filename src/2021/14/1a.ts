import { run } from '../../runner';
import { max, min, range } from '../../../utils';
import countBy from 'lodash/countby';

function solve(input: string) {
  let [start, rulesInput] = input.split('\n\n');
  let rulesLines = rulesInput.split('\n');

  const rules = {};
  for (let line of rulesLines) {
    let [pair, x] = line.split(' -> ');
    rules[pair] = x;
  }

  let S = start;
  for (let step in range(10)) {
    let T = '';
    for (let i = 0; i < S.length; i++) {
      T += S[i];
      if (i + 1 < S.length) {
        T += rules[S[i] + S[i + 1]];
      }
    }
    S = T;
  }
  let counts = countBy(S.split(''));
  let answer = max(...Object.values(counts)) - min(...Object.values(counts));

  return answer;
}

run({
  solve,
  tests: [
    {
      input: `
        NNCB

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
      expected: 1588,
    },
  ],
  onlyTests: true,
});

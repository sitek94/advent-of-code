const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

let lines = input.split('\n');

let l1 = '(';
let l2 = '[';
let l3 = '{';
let l4 = '<';
let r1 = ')';
let r2 = ']';
let r3 = '}';
let r4 = '>';

const isLeft = b => '({[<'.includes(b);
const isRight = b => ')}]>'.includes(b);

const matches = (left, right) => {
  if (left === l1 && right === r1) return true;
  if (left === l2 && right === r2) return true;
  if (left === l3 && right === r3) return true;
  if (left === l4 && right === r4) return true;
  return false;
};

const points = {
  [r1]: 3,
  [r2]: 57,
  [r3]: 1197,
  [r4]: 25137,
};

let count = 0;

for (let line of lines) {
  let index = 0;
  let stack = [];
  for (let b of line) {
    if (isLeft(b)) {
      stack.push(b);
    }
    if (isRight(b)) {
      if (matches(stack.at(-1), b)) {
        stack.pop();
      } else {
        count += points[b];
        break;
      }
    }
    index++;
  }
}

console.log('Answer: ', count);

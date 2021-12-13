/**
 * @fileoverview
 *
 * Most of this code is taken from AoC Runner, a tool for running AoC solutions
 * by Maciej Caderek (caderek)
 *
 * https://github.com/caderek/aocrunner
 */

import stripIndent from 'common-tags/lib/stripIndent';
import getCallerFile from 'get-caller-file';
import { toFixed } from '../utils';
import path from 'path';
import fs from 'fs';
import kleur from 'kleur';

type Solution = {
  tests?: Tests;
  solve: SolveFn;
  onlyTests?: boolean;
};

type SolveFn = (input: string) => string | number | void;

export function run(solution: Solution, inputFile?: string) {
  let currentFile = getCallerFile();
  let currentDir = path.dirname(currentFile);

  let inputFilePath = path.join(currentDir, inputFile || 'input.txt');

  if (!fs.existsSync(inputFilePath)) {
    console.log(
      kleur.red(
        stripIndent(`
        There is no "input.txt" file in the solution directory!
        
        Please add the file or specify custom file location
        via the second argument of the \`run\` function.
      `),
      ),
    );
    return;
  }

  runAsync(solution, inputFilePath);
}

async function runAsync(solution: Solution, inputFilePath: string) {
  await runTests(solution.tests, solution.solve);

  if (solution.onlyTests) {
    return;
  }

  const input = fs.readFileSync(inputFilePath).toString();

  let output = await runSolve(solution.solve, input);
}

async function runSolve(solve: SolveFn, input: string) {
  const t0 = process.hrtime.bigint();
  const result = await solve(input);
  const t1 = process.hrtime.bigint();
  const time = Number(t1 - t0) / 1e6;

  console.log(`\nSolved in ${toFixed(time)}ms:`);
  console.dir(result);

  return { result, time };
}

type Tests = {
  name?: string;
  input: string;
  expected: string | number | bigint | void;
}[];

async function runTests(tests: Tests, solve: SolveFn) {
  for (let i = 0; i < tests.length; i++) {
    const { name, input, expected } = tests[i];
    const data = stripIndent(input);

    const result = await solve(data);

    const testName = `Test ${i + 1}${name ? `, ${name}` : ''}`;

    if (result === expected) {
      console.log(kleur.green(`${testName} - passed`));
    } else {
      console.log(kleur.red(`${testName} - failed`));
      console.log(`\nResult:`);
      console.dir(result);
      console.log(`\nExpected:`);
      console.dir(expected);
      console.log();
    }
  }
}

function getPartFromCurrentFile() {
  let currentFile = getCallerFile();
  let fileName = currentFile.split('/').pop();
  let part = fileName.split('.').shift();
  return part;
}

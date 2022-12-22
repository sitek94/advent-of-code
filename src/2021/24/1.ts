import { run } from '../../runner'

function solve(input: string) {
  type Instr = 'inp' | 'add' | 'mul' | 'div' | 'mod' | 'eql'

  let vars = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  }

  // for (let line of input.split('\n')) {
  //
  //   let [instr, variable, variableOrNumber] = line.split(' ');
  //   if (instr === 'inp') {
  //     vars[variable] =
  //   }
  //
  // }

  return 'solution'
}

run({
  solve,
  tests: [
    {
      input: `
          inp x
          mul x -1    
      `,
      expected: 10,
    },
  ],
  onlyTests: true,
})

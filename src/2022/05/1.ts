import { run } from '~/runner'

/* 
    [S] [C]         [Z]            
[F] [J] [P]         [T]     [N]    
[G] [H] [G] [Q]     [G]     [D]    
[V] [V] [D] [G] [F] [D]     [V]    
[R] [B] [F] [N] [N] [Q] [L] [S]    
[J] [M] [M] [P] [H] [V] [B] [B] [D]
[L] [P] [H] [D] [L] [F] [D] [J] [L]
[D] [T] [V] [M] [J] [N] [F] [M] [G]
 1   2   3   4   5   6   7   8   9 
*/

let MAP = {
  1: 'DLJRVGF'.split(''),
  2: 'TPMBVHJS'.split(''),
  3: 'VHMFDGPC'.split(''),
  4: 'MDPNGQ'.split(''),
  5: 'JLHNF'.split(''),
  6: 'NFVQDGTZ'.split(''),
  7: 'FDBL'.split(''),
  8: 'MJBSVDN'.split(''),
  9: 'GLD'.split(''),
}

function solve(input: string) {
  let instructions = input.split('\n').map(i => i.split(' ').map(Number))
  console.log(instructions)

  for (let [quantity, from, to] of instructions) {
    for (let i = 0; i < quantity; i++) {
      const popped = MAP[from].pop()
      MAP[to].push(popped)
    }
  }

  const answer = Object.values(MAP)
    .map(v => v.at(-1))
    .join('')

  console.log(MAP)

  return answer
}

run({
  solve,
  tests: [],
  // onlyTests: true,
})

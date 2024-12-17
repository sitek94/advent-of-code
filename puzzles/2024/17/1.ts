import {run} from '~/run'

function solve(input: string) {
  const initial = parseInput(input)

  let regA = initial.regA
  let regB = initial.regB
  let regC = initial.regC
  let program = initial.program
  let pointer = 0

  let output: number[] = []

  while (pointer < program.length) {
    let opcode = program[pointer]
    let operand = program[pointer + 1]

    const skipPointerIncrement = performOperation(opcode, operand)

    if (skipPointerIncrement) continue

    pointer += 2
  }

  function performOperation(opcode: number, operand: number) {
    switch (opcode) {
      case 0:
        return adv(operand)
      case 1:
        return bxl(operand)
      case 2:
        return bst(operand)
      case 3:
        return jnz(operand)
      case 4:
        return bxc(operand)
      case 5:
        return out(operand)
      case 6:
        return bdv(operand)
      case 7:
        return cdv(operand)
      default:
        throw new Error(`Unknown opcode: ${opcode}`)
    }
  }

  function combo(operand: number) {
    if (operand >= 0 && operand <= 3) return operand
    if (operand === 4) return regA
    if (operand === 5) return regB
    if (operand === 6) return regC
    if (operand === 7) throw new Error('Invalid program')
    throw new Error(`Unknown operand: ${operand}`)
  }

  function literal(operand: number) {
    return operand
  }

  // 0: division
  function adv(operand: number) {
    let numerator = regA
    let denominator = 2 ** combo(operand)
    let result = Math.floor(numerator / denominator) // truncate to integer
    regA = result
  }

  // 1: bitwise XOR
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
  function bxl(operand: number) {
    let xor = regB ^ literal(operand)
    regB = xor
  }

  // 2: bst
  function bst(operand: number) {
    let modulo = combo(operand) % 8
    regB = modulo
  }

  // 3: jnz
  function jnz(operand: number) {
    const doesNothing = regA === 0
    if (doesNothing) return
    // jump pointer
    pointer = literal(operand) // TODO: don't increase the instruction pointer by 2

    return true
  }

  // 4: bxc
  function bxc(_operand: number /* operand ignored for legacy reasons */) {
    let xor = regB ^ regC
    regB = xor
  }

  // 5: out
  function out(operand: number) {
    let modulo = combo(operand) % 8
    output.push(modulo)
  }

  // 6: bdv
  function bdv(operand: number) {
    let numerator = regA
    let denominator = 2 ** combo(operand)
    let result = Math.floor(numerator / denominator) // truncate to integer
    regB = result
  }

  // 7: cdv
  function cdv(operand: number) {
    let numerator = regA
    let denominator = 2 ** combo(operand)
    let result = Math.floor(numerator / denominator) // truncate to integer
    regC = result
  }

  return output.join(',')
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: '4,6,3,5,6,3,5,2,1,0'},
    {input: 'test2.txt', expected: ''},
    {input: 'test3.txt', expected: '0,1,2'},
    {input: 'test4.txt', expected: '4,2,5,6,7,7,7,7,3,1,0'},
    {input: 'test5.txt', expected: ''},
    {input: 'test6.txt', expected: ''},
    {input: 'input.txt', expected: '4,0,4,7,1,2,7,1,6'},
  ],
})

function parseInput(input: string) {
  const [registersInput, programInput] = input.split('\n\n')
  const registers = registersInput.split('\n')

  const [regA, regB, regC] = registers.map(line => +line.split(': ')[1])

  const program = programInput.split(': ')[1].split(',').map(Number)

  return {regA, regB, regC, program}
}

import {run} from '~/runner'

function solve(input: string) {
  let binary = parseInt(input, 16).toString(2)

  while (binary.length < 4 * input.length) {
    binary = '0' + binary
  }

  let i = 0
  while (true) {
    let V = parseInt(binary.slice(i, i + 3), 2)
    i += 3
    let ID = parseInt(binary.slice(i, i + 3), 2)
    i += 3

    if (ID === 4) {
      // const number = getLiteralValue();
    } else {
      let LENGTH_ID = binary[i]
      i += 1

      if (LENGTH_ID === '0') {
        let subpacket_length = parseInt(binary.slice(i, i + 15), 2)
        i += 15
        console.log({subpacket_length})

        let numbers = []
        let stop = false

        const number = getLiteralValue()
        console.log(number)
        // while (numbers.join('').length < subpacket_length) {
        //   let number = getLiteralValue();
        //   console.log(number);
        //   numbers.push(number);
        //   i += number.length;
        // }
        console.log({numbers})
      }
    }
    if (i >= binary.length - 1) {
      break
    }
  }

  function getLiteralValue() {
    let groups = []
    let stop = false

    while (!stop && i < binary.length) {
      let V = parseInt(binary.slice(i, i + 3), 2)
      i += 3
      let ID = parseInt(binary.slice(i, i + 3), 2)
      i += 3
      let prefix = binary[i]
      i += 1
      console.log({prefix})
      let group = binary.slice(i, i + 4)
      groups.push(group)
      i += 4
      if (prefix === '0') {
        stop = true
      }
    }
    console.log({groups})
    let number = groups.join('')
    return number
  }
  // Literal Value
  // if (ID === 4) {
  //   // Operator
  // } else {
  // }

  return 'solution'
}

run({
  solve,
  tests: [
    {
      input: `38006F45291200`,
      // input: `D2FE28`,
      expected: 10,
    },
  ],
  onlyTests: true,
})

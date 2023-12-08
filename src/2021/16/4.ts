import { run } from '~/runner'
import { range } from '~/utils'

let data = require('fs')
  .readFileSync(__dirname + '/input.txt', { encoding: 'utf-8' })
  .trim()

type Packet = { type: number; version: number; data: string }

function parsePacket(data: string, cb: (p: Packet) => void) {
  let bits = data.split('')

  let version = parseInt(readBits(3), 2)
  let type = parseInt(readBits(3), 2)

  cb({ type, version, data: '' })
  // Packets with type ID 4 represent a LITERAL VALUE
  if (type === 4) {
    let value = ''

    // Parse multiple groups of 4 bits prefixed by 1 or 0
    while (true) {
      let group = readBits(5).padEnd(5, '0')
      let prefix = group[0]
      value += group.substring(1)

      // Prefix "0" means that it is the last group of bits
      if (prefix === '0') {
        break
      }
    }

    let packet = {
      version,
      type,
      value: parseInt(value, 2),
      data: bits.join(''),
    }
    return packet

    // If the packet is not a literal value it is an OPERATOR
  } else {
    // First bit immediately after the header is a LENGTH TYPE ID
    let lengthTypeID = bits.splice(0, 1)[0]

    // If "0", the next 15 bits are a number that represents the total length in
    // bits of the sub-packets contained by this packet.
    if (lengthTypeID === '0') {
      let subpacketsLength = parseInt(readBits(15), 2)
      let subpacketContent = bits.splice(0, subpacketsLength).join('')

      let subpackets = []

      // Parse sub-packets until the length of the sub-packets is reached
      while (subpacketContent.length > 0) {
        let packet = parsePacket(subpacketContent, cb)

        subpackets.push(packet)
        subpacketContent = packet.data
      }

      return { version, type, data: bits.join('') }

      // If "1", then the next 11 bits are a number that represents the number
      // of sub-packets immediately contained by this packet.
    } else if (lengthTypeID === '1') {
      let numberOfSubpackets = parseInt(bits.splice(0, 11).join(''), 2)
      let subpacketsData = bits.join('')

      let subpakcets = []

      for (let _ in range(numberOfSubpackets)) {
        let packet = parsePacket(subpacketsData, cb)

        subpakcets.push(packet)
        subpacketsData = packet.data
      }

      return { version, type, data: subpacketsData }
    }
  }

  function readBits(n) {
    return bits.splice(0, n).join('')
  }
}

function solve(input) {
  let binaries = toBinary(input)
  let totalVersion = 0

  parsePacket(binaries, p => (totalVersion += p.version))

  return totalVersion
}

run({
  solve,
  tests: [
    {
      input: `8A004A801A8002F478`,
      expected: 16,
    },
    {
      input: `620080001611562C8802118E34`,
      expected: 12,
    },
    {
      input: `C0015000016115A2E0802F182340`,
      expected: 23,
    },
    {
      input: `A0016C880162017C3686B18A3D4780`,
      expected: 31,
    },
  ],
  onlyTests: true,
})

function toBinary(input: string): string {
  return (
    input
      .split('')
      // Convert each hex digit to decimal
      .map(hex => parseInt(hex, 16))
      // Convert decimal to binary
      .map(decimal => decimal.toString(2))
      // Pad binaries with zero, each digit should be
      // four bits long, e.g. "1" -> "0001"
      .map(binary => binary.padStart(4, '0'))
      // Join groups of four bits into one binary string
      .join('')
  )
}

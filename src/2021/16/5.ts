import {run} from '~/runner'
import {range} from '~/utils'

let data = require('fs')
  .readFileSync(__dirname + '/input.txt', {encoding: 'utf-8'})
  .trim()

type BasePacket = {type: number; version: number; data: string}

type LiteralPacket = BasePacket & {value: number}
type OperatorPacket = BasePacket & {
  subpackets: Packet[]
}
type Packet = LiteralPacket | OperatorPacket

const isLiteralPacket = (p): p is LiteralPacket => 'value' in p

function parsePacket(data: string, cb: (p: Packet) => void) {
  let bits = data.split('')

  let version = parseInt(readBits(3), 2)
  let type = parseInt(readBits(3), 2)

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

    let packet: LiteralPacket = {
      version,
      type,
      value: parseInt(value, 2),
      data: bits.join(''),
    }

    cb(packet)

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
      let packet: OperatorPacket = {
        version,
        type,
        data: bits.join(''),
        subpackets,
      }
      cb(packet)

      return packet

      // If "1", then the next 11 bits are a number that represents the number
      // of sub-packets immediately contained by this packet.
    } else if (lengthTypeID === '1') {
      let numberOfSubpackets = parseInt(bits.splice(0, 11).join(''), 2)
      let subpacketsData = bits.join('')

      let subpackets = []

      for (let _ in range(numberOfSubpackets)) {
        let packet = parsePacket(subpacketsData, cb)

        subpackets.push(packet)
        subpacketsData = packet.data
      }

      let packet: OperatorPacket = {
        version,
        type,
        data: subpacketsData,
        subpackets,
      }
      cb(packet)

      return packet
    }
  }

  function readBits(n) {
    return bits.splice(0, n).join('')
  }
}

function solve(input) {
  let binaries = toBinary(input)

  const packet = parsePacket(binaries, p => {})
  if (isLiteralPacket(packet)) {
    return packet.value
  } else {
    return calcValue(packet)
  }
}

run({
  solve,
  tests: [
    {
      input: `C200B40A82r`,
      expected: 3,
    },
    {
      input: `04005AC33890`,
      expected: 54,
    },
    {
      input: `880086C3E88112`,
      expected: 7,
    },
    {
      input: `CE00C43D881120`,
      expected: 9,
    },
    {
      input: `D8005AC2A8F0`,
      expected: 1,
    },
    {
      input: `F600BC2D8F`,
      expected: 0,
    },
    {
      input: `9C005AC2F8F0`,
      expected: 0,
    },
    {
      input: `9C0141080250320F1802104A08`,
      expected: 1,
    },
  ],
  // onlyTests: true,
})

function getValue(p: Packet) {
  if (isLiteralPacket(p)) {
    return p.value
  } else {
    return calcValue(p)
  }
}

function calcValue(p: OperatorPacket) {
  let value = 0

  // Sum packet
  if (p.type === 0) {
    let sum = 0
    for (let subpacket of p.subpackets) {
      sum += getValue(subpacket)
    }
    return sum
  }

  // Product packets
  if (p.type === 1) {
    let product = 1
    for (let subpacket of p.subpackets) {
      let subpacketValue = getValue(subpacket)
      product *= subpacketValue
    }
    return product
  }

  // Minimum packet
  if (p.type === 2) {
    let min = null
    for (let subpacket of p.subpackets) {
      for (let subpacket of p.subpackets) {
        let subpacketValue = getValue(subpacket)
        if (min) {
          if (subpacketValue < min) {
            min = subpacketValue
          }
        } else {
          min = subpacketValue
        }
      }
    }
    return min
  }

  // Maximum packet
  if (p.type === 3) {
    let max = null
    for (let subpacket of p.subpackets) {
      for (let subpacket of p.subpackets) {
        let subpacketValue = getValue(subpacket)
        if (max) {
          if (subpacketValue > max) {
            max = subpacketValue
          }
        } else {
          max = subpacketValue
        }
      }
    }
    return max
  }

  // Greater than packet
  if (p.type === 5) {
    let greaterThan = null
    let [p1, p2] = p.subpackets
    let v1 = getValue(p1)
    let v2 = getValue(p2)
    if (v1 > v2) {
      greaterThan = 1
    } else {
      greaterThan = 0
    }
    return greaterThan
  }

  // Less than packet
  if (p.type === 6) {
    let lessThan = null

    let [p1, p2] = p.subpackets
    let v1 = getValue(p1)
    let v2 = getValue(p2)
    if (v1 < v2) {
      lessThan = 1
    } else {
      lessThan = 0
    }
    return lessThan
  }

  // Equal to packet
  if (p.type === 7) {
    let [p1, p2] = p.subpackets
    let v1 = getValue(p1)
    let v2 = getValue(p2)
    if (v1 === v2) {
      return 1
    } else {
      return 0
    }
  }

  return value
}

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

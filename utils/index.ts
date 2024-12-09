import fs from 'fs'
import path from 'path'
import getCallerFile from 'get-caller-file'
import util from 'util'

export function range(n: number) {
  return Array.from({length: n}, (_, i) => i)
}

export function repeat<T>(value: T, n: number) {
  return Array.from({length: n}, () => value)
}

export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0)
}

// d3-shape
// https://github.com/d3/d3-shape/blob/main/src/math.js
export const max = Math.max
export const min = Math.min
export const abs = Math.abs

/**
 * Gets input relative to the file it was called from.
 */
export function getInput(fileName = 'input.txt') {
  let currentFile = getCallerFile()
  let currentDir = path.dirname(currentFile)
  let inputFilePath = path.join(currentDir, fileName)

  let file = fs.readFileSync(inputFilePath, 'utf8')
  return file
}

export function toFixed(value: number, precision: number = 3) {
  return Number(value.toFixed(precision))
}

export function isNumber(x: any): x is number {
  return typeof x === 'number'
}

export function isArray(x: any): x is any[] {
  return Array.isArray(x)
}

export const log = (...args: any[]) => {
  console.log(
    util.inspect(args, {showHidden: false, depth: null, colors: true}),
  )
}

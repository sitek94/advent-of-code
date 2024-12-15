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

export function log(...args: any[]) {
  console.log(
    util.inspect(args, {showHidden: false, depth: null, colors: true}),
  )
}

export function printGrid(grid: (string | number)[][]) {
  console.log(grid.map(row => row.join('')).join('\n'))
}

export function isEven(n: number) {
  return n % 2 === 0
}

export function isOdd(n: number) {
  return n % 2 !== 0
}

export function isInteger(n: number) {
  return Number.isInteger(n)
}
/**
 * Returns a positive modulo result, useful for wrapping values within a range
 * (like screen coordinates or circular motion)
 */
export function modulo(value: number, range: number) {
  return ((value % range) + range) % range
}

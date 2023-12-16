import {gcd} from './gcd'

/**
 * Least Common Multiple (LCM) for two numbers
 */
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

/**
 * Least Common Multiple (LCM) for array of numbers
 */
export const lcms = (numbers: number[]): number => {
  let a = 1

  for (let n of numbers) {
    a = lcm(a, n)
  }

  return a
}

/**
 * Greatest Common Divisor (GCD) for two numbers
 */
export const gcd = (a: number, b: number) => {
  if (a === 0) {
    return b
  }

  if (b === 0) {
    return a
  }

  const reminder = a % b

  return gcd(b, reminder)
}

import {run} from '~/run'
import {modulo} from '~/utils/index'

function solve(input: string) {
  const secrets = input.split('\n').map(Number)

  return secrets.reduce((acc, s) => acc + getNthSecret(s, 2000), 0)
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 37327623},
    {input: 'input.txt', expected: 13234715490},
  ],
})

function getNthSecret(secret: number, n: number) {
  for (let i = 0; i < n; i++) {
    secret = getNextSecret(secret)
  }
  return secret
}

function getNextSecret(secret: number) {
  secret = prune(mix(secret * 64, secret))
  secret = prune(mix(Math.floor(secret / 32), secret))
  secret = prune(mix(secret * 2048, secret))

  return secret
}

function mix(value: number, secret: number) {
  return value ^ secret
}

function prune(secret: number) {
  return modulo(secret, 16777216)
}

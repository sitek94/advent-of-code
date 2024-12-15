import {run} from '~/run'
import {modulo, range} from '~/utils/index'

function solve(input: string, options: {maxX: number; maxY: number}) {
  const {maxX, maxY} = options

  const robots = input
    .split('\n')
    .map(line => line.match(/-?\d+/g))
    .map(result => [...result].map(Number) as [number, number, number, number])

  const TIME = 100

  const MIDDLE_X = Math.floor(maxX / 2)
  const MIDDLE_Y = Math.floor(maxY / 2)

  range(TIME).forEach(() => {
    robots.forEach(([px, py, vx, vy], i) => {
      px += vx
      py += vy
      robots[i] = [modulo(px, maxX), modulo(py, maxY), vx, vy]
    })
  })

  let q1 = 0
  let q2 = 0
  let q3 = 0
  let q4 = 0

  console.log(robots.join('\n'))

  robots.forEach(([px, py]) => {
    if (px < MIDDLE_X && py < MIDDLE_Y) q1++
    if (px > MIDDLE_X && py < MIDDLE_Y) q2++
    if (px < MIDDLE_X && py > MIDDLE_Y) q3++
    if (px > MIDDLE_X && py > MIDDLE_Y) q4++
  })

  return q1 * q2 * q3 * q4
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 100, maxX: 11, maxY: 7},
    {input: 'input.txt', expected: 100, maxX: 101, maxY: 103},
  ],
})

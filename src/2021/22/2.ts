import {run} from '~/runner'

function solve(input: string) {
  type Step = [boolean, number, number, number, number, number, number]
  const steps: Step[] = []

  let xMax = 0
  let yMax = 0
  let xMin = 0
  let yMin = 0
  let zMax = 0
  let zMin = 0

  for (let line of input.split('\n')) {
    let [on, coords] = line.split(' ')
    let [x, y, z] = line
      .split(',')
      .map(s => s.split('=')[1].split('..').map(Number))
    let [x1, x2] = x
    let [y1, y2] = y
    let [z1, z2] = z
    if (x1 < xMin) xMin = x1
    if (x2 > xMax) xMax = x2
    if (y1 < yMin) yMin = y1
    if (y2 > yMax) yMax = y2
    if (z1 < zMin) zMin = z1
    if (z2 > zMax) zMax = z2
    steps.push([on === 'on', x1, x2, y1, y2, z1, z2])
  }

  const Cubes = new Map()
  console.log(xMin, xMax, yMin, yMax, zMin, zMax)

  type Coords = [number, number, number]
  const p = (c: Coords) => c.join(',')

  function switchCube(coords: Coords, on: boolean) {
    let point = p(coords)
    Cubes.set(point, on)
  }
  const limit = 50
  function runStep(step: Step) {
    let [on, x1, x2, y1, y2, z1, z2] = step

    if (
      x1 < -limit ||
      x2 > limit ||
      y1 < -limit ||
      y2 > limit ||
      z1 < -limit ||
      z2 > limit
    ) {
      return
    }

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          let coords: Coords = [x, y, z]
          switchCube(coords, on)
        }
      }
    }
  }

  // for (let step of steps) {
  //   runStep(step);
  // }
  // let count = 0;
  // Cubes.forEach(v => {
  //   if (v) {
  //     count++;
  //   }
  // });

  return 'count'
}

run({
  solve,
  tests: [
    {
      input: `
        on x=10..12,y=10..12,z=10..12
        on x=11..13,y=11..13,z=11..13
        off x=9..11,y=9..11,z=9..11
        on x=10..10,y=10..10,z=10..10
      `,
      expected: 39,
    },
  ],
  // onlyTests: true,
})

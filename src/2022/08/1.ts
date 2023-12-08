import {run} from '~/runner'
import {Direction, Grid2d, Point, DIRECTIONS} from '../../utils/grid2d'

function solve(input: string) {
  const grid = new Grid2d(input.split('\n').map(l => l.split('').map(Number)))

  let count = 0

  grid.forEachPoint(point => {
    if (
      grid.isPointEdge(point) ||
      DIRECTIONS.some(direction => isVisible(direction, point))
    ) {
      count++
    }
  })

  function isVisible(direction: Direction, point: Point<number>) {
    let visible = true

    grid.forEachPointInDirection(
      direction,
      point,
      ({value}) => {
        if (point.value <= value) {
          visible = false
        }
      },
      {
        includeStart: false,
      },
    )

    return visible
  }

  return count
}

run({
  solve,
  tests: [
    {
      input: `30373
25512
65332
33549
35390`,
      expected: 21,
    },
    {
      useOriginalInput: true,
      expected: 1543,
    },
  ],
  onlyTests: true,
})

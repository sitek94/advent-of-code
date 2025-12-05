import {run} from '~/run'
import {Grid, Point} from '~/utils/better-grid'

function solve(input: string) {
  const EMPTY = '.'
  const PAPER = '@'

  let total = 0
  let grid = Grid.fromString(input)

  // Keep removing paper rolls
  while (true) {
    const paperToRemove = findPaperToRemove(grid)
    if (paperToRemove) {
      paperToRemove.value = EMPTY
      total++
    } else {
      console.log('FINISHED')
      break
    }
  }

  function findPaperToRemove(_grid: typeof grid) {
    let paperToRemove: Point | null = null

    grid.forEach(point => {
      if (point.value === EMPTY) {
        return
      }

      let paper = 0

      point.forEachSurrounding(p => {
        if (p.value === PAPER) {
          paper++
        }
      })

      if (paper < 4) {
        paperToRemove = point
      }
    })

    return paperToRemove
  }

  return total
}

run({
  solve,
  tests: [
    {input: 'test.txt', expected: 13},
    {input: 'input.txt', expected: 1523},
  ],
})

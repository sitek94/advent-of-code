/**
 * Creates a 2D grid from given array of arrays and exposes some useful methods.
 *
 * Top left corner is (0, 0). X-axis goes right, Y-axis goes down.
 */
export class Grid2d<T = any> {
  private readonly grid: T[][]
  readonly width: number
  readonly height: number
  readonly lastX: number
  readonly lastY: number

  constructor(grid: T[][]) {
    const width = grid[0].length
    const height = grid.length

    this.grid = grid
    this.width = width
    this.height = height
    this.lastX = width - 1
    this.lastY = height - 1
  }

  forEachCell(callbackFn: (value: T, x: number, y: number) => void) {
    this.forEachRow((row, y) => {
      row.forEach((value, x) => {
        callbackFn(value, x, y)
      })
    })
  }

  forEachRow(callbackFn: (row: T[], index: number) => void) {
    this.grid.forEach((row, index) => {
      callbackFn(row, index)
    })
  }

  forEachColumn(callbackFn: (column: T[], index: number) => void) {
    for (let x = 0; x < this.width; x++) {
      let column: T[] = []
      for (let y = 0; y < this.height; y++) {
        column.push(this.grid[y][x])
      }
      callbackFn(column, x)
    }
  }

  print() {
    console.log(this.grid)
  }
}

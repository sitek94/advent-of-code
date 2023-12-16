export function createGrid<T = number>(
  rows: number,
  cols: number,
  defaultValue?: T | 0,
) {
  defaultValue = defaultValue || 0

  let grid = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(defaultValue))

  return {
    width: cols,
    height: rows,
    point,
    forEachPoint,
    grid,
  }

  function point(x, y) {
    let value = grid[y]?.[x]

    return {
      exists: value !== undefined,
      value,
      set: (value: T) => {
        grid[y][x] = value
      },
    }
  }

  function forEachPoint(cb: (x: number, y: number, value: T) => void) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cb(x, y, point(x, y).value)
      }
    }
  }
}

const grid = createGrid(10, 10)

import { Grid2d } from './grid2d'

describe(`${Grid2d.name}`, () => {
  const input = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]

  const grid = new Grid2d(input)

  describe(`${grid.forEachColumn.name}`, () => {
    it('invokes callback function with column and index per each column of the grid', () => {
      const callback = jest.fn()
      grid.forEachColumn(callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, [1, 4, 7], 0)
      expect(callback).toHaveBeenNthCalledWith(2, [2, 5, 8], 1)
      expect(callback).toHaveBeenNthCalledWith(3, [3, 6, 9], 2)
    })
  })

  describe(`${grid.forEachRow.name}`, () => {
    it('invokes callback function with row and index per each row of the grid', () => {
      const callback = jest.fn()
      grid.forEachRow(callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, [1, 2, 3], 0)
      expect(callback).toHaveBeenNthCalledWith(2, [4, 5, 6], 1)
      expect(callback).toHaveBeenNthCalledWith(3, [7, 8, 9], 2)
    })
  })

  describe(`${grid.forEachPoint.name}`, () => {
    it('invokes callback function with value, x and y per each cell of the grid', () => {
      const callback = jest.fn()
      grid.forEachPoint(callback)

      expect(callback).toHaveBeenCalledTimes(9)
      expect(callback).toHaveBeenNthCalledWith(1, { value: 1, x: 0, y: 0 })
      expect(callback).toHaveBeenNthCalledWith(2, { value: 2, x: 1, y: 0 })
      expect(callback).toHaveBeenNthCalledWith(3, { value: 3, x: 2, y: 0 })
      expect(callback).toHaveBeenNthCalledWith(4, { value: 4, x: 0, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(5, { value: 5, x: 1, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(6, { value: 6, x: 2, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(7, { value: 7, x: 0, y: 2 })
      expect(callback).toHaveBeenNthCalledWith(8, { value: 8, x: 1, y: 2 })
      expect(callback).toHaveBeenNthCalledWith(9, { value: 9, x: 2, y: 2 })
    })
  })

  describe(`${grid.forEachPointInDirection.name}`, () => {
    it('invokes callback function for each point in UP direction, when invoked at bottom edge', () => {
      const callback = jest.fn()

      grid.forEachPointInDirection('up', { x: 1, y: 2 }, callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, { value: 8, x: 1, y: 2 })
      expect(callback).toHaveBeenNthCalledWith(2, { value: 5, x: 1, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(3, { value: 2, x: 1, y: 0 })
    })

    it('invokes callback function for each point in DOWN direction, when invoked at top edge', () => {
      const callback = jest.fn()

      grid.forEachPointInDirection('down', { x: 1, y: 0 }, callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, { value: 2, x: 1, y: 0 })
      expect(callback).toHaveBeenNthCalledWith(2, { value: 5, x: 1, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(3, { value: 8, x: 1, y: 2 })
    })

    it('invokes callback function for each point in LEFT direction, when invoked at right edge', () => {
      const callback = jest.fn()

      grid.forEachPointInDirection('left', { x: 2, y: 1 }, callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, { value: 6, x: 2, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(2, { value: 5, x: 1, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(3, { value: 4, x: 0, y: 1 })
    })

    it('invokes callback function for each point in RIGHT direction, when invoked at left edge', () => {
      const callback = jest.fn()

      grid.forEachPointInDirection('right', { x: 0, y: 1 }, callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, { value: 4, x: 0, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(2, { value: 5, x: 1, y: 1 })
      expect(callback).toHaveBeenNthCalledWith(3, { value: 6, x: 2, y: 1 })
    })
  })
})

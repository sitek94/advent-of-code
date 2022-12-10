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
})

// import { createLinePoints, drawGrid, drawLine, partTwo } from './solution';
import {createLine, exampleRawInput, parseInput, realRawInput} from './input'
import {
  createGrid,
  drawHorizontalOrVerticalLine,
  drawLine,
  findEdgePoints,
  getPoints,
  solvePartOne,
  solvePartTwo,
} from './solution'

describe('Part one:', () => {
  it('works with example data', () => {
    expect(solvePartOne(exampleRawInput)).toBe(5)
  })

  it('works with real data', () => {
    expect(solvePartOne(realRawInput)).toBe(7438)
  })
})

describe('Part two:', () => {
  it('works with example data', () => {
    expect(solvePartTwo(exampleRawInput)).toBe(12)
  })

  it('works with real data', () => {
    expect(solvePartTwo(realRawInput)).toBe(21406)
  })
})

test('drawHorizontalOrVerticalLine works', () => {
  const grid = createGrid(0, 0, 2, 2)
  const horizontal = createLine(`0,0 -> 0,2`)
  const vertical = createLine(`2,2 -> 0,2`)
  // Shouldn't draw this one
  const diagonal = createLine(`2,0 -> 0,2`)

  drawHorizontalOrVerticalLine(grid, horizontal)
  drawHorizontalOrVerticalLine(grid, vertical)
  drawHorizontalOrVerticalLine(grid, diagonal)

  expect(grid).toEqual([
    [1, 1, 2],
    [0, 0, 1],
    [0, 0, 1],
  ])
})

test('drawLine works', () => {
  const grid = createGrid(0, 0, 2, 2)
  const horizontal = createLine(`0,0 -> 0,2`)
  const vertical = createLine(`2,2 -> 0,2`)
  const diagonal = createLine(`2,0 -> 0,2`)

  drawLine(grid, horizontal)
  drawLine(grid, vertical)
  drawLine(grid, diagonal)

  expect(grid).toEqual([
    [1, 1, 3],
    [0, 1, 1],
    [1, 0, 1],
  ])
})

describe('getPoints', () => {
  it('works with horizontal and vertical lines', () => {
    expect(getPoints([0, 0, 2, 2], {diagonal: false})).toEqual([])

    expect(getPoints([2, 2, 2, 0], {diagonal: false})).toEqual([
      [2, 0],
      [2, 1],
      [2, 2],
    ])
  })

  it('works for diagonal lines', () => {
    expect(getPoints([0, 0, 2, 2], {diagonal: true})).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ])

    expect(getPoints([2, 2, 0, 0], {diagonal: true})).toEqual([
      [2, 2],
      [1, 1],
      [0, 0],
    ])
  })
})

test('createGrid works', () => {
  expect(createGrid(0, 0, 2, 2)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
})

describe('findEdgePoints', () => {
  it('works for single line', () => {
    expect(findEdgePoints([[0, 0, 9, 9]])).toEqual([0, 0, 9, 9])
  })

  it('works for multiple lines', () => {
    expect(
      findEdgePoints([
        [0, 0, 9, 9],
        [-1, -5, 10, 5],
      ]),
    ).toEqual([-1, -5, 10, 9])
  })

  it('works with AoC example data', () => {
    expect(
      findEdgePoints([
        [0, 9, 5, 9],
        [8, 0, 0, 8],
        [9, 4, 3, 4],
        [2, 2, 2, 1],
        [7, 0, 7, 4],
        [6, 4, 2, 0],
        [0, 9, 2, 9],
        [3, 4, 1, 4],
        [0, 0, 8, 8],
        [5, 5, 8, 2],
      ]),
    ).toEqual([0, 0, 9, 9])
  })
})

test('parseInput works', () => {
  const input = `0,9 -> 5,9
8,0 -> 0,8`

  expect(parseInput(input)).toEqual([
    [0, 9, 5, 9],
    [8, 0, 0, 8],
  ])
})

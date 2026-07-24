import { checkWinner, isDraw } from '../src/utils/gameLogic'

test('horizontal win detected for X', () => {
  const board = ['X','X','X', null, null, null, null, null, null]
  const res = checkWinner(board)
  expect(res.winner).toBe('X')
  expect(res.line).toEqual([0,1,2])
})

test('vertical win detected for O', () => {
  const board = ['O',null,null,'O',null,null,'O',null,null]
  const res = checkWinner(board)
  expect(res.winner).toBe('O')
  expect(res.line).toEqual([0,3,6])
})

test('diagonal win detected', () => {
  const board = ['X',null,null,null,'X',null,null,null,'X']
  const res = checkWinner(board)
  expect(res.winner).toBe('X')
  expect(res.line).toEqual([0,4,8])
})

test('draw detected when full and no winner', () => {
  const board = ['X','O','X','X','O','O','O','X','X']
  expect(isDraw(board)).toBe(true)
  const res = checkWinner(board)
  expect(res.winner).toBeNull()
})

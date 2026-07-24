// Pure game logic helpers

export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/**
 * checkWinner(board)
 * board: Array(9) of null | 'X' | 'O'
 * returns: { winner: 'X'|'O'|null, line: [i,i,i]|null }
 */
export function checkWinner(board) {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }
  return { winner: null, line: null }
}

export function isDraw(board) {
  return board.every(cell => cell !== null) && !checkWinner(board).winner
}

export function getWinningLine(board) {
  return checkWinner(board).line
}

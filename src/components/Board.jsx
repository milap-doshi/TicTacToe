import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Square from './Square'
import styles from '../styles/Board.module.css'

export default function Board({ board, onSquareClick, previewIndex, setPreviewIndex, disabled, focusedIndex, setFocusedIndex }) {
  const refs = useRef([])

  useEffect(() => {
    // ensure focus follows focusedIndex
    const el = refs.current[focusedIndex]
    if (el) el.focus()
  }, [focusedIndex])

  const handleKey = (e) => {
    const idx = focusedIndex
    const row = Math.floor(idx / 3)
    const col = idx % 3
    let next = idx
    if (e.key === 'ArrowRight') next = row * 3 + ((col + 1) % 3)
    if (e.key === 'ArrowLeft') next = row * 3 + ((col + 2) % 3)
    if (e.key === 'ArrowDown') next = ((row + 1) % 3) * 3 + col
    if (e.key === 'ArrowUp') next = ((row + 2) % 3) * 3 + col
    if (next !== idx) {
      e.preventDefault()
      setFocusedIndex(next)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      onSquareClick(idx)
    }
  }

  return (
    <div className={styles.board} role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, i) => (
        <Square
          key={i}
          index={i}
          value={value}
          onClick={() => onSquareClick(i)}
          onMouseEnter={() => setPreviewIndex(i)}
          onMouseLeave={() => setPreviewIndex(null)}
          preview={previewIndex === i}
          disabled={disabled}
          ref={el => refs.current[i] = el}
          onKeyDown={handleKey}
          ariaLabel={`Square ${i + 1}, row ${Math.floor(i / 3) + 1} column ${(i % 3) + 1}`}
        />
      ))}
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onSquareClick: PropTypes.func.isRequired,
  previewIndex: PropTypes.number,
  setPreviewIndex: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  focusedIndex: PropTypes.number,
  setFocusedIndex: PropTypes.func.isRequired
}

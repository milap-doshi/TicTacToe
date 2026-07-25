import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/MoveHistory.module.css'

export default function MoveHistory({ history, jumpTo, currentMove }) {
  return (
    <div className={styles.history}>
      <h4 className={styles.heading}>Moves</h4>
      <ul className={styles.list}>
        {history.map((board, idx) => (
          <li key={idx} className={styles.item}>
            <button
              className={`${styles.moveButton} ${idx === currentMove ? styles.active : ''}`}
              onClick={() => jumpTo(idx)}
            >
              {idx === 0 ? 'Start' : `Move ${idx}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

MoveHistory.propTypes = {
  history: PropTypes.array.isRequired,
  jumpTo: PropTypes.func.isRequired,
  currentMove: PropTypes.number.isRequired
}

import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Controls.module.css'

export default function Controls({ onNewGame, onUndo, onResetScores, soundEnabled, toggleSound, canUndo }) {
  return (
    <div className={styles.controls}>
      <button className={styles.primary} onClick={onNewGame}>New Game</button>
      <button onClick={onUndo} disabled={!canUndo}>Undo</button>
      <button onClick={onResetScores}>Reset Scoreboard</button>
      <button onClick={toggleSound} aria-pressed={soundEnabled}>{soundEnabled ? 'Sound: On' : 'Sound: Off'}</button>
    </div>
  )
}

Controls.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onResetScores: PropTypes.func.isRequired,
  soundEnabled: PropTypes.bool,
  toggleSound: PropTypes.func.isRequired,
  canUndo: PropTypes.bool
}

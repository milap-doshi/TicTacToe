import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Scoreboard.module.css'

export default function Scoreboard({ scores }) {
  return (
    <div className={styles.box} aria-live="polite">
      <h3 className={styles.title}>Scoreboard</h3>
      <div className={styles.row}><strong>X:</strong> <span>{scores.X}</span></div>
      <div className={styles.row}><strong>O:</strong> <span>{scores.O}</span></div>
      <div className={styles.row}><strong>Draws:</strong> <span>{scores.draws}</span></div>
      <div className={styles.row}><strong>Total:</strong> <span>{scores.total}</span></div>
    </div>
  )
}

Scoreboard.propTypes = {
  scores: PropTypes.object.isRequired
}

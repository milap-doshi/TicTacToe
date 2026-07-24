import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/TurnIndicator.module.css'

export default function TurnIndicator({ current }) {
  return (
    <div className={styles.indicator} aria-live="polite">
      <div className={styles.avatar} aria-hidden>
        {current === 'X' ? (
          <svg viewBox="0 0 24 24"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>
        )}
      </div>
      <div>
        <div className={styles.label}>Current Player</div>
        <div className={styles.player}>{current}</div>
      </div>
    </div>
  )
}

TurnIndicator.propTypes = { current: PropTypes.oneOf(['X', 'O']).isRequired }

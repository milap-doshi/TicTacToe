import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ThemeToggle.module.css'

export default function ThemeToggle({ highContrast, onToggle }) {
  return (
    <button className={styles.toggle} onClick={onToggle} aria-pressed={highContrast}>
      {highContrast ? 'High Contrast' : 'Normal'}
    </button>
  )
}

ThemeToggle.propTypes = { highContrast: PropTypes.bool.isRequired, onToggle: PropTypes.func.isRequired }

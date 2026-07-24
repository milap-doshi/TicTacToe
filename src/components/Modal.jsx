import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Modal.module.css'

export default function Modal({ open, children, onClose }) {
  if (!open) return null
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

Modal.propTypes = { open: PropTypes.bool, children: PropTypes.node, onClose: PropTypes.func }

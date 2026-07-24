import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Square.module.css'

const Square = forwardRef(function Square({ index, value, onClick, preview, onMouseEnter, onMouseLeave, disabled, onKeyDown, ariaLabel }, ref) {
  const showPreview = preview && !value && !disabled
  return (
    <button
      ref={ref}
      className={`${styles.square} ${value ? styles.filled : ''} ${showPreview ? styles.preview : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      role="button"
      disabled={disabled}
    >
      <div className={styles.markWrap} aria-hidden={false}>
        {value === 'X' && <svg className={styles.x} viewBox="0 0 100 100"><line x1="18" y1="18" x2="82" y2="82"/><line x1="82" y1="18" x2="18" y2="82"/></svg>}
        {value === 'O' && <svg className={styles.o} viewBox="0 0 100 100"><circle cx="50" cy="50" r="30"/></svg>}
        {showPreview && <div className={styles.previewMark}>{/* visual preview based on assumed current player via CSS var */}</div>}
      </div>
    </button>
  )
})

Square.propTypes = {
  index: PropTypes.number,
  value: PropTypes.string,
  onClick: PropTypes.func,
  preview: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  disabled: PropTypes.bool,
  onKeyDown: PropTypes.func,
  ariaLabel: PropTypes.string
}

export default Square

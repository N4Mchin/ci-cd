import React from 'react'
import styles from './BigBox.less'
const BigBox = ({ title, amount }) => {
  return (
    <div className={styles.statBigBox}>
      <div className={styles.statBigBoxLabel}>{title}</div>

      <div className={styles.statBigBoxDetail}>
        <span>{amount}</span>
      </div>
    </div>
  )
}
export default BigBox

import React from 'react'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'

const DivInput = props => {
  return (
    <div
      {...props}
      className={props.disabled ? styles.divInputDisabled : styles.divInput}
    >
      {props.value}
    </div>
  )
}

export default withI18n()(DivInput)

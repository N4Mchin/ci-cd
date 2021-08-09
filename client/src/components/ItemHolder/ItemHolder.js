import React from 'react'
import styles from './ItemHolder.less'
import { Trans, withI18n } from '@lingui/react'
const ItemHolder = props => {
  const title = props.title || ''
  return (
    <div
      style={{
        margin: '20px 0',
        border: '1px solid #C9C9C9',
        borderRadius: '2px',
        background: '#FAFAFA',
      }}
      className={styles.itemholder}
    >
      <div className={styles.itemholderTitle}>
        <Trans>
          <span>Laboratory </span> <span>Result</span>
        </Trans>
      </div>
      {props.children}
    </div>
  )
}
export default ItemHolder

import React from 'react'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'

const Modul = () => {
  return (
    <div className={styles.modulMainTitle}>
      <span
        style={{
          fontSize: '12px',
          color: '#616161',
          textTransform: 'uppercase',
          lineHeight: '20px',
          textAlign: 'center',
          display: 'inline-block',
          padding: '10px 10px 10px 10px',
        }}
      >
        <Trans>
          <strong>Test result</strong>
          <span> sent for verification.</span>
        </Trans>
      </span>
    </div>
  )
}

export default withI18n()(Modul)

import React from 'react'
import { Input } from 'antd'
import { Trans } from '@lingui/react'
import styles from '../styles.less'

const { TextArea } = Input

const RegulatoryNotes = props => {
  return (
    <div>
      <div className="uppercase">
        <Trans>
          <span className="bold" style={{ lineHeight: '14px' }}>
            Description
          </span>{' '}
          <span style={{ lineHeight: '14px' }}>Notes</span>
        </Trans>
      </div>
      <TextArea
        {...props}
        className={styles.regulatoryNotes}
        defaultValue={props.value}
      />
    </div>
  )
}

export default RegulatoryNotes

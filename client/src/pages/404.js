import React from 'react'
import { Icon } from 'antd'
import { Page, Board } from 'components'
import { withI18n, Trans } from '@lingui/react'
import styles from './404.less'

const Error = () => (
  <Board inner style={{ height: '800px' }}>
    <div className={styles.error}>
      <Icon type="frown-o" />
      <h1>
        <Trans id="Page Not Found" />
      </h1>
    </div>
  </Board>
)

export default withI18n()(Error)

import React from 'react'
import { Table } from 'antd'
import styles from '../styles.less'
import classNames from 'classnames'

const SlimTable = props => {
  return (
    <Table
      {...props}
      className={classNames(styles.slimTable, props.className)}
    />
  )
}

export default SlimTable

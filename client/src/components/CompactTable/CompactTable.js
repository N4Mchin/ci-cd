import React from 'react'
import { Table } from 'antd'
import styles from '../styles.less'
import classNames from 'classnames'

const CompactTable = props => (
  <Table
    {...props}
    className={classNames(styles.compactTable, props.className)}
  />
)

export default CompactTable

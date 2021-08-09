import React from 'react'
import { Collapse, Icon } from 'antd'
import styles from '../styles.less'

const notCollapsed = (
  <Icon
    type="minus"
    style={{
      border: '1px solid #727272',
      borderRadius: '2px',
      padding: '2px',
      margin: '0px 5px 0 0',
    }}
  />
)

const collapsed = (
  <Icon
    type="plus"
    style={{
      border: '1px solid #727272',
      borderRadius: '2px',
      padding: '2px',
      margin: '0px 5px 0 0',
    }}
  />
)
const BorderlessCollapse = props => {
  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (isActive ? notCollapsed : collapsed)}
      defaultActiveKey={props.activeKeys}
      className={styles.borderlessCollapse}
    >
      {props.children}
    </Collapse>
  )
}

export default BorderlessCollapse

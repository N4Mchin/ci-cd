import React from 'react'
import { Collapse, Icon } from 'antd'

const { Panel } = Collapse

const RedCircle = () => (
  <div
    style={{
      display: 'inline-block',
      borderRadius: '32px',
      height: '16px',
      width: '16px',
      marginLeft: '8px',
    }}
    className="orange-background"
  />
)

const ActiveCollapse = props => {
  const {
    children,
    displayName,
    display,
    activeKey,
    activeStatus,
    notSaved,
  } = props

  const notCollapsed = testName => (
    <div
      style={{
        position: 'absolute',
        margin: '-12px 0 0 0',
        padding: '2px 5px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon
        type="minus"
        style={{
          border: '1px solid #727272',
          borderRadius: '2px',
          padding: '2px',
          margin: '0px 5px 0 0',
        }}
      />

      <span
        style={{
          fontSize: '10px',
          fontFamily: 'Helvetica Neue Bold',
          color: '#727272',
          textTransform: 'uppercase',
          wordBreak: 'break-word',
          flexWrap: 'wrap',
          textAlign: 'left',
          display: 'inline',
        }}
      >
        {testName}
      </span>

      {activeStatus && <RedCircle />}
    </div>
  )

  const collapsed = testName => (
    <div
      style={{
        position: 'absolute',
        margin: '-12px 0 0 0',
        padding: '2px 5px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Icon
        type="plus"
        style={{
          border: '1px solid #727272',
          borderRadius: '2px',
          padding: '2px',
          margin: '0px 5px 0 0',
        }}
      />

      <span
        style={{
          fontSize: '10px',
          fontFamily: 'Helvetica Neue Bold',
          color: '#727272',
          textTransform: 'uppercase',
          wordBreak: 'break-word',
          flexWrap: 'wrap',
          textAlign: 'left',
          display: 'inline',
        }}
      >
        {testName}
      </span>

      {activeStatus && <RedCircle />}
    </div>
  )

  return (
    <Collapse
      bordered={false}
      style={{ marginTop: '8px' }}
      expandIcon={({ isActive }) =>
        isActive ? notCollapsed(displayName) : collapsed(displayName, display)
      }
      onChange={props.onActiveChange}
      activeKey={activeKey}
    >
      <Panel style={{ border: '1px solid #c9c9c9' }} key="1">
        {children}
      </Panel>
    </Collapse>
  )
}

export default ActiveCollapse

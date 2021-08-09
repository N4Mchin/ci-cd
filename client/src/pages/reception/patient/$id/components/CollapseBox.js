import React, { PureComponent } from 'react'
import { Collapse, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './styles.less'

const { Panel } = Collapse

@withI18n()
class CollapseBox extends PureComponent {
  // Note:
  // Inline CSS is used because styling with .less is not working
  notCollapsed = Title => (
    <div
      style={{
        position: 'absolute',
        margin: '-14px 0 0 0',
        backgroundColor: '#FFF',
        padding: '2px 5px',
      }}
    >
      <Icon
        type="minus"
        style={{
          border: '1px solid #727272',
          borderRadius: '2px',
          padding: '2px',
          margin: '0 5px 0 0',
        }}
      />
      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>
        {Title}
      </span>
    </div>
  )

  collapsed = Title => (
    <div
      style={{
        position: 'absolute',
        margin: '-14px 0 0 0',
        backgroundColor: '#FFF',
        padding: '2px 5px',
      }}
    >
      <Icon
        type="plus"
        style={{
          border: '1px solid #727272',
          borderRadius: '2px',
          padding: '2px',
          margin: '0 5px 0 0',
        }}
      />
      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>
        {Title}
      </span>
    </div>
  )
  render() {
    const {
      Title,
      children,
      bordered = true,
      noMargin = false,
      ...others
    } = this.props

    const panelStyle = {
      border: bordered ? '1px solid #c9c9c9' : 0,
    }

    if (noMargin) {
      panelStyle.margin = 0
      panelStyle.padding = 0
    }

    return (
      <div className={styles.tableColor}>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) =>
            isActive ? this.notCollapsed(Title) : this.collapsed(Title)
          }
          defaultActiveKey={['1']}
          {...others}
          style={{ paddingTop: '20px' }}
        >
          <Panel style={panelStyle} key="1">
            {children}
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default CollapseBox

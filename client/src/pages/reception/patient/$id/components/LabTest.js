import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Icon, Checkbox, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './styles.less'

const { Panel } = Collapse

@withI18n()
class LabTest extends PureComponent {
  render() {
    const { testList = [], testName, bordered, active, i18n } = this.props

    const notCollapsed = (
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
            margin: '5px 5px 0 0',
          }}
        />
        <span style={{ textTransform: 'uppercase' }}>{testName}</span>
      </div>
    )

    const collapsed = (
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
            margin: '5px 5px 0 0',
          }}
        />
        <span style={{ textTransform: 'uppercase' }}>{testName}</span>
      </div>
    )

    const border = bordered ? '1px solid #c9c9c9' : 0
    const activeKeys = active && ['1']
    return (
      <Collapse
        bordered={false}
        style={{ marginTop: '8px' }}
        expandIcon={({ isActive }) => (isActive ? notCollapsed : collapsed)}
        defaultActiveKey={activeKeys}
      >
        <Panel style={{ border: border }} key="1">
          <Checkbox.Group>
            <Row type="flex" justify="space-around">
              <Col span={24}>
                <Checkbox>Бүгд</Checkbox>
              </Col>
              <Col span={24}>
                <div className={styles.labTestItemSeperator} />
              </Col>
              {testList.map(value => (
                <Col span={24}>
                  <Checkbox>{value}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    )
  }
}

LabTest.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default LabTest

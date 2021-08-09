import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { Row, Col, Checkbox, Collapse, Icon } from 'antd'
import { resolveDisplay } from 'utils/valuesets'
import styles from '../../../reception/report/components/Filter.less'
const { Panel } = Collapse

const notCollapsed = testName => (
  <div
    style={{
      position: 'absolute',
      margin: '-12px 0 0 0',
      padding: '2px 5px',
      backgroundColor: '#FFF',
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
      <Trans id={testName} />
    </span>
  </div>
)

const collapsed = testName => (
  <div
    style={{
      position: 'absolute',
      margin: '-12px 0 0 0',
      padding: '2px 5px',
      backgroundColor: '#FFF',
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
      <Trans id={testName} />
    </span>
  </div>
)

const FilterItem = props => {
  const [checkedList, setCheckedList] = useState([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const { i18n, filterTypeList, title, bordered, active, disabled } = props

  const onChange = values => {
    setCheckedList(values)
    setIndeterminate(
      !!values.length && values.length < Object.values(filterTypeList).length
    )
    setAllChecked(values.length === Object.values(filterTypeList).length)

    props.onChange(values)
  }

  const onCheckAll = event => {
    const values = event.target.checked ? Object.keys(filterTypeList) : []
    onChange(values)
  }

  const checkAll = (
    <>
      <Col span={24}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAll}
          checked={allChecked}
          disabled={disabled}
        >
          <span style={{ fontSize: '10px' }}>{i18n.t`CheckAll`}</span>
        </Checkbox>
      </Col>

      <Col span={24}>
        <div className={styles.seperator} />
      </Col>
    </>
  )

  const border = bordered ? '1px solid #c9c9c9' : 0
  const activeKeys = active && ['1']

  return (
    <Collapse
      bordered={false}
      style={{ marginTop: '8px' }}
      expandIcon={({ isActive }) =>
        isActive ? notCollapsed(title) : collapsed(title)
      }
      defaultActiveKey={activeKeys}
    >
      <Panel style={{ border: border }} key="1">
        <Row type="flex" justify="start">
          {Object.values(filterTypeList).length > 1 && checkAll}

          <Checkbox.Group
            value={checkedList}
            onChange={onChange}
            disabled={disabled}
          >
            {Object.values(filterTypeList).map(listItem => {
              const checkValue = resolveDisplay(listItem, i18n._language)
              return (
                <Col span={24}>
                  <div style={{ float: 'left' }}>
                    <Checkbox value={listItem.code}>
                      <span style={{ fontSize: '10px' }}>{checkValue}</span>
                    </Checkbox>
                  </div>
                </Col>
              )
            })}
          </Checkbox.Group>
        </Row>
      </Panel>
    </Collapse>
  )
}

FilterItem.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(FilterItem))

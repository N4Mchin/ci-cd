import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { Row, Col, Checkbox } from 'antd'
import { resolveDisplay } from 'utils/valuesets'
import styles from './Filter.less'

const FilterItem = props => {
  const [checkedList, setCheckedList] = useState([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const { i18n, filterTypeList, title, disabled } = props

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

  return (
    <div>
      <Row gutter={12}>
        <Col span={24}>
          <div className={styles.container}>
            <div className={styles.title}>
              <span style={{ fontFamily: 'Helvetica Neue Bold' }}>{title}</span>
            </div>

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
          </div>
        </Col>
      </Row>
    </div>
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

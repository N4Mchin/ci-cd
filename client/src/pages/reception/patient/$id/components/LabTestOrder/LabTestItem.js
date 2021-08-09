import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Collapse, Icon, Checkbox, Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import lodash from 'lodash'
import styles from './LabTestOrder.less'

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

const LabTestItem = props => {
  const [checkedList, setCheckedList] = useState([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const {
    i18n,
    displayName,
    bordered,
    active,
    subTestList = [],
    subTestName,
    testName,
  } = props
  const { SelectedTests } = props.reception_patientProfile

  const onChange = values => {
    setCheckedList(values)
    setIndeterminate(!!values.length && values.length < subTestList.length)
    setAllChecked(values.length === subTestList.length)

    const data = {
      code: props.code,
      display: props.displayName,
      include: lodash.pick(subTestList, values),
    }

    props.onChange(subTestName, data)
  }

  /**
   * getDerivedStateFromProps функц нь Property солигдоход дуудагдана
   * Функц дуудагдахад Redux дахь reception_patientProfile state-ийн SelectedTests ийг уншиж,
   * сонгосон байгаа шинжилгээний жагсаалтыг шинэчлэнэ
   * Энэ функцийг Parent дээр мөн адил дуудах хэрэгтэй.
   * Учир нь өөр бүлгийн шинжилгээ нэмж сонгох үед Parent нь энэхүү Child ийн шинэчлэгдсэн утгыг хадгалж байх ёстой.
   * Энэ функц нь төлбөрийн хэсгээс сонгосон байгаа шинжилгээг цуцлах үед, шинжилгээний хэсгийг шинээр зурахад хэрэглэгдэнэ
   * Шинжилгээ бүрийг энэхүү кодоор зурж үзүүлнэ
   */

  useEffect(() => {
    let values = []

    try {
      values = Object.keys(
        SelectedTests[testName]['include'][subTestName]['include']
      )
    } catch {}

    setCheckedList(values)
    setIndeterminate(
      !!values.length &&
        values.length <
          Object.keys(subTestList).filter(
            key => subTestList[key].performed !== false
          ).length
    )
    setAllChecked(
      values.length ===
        Object.keys(subTestList).filter(
          key => subTestList[key].performed !== false
        ).length && values.length !== 0
    )
  }, [SelectedTests, Object.keys(subTestList).length, subTestName, testName])

  const onCheckAll = event => {
    const values = event.target.checked
      ? Object.keys(subTestList).filter(
          key => subTestList[key].performed !== false
        )
      : []

    onChange(values)
  }

  const checkAll = (
    <>
      <Col span={24}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAll}
          checked={allChecked}
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
        isActive ? notCollapsed(displayName) : collapsed(displayName)
      }
      defaultActiveKey={activeKeys}
    >
      <Panel style={{ border: border }} key="1">
        <Row type="flex" justify="start">
          {Object.keys(subTestList).length > 1 && checkAll}

          <Checkbox.Group value={checkedList} onChange={onChange}>
            {Object.keys(subTestList).map(testItemKey => (
              <Col span={24}>
                <div style={{ float: 'left' }}>
                  <Checkbox
                    value={testItemKey}
                    disabled={subTestList[testItemKey].performed === false}
                  >
                    <span style={{ fontSize: '10px' }}>
                      {subTestList[testItemKey].display}
                    </span>
                  </Checkbox>
                </div>
              </Col>
            ))}
          </Checkbox.Group>
        </Row>
      </Panel>
    </Collapse>
  )
}

LabTestItem.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(LabTestItem))

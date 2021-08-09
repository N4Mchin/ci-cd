import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Collapse, Icon, Checkbox, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './../styles.less'

const { Panel } = Collapse

@withI18n()
@connect(({ patientProfile, loading }) => ({ patientProfile, loading }))
class BorderCollapse extends PureComponent {
  state = {
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  }

  /**
   * Шинжилгээ сонгоход state-д хадгалахаас гадна redux дахь PatientProfile -ийн SelectedTests -д хадгална
   * Ингэхдээ Parent -аас дамжуулж өгсөн onChange property -ийг ашиглана
   * Parent нь UncategorizedTests, ImmonologyTests, BiochemistryTests, DiagnosticTest -ийн аль нэг нь байна
   */

  onChange = checkedList => {
    const { subTestList, subTestName } = this.props
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < subTestList.length,
      checkAll: checkedList.length === subTestList.length,
    })

    const data = subTestList.filter(value => checkedList.includes(value.name))
    this.props.onChange(subTestName, data)
  }

  onCheckAllChange = event => {
    const { subTestList, subTestName } = this.props
    const checkedList = event.target.checked
      ? subTestList.map(testItem => testItem.name)
      : []

    this.setState({
      checkedList: checkedList,
      indeterminate: false,
      checkAll: event.target.checked,
    })

    const data = subTestList.filter(value => checkedList.includes(value.name))
    this.props.onChange(subTestName, data)
  }

  disableCollapseTitle = testName => {
    return (
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
      </div>
    )
  }

  notCollapsed = testName => (
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
        {testName}
      </span>
    </div>
  )

  collapsed = testName => (
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
        {testName}
      </span>
    </div>
  )

  checkAll = () => {
    const { i18n } = this.props
    return (
      <>
        <Col span={24}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            <span style={{ fontSize: '10px' }}>{i18n.t`CheckAll`}</span>
          </Checkbox>
        </Col>

        <Col span={24}>
          <div className={styles.seperator} />
        </Col>
      </>
    )
  }

  /**
   * getDerivedStateFromProps функц нь Property солигдоход дуудагдана
   * Функц дуудагдахад Redux дахь PatientProfile state-ийн SelectedTests ийг уншиж,
   * сонгосон байгаа шинжилгээний жагсаалтыг шинэчлэнэ
   * Энэ функцийг Parent дээр мөн адил дуудах хэрэгтэй.
   * Учир нь өөр бүлгийн шинжилгээ нэмж сонгох үед Parent нь энэхүү Child ийн шинэчлэгдсэн утгыг хадгалж байх ёстой.
   * Энэ функц нь төлбөрийн хэсгээс сонгосон байгаа шинжилгээг цуцлах үед, шинжилгээний хэсгийг шинээр зурахад хэрэглэгдэнэ
   * Шинжилгээ бүрийг энэхүү кодоор зурж үзүүлнэ
   */

  static getDerivedStateFromProps(props, state) {
    const { testName, subTestName, subTestList = [] } = props
    // const { SelectedTests } = props.patientProfile
    let checkedList = []

    // if (
    //   SelectedTests &&
    //   SelectedTests[testName] &&
    //   SelectedTests[testName][subTestName]
    // ) {
    //   checkedList = SelectedTests[testName][subTestName].map(
    //     subTestItem => subTestItem.name
    //   )
    // }

    if (checkedList !== state.checkedList) {
      return {
        checkedList: checkedList,
        indeterminate:
          !!checkedList.length && checkedList.length < subTestList.length,
        checkAll: checkedList.length === subTestList.length,
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  /**
   * client/src/pages/patient/$id/components/LabTestItem.js
   * @subTestList шинжилгээний нэрс
   * @displayName шинжилгээний дэлгэцэнд үзүүлэх нэр
   */

  render() {
    const {
      subTestList = [],
      children,
      displayName,
      display,
      bordered,
      active,
      background,
      disableCollapse,
    } = this.props

    const border = bordered ? '1px solid #c9c9c9' : 0
    const activeKeys = active && ['1']

    if (disableCollapse) {
      return (
        <div style={{ marginTop: '8px' }}>
          {this.disableCollapseTitle(displayName)}

          <div
            style={{ border: border, background: background && background }}
            key="1"
          >
            {children}
          </div>
        </div>
      )
    } else {
      return (
        <Collapse
          bordered={false}
          style={{ marginTop: '8px' }}
          expandIcon={({ isActive }) =>
            isActive
              ? this.notCollapsed(displayName)
              : this.collapsed(displayName, display)
          }
          defaultActiveKey={activeKeys}
        >
          <Panel
            style={{ border: border, background: background && background }}
            key="1"
          >
            {children}
          </Panel>
        </Collapse>
      )
    }
  }
}

export default BorderCollapse

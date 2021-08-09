import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Checkbox, Typography, Row, Col, Icon } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import CollapseBox from '../CollapseBox'
import styles from './DiagnosticTest.less'

const { Text } = Typography

const title = () => (
  <Trans>
    <Text strong>Diagnostic </Text>
    <Text>Test</Text>
  </Trans>
)

@withI18n()
@connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))
class DiagnosticTest extends PureComponent {
  state = {
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  }

  onChange = checkedList => {
    const { DiagnosticTests } = this.props.app.FHIR_CODES

    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length &&
        checkedList.length < Object.values(DiagnosticTests).length,
      checkAll: checkedList.length === Object.values(DiagnosticTests).length,
    })

    this.props.dispatch({
      type: 'reception_patientProfile/diagnosticTestOrder',
      payload: {
        SelectedDiagnosticTests: checkedList,
      },
    })
  }

  onCheckAllChange = event => {
    const { DiagnosticTests } = this.props.app.FHIR_CODES
    const checkedList = event.target.checked
      ? Object.keys(DiagnosticTests.include)
      : []

    this.setState({
      checkedList: checkedList,
      indeterminate: false,
      checkAll: event.target.checked,
    })

    this.props.dispatch({
      type: 'reception_patientProfile/diagnosticTestOrder',
      payload: {
        SelectedDiagnosticTests: checkedList,
      },
    })
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
            // disabled
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
   * Төлбөрийн хэсгээс шинжилгээ цуцлагдсан бол Child шинжилгээний шинэ утгыг
   * Redux дахь reception_patientProfile аас уншиж өөрийн state д хадгална
   */

  static getDerivedStateFromProps(props, state) {
    const { SelectedDiagnosticTests = [] } = props.reception_patientProfile
    const { DiagnosticTests = {} } = props.app.FHIR_CODES
    const { checkedList } = state
    // const names = Object.values(SelectedDiagnosticTests).map(item => item.name)

    if (
      JSON.stringify(checkedList) !== JSON.stringify(SelectedDiagnosticTests)
    ) {
      return {
        checkedList: SelectedDiagnosticTests,
        indeterminate:
          !!SelectedDiagnosticTests.length &&
          SelectedDiagnosticTests.length <
            Object.values(DiagnosticTests).length,
        checkAll:
          SelectedDiagnosticTests.length ===
          Object.values(DiagnosticTests).length,
      }
    }

    // Return null if the state hasn't changed
    return null
  }

  render() {
    const { displayName, bordered, active, ...others } = this.props
    const { DiagnosticTests = {} } = this.props.app.FHIR_CODES

    if (!DiagnosticTests) {
      return <React.Fragment></React.Fragment>
    }

    return (
      <div className={styles.diagnosticTest}>
        <CollapseBox Title={title()} {...others} style={{ height: '100%' }}>
          <Row type="flex" justify="start">
            {Object.values(DiagnosticTests.include).length > 1 &&
              this.checkAll()}

            <Checkbox.Group
              name="DiagnosticTests"
              value={this.state.checkedList}
              onChange={this.onChange}
              // disabled
            >
              {Object.keys(DiagnosticTests.include).map(testItem => (
                <Col span={12}>
                  <div style={{ float: 'left' }}>
                    <Checkbox value={testItem}>
                      <span style={{ fontSize: '10px' }}>
                        {DiagnosticTests.include[testItem].display}
                      </span>
                    </Checkbox>
                  </div>
                </Col>
              ))}
            </Checkbox.Group>
          </Row>
        </CollapseBox>
      </div>
    )
  }
}

DiagnosticTest.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default DiagnosticTest

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Row, Col, Checkbox } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './CheckoutPanel.less'

@withI18n()
@connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))
class DiagnosticTests extends PureComponent {
  state = {
    selectedDiagnosticTests: [],
    diagnosticTestCost: 0,
  }

  /**
   * Доорх функц нь сонгосон шинжилгээг цуцлах үед дуудагдана
   * сонгосон шинжилгээг Redux дахь reception_patientProfile дахь SelectedTests ийн утгыг уншиж,
   * цуцлагдаагүй шинжилгээнүүдийг data объектэд хадгалаад client/src/pages/patient/$id/model.js ийн labTestOrder
   * функцруу дамжуулснаар Redux ын state ийг шинэчилнэ
   */

  // unchecking event handler
  onChange = event => {
    const selectedTest = event.target.value
    const { SelectedDiagnosticTests } = this.props.reception_patientProfile
    const data = SelectedDiagnosticTests.filter(item => item !== selectedTest)

    this.props.dispatch({
      type: 'reception_patientProfile/diagnosticTestOrder',
      payload: {
        SelectedDiagnosticTests: data,
      },
    })
  }

  static getDerivedStateFromProps(props, state) {
    const { SelectedDiagnosticTests = [] } = props.reception_patientProfile
    const { DiagnosticTests } = props.app.FHIR_CODES

    let diagnosticTestCost = 0

    if (SelectedDiagnosticTests.length !== 0) {
      diagnosticTestCost = SelectedDiagnosticTests.map(
        item => DiagnosticTests.include[item].cost
      ).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    }

    if (
      JSON.stringify(SelectedDiagnosticTests) !==
      JSON.stringify(state.selectedDiagnosticTests)
    ) {
      return {
        diagnosticTestCost: diagnosticTestCost,
        selectedDiagnosticTests: SelectedDiagnosticTests,
      }
    }

    return null
  }

  render() {
    const { selectedDiagnosticTests = [] } = this.state
    const { DiagnosticTests } = this.props.app.FHIR_CODES

    return (
      <React.Fragment key="SelectedTestsFragment">
        {selectedDiagnosticTests.map((item, index) => (
          <div className={styles.selectedTestItems}>
            <Row type="flex" justify="space-between" align="middle">
              <Col style={{ align: 'center' }} key={`DiagnosticTests_${index}`}>
                <Checkbox
                  style={{ margin: '0' }}
                  value={item}
                  checked={true}
                  onChange={this.onChange}
                >
                  {item}
                </Checkbox>
              </Col>
              <Col style={{ align: 'center' }}>
                <span>{DiagnosticTests.include[item].cost}</span>
              </Col>
            </Row>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default DiagnosticTests

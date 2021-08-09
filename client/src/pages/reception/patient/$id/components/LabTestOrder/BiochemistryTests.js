import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Collapse, Icon, Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import LabTestItem from './LabTestItem'

const { Panel } = Collapse

@withI18n()
@connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))
class BiochemistryTests extends PureComponent {
  constructor(props) {
    super(props)

    const { BiochemistryTests } = props.app.FHIR_CODES

    this.state = {
      include: {},
      code: BiochemistryTests.code,
      display: BiochemistryTests.display,
    }
  }

  handleSubTest = (subTestName, value) => {
    const include = { ...this.state.include }
    include[subTestName] = value
    this.setState({ include })
    const payload = {
      code: this.state.code,
      display: this.state.display,
      include: include,
    }
    this.props.onChange(this.props.testName, payload)
  }

  /**
   * Төлбөрийн хэсгээс шинжилгээ цуцлагдсан бол Child шинжилгээний шинэ утгыг
   * Redux дахь reception_patientProfile аас уншиж өөрийн state д хадгална
   */

  static getDerivedStateFromProps(props, state) {
    const { testName } = props
    const { SelectedTests } = props.reception_patientProfile
    const include =
      SelectedTests[testName] && SelectedTests[testName]['include']

    if (JSON.stringify(include) !== JSON.stringify(state.include)) {
      return {
        include: include,
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  /**
   * Төлбөрийн хэсгээс шинжилгээ цуцлагдсан бол Child шинжилгээний шинэ утгыг
   * Redux дахь reception_patientProfile аас уншиж өөрийн state д хадгална
   */

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
        <Trans id={testName} />
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
        <Trans id={testName} />
      </span>
    </div>
  )

  render() {
    const { BiochemistryTests } = this.props.app.FHIR_CODES

    if (!BiochemistryTests) {
      return <></>
    }

    return (
      <Collapse
        bordered={false}
        style={{ marginTop: '8px' }}
        expandIcon={({ isActive }) =>
          isActive
            ? this.notCollapsed(BiochemistryTests.display)
            : this.collapsed(BiochemistryTests.display)
        }
        defaultActiveKey={['1']}
      >
        <Panel style={{ border: '1px solid #c9c9c9' }} key="1">
          <Row>
            <Col span={12}>
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Lipids"
                code={BiochemistryTests.include.Lipids.code}
                displayName={BiochemistryTests.include.Lipids.display}
                subTestList={BiochemistryTests.include.Lipids.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Liver_Function_test"
                code={BiochemistryTests.include.Liver_Function_test.code}
                displayName={
                  BiochemistryTests.include.Liver_Function_test.display
                }
                subTestList={
                  BiochemistryTests.include.Liver_Function_test.include
                }
                onChange={this.handleSubTest}
                active
              />

              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Pancreas_Function_test"
                code={BiochemistryTests.include.Pancreas_Function_test.code}
                displayName={
                  BiochemistryTests.include.Pancreas_Function_test.display
                }
                subTestList={
                  BiochemistryTests.include.Pancreas_Function_test.include
                }
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Specific_Proteins"
                code={BiochemistryTests.include.Specific_Proteins.code}
                displayName={
                  BiochemistryTests.include.Specific_Proteins.display
                }
                subTestList={
                  BiochemistryTests.include.Specific_Proteins.include
                }
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Drugs_Of_Abuse"
                code={BiochemistryTests.include.Drugs_Of_Abuse.code}
                displayName={BiochemistryTests.include.Drugs_Of_Abuse.display}
                subTestList={BiochemistryTests.include.Drugs_Of_Abuse.include}
                onChange={this.handleSubTest}
              />
            </Col>
            <Col span={12}>
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Electrolytes"
                code={BiochemistryTests.include.Electrolytes.code}
                displayName={BiochemistryTests.include.Electrolytes.display}
                subTestList={BiochemistryTests.include.Electrolytes.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Rheumatology"
                code={BiochemistryTests.include.Rheumatology.code}
                displayName={BiochemistryTests.include.Rheumatology.display}
                subTestList={BiochemistryTests.include.Rheumatology.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Kidney_Function_Test"
                code={BiochemistryTests.include.Kidney_Function_Test.code}
                displayName={
                  BiochemistryTests.include.Kidney_Function_Test.display
                }
                subTestList={
                  BiochemistryTests.include.Kidney_Function_Test.include
                }
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Diabetes_Test"
                code={BiochemistryTests.include.Diabetes_Test.code}
                displayName={BiochemistryTests.include.Diabetes_Test.display}
                subTestList={BiochemistryTests.include.Diabetes_Test.include}
                onChange={this.handleSubTest}
              />

              <LabTestItem
                testName="BiochemistryTests"
                subTestName="Others"
                code={BiochemistryTests.include.Others.code}
                displayName={BiochemistryTests.include.Others.display}
                subTestList={BiochemistryTests.include.Others.include}
                onChange={this.handleSubTest}
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    )
  }
}

export default BiochemistryTests

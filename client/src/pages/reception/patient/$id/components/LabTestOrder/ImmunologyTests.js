import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
class ImmunologyTests extends PureComponent {
  constructor(props) {
    super(props)

    const { ImmunologyTests } = props.app.FHIR_CODES

    this.state = {
      include: {},
      code: ImmunologyTests.code,
      display: ImmunologyTests.display,
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
    const { ImmunologyTests } = this.props.app.FHIR_CODES

    if (!ImmunologyTests) {
      return <></>
    }

    return (
      <Collapse
        bordered={false}
        style={{ marginTop: '20px' }}
        expandIcon={({ isActive }) =>
          isActive
            ? this.notCollapsed(ImmunologyTests.display)
            : this.collapsed(ImmunologyTests.display)
        }
        defaultActiveKey={['1']}
      >
        <Panel style={{ border: '1px solid #c9c9c9' }} key="1">
          <Row type="flex" justify="start">
            <Col span={12}>
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Tumor_Markers"
                code={ImmunologyTests.include.Tumor_Markers.code}
                displayName={ImmunologyTests.include.Tumor_Markers.display}
                subTestList={ImmunologyTests.include.Tumor_Markers.include}
                onChange={this.handleSubTest}
                active
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Infectious_Diseases"
                code={ImmunologyTests.include.Infectious_Diseases.code}
                displayName={
                  ImmunologyTests.include.Infectious_Diseases.display
                }
                subTestList={
                  ImmunologyTests.include.Infectious_Diseases.include
                }
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Thyroid_Function"
                code={ImmunologyTests.include.Thyroid_Function.code}
                displayName={ImmunologyTests.include.Thyroid_Function.display}
                subTestList={ImmunologyTests.include.Thyroid_Function.include}
                onChange={this.handleSubTest}
              />

              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Rheumatoid_Arthritis"
                code={ImmunologyTests.include.Rheumatoid_Arthritis.code}
                displayName={
                  ImmunologyTests.include.Rheumatoid_Arthritis.display
                }
                subTestList={
                  ImmunologyTests.include.Rheumatoid_Arthritis.include
                }
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Critical_Care"
                code={ImmunologyTests.include.Critical_Care.code}
                displayName={ImmunologyTests.include.Critical_Care.display}
                subTestList={ImmunologyTests.include.Critical_Care.include}
                onChange={this.handleSubTest}
              />
            </Col>
            <Col span={12}>
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Fertility_Hormones"
                code={ImmunologyTests.include.Fertility_Hormones.code}
                displayName={ImmunologyTests.include.Fertility_Hormones.display}
                subTestList={ImmunologyTests.include.Fertility_Hormones.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Cardiac_Function"
                code={ImmunologyTests.include.Cardiac_Function.code}
                displayName={ImmunologyTests.include.Cardiac_Function.display}
                subTestList={ImmunologyTests.include.Cardiac_Function.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="First_Trimester_Screening"
                code={ImmunologyTests.include.First_Trimester_Screening.code}
                displayName={
                  ImmunologyTests.include.First_Trimester_Screening.display
                }
                subTestList={
                  ImmunologyTests.include.First_Trimester_Screening.include
                }
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Anemia"
                code={ImmunologyTests.include.Anemia.code}
                displayName={ImmunologyTests.include.Anemia.display}
                subTestList={ImmunologyTests.include.Anemia.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Bone_Markers"
                code={ImmunologyTests.include.Bone_Markers.code}
                displayName={ImmunologyTests.include.Bone_Markers.display}
                subTestList={ImmunologyTests.include.Bone_Markers.include}
                onChange={this.handleSubTest}
              />
              <LabTestItem
                testName="ImmunologyTests"
                subTestName="Auto_Immune_Markers"
                code={ImmunologyTests.include.Auto_Immune_Markers.code}
                displayName={
                  ImmunologyTests.include.Auto_Immune_Markers.display
                }
                subTestList={
                  ImmunologyTests.include.Auto_Immune_Markers.include
                }
                onChange={this.handleSubTest}
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    )
  }
}

ImmunologyTests.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ImmunologyTests

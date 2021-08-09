import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import LabTestItem from './LabTestItem'
import { ROLE_TYPE } from 'utils/constant'

const UncategorizedTests = props => {
  const { UncategorizedTests } = props.app.FHIR_CODES
  const { user } = props.app

  // SubTests
  const OtherTests = {
    Anti_HDV: UncategorizedTests.OtherTests.include.Anti_HDV,
    Vitamin_D3: UncategorizedTests.OtherTests.include.Vitamin_D3,
  }

  const handleSubTest = (subTestName, values) => {
    const newInclude = {
      ...(props.reception_patientProfile.SelectedTests.UncategorizedTests &&
        props.reception_patientProfile.SelectedTests.UncategorizedTests
          .include),
      [subTestName]: values,
    }
    const payload = {
      include: newInclude,
    }
    props.onChange(props.testName, payload)
  }

  return (
    <Row gutter={8}>
      {user.permission.role === ROLE_TYPE.EXTERNAL_RECEPTIONIST ? (
        <>
          <Col span={8}>
            <LabTestItem
              testName="UncategorizedTests"
              subTestName="ViralLoadTests"
              code={UncategorizedTests.ViralLoadTests.code}
              displayName={UncategorizedTests.ViralLoadTests.display}
              subTestList={UncategorizedTests.ViralLoadTests.include}
              onChange={handleSubTest}
              bordered
              active
            />

            <LabTestItem
              testName="UncategorizedTests"
              subTestName="OtherTests"
              code={UncategorizedTests.OtherTests.code}
              displayName={UncategorizedTests.OtherTests.display}
              subTestList={OtherTests}
              onChange={handleSubTest}
              bordered
              active
            />
          </Col>
        </>
      ) : (
        <>
          <Col span={12}>
            <LabTestItem
              testName="UncategorizedTests"
              subTestName="RapidTests"
              code={UncategorizedTests.RapidTests.code}
              displayName={UncategorizedTests.RapidTests.display}
              subTestList={UncategorizedTests.RapidTests.include}
              onChange={handleSubTest}
              bordered
              active
            />
            <div style={{ height: '8px' }} />
            <LabTestItem
              testName="UncategorizedTests"
              subTestName="Genotype"
              code={UncategorizedTests.Genotype.code}
              displayName={UncategorizedTests.Genotype.display}
              subTestList={UncategorizedTests.Genotype.include}
              onChange={handleSubTest}
              bordered
              active
            />
          </Col>

          <Col span={12}>
            <LabTestItem
              testName="UncategorizedTests"
              subTestName="ViralLoadTests"
              code={UncategorizedTests.ViralLoadTests.code}
              displayName={UncategorizedTests.ViralLoadTests.display}
              subTestList={UncategorizedTests.ViralLoadTests.include}
              onChange={handleSubTest}
              bordered
              active
            />
            <div style={{ height: '8px' }} />

            <LabTestItem
              testName="UncategorizedTests"
              subTestName="OtherTests"
              code={UncategorizedTests.OtherTests.code}
              displayName={UncategorizedTests.OtherTests.display}
              subTestList={UncategorizedTests.OtherTests.include}
              onChange={handleSubTest}
              bordered
              active
            />
          </Col>
        </>
      )}
    </Row>
  )
}

UncategorizedTests.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(UncategorizedTests))

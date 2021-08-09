import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
const { Option } = Select

const SelectQualitativeTestResult = props => {
  const { testName, app, disabled } = props
  const { QualitativeTestResults } = app.FHIR_CODES

  const onChange = (testName, val) => {
    props.onChange({
      valueCodeableConcept: QualitativeTestResults[val].code,
    })
  }

  return (
    <Select
      onChange={val => onChange(testName, val)}
      style={{ width: '100%' }}
      disabled={disabled}
    >
      {Object.keys(QualitativeTestResults).map(testResultKey => {
        const display = QualitativeTestResults[testResultKey].display
        return (
          <Option value={testResultKey}>
            <Trans id={display} />
          </Option>
        )
      })}
    </Select>
  )
}

SelectQualitativeTestResult.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(SelectQualitativeTestResult))

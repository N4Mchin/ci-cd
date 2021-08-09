import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../../../styles.less'
import { codeIntersects } from 'utils/controller'

const ViewSection = props => {
  const displayResult = text => {
    try {
      const firstValueCodeableConcept = Object.values(
        props.app.FHIR_CODES.QualitativeTestResults
      ).find(testResult => {
        return codeIntersects(
          testResult.code,
          text.latestObservation.valueCodeableConcept
        )
      })

      const firstValue = firstValueCodeableConcept.display

      return <Trans id={firstValue} />
    } catch {
      return
    }
  }

  const { FHIR_CODES } = props.app
  const { RapidTests } = FHIR_CODES.UncategorizedTests

  console.log(props.dataSource)
  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    ...Object.keys(RapidTests.include).map(subTestKey => {
      const subTestValue = RapidTests.include[subTestKey]
      return {
        title: subTestValue.display,
        dataIndex: subTestKey,
        key: subTestKey,
        render: (text, record) => displayResult(record.include[subTestKey]),
      }
    }),
    {
      title: <Trans id={'Note'} />,
      dataIndex: 'regulatoryNotes',
      key: 'regulatoryNotes',
      render: text => {
        return text && text.valueString
      },
    },
    {
      title: <Trans id={'Healthcare Provider'} />,
      dataIndex: 'organizationName',
      key: 'organizationName',
      render: text => <span>{text}</span>,
    },
  ]

  return (
    <div className={styles.analysisTable}>
      <CompactTable
        columns={columns}
        dataSource={props.dataSource ? props.dataSource : []}
      />
    </div>
  )
}

ViewSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(ViewSection)))

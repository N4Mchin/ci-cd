import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../../../styles.less'
import { codeIntersects } from 'utils/controller'
import * as helper from 'utils/helper'

const ViewSection = props => {
  const displayResult = (text, record) => {
    try {
      const firstValueCodeableConcept = Object.values(
        props.app.FHIR_CODES.QualitativeTestResults
      ).find(testResult => {
        return codeIntersects(
          testResult.code,
          record.latestObservation.valueCodeableConcept
        )
      })

      const firstValue = firstValueCodeableConcept.display

      return <Trans id={firstValue} />
    } catch {
      return
    }
  }

  const { FHIR_CODES } = props.app
  const { Anti_HDV } = FHIR_CODES.UncategorizedTests.OtherTests.include
  const { patient } = props.practitioner_patient_profile

  let relatedReferenceRange

  try {
    relatedReferenceRange = helper.getRelatedReferenceRange(
      Anti_HDV.referenceRange,
      patient
    )
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  const low = helper.deepGet(relatedReferenceRange, ['low', 'value'])
  const high = helper.deepGet(relatedReferenceRange, ['high', 'value'])

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    {
      title: [
        Anti_HDV.display,
        relatedReferenceRange &&
          [low && low, high && high].filter(value => !!value).join(' - '),
        Anti_HDV.unit,
      ]
        .filter(value => !!value)
        .join(' '),
      dataIndex: 'Anti_HDV',
      key: 'Anti_HDV',
      render: displayResult,
    },
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
        scroll={{ x: 'max-content' }}
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

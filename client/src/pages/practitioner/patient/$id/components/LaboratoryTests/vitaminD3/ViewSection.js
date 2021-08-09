import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../../../styles.less'
import * as helper from 'utils/helper'

const ViewSection = props => {
  const displayResult = (text, record) => {
    try {
      return <span>{record.latestObservation.valueQuantity.value}</span>
    } catch (errorInfo) {
      console.log(errorInfo)
      return
    }
  }

  const { FHIR_CODES } = props.app
  const { Vitamin_D3 } = FHIR_CODES.UncategorizedTests.OtherTests.include
  const { patient } = props.practitioner_patient_profile

  let referenceRange

  try {
    const relatedReferenceRange = helper.getRelatedReferenceRange(
      Vitamin_D3.referenceRange,
      patient
    )

    referenceRange = relatedReferenceRange.interpretation.find(
      item => item.type === 'Normal'
    )
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  console.log(referenceRange)
  const low = referenceRange && referenceRange.min
  const high = referenceRange && referenceRange.max

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    {
      title: [
        Vitamin_D3.display,
        Vitamin_D3.referenceRange && [
          `(${[low, high].filter(value => value !== undefined).join(' - ')})`,
        ],
        Vitamin_D3.unit,
      ]
        .filter(value => !!value)
        .join(' '),

      dataIndex: 'Vitamin_D3',
      key: 'Vitamin_D3',
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

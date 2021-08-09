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
  const { Ferritin } = FHIR_CODES.UncategorizedTests.OtherTests.include

  const { patient } = props.practitioner_patient_profile

  let relatedReferenceRange
  try {
    relatedReferenceRange = helper.getRelatedReferenceRange(
      Ferritin.referenceRange,
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
        Ferritin.display,
        Ferritin.referenceRange &&
          [`(${[low, high].filter(value => value !== undefined).join(' - ')})`]
            .filter(value => !!value)
            .join(' - '),
        Ferritin.unit,
      ]
        .filter(value => !!value)
        .join(' '),
      dataIndex: 'Ferritin',
      key: 'Ferritin',
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

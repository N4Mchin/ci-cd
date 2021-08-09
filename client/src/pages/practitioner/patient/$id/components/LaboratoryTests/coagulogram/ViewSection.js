import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../../../styles.less'
import * as helper from 'utils/helper'

const ViewSection = props => {
  const displayResult = text => {
    try {
      return <span>{text.latestObservation.valueQuantity.value}</span>
    } catch (errorInfo) {
      console.log(errorInfo)
      return
    }
  }

  const { FHIR_CODES } = props.app
  const { Coagulation } = FHIR_CODES.UncategorizedTests.OtherTests.include
  // const { PT, INR, aPTT, TT, Fibrinogen } = Coagulation.include
  const { patient } = props.practitioner_patient_profile

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    ...Object.keys(Coagulation.include).map(subTestKey => {
      const subTestValue = Coagulation.include[subTestKey]

      let relatedReferenceRange
      try {
        relatedReferenceRange = helper.getRelatedReferenceRange(
          Coagulation.include[subTestKey].referenceRange,
          patient
        )
      } catch (errorInfo) {
        console.log(errorInfo)
      }

      const low = helper.deepGet(relatedReferenceRange, ['low', 'value'])
      const high = helper.deepGet(relatedReferenceRange, ['high', 'value'])

      return {
        title: [
          subTestValue.display,
          subTestValue.referenceRange &&
            `(${[low, high].filter(value => value !== undefined).join(' - ')})`,

          subTestValue.unit,
        ]
          .filter(value => !!value)
          .join(' '),
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

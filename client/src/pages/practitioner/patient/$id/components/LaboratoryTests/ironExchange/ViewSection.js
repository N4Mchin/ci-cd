import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../../../styles.less'

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
  const { IronExchange } = FHIR_CODES.UncategorizedTests

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    ...Object.keys(IronExchange.include).map(subTestKey => {
      const subTestValue = IronExchange.include[subTestKey]

      return {
        title: [
          subTestValue.display,
          subTestValue.referenceRange &&
            [
              subTestValue.referenceRange.low &&
                subTestValue.referenceRange.low.value,
              subTestValue.referenceRange.high &&
                subTestValue.referenceRange.high.value,
            ]
              .filter(value => !!value)
              .join(' - '),
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

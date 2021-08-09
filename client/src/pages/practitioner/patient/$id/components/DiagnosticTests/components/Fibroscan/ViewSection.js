import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
// import styles from '../../../styles.less'

const ViewSection = props => {
  const displayResult = (text, record) => {
    console.log(record)
    try {
      return <span>{record.latestObservation.valueQuantity.value}</span>
    } catch (errorInfo) {
      console.log(errorInfo)
      return
    }
  }

  const { FHIR_CODES } = props.app
  const { Fibroscan } = props.app.FHIR_CODES.DiagnosticStudy.include

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id="Result" />,
      dataIndex: 'Fibroscan',
      key: 'Fibroscan',
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
    <div
    // className={styles.analysisTable}
    >
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

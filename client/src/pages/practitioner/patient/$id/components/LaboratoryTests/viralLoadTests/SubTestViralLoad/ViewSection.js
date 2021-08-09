import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../styles.less'

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
  const { ViralLoadTests } = FHIR_CODES.UncategorizedTests

  console.log(props.selectedTab)

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'issuedDate',
      key: 'issuedDate',
      render: text => <span>{text}</span>,
    },
    // {
    //   title: selectedTab.display,
    //   dataIndex: selectedTab,
    //   key: selectedTab,
    //   render: selectedTab.displayResult,
    // },
    {
      title: [
        ViralLoadTests.include[props.selectedTab].display,
        ViralLoadTests.include[props.selectedTab].referenceRange &&
          [
            ViralLoadTests.include[props.selectedTab].referenceRange.low &&
              ViralLoadTests.include[props.selectedTab].referenceRange.low
                .value,
            ViralLoadTests.include[props.selectedTab].referenceRange.high &&
              ViralLoadTests.include[props.selectedTab].referenceRange.high
                .value,
          ]
            .filter(value => !!value)
            .join(' - '),
        ViralLoadTests.include[props.selectedTab].unit,
      ]
        .filter(value => !!value)
        .join(' '),
      dataIndex: props.selectedTab,
      key: props.selectedTab,
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
        loading={props.fetchingData}
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

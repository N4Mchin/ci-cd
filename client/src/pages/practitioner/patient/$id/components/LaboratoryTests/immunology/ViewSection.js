import React, { useState } from 'react'
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
  const { ImmunologyTests } = props.app.FHIR_CODES

  const { patient } = props.practitioner_patient_profile

  return (
    <div className={styles.analysisTable}>
      {Object.keys(ImmunologyTests.include).map(testKey => {
        const displayName = ImmunologyTests.include[testKey].display
        const testColumn = [
          {
            title: displayName,
          },
          {
            title: <Trans id={'Date'} />,
            dataIndex: 'issuedDate',
            key: 'issuedDate',
            render: text => <span>{text}</span>,
          },
          ...Object.keys(ImmunologyTests.include[testKey].include).map(
            subTestKey => {
              const subTestValue =
                ImmunologyTests.include[testKey].include[subTestKey]

              let relatedReferenceRange
              try {
                relatedReferenceRange = helper.getRelatedReferenceRange(
                  ImmunologyTests.include[testKey].include[subTestKey]
                    .referenceRange,
                  patient
                )
              } catch (errorInfo) {
                console.log(errorInfo)
              }

              const low = helper.deepGet(relatedReferenceRange, [
                'low',
                'value',
              ])
              const high = helper.deepGet(relatedReferenceRange, [
                'high',
                'value',
              ])

              return {
                title: [
                  subTestValue.display,
                  relatedReferenceRange &&
                    `(${[low, high]
                      .filter(value => value !== undefined)
                      .join(' - ')})`,

                  subTestValue.unit,
                ]
                  .filter(value => !!value)
                  .join(' '),
                dataIndex: subTestKey,
                key: subTestKey,
                render: (text, record) =>
                  record.include &&
                  record.include[testKey] &&
                  record.include[testKey].include &&
                  record.include[testKey].include[subTestKey] &&
                  displayResult(record.include[testKey].include[subTestKey]),
              }
            }
          ),
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
          <div>
            <div className="Helvetica Neue bold">{displayName}</div>
            <CompactTable
              columns={testColumn}
              dataSource={props.dataSource ? props.dataSource : []}
              scroll={{ x: 'max-content' }}
            />
          </div>
        )
      })}
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

import React, { useState, useEffect, useRef } from 'react'
import { Button, DatePicker, Table, Form, Col } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import { TestProtocolsHeader } from '../../../components'
import { Board } from 'components'
import { RecordedLaboratoryTechnician } from '../../components'

const Protocol = props => {
  const [dataSource, setDataSource] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const [filteredDate, setFilteredDate] = useState()
  const moment = require('moment')
  const componentRef = useRef()

  useEffect(
    pagination => {
      if (filteredDate) {
        props
          .dispatch({
            type: 'laboratory_test/queryTestsVerified',
            payload: {
              labTestCode:
                props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                  .Coagulation,
              filteredDate: filteredDate,
              ...pagination,
            },
          })

          .then(result => {
            console.log('resulttttttttttt', result)
            setDataSource(result.dataSource)
          })
          .catch(errorInfo => console.log(errorInfo))
          .finally(() => setLoadingRef(false))
      }
    },
    [filteredDate]
  )

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }

  const columns = [
    {
      title: 'Он сар өдөр',
      dataIndex: 'Date',
      key: 'Date',
      render: (text, record, index) => {
        return record.date
      },
    },
    {
      title: 'Бүртгэлийн код',
      dataIndex: 'patientNumber',
      key: 'patientNumber',
      render: (text, record, key) => {
        return record.patientNumber
      },
    },
    {
      title: 'Овог',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text, record, key) => {
        return record.lastName
      },
    },
    {
      title: 'Нэр',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record, key) => {
        return record.firstName
      },
    },
    {
      title: 'Шинжилгээний үзүүлэлт',
      children: [
        {
          title: 'PT',
          dataIndex: 'PT',
          key: 'PT',
          render: (text, record, key) => {
            const data = {
              value:
                record.include &&
                record.include.PT &&
                record.include.PT.latestObservation &&
                record.include.PT.latestObservation.valueQuantity &&
                record.include.PT.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'INR',
          dataIndex: 'INR',
          key: 'INR',
          render: (text, record, key) => {
            const data = {
              value:
                record.include &&
                record.include.INR &&
                record.include.INR.latestObservation &&
                record.include.INR.latestObservation.valueQuantity &&
                record.include.INR.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'aPTT',
          dataIndex: 'aPTT',
          key: 'aPTT',
          render: (text, record, key) => {
            const data = {
              value:
                record.include &&
                record.include.aPTT &&
                record.include.aPTT.latestObservation &&
                record.include.aPTT.latestObservation.valueQuantity &&
                record.include.aPTT.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'Fibrinogen',
          dataIndex: 'Fibrinogen',
          key: 'Fibrinogen',
          render: (text, record, key) => {
            const data = {
              value:
                record.include &&
                record.include.Fibrinogen &&
                record.include.Fibrinogen.latestObservation &&
                record.include.Fibrinogen.latestObservation.valueQuantity &&
                record.include.Fibrinogen.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },

        {
          title: '',
          dataIndex: 'k',
          key: 'k',
        },
        {
          title: '',
          dataIndex: 'l',
          key: 'l',
        },
      ],
    },
    {
      title: 'Шинжилгээ хийсэн хүний гарын үсэг',
      dataIndex: 'doctorSignature',
      key: 'doctorSignature',
    },
    {
      title: 'Шинжилгээ хариу баталгаажуулсан хүний гарын үсэг',
      dataIndex: 'confirmedDoctorSignature',
      key: 'confirmedDoctorSignature',
    },
  ]
  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  return (
    <div>
      <Board inner>
        <div ref={componentRef}>
          <TestProtocolsHeader title="Цус бүлэгнэлтийн шинжилгээний бүртгэл" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Col>
              {' '}
              <DatePicker
                style={{ width: '120px' }}
                onChange={onDatePickerChange}
              />
            </Col>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            layout="fixed"
            bordered={true}
            size="middle"
            className={styles.container}
            pagination={false}
            loading={loadingRef}
          />

          <RecordedLaboratoryTechnician
            recordedLaboratoryTechnician={recordedLaboratoryTechnician}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '10px',
            }}
          >
            <Col>
              {' '}
              <ReactToPrint
                trigger={() => (
                  <Button type="primary">
                    {' '}
                    <Trans id="Print" />
                  </Button>
                )}
                content={() => componentRef.current}
                pageStyle={'@page {size: landscape}'}
              />
            </Col>
          </div>
        </div>
      </Board>
    </div>
  )
}

Protocol.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test, loading }) => ({
  app,
  laboratory_test,
  loading,
}))(withI18n()(Form.create()(Protocol)))

import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, DatePicker, Row, Table, Col, Form } from 'antd'
import styles from '../styles.less'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import ReactToPrint from 'react-to-print'
import { Board } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { RecordedLaboratoryTechnician } from '../../components'
import { getDate } from 'utils/datetime'
const TestLog = props => {
  const componentRef = useRef()
  const [filteredDate, setFilteredDate] = useState(getDate())
  const [loadingRef, setLoadingRef] = useState(false)
  const [dataSource, setDataSource] = useState(false)
  const moment = require('moment')

  const columns = [
    {
      title: 'Огноо',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Нэр',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (text, record) => {
        const patientName = record.patient.getOfficialNameString({
          short: true,
        })
        return patientName
      },
    },
    {
      title: 'Сорьцын баркод',
      dataIndex: 'sampleBarcode',
      key: 'sampleBarcode',
      render: (text, record) => {
        return record.sampleAccessionIdentifier
      },
    },
    {
      title: 'Шинжилгээний хариу',
      children: [
        {
          title: 'AFP',
          dataIndex: 'AFP',
          key: 'AFP',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Tumor_Markers &&
                record.include.Tumor_Markers.include &&
                record.include.Tumor_Markers.include.AFP &&
                record.include.Tumor_Markers.include.AFP.latestObservation &&
                record.include.Tumor_Markers.include.AFP.latestObservation
                  .valueQuantity &&
                record.include.Tumor_Markers.include.AFP.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'HBeAg',
          dataIndex: 'HBeAg',
          key: 'HBeAg',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Infectious_Diseases &&
                record.include.Infectious_Diseases.include &&
                record.include.Infectious_Diseases.include.HBeAg &&
                record.include.Infectious_Diseases.include.HBeAg
                  .latestObservation &&
                record.include.Infectious_Diseases.include.HBeAg
                  .latestObservation.valueQuantity &&
                record.include.Infectious_Diseases.include.HBeAg
                  .latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'Anti_Hbs',
          dataIndex: 'Anti_Hbs',
          key: 'Anti_Hbs',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Infectious_Diseases &&
                record.include.Infectious_Diseases.include &&
                record.include.Infectious_Diseases.include.Anti_Hbs &&
                record.include.Infectious_Diseases.include.Anti_Hbs
                  .latestObservation &&
                record.include.Infectious_Diseases.include.Anti_Hbs
                  .latestObservation.valueQuantity &&
                record.include.Infectious_Diseases.include.Anti_Hbs
                  .latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'Anti_HCV',
          dataIndex: 'Anti_HCV',
          key: 'Anti_HCV',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Infectious_Diseases &&
                record.include.Infectious_Diseases.include &&
                record.include.Infectious_Diseases.include.Anti_HCV &&
                record.include.Infectious_Diseases.include.Anti_HCV
                  .latestObservation &&
                record.include.Infectious_Diseases.include.Anti_HCV
                  .latestObservation.valueQuantity &&
                record.include.Infectious_Diseases.include.Anti_HCV
                  .latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: 'HBsAg',
          dataIndex: 'HBsAg',
          key: 'HBsAg',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Infectious_Diseases &&
                record.include.Infectious_Diseases.include &&
                record.include.Infectious_Diseases.include.HBsAg &&
                record.include.Infectious_Diseases.include.HBsAg
                  .latestObservation &&
                record.include.Infectious_Diseases.include.HBsAg
                  .latestObservation.valueQuantity &&
                record.include.Infectious_Diseases.include.HBsAg
                  .latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
      ],
    },
  ]
  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }

  useEffect(() => {
    setLoadingRef(true)
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/queryTestsVerified',
          payload: {
            labTestCode:
              props.app.FHIR_CODES && props.app.FHIR_CODES.ImmunologyTests,
            filteredDate: filteredDate,
          },
        })
        .then(result => {
          setDataSource(result.dataSource)
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingRef(false))
    }
  }, [filteredDate])
  return (
    <div>
      <Board inner>
        <div ref={componentRef}>
          <Form>
            <TestProtocolsHeader title="Иммунологи тестийн шинжилгээний бүртгэл" />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Col>
                <DatePicker
                  style={{ width: '120px' }}
                  onChange={onDatePickerChange}
                />{' '}
              </Col>
            </div>
            <br />
            <Table
              columns={columns}
              dataSource={dataSource}
              layout="fixed"
              bordered={true}
              // size="middle"
              className={styles.container}
              pagination={false}
              loading={loadingRef}
            />
          </Form>
        </div>
        <RecordedLaboratoryTechnician
          recordedLaboratoryTechnician={recordedLaboratoryTechnician}
        />

        <Row gutter={8} style={{ marginTop: '20px' }}>
          <Col span={21}></Col>
          <Col span={3}>
            <ReactToPrint
              trigger={() => (
                <Button type="primary" block>
                  <Trans>Print</Trans>
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle={'@page {size: landscape}'}
            />
          </Col>
          <Col span={2}></Col>
        </Row>
      </Board>
    </div>
  )
}
TestLog.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test, dispatch }) => ({
  app,
  loading,
  laboratory_test,

  dispatch,
}))(withI18n()(Form.create()(TestLog)))

import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, DatePicker, Table, Col, Form } from 'antd'
import styles from '../styles.less'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import ReactToPrint from 'react-to-print'
import { Board } from 'components'
import { Trans, withI18n } from '@lingui/react'

const RapidTestLog = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const componentRef = useRef()
  const [filteredDate, setFilteredDate] = useState()
  const [loadingRef, setLoadingRef] = useState(false)
  const [dataSource, setDataSource] = useState(false)
  const moment = require('moment')

  const renderTestItemResultBox = text => {
    try {
      const value = text['latestObservation'].valueCodeableConcept.coding.find(
        code => code.system === props.app.FHIR_CODES.SNOMED_URL
      ).display
      return value
    } catch {}
  }

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/queryTestsVerified',
          payload: {
            labTestCode:
              props.app.FHIR_CODES &&
              props.app.FHIR_CODES.UncategorizedTests.RapidTests,
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

  const columns = [
    {
      title: 'Огноо',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Үйлчлүүэгчийн баркод',
      dataIndex: 'patientNumber',
      key: 'patientNumber',
      render: (text, record, key) => {
        return record.patientNumber
      },
    },
    {
      title: 'Шинжилгээний хариу',
      children: [
        {
          title: 'anti-HCV',
          dataIndex: 'include.anti_HCV',
          key: 'anti_HCV',
          render: (text, record) => {
            return renderTestItemResultBox(text)
          },
        },
        {
          title: 'HBsAG',
          dataIndex: 'include.HBsAg',
          key: 'HBsAg',
          render: (text, record) => {
            return renderTestItemResultBox(text)
          },
        },
        {
          title: 'HIV',
          dataIndex: 'include.HIV',
          key: 'HIV',
          render: (text, record) => {
            return renderTestItemResultBox(text)
          },
        },
        {
          title: 'Syphills',
          dataIndex: 'include.Syphills',
          key: 'Syphills',
          render: (text, record) => {
            return renderTestItemResultBox(text)
          },
        },
        {
          title: 'TPHA',
          dataIndex: 'include.TPHA',
          key: 'TPHA',
          render: (text, record) => {
            return renderTestItemResultBox(text)
          },
        },
        {
          title: 'RPR',
          dataIndex: 'include.RPR',
          key: 'RPR',
          render: (text, record) => {
            return renderTestItemResultBox(text)
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

  return (
    <div>
      <Board inner>
        <div ref={componentRef}>
          <Form>
            <TestProtocolsHeader title="Түргэвчилсэн тестийн шинжилгээний бүртгэл" />
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
          </Form>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '70px',
          }}
        >
          <Col>
            <Form.Item>
              {getFieldDecorator(`recordedLaboratoryTechnician`, {
                rules: [{ required: false }],
                initialValue: recordedLaboratoryTechnician,
              })(
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Col style={{ marginRight: '20px' }}>
                    Бүртгэл хөтөлсөн лабораторийн эмч:
                  </Col>
                  <Col> {recordedLaboratoryTechnician}</Col>
                </div>
              )}
            </Form.Item>
          </Col>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      </Board>
    </div>
  )
}
RapidTestLog.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, loading, laboratory_test_rapidTests, dispatch }) => ({
    app,
    loading,
    laboratory_test_rapidTests,

    dispatch,
  })
)(withI18n()(Form.create()(RapidTestLog)))

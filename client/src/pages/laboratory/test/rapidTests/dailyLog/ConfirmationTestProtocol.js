import React, { useRef, useState } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, Select, Table, Col, Form } from 'antd'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'

const { Option } = Select

const ConfirmationTestProtocol = props => {
  const { laboratory_test_rapidTests, form, dispatch, loading } = props
  const { getFieldDecorator } = form
  const { dataSource } = laboratory_test_rapidTests
  const componentRef = useRef()
  const renderTestItemResultBox = (text, record, index) => {
    const result = []

    Object.keys(record.include).map(key => {
      try {
        const { status, valueCodeableConcept } = record.include[
          key
        ].latestObservation
        const { display } = valueCodeableConcept.coding.find(
          code => code.system === props.app.FHIR_CODES.SNOMED_URL
        )

        if (status === 'cancelled') {
          result.push({ key, display })
        }
      } catch (error) {
        console.log(error)
      }
    })

    console.log(result)

    const tests = (
      <>
        {result.map(item => {
          console.log(item)
          return (
            <div>
              <Trans>{item.display}</Trans>
            </div>
          )
        })}
      </>
    )
    return tests
  }
  const renderTestItemResult = (text, record, index) => {
    const result = []

    Object.keys(record.include).map(key => {
      console.log(record.include)
      try {
        const { status, valueCodeableConcept } = record.include[
          key
        ].latestObservation
        const { display } = valueCodeableConcept.coding.find(
          code => code.system === props.app.FHIR_CODES.SNOMED_URL
        )

        if (status === 'cancelled') {
          result.push({ key, display })
        }
      } catch (error) {
        console.log(error)
      }
    })

    console.log(result)

    const tests = (
      <>
        {result.map(item => {
          console.log(item)
          return (
            <div>
              <Trans>{item.key}</Trans>
            </div>
          )
        })}
      </>
    )
    return tests
  }
  const columns = [
    {
      title: 'Огноо',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Үйлчлүүлэгчийн баркод',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: 'Түргэн тест шинжилгээний хариу',
      children: [
        {
          title: 'HBsAg',
          dataIndex: 'HBsAg',
          key: 'HBsAg',
        },
        {
          title: 'Anti-HCV',
          dataIndex: 'Anti-HCV',
          key: 'Anti-HCV',
        },
      ],
    },
    {
      title: 'Урвалжийн лот дуусах хугацаа',
      dataIndex: 'expirationDateOfReagentLotNumber',
      key: 'expirationDateOfReagentLotNumber',
    },
    {
      title: 'Баталгаажуулсан шинжилгээний хариу /HISCL-5000/',
      children: [
        {
          title: 'qHCV',
          dataIndex: 'qHCV',
          key: 'qHCV',
        },
        {
          title: 'qHBsAg',
          dataIndex: 'qHBsAg',
          key: 'qHBsAg',
        },
      ],
    },
    {
      title: 'Урвалжийн лот дуусах хугацаа',
      dataIndex: 'expirationDateOfReagentLotNumber',
      key: 'expirationDateOfReagentLotNumber',
    },
    {
      title: 'Шинжилгээ хийсэн хүний гарын үсэг',
      dataIndex: 'signatureOfThePersonWhoPerformed',
      key: 'signatureOfThePersonWhoPerformed',
    },
  ]
  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  return (
    <div>
      <Board inner>
        <div ref={componentRef}>
          <TestProtocolsHeader title="Баталгаажуулах шинжилгээний протокол" />
          <Table
            columns={columns}
            dataSource={dataSource}
            layout="fixed"
            bordered={true}
            size="middle"
            className={styles.container}
            pagination={false}
          />
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
ConfirmationTestProtocol.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ConfirmationTestProtocol)))

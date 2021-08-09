import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Table, Divider, Col, Form, Input, DatePicker } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import { TestProtocolsHeader } from '../../../components'
import { MessageModal, Board } from 'components'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'
const CoagulationTestLog = props => {
  const { dispatch, form, loading, i18n } = props
  const [filteredDate, setFilteredDate] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [protocolDataSource, setProtocolDataSource] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const { getFieldDecorator } = form
  const moment = require('moment')
  const columns = [
    {
      title: 'Бүртгэсэн огноо',
      dataIndex: 'registeredDate',
      key: 'registeredDate',
    },
    {
      title: 'Анализаторын аюулгүй байдлыг шалгах, асаах',
      dataIndex: 'isCheckedAnalyzator',
      key: 'isCheckedAnalyzator',
    },
    {
      title: 'Анализаторыг 37 градус хүртэл халаах',
      dataIndex: 'heatAnalyzator',
      key: 'heatAnalyzator',
    },
    {
      title: ' Урвалжийн лот дугаар дуусах хугацаа',
      dataIndex: 'lotNumberExpirationDate',
      key: 'lotNumberExpirationDate',
    },
    {
      title: ' Урвалж тус бүрийг 15 мин халаах',
      dataIndex: 'eachReagent',
      key: 'eachReagent',
    },
    {
      title: ' Анхдагч сорьцын байдал',
      dataIndex: 'firstSample',
      key: 'firstSample',
    },
    {
      title: 'Шинжлүүлсэн сорьцын тоо ',
      dataIndex: 'testedSample',
      key: 'testedSample',
    },
    {
      title: ' Өдөр тутмын үйлчилгээ',
      dataIndex: 'dailyService',
      key: 'dailyService',
    },
    {
      title: ' Тоног төхөөрөмжийн гадаргууг цэвэрлэх',
      dataIndex: 'isClean',
      key: 'isClean',
    },
    {
      title:
        'Урвалж агуулах хэсэг болон урвал явуулах хэсгийн температурыг хянах  ',
      dataIndex: 'temperatureControl',
      key: 'temperatureControl',
    },
    {
      title: 'Шинжилгээ хийсэн хүний гарын үсэг ',
      dataIndex: 'performerSignature',
      key: 'performerSignature',
    },
    {
      title: 'Шинжилгээний хариу баталгаажуулсан эмчийн гарын үсэг ',
      dataIndex: 'doctorSignature',
      key: 'doctorSignature',
    },
    {
      title: ' Тайлбар',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  const dataSource = [
    {
      key: '1',
      registeredDate: (
        <Form.Item>
          {getFieldDecorator(`registeredDate`, {
            rules: [{ required: false }],
          })(<DatePicker />)}
        </Form.Item>
      ),
      isCheckedAnalyzator: (
        <Form.Item>
          {getFieldDecorator(`isCheckedAnalyzator`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      heatAnalyzator: (
        <Form.Item>
          {getFieldDecorator(`heatAnalyzator`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      lotNumberExpirationDate: (
        <Form.Item>
          {getFieldDecorator(`lotNumberExpirationDate`, {
            rules: [{ required: false }],
          })(<DatePicker />)}
        </Form.Item>
      ),
      eachReagent: (
        <Form.Item>
          {getFieldDecorator(`eachReagent`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      firstSample: (
        <Form.Item>
          {getFieldDecorator(`firstSample`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      testedSample: (
        <Form.Item>
          {getFieldDecorator(`testedSample`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      dailyService: (
        <Form.Item>
          {getFieldDecorator(`dailyService`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      isClean: (
        <Form.Item>
          {getFieldDecorator(`isClean`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      temperatureControl: (
        <Form.Item>
          {getFieldDecorator(`temperatureControl`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),

      performerSignature: (
        <Form.Item>
          {getFieldDecorator(`performerSignature`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),

      doctorSignature: (
        <Form.Item>
          {getFieldDecorator(`doctorSignature`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),

      description: (
        <Form.Item>
          {getFieldDecorator(`description`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
    },
  ]

  const componentRef = useRef()

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        return dispatch({
          type: 'laboratory_test/saveProtocolData',
          payload: {
            testName: props.testName,
            values,
          },
        })
      })
      .then(() => {
        setTimeout(() => showMessageModal(true), 150)
        form.resetFields()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test_coagulation/readCoagulationProtocol',
          payload: {
            testName: props.testName,
            filteredDate: filteredDate,
          },
        })
        .then(values => {
          setProtocolDataSource(values)
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingRef(false))
    }
  }, [filteredDate])

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }
  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  return (
    <div>
      <Board inner>
        {' '}
        <Form>
          <Table
            columns={columns}
            dataSource={dataSource}
            layout="fixed"
            bordered={true}
            size="middle"
            className={styles.container}
            pagination={false}
          />
        </Form>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Col>
            <Button
              className="button-red"
              onClick={onSubmit}
              loading={loading.effects['laboratory_test/saveProtocolData']}
            >
              <Trans id="Save" />
            </Button>
          </Col>
        </div>
        <Divider style={{ border: '1px solid #C9C9C9' }} />
        <div ref={componentRef}>
          <TestProtocolsHeader title="Цус бүлэгнэлтийн шинжилгээний бүртгэл (ECL-412)" />
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
            dataSource={protocolDataSource}
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
        </div>
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
        <MessageModal
          type="success"
          visible={modalMessageVisible}
          onCancel={() => showMessageModal(false)}
          content={i18n.t`Save successful`}
        />
      </Board>
    </div>
  )
}

CoagulationTestLog.propTypes = {
  laboratory_test_coagulation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test_coagulation }) => ({
  app,
  loading,
  laboratory_test_coagulation,
}))(withI18n()(Form.create()(CoagulationTestLog)))

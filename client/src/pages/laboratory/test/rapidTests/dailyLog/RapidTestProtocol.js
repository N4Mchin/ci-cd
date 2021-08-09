import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'dva'
import PropTypes, { element } from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { getDate } from 'utils/datetime'
import { Input, Form, Button, Row, DatePicker, Col, TimePicker } from 'antd'
//import ModalRapidTestProtocolPrint from "./ModalRapidTestProtocolPrint";
import ReactToPrint from 'react-to-print'
import { ModuleBox, Board } from 'components'
import { delay } from 'utils/helper'
import { MessageModal } from 'components'

const FIELDS = [
  {
    key: 'sampleLotNum',
    display: 'Урвалжийн ЛОТ дугаар,үйлдвэрлэгч',
    componentType: 'input',
  },
  {
    key: 'sampleExpirationDate',
    display: 'Урвалжийн хүчинтэй хугацаа',
    componentType: 'input',
  },
  {
    key: 'supplementLotNum',
    display: 'Нэмэлт урвалжийн ЛОТ дугаар,үйлдвэрлэгч',
    componentType: 'input',
  },
  {
    key: 'supplementExpirationDate',
    display: 'Нэмэлт урвалжийн хүчинтэй хугацаа',
    componentType: 'input',
  },
  {
    key: 'samplesNum',
    display: 'Шинжилсэн Сорьцын тоо',
    componentType: 'input',
  },
  {
    key: 'firstSampleStatus',
    display: 'Анхдагч сорьцын байдал',
    componentType: 'input',
  },
  {
    key: 'sazNumber',
    display: 'Мөрдөж ажилласан САЗ дугаар',
    componentType: 'input',
  },

  {
    key: 'temparature',
    display: 'Тасалгааны хэм',
    componentType: 'input',
  },
  {
    key: 'descriptionNotes',
    display: 'Тайлбар',
    componentType: 'textArea',
  },
]

const { TextArea } = Input

const TimePickerWrapper = props => {
  const [value, setValue] = useState()
  const onChange = time => {
    setValue(time)
    props.onChange(time)
  }

  return (
    <TimePicker {...props} value={value} onChange={onChange} format="HH:mm" />
  )
}

const RapidTestProtocol = props => {
  const { laboratory_test_rapidTests, form, dispatch, loading, i18n } = props
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [filteredDate, setFilteredDate] = useState()
  const { getFieldDecorator } = form
  const {
    modalRapidTestProtocolPrintVisible,
    SUB_TEST_NAMES,
  } = laboratory_test_rapidTests

  const moment = require('moment')
  const componentRef = useRef()

  async function refresh() {
    return await props
      .dispatch({
        type: 'laboratory_test_rapidTests/readProtocolData',
        payload: {
          testName: props.testName,
          filteredDate: filteredDate,
        },
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test_rapidTests/readProtocolData',
          payload: {
            testName: props.testName,
            filteredDate: filteredDate,
          },
        })
        .then(data => {
          form.setFieldsValue(data.values)
        })
        .catch(errorInfo => console.log(errorInfo))
      //.finally(() => setLoadingRef(false))
      refresh()
    }
  }, [filteredDate])

  const modalRapidTestProtocolPrintProps = {
    visible: modalRapidTestProtocolPrintVisible,
    maskClosable: false,
    width: 800,
    onCancel: () => {
      dispatch({
        type: 'laboratory_test_rapidTests/updateState',
        payload: {
          modalRapidTestProtocolPrintVisible: false,
        },
      })
    },
  }

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }

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
      .then(async () => {
        await delay(1000)
        showMessageModal(true)
        //  refresh();
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    props.dispatch({
      type: 'laboratory_test_rapidTests/init',
    })
    //  refresh();
  }, [])
  return (
    <div>
      <Board inner>
        <div ref={componentRef}>
          {/* <ModalRapidTestProtocolPrint {...modalRapidTestProtocolPrintProps} /> */}
          <ModuleBox
            title={
              <Trans>
                <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
                  Rapid Test
                </span>
                <span>{' | '}Protocol</span>
              </Trans>
            }
          >
            <Form>
              <div>
                <Row gutter={10}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}
                  >
                    <Col>
                      {' '}
                      <DatePicker
                        style={{ width: '120px' }}
                        onChange={onDatePickerChange}
                      />
                    </Col>
                    <Col>
                      <div
                        style={{
                          lineHeight: '10px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          margin: '0 20px 0 0',
                        }}
                      >
                        <div>
                          Шинжилгээ эхэлсэн цаг
                          <br /> дуусан цаг
                        </div>
                      </div>
                    </Col>
                    <Col>
                      {' '}
                      <Form.Item>
                        {getFieldDecorator(`startTime`, {
                          rules: [{ required: false }],
                        })(<TimePickerWrapper />)}
                      </Form.Item>
                    </Col>
                    <Col>
                      {' '}
                      <Form.Item>
                        {getFieldDecorator(`endTime`, {
                          rules: [{ required: false }],
                        })(<TimePickerWrapper />)}
                      </Form.Item>
                    </Col>
                  </div>
                </Row>
              </div>
              <div>
                <div>
                  <Row gutter={10}>
                    <Col span={4}>
                      <div
                        style={{
                          width: '134px',
                          textTransform: 'uppercase',
                          fontSize: '10px',
                        }}
                      >
                        <Button
                          style={{
                            border: 'none',
                            backgroundColor: '#C9C9C9',
                            margin: '0 8px',
                          }}
                          block
                        >
                          {getDate()}
                        </Button>

                        {FIELDS.map(field => (
                          <div
                            style={{
                              lineHeight: '10px',
                              height: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              margin: '0 0 0 8px',
                            }}
                          >
                            <div>{field.display}</div>
                          </div>
                        ))}
                      </div>
                    </Col>
                    <Col span={20}>
                      {Object.keys(SUB_TEST_NAMES).map(testKey => {
                        const test = SUB_TEST_NAMES[testKey]
                        return (
                          <Col span={4}>
                            <Button style={{ border: 'none' }} block>
                              {test}
                            </Button>

                            {FIELDS.map(field => (
                              <>
                                {field['componentType'] === 'input' ? (
                                  <Form.Item>
                                    {getFieldDecorator(
                                      `${testKey}.${field['key']}`,
                                      {
                                        rules: [{ required: false }],
                                      }
                                    )(<Input placeholder="" />)}
                                  </Form.Item>
                                ) : field['componentType'] === 'timePicker' ? (
                                  <Form.Item key={`${testKey}.${field['key']}`}>
                                    {getFieldDecorator(
                                      `${testKey}.${field['key']}`,
                                      {
                                        rules: [{ required: false }],
                                      }
                                    )(
                                      <TimePickerWrapper
                                        style={{ width: '100%' }}
                                      />
                                    )}
                                  </Form.Item>
                                ) : (
                                  <Form.Item>
                                    {getFieldDecorator(
                                      `${testKey}.${field['key']}`,
                                      {
                                        rules: [{ required: false }],
                                      }
                                    )(
                                      <TextArea
                                        style={{ marginTop: '4px' }}
                                        rows={4}
                                      />
                                    )}
                                  </Form.Item>
                                )}
                              </>
                            ))}
                          </Col>
                        )
                      })}
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
          </ModuleBox>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Col span={2} style={{ marginRight: '10px' }}>
            {' '}
            <Button
              className="button-red"
              onClick={onSubmit}
              loading={loading.effects['laboratory_test/saveProtocolData']}
              block
            >
              {' '}
              <Trans id="Save" />
            </Button>
          </Col>

          <Col span={2}>
            {/* <Button
            //түр коммент хийж байна.Эргээд ашиглагдаж магадгүй
              onClick={() =>
                dispatch({
                  type: "laboratory_test_rapidTests/updateState",
                  payload: {
                    modalRapidTestProtocolPrintVisible: true
                  }
                })
              }
              type="primary"
              block
            >
              <Trans id="Print" />
            </Button> */}
            <ReactToPrint
              trigger={() => (
                <Button type="primary" block>
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
RapidTestProtocol.propTypes = {
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
)(withI18n()(Form.create()(RapidTestProtocol)))

/**
 * modified by: Sod-Erdene
 * data: 2020-03-30
 */

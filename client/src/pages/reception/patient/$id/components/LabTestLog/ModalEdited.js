import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Input, Button, Checkbox, Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, ConfirmModal } from 'components'
import { toLocalDateTime } from 'utils/datetime'

const { TextArea } = Input

const ModalEdited = props => {
  const { getFieldDecorator } = props.form
  const [selectedRowData, setSelectedRowData] = useState()
  const [formComplete, setFormComplete] = useState()
  const [submitLoading, setSubmitLoading] = useState()
  const { CancellableLabTests } = props.reception_patientProfile

  const TitleInformation = (
    <Trans>
      <span className="bold">Order </span>
      <span>Information</span>
    </Trans>
  )

  const TitleCancel = (
    <Trans>
      <span className="bold">Reasons for </span>
      <span>cancellation</span>
    </Trans>
  )

  const TitleModal = (
    <Trans>
      <span className="bold">Cancel </span>
      <span>service</span>
    </Trans>
  )

  const TitleInternalOperation = (
    <Trans>
      <span className="bold">Internal </span>
      <span>operation</span>
    </Trans>
  )

  const TitleByTheClient = (
    <Trans>
      <span className="bold">Reason from </span>
      <span>client</span>
    </Trans>
  )

  const TitleOther = (
    <Trans>
      <span className="bold">Other</span>
    </Trans>
  )

  const TitleOrderedTests = (
    <Trans>
      <span className="bold">Ordered </span>
      <span>Tests</span>
    </Trans>
  )

  useEffect(() => {
    console.log(props)
    props
      .dispatch({
        type: 'reception_patientProfile/queryLabTestOrdersOnly',
        payload: {
          serviceRequestId: props.data.serviceRequestId,
          testKey: props.data.testKey,
        },
      })
      .then(response => {
        console.log(response)
        setSelectedRowData(response)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    setSubmitLoading(true)
    return props.form
      .validateFields()
      .then(values => {
        console.log(values)
        return props.dispatch({
          type: 'reception_patientProfile/cancelServiceRequest',
          payload: {
            ...values,
            selectedRowData,
          },
        })
      })
      .then(() => {
        return props.onSubmit()
      })
      .finally(() => {
        setSubmitLoading(false)
      })
  }

  const onFormChange = () => {
    const values = props.form.getFieldsValue()
    console.log(values)
    if (Object.values(values).find(val => !!val)) {
      setFormComplete(true)
    } else {
      setFormComplete(false)
    }
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="40vw"
      title={TitleModal}
      footer={[
        <Button className="button-gray" onClick={props.onCancel}>
          <Trans id="Cancel" />
        </Button>,
        <ConfirmModal
          {...{
            showButtonProps: {
              className: 'button-red uppercase',
              disabled: !formComplete,
            },
            title: <Trans id="Are you sure?" />,
            showButtonText: (
              <span>
                &nbsp;&nbsp;
                <Trans id="Save" />
              </span>
            ),
            onConfirm: onSubmit,
            loading: submitLoading,
          }}
        />,
      ]}
    >
      <ModuleBox title={TitleInformation}>
        <Row>
          <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
            <span>
              Үйлчлүүлэгчийн нэр:
              <br />
              Үйлчилгээний төрөл:
              <br />
              Үйлчилгээний нэр:
              <br />
              Хийгдсэн огноо:
              <br />
              Цуцалсан огноо:
            </span>
          </Col>
          <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
            <span>
              &nbsp;
              {props.reception_patientProfile.patient.getOfficialNameString({
                short: true,
              })}
              <br />
              &nbsp;Лабороторын-шинжилгээ
              <br />
              &nbsp;{props.data.display}
              <br />
              &nbsp;{toLocalDateTime(props.data.authoredOn, 'yyyy-mm-dd')}
              <br />
              &nbsp;{toLocalDateTime(new Date(), 'yyyy-mm-dd')}
            </span>
          </Col>
        </Row>
      </ModuleBox>
      <ModuleBox title={TitleOrderedTests} centered>
        <Row>
          {props.data.display}
          {selectedRowData &&
            selectedRowData.include &&
            Object.keys(selectedRowData.include).map(testKey => {
              return (
                <div>
                  <div style={{ marginLeft: '16px' }}>
                    {CancellableLabTests[props.data.testKey] &&
                      CancellableLabTests[props.data.testKey].include &&
                      CancellableLabTests[props.data.testKey].include[
                        testKey
                      ] &&
                      CancellableLabTests[props.data.testKey].include[testKey]
                        .display}
                  </div>

                  {selectedRowData.include[testKey] &&
                    selectedRowData.include[testKey].include && (
                      <div style={{ marginLeft: '32px' }}>
                        {Object.keys(selectedRowData.include[testKey].include)
                          .map(
                            subTestKey =>
                              CancellableLabTests[props.data.testKey].include[
                                testKey
                              ].include[subTestKey].display
                          )
                          .join(', ')}
                      </div>
                    )}
                </div>
              )
            })}
        </Row>
      </ModuleBox>
      <ModuleBox title={TitleCancel} centered>
        <Form onChange={onFormChange}>
          <Row type="flex" justify="space-between" gutter={20}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('CausedByInternalOperation')(
                  <Checkbox>
                    <Trans>
                      <span>Internal </span>
                      <span>operation</span>
                    </Trans>
                  </Checkbox>
                )}
              </Form.Item>
              {/* <ModuleBox
                style={{ height: '160px' }}
                title={TitleInternalOperation}
              >
               
                <Form.Item>
                  {getFieldDecorator('CausedByInternalOperation')(
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row
                        style={{ margin: '6px 0', fontSize: '14px' }}
                        type="flex"
                        justify="space-between"
                      >
                        <Checkbox value="Тоног төхөөрөмжийн гэмтэл">
                          Тоног төхөөрөмжийн гэмтэл
                        </Checkbox>
                      </Row>
                      <Row
                        style={{ margin: '6px 0', fontSize: '14px' }}
                        type="flex"
                        justify="space-between"
                      >
                        <Checkbox value="Ажилтны хариуцлага алдсан">
                          Ажилтны хариуцлага алдсан
                        </Checkbox>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Системийн доголдол үүссэн">
                          Системийн доголдол үүссэн
                        </Checkbox>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Давтагдашгүй хүчин зүйл">
                          Давтагдашгүй хүчин зүйл
                        </Checkbox>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Урвалж дууссан">
                          Урвалж дууссан
                        </Checkbox>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
             
              </ModuleBox> */}
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('ReasonFromClient')(
                  <Checkbox>
                    <Trans>
                      <span>Reason from </span>
                      <span>client</span>
                    </Trans>
                  </Checkbox>
                )}
              </Form.Item>
              {/*<ModuleBox style={{ height: '160px' }} title={TitleByTheClient}>
                 <Form.Item>
                  {getFieldDecorator('ReasonFromClient')(
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Шинжилгээний хариу зөрсөн">
                          Шинжилгээний хариу зөрсөн
                        </Checkbox>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Ажилтны хариуцлага">
                          Ажилтны хариуцлага
                        </Checkbox>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Системийн доголдол">
                          Системийн доголдол
                        </Checkbox>
                      </Row>
                      <Row
                        type="flex"
                        justify="space-between"
                        style={{ margin: '6px 0', fontSize: '14px' }}
                      >
                        <Checkbox value="Давтагдашгүй хүчин зүйл">
                          Давтагдашгүй хүчин зүйл
                        </Checkbox>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
              </ModuleBox> */}
            </Col>
            <Col span={24}>
              <ModuleBox
                // title={TitleOther}
                title={<Trans id="Description" />}
              >
                <Row>
                  {/* <Form.Item>
                    {getFieldDecorator('Other')(
                      <TextArea rows={4} style={{ background: '#f5f5f5' }} />
                    )}
                  </Form.Item> */}

                  <Form.Item>
                    {getFieldDecorator('Description')(
                      <TextArea rows={4} style={{ background: '#f5f5f5' }} />
                    )}
                  </Form.Item>
                </Row>
              </ModuleBox>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </Modal>
  )
}

ModalEdited.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(Form.create()(ModalEdited)))

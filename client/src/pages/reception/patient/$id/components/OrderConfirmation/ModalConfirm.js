import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Typography, Divider, Button, Table, Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, ConfirmModal } from 'components'
import { toLocalDateTime } from 'utils/datetime'
import { ROLE_TYPE, STATUS } from 'utils/constant'
import { practitioner as Practitioner } from 'schemas'

import styles from './styles.less'

const { Text } = Typography
const OrderConfirmation = props => {
  const [formComplete, setFormComplete] = useState()
  const [submitLoading, setSubmitLoading] = useState()

  const TitleInformation = (
    <Trans>
      <span className="bold">Order </span>
      <span>Information</span>
    </Trans>
  )

  const TitleCancel = (
    <Trans>
      <span className="bold">Төлбөрийн </span>
      <span>Мэдээлэл</span>
    </Trans>
  )

  const TitleModal = (
    <Trans>
      <span className="bold">Төлбөр </span>
      <span>баталгаажуулалт</span>
    </Trans>
  )

  const TitleOrderedTests = (
    <Trans>
      <span className="bold">Ordered </span>
      <span>Tests</span>
    </Trans>
  )

  const onSubmit = () => {
    setSubmitLoading(true)
    return props.form
      .validateFields()
      .then(values => {
        return props.dispatch({
          type: 'reception_patientProfile/confirmServiceRequest',
          payload: {
            status: STATUS.EXTERNAL_SPECIMEN_LOG.CONFIRMED,
            serviceRequestInfo: props.data,
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
          <Trans id="Close" />
        </Button>,
        props.app.userRole !== ROLE_TYPE.EXTERNAL_RECEPTIONIST && (
          <ConfirmModal
            {...{
              showButtonProps: {
                className: 'button-red uppercase',
                // disabled: !formComplete,
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <Trans id="Verify Results" />
                </span>
              ),
              onConfirm: onSubmit,
              loading: submitLoading,
            }}
          />
        ),
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
              Шинжилгээ захиалсан огноо:
            </span>
          </Col>
          <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
            <span>
              &nbsp;
              {new Practitioner(
                props.data.user.practitioner
              ).getOfficialNameString({
                short: true,
              })}
              <br />
              &nbsp;Лабороторын шинжилгээ
              <br />
              &nbsp;{toLocalDateTime(props.data._createdAt, 'yyyy-mm-dd')}
            </span>
          </Col>
        </Row>
      </ModuleBox>
      <ModuleBox title={TitleOrderedTests}>
        <Row>
          {props.data.SelectedTests &&
            Object.keys(props.data.SelectedTests).map(category => {
              return (
                <>
                  {Object.keys(props.data.SelectedTests[category].include).map(
                    testKey => {
                      return (
                        <div>
                          {props.data.SelectedTests[category] &&
                            props.data.SelectedTests[category].display}
                          <div style={{ marginLeft: '16px' }}>
                            {props.data.SelectedTests[category].include[
                              testKey
                            ] &&
                              props.data.SelectedTests[category].include[
                                testKey
                              ].display}
                          </div>
                          {props.data.SelectedTests[category].include[
                            testKey
                          ] &&
                            props.data.SelectedTests[category].include[testKey]
                              .include && (
                              <div style={{ marginLeft: '32px' }}>
                                {Object.keys(
                                  props.data.SelectedTests[category].include[
                                    testKey
                                  ].include
                                )
                                  .map(
                                    subTestKey =>
                                      props.data.SelectedTests[category]
                                        .include[testKey].include[subTestKey]
                                        .display
                                  )
                                  .join(', ')}
                              </div>
                            )}
                        </div>
                      )
                    }
                  )}
                </>
              )
            })}
        </Row>
      </ModuleBox>
      <ModuleBox title={TitleCancel}>
        <Form onChange={onFormChange}>
          <Row type="flex" justify="space-between">
            <Col span={24}>
              <div>
                <Col span={8}>
                  <Row>ЭМД HCV:</Row>
                  <Row>ЭМД HBV:</Row>
                  <Row>ЭМД HDV:</Row>
                </Col>
                <Col span={16}>
                  <Row>{props.data.insuranceHCV}</Row>
                  <Row>{props.data.insuranceHBV}</Row>
                  <Row>{props.data.insuranceHDV}</Row>
                </Col>
              </div>
            </Col>

            <Col span={24}>
              <Divider className={styles.divider} />
              <Row
                style={{ margin: '0 0 10px 0' }}
                display="flex"
                justify="space-between"
              >
                <Col span={20} style={{ margin: '0 0 10px' }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                  >
                    <div>
                      <Text>Нийт төлбөр:</Text>
                      <br />
                      <Text>Хөнгөлөлт:</Text>
                      <br />
                      <Text>Бэлнээр:</Text>
                      <br />
                      <Text>Бэлэн бус:</Text>
                      <br />
                      <Text strong>Нийт төлөгдсөн:</Text>
                    </div>
                  </div>
                </Col>{' '}
                <Col span={4} style={{ margin: '0 0 10px' }}>
                  <div
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                  >
                    <div style={{ textAlign: 'right', right: '0px' }}>
                      <div>
                        <Text>{props.data.totalAmount}</Text>
                        <br />
                        <Text>{props.data.discount}</Text>
                        <br />
                        <Text>{props.data.inCash}</Text>
                        <br />
                        <Text>{props.data.byCredit}</Text>
                        <br />
                        <Text strong>{props.data.totalIncome}</Text>
                      </div>
                    </div>
                  </div>
                </Col>
                <Row>
                  <Col span={16} offset={8}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Col>
                        <Text>Баримт хэвлэсэн ажилтан: </Text>
                      </Col>
                      <Col>
                        {new Practitioner(
                          props.data.user.practitioner
                        ).getOfficialNameString({
                          short: true,
                        })}
                      </Col>
                    </div>
                    <div style={{ borderBottom: '1px dashed black' }}> </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Col>
                        <Text>Үйлчлүүлэгчийн нэр: </Text>
                      </Col>
                      <Col>
                        {props.reception_patientProfile.patient.getOfficialNameString(
                          {
                            short: true,
                          }
                        )}
                      </Col>
                    </div>
                    <div style={{ borderBottom: '1px dashed black' }} />
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </Modal>
  )
}

OrderConfirmation.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(Form.create()(OrderConfirmation)))

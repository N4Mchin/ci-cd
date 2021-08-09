import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { withI18n, Trans } from '@lingui/react'
import styles from '../styles.less'
import { DescriptionNotes } from 'components'
import ProtocolAbbottPrint from './ProtocolAbbottPrint'
import ModalHDVReagentConsumption from './ModalHDVReagentConsumption'
import { MessageModal } from 'components'
import * as helper from 'utils/helper'
import {
  Row,
  Col,
  DatePicker,
  TimePicker,
  Button,
  Form,
  Input,
  Select,
} from 'antd'
const { Option } = Select

const ProtocolAbbott = props => {
  const { form, i18n, loading, dispatch } = props

  const { getFieldDecorator } = form
  const [modalMessageVisible, showMessageModal] = useState(false)
  async function refresh() {}

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
        await helper.delay(1000)
        showMessageModal(true)
        refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    refresh()
  }, [])

  const [
    ModalProtocolAbbottPrintVisible,
    showModalProtocolAbbottPrint,
  ] = useState(false)

  const [
    ModalHDVReagentConsumptionVisible,
    showModalHDVReagentConsumption,
  ] = useState(false)

  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <div className={styles.border}>
        <div className={styles.p}>
          <span style={{ background: 'white' }}>
            <strong>Abbott M2000</strong> ПРТОКОЛ
          </span>
        </div>
        <Form
          layout="horizontal"
          labelAlign="left"
          className={styles.form}
          colon={false}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={i18n.t`Choice of apparatus type`}
                {...formItemLayout}
              >
                {getFieldDecorator('choiceOfApparatusType', {
                  rules: [{ required: false }],
                  initialValue: 'abbott',
                })(
                  <Select style={{ width: '80%' }}>
                    <Option value="abbott">Abbott M 2000</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label={i18n.t`Date`} {...formItemLayout}>
                {getFieldDecorator('registeredDate', {
                  rules: [{ required: false }],
                })(
                  <DatePicker
                    className={styles.field}
                    style={{ width: '80%' }}
                  />
                )}
              </Form.Item>
              <Form.Item
                label={i18n.t`Number of CA3 abided`}
                {...formItemLayout}
              >
                {getFieldDecorator('numberOfCа3Abided', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`LOT number of RNA isolation reagent`}
                {...formItemLayout}
              >
                {getFieldDecorator('lotNumberOfRnaIsolationReagent', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Expiration date of RNA isolation reagent`}
                {...formItemLayout}
              >
                {getFieldDecorator('expirationDateOfRnaIsolationReagent', {
                  rules: [{ required: false }],
                })(<DatePicker className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Completion date of RNA isolation `}
                {...formItemLayout}
              >
                {getFieldDecorator('completionDateOfRnaIsolation', {
                  rules: [{ required: false }],
                })(<TimePicker style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Who confirmed the result by quality monitor`}
                {...formItemLayout}
              >
                {getFieldDecorator('whoConfirmedTheResultByQualityMonitor', {
                  rules: [{ required: false }],
                  initialValue: 'Э.Анир',
                })(
                  <Select style={{ width: '80%' }}>
                    <Option value="М.Алтанхүү">М.Алтанхүү</Option>
                    <Option value="Д.Солонго">Д.Солонго</Option>
                    <Option value="Э.Анир">Э.Анир</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label={i18n.t`Deep well plate`} {...formItemLayout}>
                {getFieldDecorator('deepWellPlate', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={i18n.t`LOT number of PCR reagent`}
                {...formItemLayout}
              >
                {getFieldDecorator('lotNumberOfPcrReagent', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Expiration date of PCR reagent`}
                {...formItemLayout}
              >
                {getFieldDecorator('expirationDateOfPcrReagent', {
                  rules: [{ required: false }],
                })(<DatePicker className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Time when the abbott m2000sp is turned on`}
                {...formItemLayout}
              >
                {getFieldDecorator('timeWhenTheAbbottM2000spIsTurnedOn', {
                  rules: [{ required: false }],
                })(<TimePicker style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Time when the abbott m2000rt is turned on`}
                {...formItemLayout}
              >
                {getFieldDecorator('timeWhenTheM2000rtIsTurnedOn', {
                  rules: [{ required: false }],
                })(<TimePicker style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Time of completion of PCR master mix preparation`}
                {...formItemLayout}
              >
                {getFieldDecorator(
                  'timeOfCompletionOfPcrMasterMixPreparation',
                  {
                    rules: [{ required: false }],
                  }
                )(<TimePicker style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Time of completion of PCR`}
                {...formItemLayout}
              >
                {getFieldDecorator('timeOfCompletionOfPcr', {
                  rules: [{ required: false }],
                })(<TimePicker style={{ width: '80%' }} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Room temperature`} {...formItemLayout}>
                {getFieldDecorator('roomTemperature', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`PCR plate нэр`} {...formItemLayout}>
                {getFieldDecorator('pcrPlate', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginTop: '10px' }}>
            <Col span={12}>
              {' '}
              <Form.Item>
                {getFieldDecorator('descriptionNote', {
                  rules: [{ required: false }],
                })(<DescriptionNotes rows={6} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={[8, 8]} style={{ marginTop: '35px' }}>
                <Col span={12}>
                  <Button
                    onClick={() =>
                      router.push('/laboratory/test/viralLoadTests')
                    }
                    block
                  >
                    <Trans id="Return" />
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="button-red"
                    block
                    onClick={onSubmit}
                    loading={
                      loading.effects['laboratory_test/saveProtocolData']
                    }
                  >
                    <Trans id="Save" />
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    onClick={() => showModalHDVReagentConsumption(true)}
                  >
                    <Trans id="Reagent consumption log print" />
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    onClick={() => showModalProtocolAbbottPrint(true)}
                  >
                    <Trans id="Test protocol print" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>

        <ProtocolAbbottPrint
          visible={ModalProtocolAbbottPrintVisible}
          onCancel={() => showModalProtocolAbbottPrint(false)}
          testName="viralLoadTests_HDV"
          appartusType="abbott"
        />
        <ModalHDVReagentConsumption
          visible={ModalHDVReagentConsumptionVisible}
          onCancel={() => showModalHDVReagentConsumption(false)}
        />

        <MessageModal
          type="success"
          visible={modalMessageVisible}
          onCancel={() => showMessageModal(false)}
          content={i18n.t`Save successful`}
        />
      </div>
    </div>
  )
}

ProtocolAbbott.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(
  ({
    app,
    laboratory_test,
    laboratory_test_viralLoadTests,
    loading,
    dispatch,
  }) => ({
    laboratory_test,
    laboratory_test_viralLoadTests,
    loading,
    dispatch,
    app,
  })
)(withI18n()(Form.create()(ProtocolAbbott)))

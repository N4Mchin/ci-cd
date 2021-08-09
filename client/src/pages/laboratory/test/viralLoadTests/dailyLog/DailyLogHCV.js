import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { ModuleBox, DescriptionNotes } from 'components'
import ModalHCVTestProtocolPrint from './ModalHCVTestProtocolPrint'
import ModalHCVReagentConsumption from './ModalHCVReagentConsumption'
import { MessageModal, SelectItemCepheid } from 'components'
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

const Title = (
  <div>
    <span className="title">HCV-RNA</span>
    &nbsp;
    <span className="uppercase">
      <Trans id="Protocol" />
    </span>
  </div>
)

const DailyLogHCV = props => {
  const { dispatch, form, loading, i18n } = props
  const { getFieldDecorator } = form

  const [
    ModalHCVTestProtocolPrintVisible,
    showModalHCVTestProtocolPrint,
  ] = useState(false)
  const [
    ModalHCVReagentConsumptionVisible,
    showModalHCVReagentConsumption,
  ] = useState(false)

  const [modalMessageVisible, showMessageModal] = useState(false)

  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  }

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
  return (
    <ModuleBox title={Title}>
      <Form
        layout="horizontal"
        labelAlign="left"
        className={styles.form}
        colon={false}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label={i18n.t`Choice of apparatus type`}
              {...formItemLayout}
            >
              {getFieldDecorator('appartusType', {
                rules: [{ required: false }],
              })(<SelectItemCepheid />)}
            </Form.Item>
            <Form.Item label={i18n.t`Date`} {...formItemLayout}>
              {getFieldDecorator('registeredDate', {
                rules: [{ required: false }],
              })(<DatePicker className={styles.field} />)}
            </Form.Item>
            <Form.Item
              label={i18n.t`Time when the apparatus is turned on`}
              {...formItemLayout}
            >
              {getFieldDecorator('timeWhenTheApparatusIsTurnedOn', {
                rules: [{ required: false }],
              })(<TimePicker style={{ width: '80%' }} />)}
            </Form.Item>
            <Form.Item
              label={i18n.t`LOT number of reagent`}
              {...formItemLayout}
            >
              {getFieldDecorator('LotNumberOfReagent', {
                rules: [{ required: false }],
              })(<Input className={styles.field} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={i18n.t`Expiration date of reagent`}
              {...formItemLayout}
            >
              {getFieldDecorator('expirationDateOfReagent', {
                rules: [{ required: false }],
              })(<DatePicker className={styles.field} />)}
            </Form.Item>
            <Form.Item label={i18n.t`Number of CA3 abided`} {...formItemLayout}>
              {getFieldDecorator('numberOfCа3Abided', {
                rules: [{ required: false }],
              })(<Input placeholder="" className={styles.field} />)}
            </Form.Item>
            <Form.Item label={i18n.t`Room temperature`} {...formItemLayout}>
              {getFieldDecorator('roomTemperature', {
                rules: [{ required: false }],
              })(<Input placeholder="" className={styles.field} />)}
            </Form.Item>
            <Form.Item
              label={i18n.t`Who confirmed the result by quality monitor`}
              {...formItemLayout}
            >
              {getFieldDecorator('whoConfirmedTheResultByQualityMonitor', {
                rules: [{ required: false }],
                initialValue: 'М.Алтанхүү',
              })(
                <Select style={{ width: '80%' }}>
                  <Option value="Д.Солонго">Д.Солонго</Option>
                  <Option value="М.Алтанхүү">М.Алтанхүү</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12} style={{ marginTop: '10px' }}>
          <Col span={16}>
            <Form.Item>
              {getFieldDecorator('descriptionNote', {
                rules: [{ required: false }],
              })(<DescriptionNotes rows={6} />)}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Row gutter={[10, 10]} style={{ marginTop: '34px' }}>
              <Col span={12}>
                <Button
                  onClick={() => router.push('/laboratory/test/viralLoadTests')}
                  block
                >
                  <Trans id="Return" />
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  className="button-red"
                  onClick={onSubmit}
                  loading={loading.effects['laboratory_test/saveProtocolData']}
                >
                  <Trans id="Save" />
                </Button>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  block
                  onClick={() => showModalHCVReagentConsumption(true)}
                >
                  <Trans id="Reagent consumption log print" />
                </Button>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  block
                  onClick={() => showModalHCVTestProtocolPrint(true)}
                >
                  <Trans id="Test protocol print" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <ModalHCVTestProtocolPrint
        visible={ModalHCVTestProtocolPrintVisible}
        onCancel={() => showModalHCVTestProtocolPrint(false)}
        testName="viralLoadTests_HCV"
      />
      <ModalHCVReagentConsumption
        visible={ModalHCVReagentConsumptionVisible}
        onCancel={() => showModalHCVReagentConsumption(false)}
      />

      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={i18n.t`Save successful`}
      />
    </ModuleBox>
  )
}
DailyLogHCV.propTypes = {
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
    app,
    laboratory_test,
    laboratory_test_viralLoadTests,
    loading,
    dispatch,
  })
)(withI18n()(Form.create()(DailyLogHCV)))

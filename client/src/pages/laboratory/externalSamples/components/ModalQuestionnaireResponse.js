import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Form, Input, Row, Button, DatePicker, Col, Select } from 'antd'
import { ConfirmModal, ModuleBox } from 'components'
import styles from '../styles.less'

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

const ModalQuestionnaireResponse = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const [submitLoading, setSubmitLoading] = useState(false)

  const { Option } = Select

  const onSubmit = () => {
    setSubmitLoading(true)
    return form
      .validateFields()
      .then(values => {
        return props.dispatch({
          type: 'laboratory_reagent/saveReagent',
          payload: {
            testName: props.testName,
            values,
          },
        })
      })
      .then(() => {
        return props.onSubmit()
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  return (
    <Modal
      {...props}
      maskClosable={false}
      closable={false}
      footer={[
        <Button
          className="button-gray uppercase"
          onClick={props.onCancel}
          style={{ marginRight: '8px' }}
        >
          <Trans id="Close" />
        </Button>,
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
                <Trans id="Save" />
              </span>
            ),
            onConfirm: onSubmit,
            loading: submitLoading,
          }}
        />,
      ]}
    >
      <ModuleBox title={<Trans id={'QuestionnaireResponse'} />}>
        <Form
          //  onSubmit={handleSubmit}
          key="keyRequiredForm"
          // layout="vertical"
          // autoComplete="off"
          //  labelAlign="right"
          colon="false"
          hideRequiredMark={true}
          className={styles.itemLabel}
        >
          <Row type="flex">
            <Col>
              <Form.Item
                label={<Trans id="Сорьц хүлээн авсан огноо" />}
                hasFeedback={false}
                validateStatus="validating"
                {...formItemLayout}
              >
                {getFieldDecorator('reagentBarcode', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker />)}
              </Form.Item>

              <Form.Item
                label={<Trans id="Сорьц авах үеийн хайрцагны температур" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('reagentLotNumber', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>

              <Form.Item
                label={<Trans id="Хемолизтэй эсэх" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('reagentType', {
                  rules: [
                    {
                      required: !true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="yes">
                      <Trans id={'Yes'} />
                    </Option>
                    <Option value="no">
                      <Trans id={'No'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                label={<Trans id="Сорьц асгарсан эсэх" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('reagentExpirationDate', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="yes">
                      <Trans id={'Yes'} />
                    </Option>
                    <Option value="no">
                      <Trans id={'No'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label={
                  <Trans id="Машинаар ирсэн бол (1), Онгоцоор ирсэн бол (2)" />
                }
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity1', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="car">
                      <Trans id={'Car'} />
                    </Option>
                    <Option value="airplane">
                      <Trans id={'Airplane'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label={
                  <Trans id="Сорьцны дагалдах бичиг, дугаарлалт, хаягжилт бүрэн эсэх" />
                }
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity2', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="yes">
                      <Trans id={'Yes'} />
                    </Option>
                    <Option value="no">
                      <Trans id={'No'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label={<Trans id="Сорьц хүлээн авсан хүний нэр, гарын үсэг" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity3', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item
                label={<Trans id="Шинжилгээ хийсэн огноо" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity4', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item
                label={<Trans id="Оношлуурын нэр" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity5', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="Cepheid GeneXpert">
                      <Trans id={'Cepheid GeneXpert'} />
                    </Option>
                    <Option value="no">
                      <Trans id={'No'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label={<Trans id="Багажны нэр" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity6', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="GeneXpert">
                      <Trans id={'GeneXpert'} />
                    </Option>
                    <Option value="no">
                      <Trans id={'No'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label={<Trans id="Хүчинтэй хугацаа" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity7', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item
                label={<Trans id="Шаардлага хангасан эсэх" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity8', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Option value="yes">
                      <Trans id={'Yes'} />
                    </Option>
                    <Option value="no">
                      <Trans id={'No'} />
                    </Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label={<Trans id="Тайлбар" />}
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('quantity9', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </Modal>
  )
}

ModalQuestionnaireResponse.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ laboratory_reagent, loading, dispatch }) => ({
  laboratory_reagent,
  loading,
  dispatch,
}))(withI18n()(Form.create()(ModalQuestionnaireResponse)))

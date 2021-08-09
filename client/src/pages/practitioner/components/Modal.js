import React, { PureComponent } from 'react'
import PropTypes, { element } from 'prop-types'
import { Form, Modal, Select, Row, Col, Tabs } from 'antd'
import { withI18n } from '@lingui/react'
import {
  Active,
  Name,
  Identifier,
  Address,
  Telecom,
  Qualification,
  DateInput,
  Photo,
} from 'components'
import {
  AdministrativeGender,
  ValuesetLanguages,
} from '../../../components/const'
import styles from '../../../components/styles.less'
import * as jsonpatch from 'fast-json-patch'
import { applyOperation } from 'fast-json-patch'

const { Option } = Select
const { TabPane } = Tabs

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

@withI18n()
@Form.create()
class PractitionerModal extends PureComponent {
  handleOk = () => {
    const { onOk, form, modalType } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      const data = {
        ...getFieldsValue(),
        resourceType: 'Practitioner',
      }

      if (modalType === 'create') {
        // eslint-disable-next-line no-console
        console.log('Form data: ', data)
        onOk(data)
      } else {
        // update
        var documentInitial = this.props.data
        var documentUpdated = data
        var diff = jsonpatch.compare(documentInitial, documentUpdated, true)
        // eslint-disable-next-line no-console
        console.log('Form data: ', diff)
        onOk(diff)
      }
    })
  }

  render() {
    const { onOk, form, data = {}, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal size="large" {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <Tabs defaultActiveKey="1">
            <TabPane tab={i18n.t`BasicInformation`} key="1">
              <Row gutter={8}>
                <Col
                  span={12}
                  style={{ paddingLeft: '8px', paddingRight: '8px' }}
                >
                  <FormItem hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                      initialValue: data.name,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Name />)}
                  </FormItem>

                  <Row gutter={8}>
                    <Col span={24}>
                      <FormItem hasFeedback {...formItemLayout}>
                        {getFieldDecorator('active', {
                          initialValue: data.active,
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        })(<Active />)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>

                <Col
                  span={12}
                  style={{ paddingLeft: '8px', paddingRight: '8px' }}
                >
                  <Row gutter={8}>
                    <Col span={24}>
                      <FormItem hasFeedback {...formItemLayout}>
                        {getFieldDecorator('identifier', {
                          initialValue: data.identifier,
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        })(<Identifier />)}
                      </FormItem>
                    </Col>
                  </Row>

                  <Row
                    gutter={8}
                    className={styles.subContentForm}
                    style={{ padding: '4px', marginRight: '', marginLeft: '' }}
                  >
                    <Col span={12}>
                      <Form.Item
                        label={i18n.t`Gender`}
                        hasFeedback
                        {...formItemLayout}
                      >
                        {getFieldDecorator('gender', {
                          initialValue: data.gender,
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        })(
                          <Select
                          // placeholder={i18n.t`Gender`}
                          >
                            {AdministrativeGender.map(v => (
                              <Option key={v.code} value={v.code}>
                                {v.display}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label={i18n.t`BirthDate`}
                        hasFeedback
                        {...formItemLayout}
                      >
                        {getFieldDecorator('birthDate', {
                          initialValue: data.birthDate,
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        })(
                          <DateInput
                          // placeholder={i18n.t`BirthDate`}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab={i18n.t`ContactInformation`} key="2">
              <Row gutter={8}>
                <Col
                  span={24}
                  style={{ paddingLeft: '8px', paddingRight: '8px' }}
                >
                  <FormItem hasFeedback {...formItemLayout}>
                    {getFieldDecorator('telecom', {
                      initialValue: data.telecom,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Telecom />)}
                  </FormItem>

                  <FormItem hasFeedback {...formItemLayout}>
                    {getFieldDecorator('address', {
                      initialValue: data.address,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Address />)}
                  </FormItem>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab={i18n.t`Other`} key="3">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label={i18n.t`Communication`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('communication', {
                      initialValue: data.communication,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        // placeholder={i18n.t`Please select your language`}
                      >
                        {ValuesetLanguages.map(element => (
                          <Option
                            key={`keyLanguagueOption.${element.code}`}
                            value={[element.code, element.display]}
                          >
                            {element.display}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback {...formItemLayout}>
                    {getFieldDecorator('qualification', {
                      initialValue: data.qualification,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Qualification />)}
                  </Form.Item>
                </Col>

                <Col
                  span={12}
                  style={{ paddingLeft: '8px', paddingRight: '8px' }}
                >
                  <Form.Item hasFeedback {...formItemLayout}>
                    {getFieldDecorator('photo', {
                      initialValue: data.photo,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Photo />)}
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    )
  }
}

PractitionerModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default PractitionerModal

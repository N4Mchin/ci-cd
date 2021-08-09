import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, Icon, Descriptions, Input } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ActiveCollapse,
  SearchInputDrugInfoFullList,
  IntegerInput,
} from 'components'
import { RecurrenceField, DateField } from './../../'
import styles from './../../../styles.less'
import { delay } from 'utils/helper'
const { Option } = Select
const { TextArea } = Input

const FormSection = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form

  const [array, setArray] = useState([
    {
      key: '1',
    },
  ])

  const addRowSubmit = element => {
    const copyArray = array.slice()
    const newElement = {
      key: array.length + 1,
    }

    copyArray.push(newElement)

    setArray(copyArray)
  }

  const deleteRowSubmit = key => {
    let deleteIndex
    array.forEach((value, index) => {
      if (value.key === key) {
        deleteIndex = index
      }
    })

    const leftArray = array.slice(0, deleteIndex)
    const rightArray = array.slice(deleteIndex + 1, array.length)
    const newArray = [...leftArray, ...rightArray]

    setArray(newArray)
  }

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/medicationStatementAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }
  const onActiveChange = value => {
    setActiveKey(value)
  }

  const title = <Trans id="Medication Statement" />
  //
  return (
    <div>
      <Form>
        <ActiveCollapse
          displayName={title}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          {array.map(element => {
            return (
              <div className={styles.medicationRequestTable}>
                <Descriptions bordered layout="vertical">
                  <Descriptions.Item
                    span={5 / 2}
                    label={
                      <div className="title uppercase">
                        <Trans id="Medication information" />
                      </div>
                    }
                  >
                    <Descriptions bordered layout="vertical">
                      <Descriptions.Item
                        label={i18n.t`Medication Statement Name`}
                        span={2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.medication`, {
                            rules: [
                              {
                                required: true,
                                message: i18n.t`Please select medication`,
                              },
                            ],
                          })(<SearchInputDrugInfoFullList />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Are you currently using it?`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.medicationStatus`,
                            {
                              rules: [
                                {
                                  required: true,
                                  message: i18n.t`Please select`,
                                },
                              ],
                            }
                          )(
                            <Select>
                              <Option value="active">{i18n.t`Yes`}</Option>
                              <Option value="completed">{i18n.t`No`}</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`How many drinks a day?`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.dosage`, {
                            rules: [
                              {
                                required: false,
                              },
                            ],
                          })(<IntegerInput />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label={i18n.t`When to use`} span={1}>
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.effectivePeriod`, {
                            rules: [
                              {
                                required: false,
                              },
                            ],
                          })(<DateField />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`How long to use`}
                        span={2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.derivedFrom`, {
                            rules: [
                              {
                                required: false,
                              },
                            ],
                          })(<RecurrenceField />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Medication Statement Dosage`}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.doseQuantity`, {
                            rules: [
                              {
                                required: false,
                              },
                            ],
                          })(
                            <Select>
                              <Option value="Milligram">мг</Option>
                              <Option value="Milliliter">мл</Option>
                              <Option value="Gram">г</Option>
                              <Option value="EnzymeUnit">ед</Option>
                              <Option value="Microgram">мкг</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label={i18n.t`Note`}>
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.note`, {
                            rules: [{ required: false }],
                          })(<TextArea rows={1} />)}
                        </Form.Item>
                      </Descriptions.Item>
                    </Descriptions>
                  </Descriptions.Item>

                  <Descriptions.Item label={i18n.t`Delete`}>
                    <Button
                      type="primary"
                      onClick={() => deleteRowSubmit(element.key)}
                    >
                      <Icon type="delete" />
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
                <br />
              </div>
            )
          })}

          <Row style={{ marginTop: '8px' }}>
            <Col span={12}>
              <Row type="flex" justify="start">
                <Button type="primary" onClick={addRowSubmit}>
                  <Trans id={'Add'} />
                </Button>
              </Row>
            </Col>

            <Col span={12}>
              <Row type="flex" justify="end">
                <Button className="button-grey">
                  <Trans id={'Cancel'} />
                </Button>
                <Button
                  className="button-red"
                  style={{ marginLeft: '10px' }}
                  onClick={onSave}
                >
                  <Trans id={'Save'} />
                </Button>
              </Row>
            </Col>
          </Row>
        </ActiveCollapse>
      </Form>
    </div>
  )
}

FormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormSection)))

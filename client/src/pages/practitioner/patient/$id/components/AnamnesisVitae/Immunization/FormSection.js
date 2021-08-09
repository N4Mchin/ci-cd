import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Button,
  Row,
  Input,
  Col,
  Descriptions,
  Select,
  Icon,
  Radio,
} from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import styles from './../../../styles.less'
import { DateField } from './../../'

const { Option } = Select
const { TextArea } = Input

const FormSection = props => {
  const { app, form, i18n, practitioner_patient_profile } = props
  const { getFieldDecorator } = form
  const { Immunization } = app.FHIR_CODES.AnamnesisVitae.include

  const [disabled, setDisabled] = useState(true)
  const [array, setArray] = useState([{ key: 0 }])

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

  const immunizationStatusInitial =
    practitioner_patient_profile.immunizationStatus &&
    practitioner_patient_profile.immunizationStatus.length > 0 &&
    (practitioner_patient_profile.immunizationStatus.find(
      v => !(v.valueBoolean === undefined)
    ).valueBoolean
      ? 'Yes'
      : 'No')

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        console.log(formValues)
        return props.dispatch({
          type: 'practitioner_patient_profile/immunizationAdd',
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

  const onFormChange = event => {
    console.log(event.target.type)

    if (event.target.type === 'radio') {
      setDisabled(event.target.value === 'Yes' ? false : true)
    }
  }

  const title = resolveDisplay(Immunization, i18n._language)

  return (
    <div>
      <Form onChange={onFormChange}>
        <ActiveCollapse
          displayName={title}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          <Row style={{ marginTop: '10px' }}>
            <Form.Item
              label={i18n.t`Whether vaccinated`}
              labelAlign="left"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              {getFieldDecorator('immunizationStatus', {
                rules: [
                  {
                    required: true,
                    message: 'Please select immunization status',
                  },
                ],
                initialValue:
                  !(immunizationStatusInitial === undefined) &&
                  immunizationStatusInitial,
              })(
                <Radio.Group
                  disabled={immunizationStatusInitial === 'Yes' ? true : false}
                >
                  <Radio value="Yes">{i18n.t`Yes`}</Radio>
                  <Radio value="No">{i18n.t`No`}</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Row>
          {array.map(element => {
            return (
              <div className={styles.medicationRequestTable}>
                <Descriptions bordered layout="vertical" column={8}>
                  <Descriptions.Item
                    span={5 / 2}
                    label={
                      <div className="title uppercase">
                        <Trans id="Vaccine information" />
                      </div>
                    }
                  >
                    <Descriptions bordered={true} layout="vertical">
                      <Descriptions.Item
                        label={i18n.t`Name of administered vaccine`}
                        span={5 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `immunizationInfo.${element.key}.immunizationName`,
                            { rules: [{ required: false }] }
                          )(
                            <Select
                              disabled={
                                immunizationStatusInitial === 'Yes'
                                  ? false
                                  : disabled
                              }
                            >
                              {Object.keys(Immunization.include).map(
                                immunizationValue => {
                                  const optionValue = resolveDisplay(
                                    Immunization.include[immunizationValue],
                                    i18n._language
                                  )

                                  return (
                                    <Option
                                      value={immunizationValue}
                                      key={immunizationValue}
                                    >
                                      {optionValue}
                                    </Option>
                                  )
                                }
                              )}
                            </Select>
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Date of last dose of vaccine was administered`}
                        span={1 / 4}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `immunizationInfo.${element.key}.occurenceDate`,
                            { rules: [{ required: false }] }
                          )(
                            <DateField
                              disabled={
                                immunizationStatusInitial === 'Yes'
                                  ? false
                                  : disabled
                              }
                            />
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`AdditionalInformation`}
                        span={1 / 4}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `immunizationInfo.${element.key}.note`,
                            { rules: [{ required: false }] }
                          )(
                            <TextArea
                              disabled={
                                immunizationStatusInitial === 'Yes'
                                  ? false
                                  : disabled
                              }
                            />
                          )}
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

              // <div style={{ display: 'flex', height: '56px' }}>
              //   <div
              //     style={{
              //       width: '60px',
              //       border: '1px solid #c9c9c9',
              //       flexGrow: 2,
              //     }}
              //   >
              //     <Form.Item style={{ padding: '8px' }}>
              //       {getFieldDecorator('location', {
              //         rules: [{ required: false }],
              //       })(
              //         <Select>
              //           <Option value="vaccine">Вакциныг сонгоно уу</Option>
              //         </Select>
              //       )}
              //     </Form.Item>
              //   </div>
              //   <div
              //     style={{
              //       width: '60px',
              //       border: '1px solid #c9c9c9',
              //       flexGrow: 2,
              //     }}
              //   >
              //     <Form.Item style={{ padding: '8px' }}>
              //       {getFieldDecorator('additionalInfo', {
              //         rules: [{ required: false }],
              //       })(<DateField />)}
              //     </Form.Item>
              //   </div>
              //   <div
              //     style={{
              //       width: '60px',
              //       border: '1px solid #c9c9c9',
              //       flexGrow: 2,
              //       // padding: '8px',
              //     }}
              //   >
              //     <Form.Item style={{ padding: '8px' }}>
              //       {getFieldDecorator('delete', {
              //         rules: [{ required: false }],
              //       })(<TextArea style={{ width: '100%' }} />)}
              //     </Form.Item>
              //   </div>
              //   <div
              //     style={{
              //       width: '60px',
              //       border: '1px solid #c9c9c9',
              //       display: 'flex',
              //       alignItems: 'center',
              //       justifyContent: 'center',
              //       flexGrow: 1 / 2,
              //     }}
              //   >
              //     <Button
              //       type="primary"
              //       onClick={() => deleteRowSubmit(element.key)}
              //     >
              //       <Icon type="delete" />
              //     </Button>
              //   </div>
              // </div>
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

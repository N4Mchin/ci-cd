import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Select, Icon, Descriptions } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { getInstant } from 'utils/datetime'
import { SearchInputDrugInfoFullList, IntegerInput } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'

const { TextArea } = Input
const { Option } = Select

const RecurrencePerYear = props => {
  const { value, i18n } = props
  const [recurrenceValue, serRecurrenceValue] = useState()

  const onChange = v => {
    let previousValue = {}

    if (!!v) {
      if (parseInt(v)) {
        previousValue = {
          ...recurrenceValue,
          dateValue: v,
        }
      } else {
        previousValue = {
          ...recurrenceValue,
          dateType: v,
        }
      }

      serRecurrenceValue(previousValue)
      props.onChange(previousValue)
    } else {
      props.onChange('')
    }
  }

  return (
    <Row type="flex" gutter={4}>
      <Col span={14}>
        <IntegerInput value={value && value.dateValue} onChange={onChange} />
      </Col>
      <Col span={10}>
        <Select onChange={onChange}>
          <Option value="d">{i18n.t`Day`}</Option>
          <Option value="wk">{i18n.t`Week`}</Option>
          <Option value="mo">{i18n.t`Month`}</Option>
        </Select>
      </Col>
    </Row>
  )
}

const FormSection = props => {
  const { form, i18n, app } = props
  const { MedicationDosageInstruction } = app.FHIR_CODES
  const { getFieldDecorator } = form

  const [array, setArray] = useState([{ key: '1' }])
  const [loadingData, setLoadingData] = useState(false)

  const addRowSubmit = () => {
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

  const onSave = () => {
    setLoadingData(true)

    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/medicationRequestAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(() => {
        return props.dispatch({
          type: 'practitioner_patient_profile/updateState',
          payload: {
            lastUpdatedMedicationRequest: getInstant(),
          },
        })
      })
      .then(result => {
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
      .finally(() => setLoadingData(false))
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <div>
          {array.map(element => {
            return (
              <div className={styles.medicationRequestTable}>
                <Descriptions bordered layout="vertical">
                  <Descriptions.Item
                    span={5 / 2}
                    label={
                      <div className="title uppercase">
                        {i18n.t`Medication information`}
                      </div>
                    }
                  >
                    <Descriptions bordered layout="vertical">
                      <Descriptions.Item
                        label={i18n.t`Medicaton name, Form, Dose`}
                        span={1.5}
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
                        label={i18n.t`Total quantity`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.initialFillQuantity`,
                            { rules: [{ required: false }] }
                          )(<IntegerInput />)}
                        </Form.Item>
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={i18n.t`Route of administration`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.dosageInstruction`,
                            { rules: [{ required: false }] }
                          )(
                            <Select allowClear>
                              {MedicationDosageInstruction &&
                                Object.keys(MedicationDosageInstruction).map(
                                  instructionValue => {
                                    return (
                                      <Option value={instructionValue}>
                                        {resolveDisplay(
                                          MedicationDosageInstruction[
                                            instructionValue
                                          ],
                                          i18n._language
                                        )}
                                      </Option>
                                    )
                                  }
                                )}
                            </Select>
                          )}
                        </Form.Item>
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={i18n.t`Frequency of use`}
                        span={1 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.timingRepeatFrequency`,
                            { rules: [{ required: false }] }
                          )(<RecurrencePerYear i18n={i18n} />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Per administration`}
                        span={1 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.dosageQuantity`, {
                            rules: [{ required: false }],
                          })(<IntegerInput />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Effective peroid`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.initialFillDuration`,
                            { rules: [{ required: false }] }
                          )(<RecurrencePerYear i18n={i18n} />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label={i18n.t`Note`} span={1 / 2}>
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
        </div>

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
                htmlType="submit"
                className="button-red"
                style={{ marginLeft: '10px' }}
                onClick={onSave}
                loading={loadingData}
              >
                <Trans id={'Save'} />
              </Button>
            </Row>
          </Col>
        </Row>
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

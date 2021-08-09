import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Select, Icon, Descriptions } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { isObject } from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'
import { v4 as uuidv4 } from 'uuid'

const { TextArea } = Input
const { Option } = Select

const TableRowAdd = props => {
  const { lists, language, placeholder } = props

  const onSelectChange = event => {
    props.onChange(event)
  }

  return (
    <Select
      showSearch
      placeholder={placeholder}
      onChange={onSelectChange}
      allowClear
      filterOption={(input, option) =>
        option.props.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {isObject(lists)
        ? Object.keys(lists).map(problemName => {
            const designation = resolveDisplay(lists[problemName], language)

            return (
              <Option value={problemName} key={problemName}>
                {designation}
              </Option>
            )
          })
        : lists.map(list => {
            const designation = resolveDisplay(list, language)

            return (
              <Option value={list.code.text} key={list.code.text}>
                {designation}
              </Option>
            )
          })}
    </Select>
  )
}

const FormSection = props => {
  const { form, i18n, app } = props
  const { Problems, BodySites } = app.FHIR_CODES
  const { getFieldDecorator } = form

  const [array, setArray] = useState([{ key: uuidv4() }])
  const [loadingData, setLoadingData] = useState(false)

  const onSave = () => {
    setLoadingData(true)

    form
      .validateFields()
      .then(async formValues => {
        console.log(formValues)
        return props.dispatch({
          type: 'practitioner_patient_profile/saveComplaint',
          payload: {
            formValues,
          },
        })
      })
      .then(result => {
        if (result) {
          return props.dispatch({
            type: 'practitioner_patient_profile/showModalMessage',
            payload: {
              type: 'success',
              content: i18n.t`Save successful`,
            },
          })
        } else {
          return props.dispatch({
            type: 'practitioner_patient_profile/showModalMessage',
            payload: {
              type: 'info',
              content: i18n.t`Save failed`,
            },
          })
        }
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  const onCancel = () => {
    // const deleteObject = {}
    console.log('initial value', form.getFieldsValue())
    // Object.keys(form.getFieldsValue()).forEach(key => {
    //   console.log({ [key]: undefined })
    //   form.setFieldsValue({ [key]: undefined })
    // })

    // form.setFields({})
    // form.setFieldsValue({})
    form.resetFields()
    setArray([])
    // setArray([{ key: uuidv4() }])
  }

  const addRowSubmit = () => {
    const newElement = { key: uuidv4() }

    setArray([...array, newElement])
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

  console.log(array)
  console.log(form.getFieldsValue())

  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <div>
          {array.map(element => {
            return (
              <div className={styles.medicationRequestTable}>
                <Descriptions bordered={true} layout="vertical" column={4}>
                  <Descriptions.Item label={i18n.t`Complaint`}>
                    <Form.Item>
                      {getFieldDecorator(`${element.key}.complaint`, {
                        rules: [
                          {
                            required: true,
                            message: i18n.t`Please select complaint`,
                          },
                        ],
                      })(
                        <TableRowAdd
                          lists={Problems}
                          language={i18n._language}
                          placeholder={i18n.t`Choose a complaint`}
                        />
                      )}
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label={i18n.t`Body site`}>
                    <Form.Item>
                      {getFieldDecorator(`${element.key}.bodySite`, {
                        rules: [{ required: false }],
                      })(
                        <TableRowAdd
                          lists={BodySites}
                          language={i18n._language}
                          placeholder={i18n.t`Choose a diagnosis`}
                        />
                      )}
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label={i18n.t`AdditionalInformation`}>
                    <Form.Item>
                      {getFieldDecorator(`${element.key}.note`, {
                        rules: [{ required: false }],
                      })(
                        <TextArea
                          rows={1}
                          style={{ marginBottom: '5px' }}
                          placeholder={i18n.t`Write the necessary additional information`}
                        />
                      )}
                    </Form.Item>
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
              <Button className="button-grey" onClick={onCancel}>
                <Trans id={'Cancel'} />
              </Button>

              <Button
                onClick={onSave}
                loading={loadingData}
                className="button-red"
                style={{ marginLeft: '10px' }}
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

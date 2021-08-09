import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n, Trans } from '@lingui/react'
import * as helper from 'utils/helper'
import {
  Required,
  Contact,
  AdditionalInformation,
  Education,
  EmploymentStatus,
  WorkEnvironment,
  OtherInformation,
  MaritalStatus,
  Accommodation,
  DietFinding,
  Address,
  VitalSign,
  BloodType,
  Disability,
} from './'
import { Form, Modal, Row, Col, Tabs, Button, message } from 'antd'

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

const PatientModal = props => {
  const [patientAge, setPatientAge] = useState(undefined)
  const [birthDate, setBirthDate] = useState(undefined)
  const [gender, setGender] = useState(undefined)

  const onChangeNationalID = value => {
    // const genderValue = calcGender(value)
    const genderValue = helper.calculateGender(value)

    // const birthDateValue = calculateBirthDate(value)
    const birthDateValue = helper.calculateBirthDate(value)

    // const ageValue = calculateAgeFromBirthDate(birthDateValue)
    const ageValue = helper.calculateAgeFromBirthDate(birthDateValue)

    setPatientAge(ageValue)
    setBirthDate(birthDateValue)
    setGender(genderValue)
  }

  const onBirthDateChange = birthDate => {
    // const ageValue = calculateAgeFromBirthDate(birthDate)
    const ageValue = helper.calculateAgeFromBirthDate(birthDate)

    setPatientAge(ageValue)
    setBirthDate(birthDate)
  }

  const handleCancel = () => {
    props.onCancel()
  }

  const onSubmit = () => {
    let Result
    return props.form
      .validateFields()
      .then(formValues => {
        if (
          Object.keys(formValues).some(
            key => formValues[key] && formValues[key].hasErrors
          ) ||
          formValues.required === undefined ||
          formValues.contact.undefined
        ) {
          message.error(i18n.t`Please fill the form completely`)
          return
        }

        return props.dispatch({
          type: 'reception/createPatientInformationList',
          payload: {
            formValues,
            patientAge,
            birthDate,
            gender,
          },
        })
      })
      .then(result => {
        Result = result

        return props.dispatch({
          type: 'app/queryPatientList',
          payload: {},
        })
      })
      .then(() => {
        console.log(Result)
        return props.onSubmit(Result.name, Result.id)
      })
      .then(() => {
        return props.form.resetFields()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  const { onOk, form, i18n, data = {}, ...modalProps } = props
  const { getFieldDecorator } = form

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      closable={false}
      width="65vw"
      footer={[
        <Button key="back" onClick={handleCancel}>
          <Trans id="Cancel" />
        </Button>,
        <Button
          className="button-red"
          key="submit"
          onClick={onSubmit}
          loading={
            props.loading.effects['reception/createPatientInformationList']
          }
        >
          <Trans id="Save" />
        </Button>,
      ]}
    >
      <Form
        layout="horizontal"
        // className={styles.noScroll}
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={<span className="uppercase">{i18n.t`BasicInformation`}</span>}
            key="1"
          >
            <Row gutter={8}>
              <Col sm={24} md={24} lg={24} xl={16} xxl={16}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('required', {
                    initialValue: data.required,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Required onChangeNationalID={onChangeNationalID} />)}
                </FormItem>
              </Col>

              <Col sm={24} md={24} lg={24} xl={8} xxl={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('contact', {
                    initialValue: data.contact,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Contact />)}
                </FormItem>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span className="uppercase">{i18n.t`AdditionalInformation`}</span>
            }
            key="2"
          >
            <Row gutter={8}>
              <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Row>
                  <Col>
                    <FormItem hasFeedback={false} {...formItemLayout}>
                      {getFieldDecorator('additional', {
                        initialValue: data.additional,
                        rules: [{ required: false }],
                      })(
                        <AdditionalInformation
                          initials={{ patientAge, birthDate, gender }}
                          onBirthDateChange={onBirthDateChange}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>

                <Row>
                  <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <FormItem hasFeedback={false} {...formItemLayout}>
                      {getFieldDecorator('employmentStatus', {
                        initialValue: data.employmentStatus,
                        rules: [{ required: false }],
                      })(<EmploymentStatus />)}
                    </FormItem>
                  </Col>
                  <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <FormItem hasFeedback={false} {...formItemLayout}>
                      {getFieldDecorator('workEnvironment', {
                        initialValue: data.workEnvironment,
                        rules: [{ required: false }],
                      })(<WorkEnvironment />)}
                    </FormItem>
                  </Col>
                </Row>
              </Col>

              <Col sm={24} md={24} lg={24} xl={12} xxl={12}>
                <Row>
                  <FormItem hasFeedback={false} {...formItemLayout}>
                    {getFieldDecorator('other', {
                      initialValue: data.other,
                      rules: [{ required: false }],
                    })(<OtherInformation />)}
                  </FormItem>
                </Row>

                <Row>
                  <FormItem hasFeedback={false} {...formItemLayout}>
                    {getFieldDecorator('education', {
                      initialValue: data.education,
                      rules: [{ required: false }],
                    })(<Education />)}
                  </FormItem>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col sm={24} md={24} lg={24} xl={8} xxl={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('maritalStatus', {
                    initialValue: data.maritalStatus,
                    rules: [{ required: false }],
                  })(<MaritalStatus />)}
                </FormItem>
              </Col>

              <Col sm={24} md={24} lg={24} xl={8} xxl={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('accommodation', {
                    initialValue: data.accommodation,
                    rules: [{ required: false }],
                  })(<Accommodation />)}
                </FormItem>
              </Col>

              <Col sm={24} md={24} lg={24} xl={8} xxl={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('dietFinding', {
                    initialValue: data.dietFinding,
                    rules: [{ required: false }],
                  })(<DietFinding />)}
                </FormItem>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={<span className="uppercase">{i18n.t`OtherInformation`}</span>}
            key="3"
          >
            <Row gutter={8}>
              <Col sm={24} md={18} lg={24} xl={12} xxl={12}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('address', {
                    initialValue: data.address,
                    rules: [{ required: false }],
                  })(<Address />)}
                </FormItem>
              </Col>

              <Col sm={24} md={18} lg={24} xl={12} xxl={12}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('vitalSign', {
                    initialValue: data.vitalSign,
                    rules: [{ required: false }],
                  })(<VitalSign />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col sm={24} md={24} lg={24} xl={8} xxl={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('bloodType', {
                    initialValue: data.bloodType,
                    rules: [{ required: false }],
                  })(<BloodType />)}
                </FormItem>
              </Col>

              <Col sm={24} md={24} lg={24} xl={16} xxl={16}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('disability', {
                    initialValue: data.bloodType,
                    rules: [{ required: false }],
                  })(<Disability />)}
                </FormItem>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  )
}

PatientModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, reception, loading }) => ({
  app,
  reception,
  loading,
}))(withI18n()(Form.create()(PatientModal)))

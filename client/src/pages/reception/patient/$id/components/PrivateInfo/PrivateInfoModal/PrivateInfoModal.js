import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './styles.less'
import { withI18n, Trans } from '@lingui/react'
import {
  Required,
  Contact,
  AdditionalInformation,
  EmploymentStatus,
  Education,
  WorkEnvironment,
  OtherInformation,
  MaritalStatus,
  Accommodation,
  DietFinding,
  Address,
  VitalSign,
  BloodType,
  Disability,
} from '../../../../../components'

import { Form, Modal, Row, Col, Button, Spin, message } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const PrivateInfoModal = props => {
  const [patientAge, setPatientAge] = useState()
  const [birthDate, setBirthDate] = useState()

  const { onOk, form, i18n, reception_patientProfile, ...modalProps } = props

  const { getFieldDecorator } = form

  const [modalData, setModalData] = useState()
  const [loadingData, setLoadingData] = useState(false)
  const [gender, setGender] = useState(undefined)

  useEffect(() => {
    setLoadingData(true)

    if (props.visible) {
      props
        .dispatch({
          type: 'reception_patientProfile/getPatientInformation',
          payload: { id: props.reception_patientProfile.patientId },
        })
        .then(data => {
          onChangeNationalID(data.required.NInum)
          setModalData(data)
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible])

  const onChangeNationalID = value => {
    const genderValue = calcGender(value)
    const birthDateValue = calculateBirthDate(value)
    const ageValue = calculateAgeFromBirthDate(birthDateValue)

    setPatientAge(ageValue)
    setBirthDate(birthDateValue)
    setGender(genderValue)
  }

  const onBirthDateChange = birthDate => {
    const age = calculateAgeFromBirthDate(birthDate)

    setPatientAge(age)
    setBirthDate(birthDate)
  }

  const handleCancel = () => {
    props.onCancel()
  }

  const handleOk = async () => {
    const formValues = form.getFieldsValue()

    console.log('FORM VALUES:', formValues)
    if (
      Object.keys(formValues).some(
        key => formValues[key] && formValues[key].hasErrors
      )
    ) {
      message.error(i18n.t`Please fill the form completely`)
      return
    }

    return props
      .dispatch({
        type: 'reception_patientProfile/updatePatientInformationList',
        payload: {
          formValues: formValues,
        },
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
  }

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      width="70vw"
      footer={[
        <Button key="back" onClick={handleCancel}>
          <Trans>Cancel</Trans>
        </Button>,
        <Button
          className="button-red"
          key="submit"
          onClick={handleOk}
          loading={
            props.loading.effects[
              'reception_patientProfile/updatePatientInformationList'
            ]
          }
        >
          <Trans>Save</Trans>
        </Button>,
      ]}
    >
      {loadingData && (
        <Row type="flex" justify="center">
          <Spin spinning />
        </Row>
      )}
      {!loadingData && (
        <div className={styles.container}>
          <Form layout="horizontal">
            <Row gutter={8}>
              <Col span={16}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('required', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Required
                      onChangeNationalID={onChangeNationalID}
                      initials={modalData && modalData.required}
                      editable
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('contact', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Contact
                      initials={modalData && modalData.contact}
                      editable
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Row gutter={8}>
                  <FormItem hasFeedback={false} {...formItemLayout}>
                    {getFieldDecorator('additional', {
                      rules: [{ required: false }],
                    })(
                      <AdditionalInformation
                        initials={{
                          ...(modalData && modalData.additional),
                          patientAge,
                          birthDate,
                          gender,
                        }}
                        onBirthDateChange={onBirthDateChange}
                        editable
                      />
                    )}
                  </FormItem>
                </Row>

                <Row gutter={8}>
                  <Col span={12} style={{ padding: '0px' }}>
                    <FormItem hasFeedback={false} {...formItemLayout}>
                      {getFieldDecorator('employmentStatus', {
                        rules: [{ required: false }],
                      })(
                        <EmploymentStatus
                          initials={modalData && modalData.employmentStatus}
                          editable
                        />
                      )}
                    </FormItem>
                  </Col>

                  <Col span={12} style={{ padding: '0px' }}>
                    <FormItem hasFeedback={false} {...formItemLayout}>
                      {getFieldDecorator('workEnvironment', {
                        rules: [{ required: false }],
                      })(
                        <WorkEnvironment
                          initials={modalData && modalData.workEnvironment}
                          editable
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row gutter={8}>
                  <FormItem hasFeedback={false} {...formItemLayout}>
                    {getFieldDecorator('other', {
                      rules: [{ required: false }],
                    })(
                      <OtherInformation
                        initials={modalData && modalData.other}
                        editable
                      />
                    )}
                  </FormItem>
                </Row>

                <Row gutter={8}>
                  <FormItem hasFeedback={false} {...formItemLayout}>
                    {getFieldDecorator('education', {
                      rules: [{ required: false }],
                    })(
                      <Education
                        initials={modalData && modalData.education}
                        editable
                      />
                    )}
                  </FormItem>
                </Row>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={8} style={{ padding: '0px' }}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('maritalStatus', {
                    rules: [{ required: false }],
                  })(
                    <MaritalStatus
                      initials={modalData && modalData.maritalStatus}
                      editable
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} style={{ padding: '0px' }}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('accommodation', {
                    rules: [{ required: false }],
                  })(
                    <Accommodation
                      initials={modalData && modalData.accommodation}
                      editable
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={8} style={{ padding: '0px' }}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('dietaryFinding', {
                    rules: [{ required: false }],
                  })(
                    <DietFinding
                      initials={modalData && modalData.dietaryFinding}
                      editable
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('address', {
                    rules: [{ required: false }],
                  })(
                    <Address
                      initials={modalData && modalData.address}
                      editable
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('vitalSign', {
                    initialValue: {
                      bodyMassIndex:
                        modalData &&
                        modalData.vitalSign &&
                        modalData.vitalSign.bodyMassIndex,
                      bodyMassIndexDisplay:
                        modalData &&
                        modalData.vitalSign &&
                        modalData.vitalSign.bodyMassIndexDisplay,
                    },
                    rules: [{ required: false }],
                  })(
                    <VitalSign
                      initials={modalData && modalData.vitalSign}
                      editable
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={8}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('bloodType', {
                    rules: [{ required: false }],
                  })(
                    <BloodType
                      initials={modalData && modalData.bloodType}
                      editable
                    />
                  )}
                </FormItem>
              </Col>

              <Col span={16}>
                <FormItem hasFeedback={false} {...formItemLayout}>
                  {getFieldDecorator('disability', {
                    rules: [{ required: false }],
                  })(
                    <Disability
                      initials={modalData && modalData.disability}
                      editable
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </Modal>
  )
}

PrivateInfoModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

function calculateAge(NationalID) {
  if (NationalID.length < 4) return

  let sub = parseInt(NationalID.substring(2, 4))
  let year = new Date().getFullYear()

  if (sub >= parseInt(year.toString().substring(2, 4))) {
    return (
      parseInt(
        new Date()
          .getFullYear()
          .toString()
          .substring(2, 4)
      ) +
      100 -
      sub
    )
  } else {
    // if less than 19  -> thisYear = 2019
    // don't add 100 years
    return (
      parseInt(
        new Date()
          .getFullYear()
          .toString()
          .substring(2, 4)
      ) - sub
    )
  }
}

function calculateBirthDate(NationalID) {
  // sub = **XX******
  if (NationalID.length < 4) return
  let sub = parseInt(NationalID.substring(2, 4))
  let thisYear = new Date().getFullYear()
  let year, month, day

  if (sub >= parseInt(thisYear.toString().substring(2, 4))) {
    // subtract 100 years and 19 years
    // getting to 1900
    year = thisYear - 100 - parseInt(thisYear.toString().substring(2, 4)) + sub
    month = parseInt(NationalID.substring(4, 6))
    day = parseInt(NationalID.substring(6, 8))

    if (month <= 0 || isNaN(month) || day <= 0 || isNaN(day)) return

    let dob = [
      year,
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0'),
    ].join('-')

    return dob
  } else {
    // if less than 19  -> thisYear = 2019
    // subtract 20 from month
    year = sub
    month = parseInt(NationalID.substring(4, 6)) - 20
    day = parseInt(NationalID.substring(6, 8))

    if (month <= 0 || isNaN(month) || day <= 0 || isNaN(day)) return

    let dob = [
      year,
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0'),
    ].join('-')
    return dob
  }
}

function calculateAgeFromBirthDate(birthDate) {
  try {
    const dateOfBirth = new Date(birthDate)
    const dateNow = new Date()

    const yearDiff = dateNow.getFullYear() - dateOfBirth.getFullYear()
    const monthDiff = dateNow.getMonth() - dateOfBirth.getMonth()
    const dayDiff = dateNow.getDate() - dateOfBirth.getDate()

    let age = yearDiff

    if (monthDiff < 0) {
      age = age - 1
    } else {
      if (dayDiff < 0) {
        age = age - 1
      }
    }

    if (age < 0) {
      age = 0
    }

    if (age < 200) {
      return age
    }
  } catch {}
  return ''
}

/* #endregion */
function calcGender(NationalID) {
  if (NationalID.length < 9) return

  let genderIdentity = parseInt(NationalID[8])
  if (genderIdentity % 2 === 1) return 'male'
  else return 'female'
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(Form.create()(PrivateInfoModal)))

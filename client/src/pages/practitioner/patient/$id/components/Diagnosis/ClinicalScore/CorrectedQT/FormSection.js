import React, { Component, useEffect, useState } from 'react'
import { Form, Divider, Button, Row, Col, Select, DatePicker } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { FloatNumber } from 'components'
import { connect } from 'dva'
const { Option } = Select

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

const CustomizedForm = Form.create({
  name: 'customized_form',
  onFieldsChange(props, changedFields, allFields) {
    props.onChange(allFields)
  },
})(props => {
  const { getFieldDecorator } = props.form
  const { form, i18n } = props

  const onSave = () => {
    return form.validateFields((error, values) => {
      console.log('values', values)

      if (error) {
        console.log(error)
        return
      }
      return props
        .dispatch({
          type: 'practitioner_patient_profile/saveClinicalScoreCorrectedQT',
          payload: {
            formValues: { ...values, correctedQTScore: props.score },
          },
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
        .then(() => {
          props.onChange({})
          return props.form.setFieldsValue({
            heartRate: undefined,
            paperSpeed: undefined,
            qtInterval: undefined,
          })
        })
        .catch(errorInfo => console.log(errorInfo))
    })
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="right" colon={false}>
        <Form.Item {...formItemLayout} label={<Trans id="Heart rate" />}>
          {getFieldDecorator('heartRate', {
            rules: [{ required: true }],
          })(<FloatNumber suffix="bpm" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Paper speed" />}>
          {getFieldDecorator('paperSpeed', {
            rules: [{ required: true }],
          })(<FloatNumber />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="QT interval " />}>
          {getFieldDecorator('qtInterval', {
            rules: [{ required: true }],
          })(<FloatNumber suffix="msec" />)}
        </Form.Item>

        <Row>
          <Col span={8} offset={8}>
            <Divider style={{ backgroundColor: '#ccc' }} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Row type="flex" justify="end">
              <span className="bold">Corrected QT Interval Score:</span>
            </Row>
          </Col>
          <Col span={8}>{props.score && props.score}</Col>
        </Row>

        <Row type="flex" justify="end">
          <Button
            className="button-red"
            style={{ marginLeft: '10px' }}
            onClick={onSave}
          >
            <Trans id={'Save'} />
          </Button>
        </Row>
      </Form>
    </div>
  )
})

const FormSection = props => {
  const [score, setScore] = useState()

  const handleFormChange = allFields => {
    const valueArray = Object.values(allFields).map(field => field.value)

    if (valueArray.length === 3) {
      let heartRate = parseFloat(allFields.heartRate.value)
      let paperSpeed = parseFloat(allFields.paperSpeed.value)
      let qtInterval = parseFloat(allFields.qtInterval.value)
      let rr = 60 / heartRate
      console.log('values', heartRate, qtInterval, rr)

      let qtc = qtInterval + 154 * (1 - rr)
      setScore(qtc)
      console.log('result', qtc)
    } else {
      setScore()
    }
  }

  return (
    <div>
      <CustomizedForm {...props} score={score} onChange={handleFormChange} />
    </div>
  )
}

// FormSection.propTypes = {
//   practitioner_patient_profile: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(FormSection))

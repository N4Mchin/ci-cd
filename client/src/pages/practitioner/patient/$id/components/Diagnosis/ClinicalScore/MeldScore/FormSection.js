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
      if (error) {
        console.log(error)
        return
      }

      return props
        .dispatch({
          type: 'practitioner_patient_profile/saveClinicalScoreMELD',
          payload: {
            formValues: { ...values, meldScore: props.score },
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
            date: undefined,
            bilirubin: undefined,
            creatinine: undefined,
            inr: undefined,
            Dialysis: undefined,
            na: undefined,
          })
        })
        .catch(errorInfo => console.log(errorInfo))
    })
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="right" colon={false}>
        <Form.Item {...formItemLayout} label={<Trans id="Date" />}>
          {getFieldDecorator('date', {
            rules: [{ required: true }],
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Bilirubin" />}>
          {getFieldDecorator('bilirubin', {
            rules: [{ required: true }],
          })(<FloatNumber suffix="mg/dL" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Creatinine" />}>
          {getFieldDecorator('creatinine', {
            rules: [{ required: true }],
          })(<FloatNumber suffix="mg/dL" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="INR" />}>
          {getFieldDecorator('inr', {
            rules: [{ required: true }],
          })(<FloatNumber />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Dialysis " />}>
          {getFieldDecorator('Dialysis', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Na(+)" />}>
          {getFieldDecorator('na', {
            rules: [{ required: true }],
          })(<FloatNumber suffix="mEq/L" />)}
        </Form.Item>

        <Row>
          <Col span={8} offset={8}>
            <Divider style={{ backgroundColor: '#ccc' }} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Row type="flex" justify="end">
              <span className="bold">Meld Score:</span>
            </Row>
          </Col>
          <Col span={4}>{props.score && props.score}</Col>
          <Col span={4}>{props.percentage && props.percentage}</Col>
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
  const [percentage, setPercentage] = useState()
  const handleFormChange = allFields => {
    const valueArray = Object.values(allFields).map(field => field.value)

    if (valueArray.length === 6) {
      let dialysis = allFields.Dialysis.value
      let bilirubin =
        parseFloat(allFields.bilirubin.value) < 1.0
          ? 1.0
          : parseFloat(allFields.bilirubin.value)
      let creatinine =
        parseFloat(allFields.creatinine.value) < 1.0
          ? 1.0
          : parseFloat(allFields.creatinine.value)
      creatinine = creatinine > 4.0 ? 4.0 : creatinine
      creatinine = dialysis ? 4.0 : creatinine
      let inr =
        parseFloat(allFields.inr.value) < 1.0
          ? 1.0
          : parseFloat(allFields.inr.value)
      let na =
        parseFloat(allFields.na.value) < 125
          ? 125
          : parseFloat(allFields.na.value)
      na = na > 137 ? 137 : na

      let meld =
        Math.round(
          0.957 * Math.log(creatinine) +
            0.378 * Math.log(bilirubin) +
            1.12 * Math.log(inr) +
            0.643
        ) * 10

      if (meld > 11) {
        meld = meld + 1.32 * (137 - na) - 0.033 * meld * (137 - na)
      }
      if (meld <= 9) {
        setScore(meld)
        setPercentage('1.9%')
      } else if (meld >= 10 && meld <= 19) {
        setScore(meld)
        setPercentage('6%')
      } else if (meld >= 20 && meld <= 29) {
        setScore(meld)
        setPercentage('19.6%')
      } else if (meld >= 30 && meld <= 39) {
        setScore(meld)
        setPercentage('52.6%')
      } else if (meld <= 40) {
        setScore(meld)
        setPercentage('71.3%')
      } else {
        setScore()
        setPercentage()
      }
    }
  }

  return (
    <div>
      <CustomizedForm
        {...props}
        score={score}
        percentage={percentage}
        onChange={handleFormChange}
      />
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

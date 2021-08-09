import React, { useEffect, useState } from 'react'
import { Form, Divider, Button, Row, Input, Col, Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
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
          type: 'practitioner_patient_profile/saveClinicalScoreChildPugh',
          payload: {
            formValues: { ...values, childPughScore: props.score },
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
            totalBilirubin: undefined,
            serumAlbumin: undefined,
            prothrombin: undefined,
            ascites: undefined,
            encephalopathy: undefined,
          })
        })
        .catch(errorInfo => console.log(errorInfo))
    })
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="right" colon={false}>
        <Form.Item {...formItemLayout} label={<Trans id="Total Bilirubin" />}>
          {getFieldDecorator('totalBilirubin', {
            rules: [{ required: true }],
          })(
            // <Select>
            //   <Option value="1">
            //     {'<'}25 mol/L | {'<'}2 mg/DL
            //   </Option>
            //   <Option value="2">25-40 mol/L | 2-3 mg/DL</Option>
            //   <Option value="3">
            //     {'>'}40 mol/L | {'>'}3 mg/DL
            //   </Option>
            // </Select>
            <Select>
              <Option value="1">
                {'<'}2 mg/dL ({'<'}34.2 µmol/L)
              </Option>
              <Option value="2">2-3 mg/dL (34.2-51.3 µmol/L)</Option>
              <Option value="3">
                {'>'}3 mg/dL ({'>'}51.3 µmol/L)
              </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Serum Albumin" />}>
          {getFieldDecorator('serumAlbumin', {
            rules: [{ required: true }],
          })(
            // <Select>
            //   <Option value="1">{'>'}3.5 g/DL</Option>
            //   <Option value="2">3.0-3.5 g/DL</Option>
            //   <Option value="3">{'<'}3.0 g/DL</Option>
            // </Select>
            <Select>
              <Option value="1">
                {'>'}3.5 g/dL ({'>'}35 g/L)
              </Option>
              <Option value="2">2.8-3.5 g/dL (28-35 g/L)</Option>
              <Option value="3">
                {'<'}2.8 g/dL ({'<'}28 g/L)
              </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<Trans id="Prothrombin time (second over control) or INR" />}
        >
          {getFieldDecorator('prothrombin', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="1">
                {'<'}4 | {'<'}1.7
              </Option>
              <Option value="2">4-6 | 1.7-2.3</Option>
              <Option value="3">
                {'>'}6 | {'>'}2.3
              </Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Ascites" />}>
          {getFieldDecorator('ascites', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="1">Absent</Option>
              <Option value="2">Slight</Option>
              <Option value="3">Moderate</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Encephalopathy" />}>
          {getFieldDecorator('encephalopathy', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="1">0 | none</Option>
              <Option value="2">Grade 1-2 | (Mild to moderate)</Option>
              <Option value="3">Grade 3-4 | (Severe)</Option>
            </Select>
          )}
        </Form.Item>
        <Row>
          <Col span={8} offset={8}>
            <Divider style={{ backgroundColor: '#ccc' }} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Row type="flex" justify="end">
              <span className="bold">Child Pugh Score:</span>
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

    if (valueArray.length === 5) {
      const valueSum = valueArray.reduce((a, b) => parseInt(a) + parseInt(b))

      if (valueSum >= 5 && valueSum <= 6) {
        setScore('class A')
      } else if (valueSum >= 7 && valueSum <= 9) {
        setScore('class B')
      } else if (valueSum >= 10 && valueSum <= 15) {
        setScore('class C')
      }
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

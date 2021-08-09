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
          type: 'practitioner_patient_profile/saveClinicalScoreReachB',
          payload: {
            formValues: { ...values, reachBScore: props.score },
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
        <Form.Item {...formItemLayout} label={<Trans id="Sex" />}>
          {getFieldDecorator('sex', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="0">Female</Option>
              <Option value="2">Male</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="Age / Years" />}>
          {getFieldDecorator('ageAndYears', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="0">30-34</Option>
              <Option value="1">35-39</Option>
              <Option value="2">40-44</Option>
              <Option value="3">45-49</Option>
              <Option value="4">50-54</Option>
              <Option value="5">55-59</Option>
              <Option value="6">60-65</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="ALT " />}>
          {getFieldDecorator('alt', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="0">{'<'}15</Option>
              <Option value="1">15-44</Option>
              <Option value="2">{'>'} 45</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="HBeAg" />}>
          {getFieldDecorator('hBeAg', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="2">Positive</Option>
              <Option value="0">Negative</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<Trans id="HBV-DNA" />}>
          {getFieldDecorator('hbv_dna', {
            rules: [{ required: true }],
          })(
            <Select>
              <Option value="0">{'<'} 300</Option>
              <Option value="0">300-9999 </Option>
              <Option value="3">10000-99999</Option>
              <Option value="5">100000-999999</Option>
              <Option value="4">{'>'} 106</Option>
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
              <span className="bold">REACH-B Score:</span>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={12}>3-year</Col>
              <Col span={12}>{props.hccRisk1 && props.hccRisk1 + ' %'}</Col>
            </Row>
            <Row>
              <Col span={12}>5-year</Col>
              <Col span={12}>{props.hccRisk2 && props.hccRisk2 + ' %'}</Col>
            </Row>
            <Row>
              <Col span={12}>10-year</Col>
              <Col span={12}>{props.hccRisk3 && props.hccRisk3 + ' %'}</Col>
            </Row>
          </Col>
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
  const [hccRisk1, setHccRisk1] = useState()
  const [hccRisk2, setHccRisk2] = useState()
  const [hccRisk3, setHccRisk3] = useState()

  const handleFormChange = allFields => {
    const valueArray = Object.values(allFields).map(field => field.value)

    if (valueArray.length === 5) {
      const valueSum = valueArray.reduce((a, b) => parseInt(a) + parseInt(b))

      switch (valueSum) {
        case 0:
          setHccRisk1(0.0)
          setHccRisk2(0.0)
          setHccRisk3(0.0)
          break
        case 1:
          setHccRisk1(0.0)
          setHccRisk2(0.0)
          setHccRisk3(0.1)
          break
        case 2:
          setHccRisk1(0.0)
          setHccRisk2(0.0)
          setHccRisk3(0.1)
          break
        case 3:
          setHccRisk1(0.0)
          setHccRisk2(0.1)
          setHccRisk3(0.2)
          break
        case 4:
          setHccRisk1(0.0)
          setHccRisk2(0.1)
          setHccRisk3(0.3)
          break
        case 5:
          setHccRisk1(0.1)
          setHccRisk2(0.2)
          setHccRisk3(0.5)
          break
        case 6:
          setHccRisk1(0.1)
          setHccRisk2(0.3)
          setHccRisk3(0.7)
          break
        case 7:
          setHccRisk1(0.2)
          setHccRisk2(0.5)
          setHccRisk3(1.2)
          break
        case 8:
          setHccRisk1(0.3)
          setHccRisk2(0.8)
          setHccRisk3(2.0)
          break
        case 9:
          setHccRisk1(0.5)
          setHccRisk2(1.2)
          setHccRisk3(3.2)
          break
        case 10:
          setHccRisk1(0.9)
          setHccRisk2(2.0)
          setHccRisk3(5.2)
          break
        case 11:
          setHccRisk1(1.4)
          setHccRisk2(3.3)
          setHccRisk3(8.4)
          break
        case 12:
          setHccRisk1(2.3)
          setHccRisk2(5.3)
          setHccRisk3(13.4)
          break
        case 13:
          setHccRisk1(3.7)
          setHccRisk2(8.5)
          setHccRisk3(21.0)
          break
        case 14:
          setHccRisk1(6.0)
          setHccRisk2(13.6)
          setHccRisk3(32.0)
          break
        case 15:
          setHccRisk1(9.6)
          setHccRisk2(21.3)
          setHccRisk3(46.8)
          break
        case 16:
          setHccRisk1(15.2)
          setHccRisk2(32.4)
          setHccRisk3(64.4)
          break
        case 17:
          setHccRisk1(23.6)
          setHccRisk2(47.4)
          setHccRisk3(81.6)
          break
        default:
          setHccRisk1()
          setHccRisk2()
          setHccRisk3()
          break
      }
    } else {
      setHccRisk1()
      setHccRisk2()
      setHccRisk3()
    }
  }

  return (
    <div>
      <CustomizedForm
        {...props}
        hccRisk1={hccRisk1}
        hccRisk2={hccRisk2}
        hccRisk3={hccRisk3}
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

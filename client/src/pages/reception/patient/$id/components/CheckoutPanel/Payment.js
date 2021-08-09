import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Checkbox, Row, Col, Form } from 'antd'
import { withI18n } from '@lingui/react'
import { FloatNumber } from 'components'
// import styles from './CheckoutPanel.less'

const checkUpNames = [
  // {
  //   name: 'ЭМ Даатгал',
  //   valueName: 'insurance',
  //   borderTop: false,
  // },
  {
    name: 'ЭМД HCV',
    valueName: 'insuranceHCV',
    borderTop: false,
  },
  {
    name: 'ЭМД HBV',
    valueName: 'insuranceHBV',
    borderTop: false,
  },
  {
    name: 'ЭМД HDV',
    valueName: 'insuranceHDV',
    borderTop: false,
  },

  {
    name: 'Хөнгөлөлт',
    valueName: 'customersDiscount',
    borderTop: false,
  },
  {
    name: 'Бэлнээр',
    valueName: 'inCash',
    borderTop: true,
  },
  {
    name: 'Бэлэн бус',
    valueName: 'byCredit',
    borderTop: false,
  },
  {
    name: 'Нэмэлт зардал',
    valueName: 'extraCharges',
    borderTop: true,
  },
]

const InputPayment = forwardRef((props, ref) => {
  const { paymentName, value, placeholder } = props
  const [disable, setDisable] = useState(true)

  const [componentValue, setComponentValue] = useState()
  const [componentChecked, setComponentChecked] = useState(false)

  useEffect(() => {
    if (componentValue !== props.value) {
      setComponentChecked(false)
      setDisable(true)
    }
  }, [props.value])

  const onChange = v => {
    setComponentValue(v)
    props.onChange(v)
  }

  const onCheckBoxChange = event => {
    event.target.checked ? setDisable(false) : setDisable(true)
    setComponentChecked(event.target.checked)
    props.onChange('')
  }

  return (
    <Row ref={ref}>
      <Col span={14}>
        <Checkbox onChange={onCheckBoxChange} checked={componentChecked}>
          {paymentName}
        </Checkbox>
      </Col>
      <Col span={10}>
        <FloatNumber
          value={!disable ? value : ''}
          onChange={onChange}
          disabled={disable}
          unit="₮"
          suffix={!disable ? '₮' : ''}
          placeholder={!disable ? placeholder : ''}
        />
      </Col>
    </Row>
  )
})

const Payment = props => {
  const { form, reception_patientProfile, paymentValue } = props
  const {
    //payment,
    totalAmount,
  } = reception_patientProfile
  const { getFieldDecorator } = form

  const placeholderValue =
    totalAmount -
    paymentValue.otherDiscount -
    paymentValue.customersDiscount +
    paymentValue.extraPayment

  useEffect(() => {
    form.resetFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reception_patientProfile.payment])

  const onFieldsChange = () => {
    const formValues = form.getFieldsValue()
    const formErrors = form.getFieldsError()
    let otherDiscountSum = 0

    Object.keys(formErrors).forEach(formError => {
      if (formErrors[formError]) return
    })
    Object.keys(formValues).forEach(formValue => {
      if (!!formValues[formValue] && formValue.startsWith('insurance')) {
        otherDiscountSum += parseFloat(formValues[formValue])
      }
    })

    let insuranceHCV = formValues.insuranceHCV
      ? parseFloat(formValues.insuranceHCV)
      : 0
    let insuranceHBV = formValues.insuranceHBV
      ? parseFloat(formValues.insuranceHBV)
      : 0
    let insuranceHDV = formValues.insuranceHDV
      ? parseFloat(formValues.insuranceHDV)
      : 0
    let customersDiscount = formValues.customersDiscount
      ? parseFloat(formValues.customersDiscount)
      : 0
    let extraCharges = formValues.extraCharges
      ? parseFloat(formValues.extraCharges)
      : 0
    let research = formValues.research ? parseFloat(formValues.research) : 0
    let byCredit = formValues.byCredit ? parseFloat(formValues.byCredit) : 0
    let inCash = formValues.inCash ? parseFloat(formValues.inCash) : 0
    let extraPayment = formValues.extraCharges
      ? parseFloat(formValues.extraCharges)
      : 0

    const payment = {
      insuranceHCV: insuranceHCV,
      insuranceHBV: insuranceHBV,
      insuranceHDV: insuranceHDV,
      customersDiscount: customersDiscount,
      extraCharges: extraCharges,
      research: research,
      insurance: otherDiscountSum,
      byCredit: byCredit,
      inCash: inCash,
      extraPayment: extraPayment,
      totalIncome:
        totalAmount +
        extraPayment -
        customersDiscount -
        (insuranceHCV + insuranceHBV + insuranceHDV),
    }

    props.onChange(payment)
    // props.dispatch({
    //   type: 'reception_patientProfile/payment',
    //   payload: {
    //     paymentValues: payment,
    //   },
    // })
  }

  return (
    <div>
      <Form onChange={onFieldsChange}>
        {checkUpNames.map((checkUpName, index) => {
          return (
            <div key={`payment_${index}`}>
              {checkUpName.borderTop ? (
                <div style={{ borderTop: ' 1px solid black' }} />
              ) : (
                ''
              )}
              <Form.Item help={false}>
                {getFieldDecorator(`${checkUpName.valueName}`, {
                  rules: [{ required: false }],
                })(
                  <InputPayment
                    paymentName={checkUpName.name}
                    placeholder={
                      paymentValue.inCash
                        ? placeholderValue - paymentValue.inCash
                        : placeholderValue - paymentValue.byCredit
                    }
                  />
                )}
              </Form.Item>
            </div>
          )
        })}
      </Form>
    </div>
  )
}

Payment.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(Form.create()(Payment)))

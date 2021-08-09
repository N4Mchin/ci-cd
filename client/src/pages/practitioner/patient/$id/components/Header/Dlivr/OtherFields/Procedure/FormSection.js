import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Divider, Button, Row, Input, Col, DatePicker } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { SearchInputICD9 } from 'components'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

const FormSection = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form

  const onSave = () => {
    return form
      .validateFields()
      .then(formValues => {
        console.log(formValues)
        return props.dispatch({
          type: 'practitioner_patient_profile/dlivrSaveProcedure',
          payload: {
            formValues: {
              procedureCode: formValues.procedureCode,
              performedDateTime: formValues.performedDateTime,
            },
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
      .then(() => {
        return props.form.setFieldsValue({
          procedureCode: undefined,
          performedDateTime: undefined,
        })
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="right" colon={false}>
        <Form.Item
          {...formItemLayout}
          label={'Өмнө хийлгэж байсан мэж ажилбар'}
        >
          {getFieldDecorator('procedureCode', {
            rules: [{ required: true }],
          })(<SearchInputICD9 />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={'огноо'}>
          {getFieldDecorator('performedDateTime', {
            rules: [{ required: true }],
          })(<DatePicker />)}
        </Form.Item>

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

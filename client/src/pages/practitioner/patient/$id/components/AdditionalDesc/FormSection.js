import React, { useState } from 'react'
import { Button, Form, Input, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'

const FormSection = props => {
  const { i18n, form } = props
  const { getFieldDecorator } = form
  const [submitLoading, setSubmitLoading] = useState(false)
  const [countWords, setCountWords] = useState(0)

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const handleSubmit = () => {
    setSubmitLoading(true)

    return form.validateFields(async (error, values) => {
      if (error) {
        setSubmitLoading(false)
        return props.handleError(error)
      }
      try {
        await props.handleSubmit(values)
      } catch (error) {
        props.handleError(error)
      }
      return setSubmitLoading(false)
    })
  }

  const handleChange = event => {
    setCountWords(event.target.value.length)
  }

  return (
    <Form {...layout}>
      <Form.Item
        label={i18n.t`Additional description`}
        extra={`${i18n.t`Character`}: ${countWords} / 200`}
      >
        {getFieldDecorator('additionalDescription', {
          rules: [
            {
              required: true,
              max: 200,
              message:
                i18n.t`Additional description` +
                ' ' +
                i18n.t`is required` +
                ', ' +
                i18n.t`cannot be longer than 200 characters`,
            },
          ],
        })(
          <Input.TextArea
            rows={4}
            placeholder={i18n.t`Add additional information` + '...'}
            onChange={handleChange}
          />
        )}
      </Form.Item>

      <Row type="flex" justify="end" style={{ marginTop: '32px' }}>
        <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
          <Trans id="Save" />
        </Button>
      </Row>
    </Form>
  )
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormSection)))

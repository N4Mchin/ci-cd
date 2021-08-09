import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col } from 'antd'
import { SearchInputICD } from 'components'
import { getDate } from 'utils/datetime'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'

const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

const FormSection = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form

  const [array, setArray] = useState([{ key: '0' }])
  const [loadingData, setLoadingData] = useState()

  const addRowSubmit = element => {
    const copyArray = array.slice()
    const newElement = {
      key: array.length + 1,
    }

    copyArray.push(newElement)
    setArray(copyArray)
  }

  const onSave = () => {
    setLoadingData(true)

    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/diagnosisAdd',
          payload: {
            formValues: formValues,
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
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <div>
          {array.map(element => {
            return (
              <div>
                <Row>
                  <Form.Item label={i18n.t`Date`} {...formItemLayout}>
                    {getFieldDecorator(`${element.key}.date`, {
                      rules: [{ required: false }],
                    })(<Row>{getDate()}</Row>)}
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Form.Item
                    label={i18n.t`Primary diagnosis`}
                    {...formItemLayout}
                  >
                    {getFieldDecorator(`${element.key}.basicDiagnosis`, {
                      rules: [
                        { required: true, message: 'Please select diagnosis' },
                      ],
                    })(<SearchInputICD data-cy="primaryDiagnosis" />)}
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Form.Item
                    label={i18n.t`Notes of primary diagnosis`}
                    {...formItemLayout}
                  >
                    {getFieldDecorator(`${element.key}.basicDiagnosisNotes`, {
                      rules: [{ required: false }],
                    })(<TextArea rows={4} style={{ width: '80%' }} />)}
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Form.Item label={i18n.t`Dual diagnosis`} {...formItemLayout}>
                    {getFieldDecorator(`${element.key}.diagnosis`, {
                      rules: [{ required: false }],
                    })(<SearchInputICD />)}
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Form.Item
                    label={i18n.t`Notes of dual diagnoisis`}
                    {...formItemLayout}
                  >
                    {getFieldDecorator(`${element.key}.diagnosisNotes`, {
                      rules: [{ required: false }],
                    })(<TextArea rows={4} style={{ width: '80%' }} />)}
                  </Form.Item>
                </Row>
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
              <Button className="button-grey">
                <Trans id={'Cancel'} />
              </Button>
              <Button
                htmlType="submit"
                className="button-red"
                style={{ marginLeft: '10px' }}
                onClick={onSave}
                loading={loadingData}
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

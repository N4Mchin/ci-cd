import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'

import FormFields from './FormFields'

const FormSection = props => {
  const { form, i18n, app } = props
  const { getFieldDecorator } = form

  const {
    PhysicalFindingsOfGastrointestinalSystem,
  } = app.FHIR_CODES.PhysicalExaminationComplete.include

  const FieldValues = PhysicalFindingsOfGastrointestinalSystem.include

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const title = resolveDisplay(
    PhysicalFindingsOfGastrointestinalSystem,
    i18n._language
  )

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type:
            'practitioner_patient_profile/physicalFindingsOfGastrointestinalSystemAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)

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
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }

  const onActiveChange = value => {
    setActiveKey(value)
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <ActiveCollapse
          bordered={true}
          displayName={title}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          <Row gutter={[24, 8]}>
            {Object.keys(FieldValues).map(fieldKey => {
              const initialValue = {}

              if (
                FieldValues[fieldKey].default &&
                FieldValues[fieldKey].default.type
              ) {
                initialValue['code'] = FieldValues[fieldKey].default.code
              } else {
                FieldValues[fieldKey].default &&
                  Object.keys(FieldValues[fieldKey].default).forEach(
                    defaultName => {
                      initialValue[defaultName] = {
                        code: FieldValues[fieldKey].default[defaultName].code,
                      }
                    }
                  )
              }

              return (
                <Col span={FieldValues[fieldKey].fieldStyle.spanSize}>
                  <div style={{ minHeight: '100px' }}>
                    <Form.Item>
                      {getFieldDecorator(
                        `${FieldValues[fieldKey].valueType}.${fieldKey}`,
                        {
                          rules: [{ required: false }],
                          initialValue: initialValue,
                        }
                      )(
                        <FormFields
                          valueSet={FieldValues[fieldKey]}
                          type={FieldValues[fieldKey].valueType}
                        />
                      )}
                    </Form.Item>
                  </div>
                </Col>
              )
            })}
          </Row>
          <Row
            style={{ marginTop: '10px' }}
            type="flex"
            justify="end"
            gutter={8}
          >
            <Col>
              <Button className="button-gray">
                <Trans id={'Cancel'} />
              </Button>
            </Col>
            <Col>
              <Button className="button-red" onClick={onSave}>
                <Trans id={'Save'} />
              </Button>
            </Col>
          </Row>
        </ActiveCollapse>
        <br />
      </Form>
    </div>
  )
}

FormSection.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, practitioner_patient_profile, practitioner, loading }) => ({
    app,
    practitioner_patient_profile,
    practitioner,
    loading,
  })
)(withI18n()(Form.create()(FormSection)))

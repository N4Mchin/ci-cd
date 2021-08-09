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
    GeneralPhysicalFinding,
  } = app.FHIR_CODES.BriefGeneralExamination.include

  const FieldValues = GeneralPhysicalFinding.include

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/generalPhysicalFindingAdd',
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

  const title = resolveDisplay(GeneralPhysicalFinding, i18n._language)

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
          <Row gutter={[24, 8]} type="flex">
            {Object.keys(FieldValues).map(fieldKey => {
              const initialValue = {}

              if (!!FieldValues[fieldKey].default.type) {
                initialValue['code'] = FieldValues[fieldKey].default.code
              } else {
                Object.keys(FieldValues[fieldKey].default).forEach(
                  defaultName => {
                    initialValue[defaultName] =
                      FieldValues[fieldKey].default[defaultName].code
                  }
                )
              }
              return (
                <Col span={FieldValues[fieldKey].fieldStyle.spanSize}>
                  <div style={{ minHeight: '160px' }}>
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

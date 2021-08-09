import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { RadioField } from './../..'
import { delay } from 'utils/helper'

const FormFields = props => {
  const { valueSet, language } = props

  const fieldTitle = resolveDisplay(valueSet, language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col>{fieldTitle}</Col>
          <Col>
            <RadioField
              onChange={onChange}
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
            />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

const FormSection = props => {
  const { form, i18n, app } = props
  const { getFieldDecorator } = form

  const {
    PhysicalFindingsOfNervousSystem,
  } = app.FHIR_CODES.PhysicalExaminationComplete.include

  const FieldValues = PhysicalFindingsOfNervousSystem.include

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type:
            'practitioner_patient_profile/physicalFindingsOfNervousSystemAdd',
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

  const title = resolveDisplay(PhysicalFindingsOfNervousSystem, i18n._language)

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
              const initialValue = { code: FieldValues[fieldKey].default.code }

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
                          language={i18n._language}
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

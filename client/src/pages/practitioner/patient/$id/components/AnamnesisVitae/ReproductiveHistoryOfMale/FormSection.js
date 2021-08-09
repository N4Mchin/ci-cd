import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import { CheckboxField } from './../..'
import { i18n } from '../../../../../../../utils/config'

const { TextArea } = Input

const ReproductiveHistoryOfMaleField = props => {
  const { valueSet, language, fieldName, i18n } = props

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'string':
      return (
        <Row>
          <Col span={11}>{fieldName}</Col>
          <Col span={13}>
            <TextArea
              rows={4}
              style={{ width: '80%' }}
              onChange={onChange}
              placeholder={i18n.t`Please write`}
            />
          </Col>
        </Row>
      )
    case 'check':
      return (
        <Row>
          <Col span={11}>{fieldName}</Col>
          <Col span={13}>
            <CheckboxField
              onChange={onChange}
              valueSet={valueSet}
              language={language}
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
  const { AnamnesisVitae } = app.FHIR_CODES
  const { getFieldDecorator } = form

  const maleReproductiveHistory =
    AnamnesisVitae.include.MaleReproductiveHistory.include

  const title = resolveDisplay(
    AnamnesisVitae.include.MaleReproductiveHistory,
    i18n._language
  )

  const textFieldsValues = [
    {
      name: maleReproductiveHistory.Contraception,
      value: 'Contraception',
      type: 'check',
      valueSet: maleReproductiveHistory.Contraception.include,
    },
    {
      name: maleReproductiveHistory.EndocrineAndrologyDisorder,
      value: 'EndocrineAndrologyDisorder',
      type: 'check',
      valueSet: maleReproductiveHistory.EndocrineAndrologyDisorder.include,
    },
    {
      name: <Trans id={'AdditionalInformation'} />,
      value: 'note',
      type: 'string',
    },
  ]

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/reproductiveHistoryOfMaleAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)

        console.log(result)
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
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
          displayName={title}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          {textFieldsValues.map(fieldValue => {
            const labelName = resolveDisplay(fieldValue.name, i18n._language)
            return (
              <Row gutter={[10, 10]}>
                <Col>
                  <Form.Item>
                    {getFieldDecorator(
                      `${fieldValue.type}.${fieldValue.value}`,
                      { rules: [{ required: false }] }
                    )(
                      <ReproductiveHistoryOfMaleField
                        type={fieldValue.type}
                        fieldName={labelName ? labelName : fieldValue.name}
                        valueSet={fieldValue.valueSet}
                        language={i18n._language}
                        i18n={i18n}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            )
          })}
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

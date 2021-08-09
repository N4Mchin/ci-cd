import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

const AllergicIntoleranceField = props => {
  const { valueSet, language } = props

  const onSelectChange = selcetValue => {
    const allergicValues = []

    Object.values(valueSet).forEach(allergicIntoleranceValue => {
      if (
        selcetValue.includes(
          allergicIntoleranceValue.designation.find(
            v => v.language === language
          ).value
        )
      ) {
        allergicValues.push(allergicIntoleranceValue)
      }
    })

    props.onChange(allergicValues)
  }
  return (
    <Select
      allowClear
      showSearch
      mode="multiple"
      style={{ width: '80%' }}
      onChange={onSelectChange}
    >
      {valueSet &&
        Object.values(valueSet).map(allergicIntoleranceName => {
          const optionValue = resolveDisplay(allergicIntoleranceName, language)
          return (
            <Option key={allergicIntoleranceName.display} value={optionValue}>
              {optionValue}
            </Option>
          )
        })}
    </Select>
  )
}

const FormSection = props => {
  const { app, form, i18n } = props
  const { getFieldDecorator } = form

  const { AllergyIntolerance } = app.FHIR_CODES.AnamnesisVitae.include

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)
  const [requiredStatus, setRequiredStatus] = useState(true)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/allergicIntoleranceAdd',
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
      .catch(erroInfo => console.log(erroInfo))
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }

  const onActiveChange = value => {
    setActiveKey(value)
  }

  const onFormChange = event => {
    event.target.value ? setRequiredStatus(false) : setRequiredStatus(true)
  }

  /* #region  constant title and labels */
  const title = <Trans strong id="Allergy questionnaire" />

  const allergicIntoleranceLabel = (
    <span>
      <Trans id="Allergic medication, substance and food:" />
    </span>
  )

  const allergicIntoleranceLabelMaterial = (
    <span>
      <Trans id="If your allergic medication, substance and food is absence in the list. Please write here." />
    </span>
  )
  /* #endregion */

  return (
    <div>
      <Form
        colon={false}
        layout="veritcal"
        labelAlign="left"
        onChange={onFormChange}
      >
        <ActiveCollapse
          displayName={title}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          <Form.Item label={allergicIntoleranceLabel} {...formItemLayout}>
            {getFieldDecorator('allergy', {
              rules: [
                {
                  required: requiredStatus,
                  message: i18n.t`Please select allergy`,
                },
              ],
            })(
              <AllergicIntoleranceField
                language={i18n._language}
                valueSet={AllergyIntolerance}
              />
            )}
          </Form.Item>

          <br />

          <Form.Item
            label={allergicIntoleranceLabelMaterial}
            {...formItemLayout}
          >
            {getFieldDecorator('allergyNote', {
              rules: [{ required: false }],
            })(<TextArea rows={4} style={{ width: '80%' }} />)}
          </Form.Item>

          <Row
            gutter={8}
            type="flex"
            justify="end"
            style={{ marginTop: '10px' }}
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

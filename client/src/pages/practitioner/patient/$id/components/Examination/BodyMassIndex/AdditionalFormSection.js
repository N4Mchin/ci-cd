import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Divider, Button, Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse, FloatNumber } from 'components'
import { calculateBodyMassIndex } from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

const AdditionalFormSection = props => {
  const { app, form, i18n } = props
  const { getFieldDecorator } = form
  const { BodyMassIndex } = app.FHIR_CODES.PhysicalExaminationComplete.include
  const { BodyWeight, BodyHeight } = BodyMassIndex.include

  const [heightValue, setHeight] = useState()
  const [weightValue, setWeight] = useState()
  const [bodyMassIndexValue, setBodyMassIndexValue] = useState()
  const [bodyMassIndexDisplay, setBodyMassIndexDisplay] = useState()
  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    return (
      form
        .validateFields()
        .then(formValues => {
          return props.dispatch({
            type: 'practitioner_patient_profile/dlivrAddHeightWeight',
            payload: {
              formValues: {
                stateName: 'physicalGenerelExamination',
                ...formValues,
                bodyMassIndex: bodyMassIndexValue,
              },
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
    )
  }

  useEffect(() => {
    if (heightValue && weightValue) {
      const { bodyMassIndex, bodyMassIndexDisplay } = calculateBodyMassIndex(
        heightValue,
        weightValue
      )

      setBodyMassIndexValue(bodyMassIndex)
      setBodyMassIndexDisplay(bodyMassIndexDisplay)
    } else {
      setBodyMassIndexValue()
      setBodyMassIndexDisplay()
    }
  }, [heightValue, weightValue])

  const onHeightChange = value => {
    setHeight(value)

    return value
  }

  const onWeightChange = value => {
    setWeight(value)

    return value
  }

  const onActiveChange = value => {
    setActiveKey(value)
  }

  const title = (
    <span className="uppercase title">
      <Trans id="Height/Weight" />
    </span>
  )
  return (
    <div>
      <Form layout="veritcal" labelAlign="right" colon={false}>
        <ActiveCollapse
          bordered={true}
          displayName={title}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          <Form.Item
            {...formItemLayout}
            label={resolveDisplay(BodyHeight, i18n._language)}
          >
            {getFieldDecorator('bodyHeight', {
              rules: [{ required: true }],
              getValueFromEvent: onHeightChange,
            })(
              <FloatNumber
                suffix={resolveDisplay(BodyHeight.unit, i18n._language)}
              />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={resolveDisplay(BodyWeight, i18n._language)}
          >
            {getFieldDecorator('bodyWeight', {
              rules: [{ required: true }],
              getValueFromEvent: onWeightChange,
            })(
              <FloatNumber
                suffix={resolveDisplay(BodyWeight.unit, i18n._language)}
              />
            )}
          </Form.Item>

          {heightValue && weightValue && (
            <Row gutter={12} style={{ marginTop: '8px' }}>
              <Col span={8}>
                <Row type="flex" justify="end">
                  {<Trans id="BodyMassIndex" />}
                </Row>
              </Col>
              <Col span={8}>
                {bodyMassIndexValue}
                <Divider type="veritcal" />
                {bodyMassIndexDisplay}
              </Col>
            </Row>
          )}

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
AdditionalFormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(AdditionalFormSection)))

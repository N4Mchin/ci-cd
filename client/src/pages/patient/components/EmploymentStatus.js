import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './Modal.less'
import { Form, Checkbox, Row, Col, Input, Button, Icon } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const EmploymentStatus = props => {
  const [otherChecked, setOtherChecked] = useState(false)
  const [editMode, setEditMode] = useState(props.editable ? false : true)

  const handleOther = e => {
    setOtherChecked(!otherChecked)

    props.form.setFieldsValue({
      otherStatus: '',
    })

    props.form.validateFields().catch(errorInfo => console.log(errorInfo))
  }

  const onChange = checkedValues => {
    if (checkedValues.length > 1) {
      checkedValues.shift()
    }
  }

  const makeEditable = () => {
    setEditMode(!editMode)
  }
  const { form, i18n } = props
  const { getFieldDecorator } = form

  return (
    <div className={styles.contentForm} style={{ height: '230px' }}>
      <div
        style={{
          zIndex: '2',
          position: 'relative',
          visibility: props.editable ? 'visible' : 'hidden',
        }}
      >
        <Row type="flex" justify="end" style={{ marginTop: '28px' }}>
          {/* <Button className={styles.editButton} onClick={makeEditable}>
            <Icon type="edit" />
          </Button> */}
        </Row>
      </div>
      <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
        <div className={styles.title}>{i18n.t`EmploymentStatus`}</div>
        <Form key="keyEmploymentStatusForm" layout="horizontal">
          <Form.Item hasFeedback={false} {...formItemLayout}>
            {getFieldDecorator('employmentStatus', {
              initialValue: props.initials && [props.initials],
              rules: [{ required: false }],
            })(
              <Checkbox.Group
                style={{ width: '100%', marginTop: '16px' }}
                onChange={onChange}
                disabled={!editMode}
              >
                <Row gutter={[0, 4]}>
                  <Col span={12}>
                    <Checkbox
                      value="Worker"
                      style={{ fontSize: '10px' }}
                    >{i18n.t`Worker`}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="Employee"
                      style={{
                        fontSize: '10px',
                        whiteSpace: 'nowrap',
                      }}
                    >{i18n.t`Employee`}</Checkbox>
                  </Col>
                </Row>
                <Row gutter={[0, 4]}>
                  <Col span={12}>
                    <Checkbox
                      value="Stockman"
                      style={{ fontSize: '10px' }}
                    >{i18n.t`Stockman`}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="Retired"
                      style={{
                        fontSize: '10px',
                        whiteSpace: 'nowrap',
                      }}
                    >{i18n.t`Retired`}</Checkbox>
                  </Col>
                </Row>
                <Row gutter={[0, 4]}>
                  <Col span={12}>
                    <Checkbox
                      value="Unemployed"
                      style={{
                        fontSize: '10px',
                        whiteSpace: 'nowrap',
                      }}
                    >{i18n.t`Unemployed`}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="Student"
                      style={{ fontSize: '10px' }}
                    >{i18n.t`Student`}</Checkbox>
                  </Col>
                </Row>
                <Row gutter={[0, 4]}>
                  <Col span={12}>
                    <Checkbox value="SchoolChild">
                      <span
                        style={{
                          // textOverflow: 'ellipsis',
                          // overflow: 'hidden',
                          // whiteSpace: 'normal',
                          // display: 'table-caption',
                          // width: 'fit-content',
                          // display: 'block',
                          // wordWrap: 'break-word',
                          // width: '110%',
                          // float: 'right',
                          position: 'absolute',
                          fontSize: '10px',
                          lineHeight: '12px',
                        }}
                      >
                        {i18n.t`SchoolChild`}
                      </span>
                    </Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox
                      value="Other"
                      style={{ fontSize: '10px' }}
                      onChange={handleOther}
                    >{i18n.t`Other`}</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item hasFeedback={false} help={false} {...formItemLayout}>
            {getFieldDecorator('otherStatus', {
              rules: [{ required: !otherChecked }],
            })(
              <Input
                className={styles.typeOthers}
                placeholder={i18n.t`TypeOthersHere`}
                disabled={!otherChecked}
              />
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

EmploymentStatus.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ app, laboratory_patientProfile, loading }) => ({
  app,
  laboratory_patientProfile,
  loading,
}))(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(EmploymentStatus)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  let formData = {}
  // empty object if no value checked

  if (Object.keys(allFields).some(key => !!allFields[key].errors)) {
    formData = {
      hasErrors: true,
    }
    return props.onChange(formData)
  }

  if (
    !allFields.employmentStatus.errors &&
    !!allFields.employmentStatus.value &&
    allFields.employmentStatus.value.length > 0
  ) {
    if (allFields.employmentStatus.value[0] === 'Other') {
      if (allFields.otherStatus.value.length > 0) {
        formData = {
          code: props.app.FHIR_CODES.Observations.EmploymentStatus.code,
          valueString: allFields.otherStatus.value,
        }
      }
    } else {
      const empStatCode =
        props.app.FHIR_CODES.Observations.EmploymentStatus.include[
          allFields.employmentStatus.value
        ]
      formData = {
        code: props.app.FHIR_CODES.Observations.EmploymentStatus.code,
        valueCodeableConcept: empStatCode,
      }
    }
  }

  props.onChange(formData)
}

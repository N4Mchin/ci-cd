import React from 'react'
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

class WorkEnvironment extends React.Component {
  state = {
    other: false,
    editMode: this.props.editable ? false : true,
  }

  handleOther = e => {
    this.setState({
      other: !this.state.other,
    })

    this.props.form.setFieldsValue({
      otherStatus: '',
    })

    this.props.form.validateFields().catch(errorInfo => console.log(errorInfo))
  }

  onChange = checkedValues => {
    if (checkedValues.length > 1) {
      checkedValues.shift()
    }
  }

  makeEditable = () => {
    this.setState({
      editMode: !this.state.editMode,
    })
  }

  render() {
    const { form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.contentForm} style={{ height: '230px' }}>
        <div
          style={{
            zIndex: '2',
            position: 'relative',
            visibility: this.props.editable ? 'visible' : 'hidden',
          }}
        >
          <Row type="flex" justify="end">
            <Button className={styles.editButton} onClick={this.makeEditable}>
              <Icon type="edit" />
            </Button>
          </Row>
        </div>
        <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
          <div className={styles.title}>{i18n.t`WorkEnvironment`}</div>
          <Form
            onSubmit={this.handleSubmit}
            key="keyWorkDifficultyForm"
            layout="horizontal"
          >
            <Form.Item hasFeedback={false} {...formItemLayout}>
              {getFieldDecorator('workDifficulty', {
                initialValue: this.props.initials,
                rules: [{ required: false }],
              })(
                <Checkbox.Group
                  style={{ width: '100%', marginTop: '16px' }}
                  onChange={this.onChange}
                  disabled={!this.state.editMode}
                >
                  <Row gutter={[8, 6]}>
                    <Col span={24}>
                      <Checkbox
                        value="LowRisk"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`LowRisk`}</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox
                        value="HighRisk"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`HighRisk`}</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox
                        value="Toxic"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Toxic`}</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox
                        value="Other"
                        style={{ fontSize: '10px' }}
                        onChange={this.handleOther}
                      >{i18n.t`Other`}</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item hasFeedback={false} help={false} {...formItemLayout}>
              {getFieldDecorator('otherStatus', {
                rules: [{ required: !this.state.other }],
                // this.state.other hotsorj baigaa uchir NOT ashiglalaa
              })(
                <Input
                  className={styles.typeOthers}
                  placeholder={i18n.t`TypeOthersThere`}
                  disabled={!this.state.other}
                />
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

WorkEnvironment.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ app, reception, loading }) => ({
  app,
  reception,
  loading,
}))(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(WorkEnvironment)
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
    !allFields.workDifficulty.errors &&
    !!allFields.workDifficulty.value &&
    allFields.workDifficulty.value.length > 0
  ) {
    if (allFields.workDifficulty.value[0] === 'Other') {
      if (
        allFields.otherStatus &&
        allFields.otherStatus.value &&
        allFields.otherStatus.value.length > 0
      ) {
        formData = {
          code: props.app.FHIR_CODES.Observations.WorkEnvironment.code,
          valueString: allFields.otherStatus.value,
        }
      }
    } else {
      const empStatCode =
        props.app.FHIR_CODES.Observations.WorkEnvironment.include[
          allFields.workDifficulty.value[0]
        ]
      formData = {
        code: props.app.FHIR_CODES.Observations.WorkEnvironment.code,
        valueCodeableConcept: empStatCode,
      }
    }
  }

  props.onChange(formData)
}

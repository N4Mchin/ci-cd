import React from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './Modal.less'
import { Form, Checkbox, Row, Col, Button, Icon } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

function onChange(checkedValues) {
  if (checkedValues.length > 1) checkedValues.shift()
}

class MaritalStatus extends React.Component {
  state = {
    editMode: this.props.editable ? false : true, // edit mode starts with false if editable
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
      <div className={styles.contentForm} style={{ height: '160px' }}>
        <div
          style={{
            zIndex: '2',
            position: 'relative',
            visibility: this.props.editable ? 'visible' : 'hidden',
          }}
        >
          <Row type="flex" justify="end" style={{ marginTop: '28px' }}>
            {/* <Button className={styles.editButton} onClick={this.makeEditable}>
              <Icon type="edit" />
            </Button> */}
          </Row>
        </div>
        <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
          <div className={styles.title}>{i18n.t`MaritalStatus`}</div>
          <Form
            onSubmit={this.handleSubmit}
            key="keyMaritalStatusForm"
            layout="horizontal"
          >
            <Form.Item hasFeedback={false} {...formItemLayout}>
              {getFieldDecorator('maritalStatus', {
                initialValue: [this.props.initials],
                rules: [{ required: false }],
              })(
                <Checkbox.Group
                  style={{ width: '100%', marginTop: '36px' }}
                  onChange={onChange}
                  disabled={!this.state.editMode}
                >
                  <Row style={{ whiteSpace: 'nowrap' }} gutter={[8, 6]}>
                    <Col span={13}>
                      <Checkbox
                        value="S"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`NeverMarry`}</Checkbox>
                    </Col>
                    <Col span={11}>
                      <Checkbox
                        value="L"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Separated`}</Checkbox>
                    </Col>
                    <Col span={13}>
                      <Checkbox
                        value="M"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Married`}</Checkbox>
                    </Col>
                    <Col span={11}>
                      <Checkbox
                        value="W"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Widow`}</Checkbox>
                    </Col>
                    <Col span={13}>
                      <Checkbox
                        value="U"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Unmarried`}</Checkbox>
                    </Col>
                    <Col span={11}>
                      <Checkbox
                        value="D"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Divorce`}</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

MaritalStatus.propTypes = {
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
    })(MaritalStatus)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  let formData = {}
  // empty object if no value checked
  const MARITAL_STATUS_VALUESET =
    props.laboratory_patientProfile.Valuesets['marital-status']

  if (
    !allFields.maritalStatus.errors &&
    !!allFields.maritalStatus.value &&
    allFields.maritalStatus.value.length > 0
  ) {
    const code = allFields.maritalStatus.value[0]
    const system = MARITAL_STATUS_VALUESET.compose.include[0].system
    const display = MARITAL_STATUS_VALUESET.compose.include[0].concept.find(
      v => v.code === code
    ).display

    formData = {
      coding: [
        {
          code,
          system,
          display,
        },
      ],
      text: display,
    }
  }

  props.onChange(formData)
}

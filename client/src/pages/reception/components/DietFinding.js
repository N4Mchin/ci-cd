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

class DietFinding extends React.Component {
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
          <Row type="flex" justify="end">
            <Button className={styles.editButton} onClick={this.makeEditable}>
              <Icon type="edit" />
            </Button>
          </Row>
        </div>
        <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
          <div className={styles.title}>{i18n.t`DietFinding`}</div>
          <Form
            onSubmit={this.handleSubmit}
            key="keyDietFindingForm"
            layout="horizontal"
          >
            <Form.Item hasFeedback={false} {...formItemLayout}>
              {getFieldDecorator('dietaryFinding', {
                initialValue: this.props.initials,
                rules: [{ required: false }],
              })(
                <Checkbox.Group
                  style={{ width: '100%', marginTop: '42px' }}
                  onChange={onChange}
                  disabled={!this.state.editMode}
                >
                  <Row gutter={[8, 6]}>
                    <Col span={12}>
                      <Checkbox
                        value="NormalDiet"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`NormalDiet`}</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox
                        value="Vegan"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Vegan`}</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox
                        value="Vegetarian"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Vegetarian`}</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox
                        value="Other"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`Other`}</Checkbox>
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

DietFinding.propTypes = {
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
    })(DietFinding)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  let formData = {}
  // empty object if no value checked

  if (
    !allFields.dietaryFinding.errors &&
    !!allFields.dietaryFinding.value &&
    allFields.dietaryFinding.value.length > 0
  ) {
    formData = {
      code: props.app.FHIR_CODES.Observations.DietaryFinding.code,
      valueCodeableConcept:
        props.app.FHIR_CODES.Observations.DietaryFinding.include[
          allFields.dietaryFinding.value[0]
        ],
    }
  }

  props.onChange(formData)
}

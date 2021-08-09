import React from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import { Form, Checkbox, Row, Col, Button, Icon } from 'antd'
import styles from './Modal.less'
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

class Education extends React.Component {
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
      <div className={styles.contentForm} style={{ height: '170px' }}>
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
          <div className={styles.title}>{i18n.t`Education`}</div>

          <Form
            onSubmit={this.handleSubmit}
            key="keyEducationForm"
            layout="horizontal"
          >
            <Form.Item hasFeedback={false} {...formItemLayout}>
              {getFieldDecorator('education', {
                initialValue: this.props.initials,
                rules: [{ required: false }],
              })(
                <Checkbox.Group
                  style={{ width: '100%', marginTop: '38px' }}
                  onChange={onChange}
                  disabled={!this.state.editMode}
                >
                  <Row gutter={[0, 4]}>
                    <Col span={10}>
                      <Checkbox
                        value="NoFormalEducation"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`NoFormalEducation`}</Checkbox>
                    </Col>
                    <Col span={14}>
                      <Checkbox
                        value="EducatedToHighSchoolLevel"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`EducatedToHighSchoolLevel`}</Checkbox>
                    </Col>
                  </Row>
                  <Row gutter={[0, 4]}>
                    <Col span={10}>
                      <Checkbox
                        value="ReceivedElementarySchoolEducation"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`ReceivedElementarySchoolEducation`}</Checkbox>
                    </Col>
                    <Col span={14}>
                      <Checkbox
                        value="ReceivedEducationAtTechnicalCollege"
                        style={{
                          fontSize: '10px',
                          // overflow: 'hidden',
                          // whiteSpace: 'nowrap',
                        }}
                      >{i18n.t`ReceivedEducationAtTechnicalCollege`}</Checkbox>
                    </Col>
                  </Row>
                  <Row gutter={[0, 4]}>
                    <Col span={10}>
                      <Checkbox
                        value="EducatedToSecondarySchoolLevel"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`EducatedToSecondarySchoolLevel`}</Checkbox>
                    </Col>
                    <Col span={14}>
                      <Checkbox
                        value="ReceivedGraduateEducation"
                        style={{ fontSize: '10px' }}
                      >{i18n.t`ReceivedGraduateEducation`}</Checkbox>
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

Education.propTypes = {
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
    })(Education)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  let formData = {}
  // empty object if no value checked

  if (
    !allFields.education.errors &&
    !!allFields.education.value &&
    allFields.education.value.length > 0
  ) {
    if (allFields.education.value[0] === 'Other') {
      if (allFields.otherStatus.value.length > 0) {
        formData = {
          code: props.app.FHIR_CODES.Observations.HighestLevelOfEducation.code,
          valueString: allFields.otherStatus.value,
        }
      }
    } else {
      const educationCode =
        props.app.FHIR_CODES.Observations.HighestLevelOfEducation.include[
          allFields.education.value
        ]
      formData = {
        code: props.app.FHIR_CODES.Observations.HighestLevelOfEducation.code,
        valueCodeableConcept: educationCode,
      }
    }
  }

  props.onChange(formData)
}

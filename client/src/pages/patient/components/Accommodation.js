import React from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import { loadValuesets, resolveDesignation } from 'utils/valuesets'
import styles from './Modal.less'
import { Form, Checkbox, Row, Button, Icon } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

// Check listiin songoson utgiig zuvhun neg bailgahiin tuld FIFO baihaar gargana.
function onChange(checkedValues) {
  if (checkedValues.length > 1) checkedValues.shift()
}

function drawCheckboxList(valuesetConcepts = []) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {valuesetConcepts.map(value => (
        <div style={{ width: '50%' }}>
          <Checkbox value={value.code} style={{ fontSize: '10px' }}>
            {value.display}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}

class HomeStatus extends React.Component {
  state = {
    ACCOMMODATION_DESIGNATION: {
      concept: [],
    },
    editMode: this.props.editable ? false : true,
  }

  componentDidMount() {
    const { i18n } = this.props
    const { FHIR_CODES } = this.props.app
    try {
      const [ACCOMMODATION_VALUESET] = loadValuesets(
        ['accommodation-values'],
        this.props.laboratory_patientProfile.valuesets
      )
      const ACCOMMODATION_DESIGNATION = resolveDesignation(
        ACCOMMODATION_VALUESET,
        i18n._language
      )

      this.setState({
        system: ACCOMMODATION_DESIGNATION.system,
        ACCOMMODATION_VALUESET: ACCOMMODATION_VALUESET,
        ACCOMMODATION_DESIGNATION: ACCOMMODATION_DESIGNATION,
        FHIR_CODES: FHIR_CODES,
      })
    } catch {}
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
          <div className={styles.title}>{i18n.t`Accommodation`}</div>
          <Form
            onSubmit={this.handleSubmit}
            key="keyHomeStatusForm"
            layout="horizontal"
          >
            <Form.Item hasFeedback={false} {...formItemLayout}>
              {getFieldDecorator('homeStatus', {
                initialValue: this.props.initials,
                rules: [{ required: false }],
              })(
                <Checkbox.Group
                  style={{ width: '100%', marginTop: '42px' }}
                  onChange={onChange}
                  disabled={!this.state.editMode}
                >
                  {drawCheckboxList(
                    this.state.ACCOMMODATION_DESIGNATION.concept
                  )}
                </Checkbox.Group>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

HomeStatus.propTypes = {
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
    })(HomeStatus)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const ACCOMMODATION_VALUESET =
    props.laboratory_patientProfile.Valuesets['accommodation-values']

  let formData = {}
  // empty object if no value checked

  if (
    !allFields.homeStatus.errors &&
    !!allFields.homeStatus.value &&
    allFields.homeStatus.value.length > 0
  ) {
    const code = allFields.homeStatus.value[0]
    const system = ACCOMMODATION_VALUESET.compose.include[0].system
    const display = ACCOMMODATION_VALUESET.compose.include[0].concept.find(
      v => v.code === code
    ).display

    formData = {
      code: props.app.FHIR_CODES.Observations.Accommodation.code,
      valueCodeableConcept: {
        coding: [
          {
            system: system,
            code: code,
            display: display,
          },
        ],
        text: display,
      },
    }
  }

  props.onChange(formData)
}

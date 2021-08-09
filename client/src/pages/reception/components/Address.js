import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { loadValuesets } from 'utils/valuesets'
import styles from './Modal.less'
import { Form, Input, Row, Col, Cascader, Button, Icon } from 'antd'

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

function filter(inputValue, path) {
  return path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  )
}

class Address extends React.Component {
  state = {
    AddressValues: [],
    ADDRESS_VALUESET: {},
    editMode: this.props.editable ? false : true,
  }

  componentDidMount() {
    try {
      const [ADDRESS_VALUESET] = loadValuesets(
        ['address-values-mn'],
        this.props.reception.valuesets
      )

      this.setState({
        ADDRESS_VALUESET: ADDRESS_VALUESET,
      })
    } catch {}
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = this.props
        onOk(values)
      }
    })
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
      <div className={styles.contentForm} style={{ height: '250px' }}>
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
          <Form
            onSubmit={this.handleSubmit}
            key="keyAddressForm"
            layout="horizontal"
          >
            <Row gutter={[0, 8]}>
              <Col span={24}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`Address`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('city', {
                    initialValue:
                      this.props.initials &&
                      this.props.initials.home &&
                      this.props.initials.home.city,
                    rules: [{ required: false }],
                  })(
                    <Cascader
                      options={
                        this.state.ADDRESS_VALUESET &&
                        this.state.ADDRESS_VALUESET.compose
                      }
                      placeholder={i18n.t`Please select address`}
                      showSearch={{ filter }}
                      disabled={!this.state.editMode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`AddressLine`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('addressFull', {
                    initialValue:
                      this.props.initials &&
                      this.props.initials.home &&
                      this.props.initials.home.line,
                    rules: [{ required: false }],
                  })(<Input disabled={!this.state.editMode} />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`OtherAddress`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('otherAddress', {
                    initialValue:
                      this.props.initials &&
                      this.props.initials.work &&
                      this.props.initials.work.text,
                    rules: [{ required: false }],
                  })(<Input disabled={!this.state.editMode} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

Address.propTypes = {
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
    })(Address)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const homeAddress = {
    use: 'home',
    type: 'physical',
    country: 'Mongolia',
  }
  const workAddress = {
    use: 'work',
    country: 'Mongolia',
  }
  if (!allFields.addressFull.errors && !!allFields.addressFull.value) {
    homeAddress.line = allFields.addressFull.value
  }
  if (
    !allFields.city.errors &&
    !!allFields.city.value &&
    allFields.city.value.length > 0
  ) {
    let [_state, _district, _subdistrict] = allFields.city.value

    homeAddress.state = _state
    homeAddress.district = _district
    homeAddress.extension = {
      ...props.app.FHIR_CODES.Extensions.Subdistrict,
      valueString: _subdistrict,
    }
  }
  if (
    (!allFields.addressFull.errors && !!allFields.addressFull.value) ||
    (!allFields.city.errors &&
      !!allFields.city.value &&
      allFields.city.value.length > 0)
  ) {
    const address = []
    if (!!allFields.city.value) {
      address.push(allFields.city.value.join(' '))
    }

    if (
      !allFields.addressFull.errors &&
      !!allFields.addressFull.value &&
      allFields.addressFull.value !== ''
    ) {
      address.push(allFields.addressFull.value)
    }

    homeAddress.text = address.filter(val => !!val).join(' ')
  }

  if (
    !allFields.city.errors &&
    !!allFields.city.value &&
    allFields.city.value.length > 0
  ) {
    let [_state, _district, _subdistrict] = allFields.city.value
    homeAddress.state = _state
    homeAddress.district = _district
    homeAddress.extension = {
      ...props.app.FHIR_CODES.Extensions.Subdistrict,
      valueString: _subdistrict,
    }
  }

  if (
    !allFields.otherAddress.errors &&
    !!allFields.otherAddress.value &&
    allFields.otherAddress.value !== ''
  ) {
    workAddress.text = allFields.otherAddress.value
  }

  const formData = {}

  if (
    homeAddress.line ||
    (homeAddress.state && homeAddress.district && homeAddress.extension)
  ) {
    Object.assign(formData, {
      homeAddress,
    })
  }

  if (workAddress.text) {
    Object.assign(formData, {
      workAddress,
    })
  }

  props.onChange(formData)
}

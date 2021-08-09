import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Checkbox, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'

@withI18n()
class MultipleBirth extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      multipleBirthBoolean: false,
      multipleBirthInput: '',
      disableCheckbox: false,
      disableInput: false,
    }

    this.valueMultipleBirthBooleanChange = this.valueMultipleBirthBooleanChange.bind(
      this
    )
    this.valueMultipleBirthInputChange = this.valueMultipleBirthInputChange.bind(
      this
    )
  }

  valueMultipleBirthBooleanChange() {
    const value = this.state.multipleBirthBoolean
    const newValue = !value
    let multipleBirthInput = this.state.multipleBirthInput
    let disableInput = false

    if (newValue) {
      // isTrue
      disableInput = true
      multipleBirthInput = ''
    }

    this.setState({
      multipleBirthBoolean: newValue,
      disableInput,
      multipleBirthInput,
    })

    // return undefined if multipleBirthBoolean === false
    this.props.onChange({
      multipleBirthBoolean: newValue ? true : undefined,
    })
  }

  valueMultipleBirthInputChange(event) {
    const value = event.target.value
    let disableCheckbox = false
    let multipleBirthBoolean = this.state.multipleBirthBoolean

    if (!this.isNumber(value) && value !== '') {
      return
    }

    if (value !== '') {
      disableCheckbox = true
      multipleBirthBoolean = false
    }

    this.setState({
      multipleBirthInput: value,
      disableCheckbox,
      multipleBirthBoolean,
    })

    // return undefined if there is no value
    this.props.onChange({
      multipleBirthInteger: value !== '' ? parseInt(value) : undefined,
    })
  }

  isNumber = value => {
    const reg = /^\d+$/
    return reg.test(value) ? true : false
  }

  render() {
    const { i18n } = this.props

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="usergroup-add" /> {i18n.t`MultipleBirth`}
        </div>
        <div className={styles.cont}>
          <Row>
            <Col span={12}>
              <Checkbox
                disabled={this.state.disableCheckbox}
                checked={this.state.multipleBirthBoolean}
                onChange={this.valueMultipleBirthBooleanChange}
              >
                {i18n.t`MultipleBirthBoolean`}
              </Checkbox>
            </Col>
            <Col span={12}>
              <Input
                disabled={this.state.disableInput}
                placeholder={i18n.t`MultipleBirthNumber`}
                value={this.state.multipleBirthInput}
                min={2}
                onChange={event => this.valueMultipleBirthInputChange(event)}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

MultipleBirth.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default MultipleBirth

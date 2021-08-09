import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Row, Col, Checkbox } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import styles from '../styles.less'
import { DateInput } from 'components'

@withI18n()
class Deceased extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      deceasedBoolean: false,
      deceasedDateInput: '',
      disableCheckbox: false,
      disableDateInput: false,
    }

    this.valueDeceasedBooleanChange = this.valueDeceasedBooleanChange.bind(this)
    this.valueDateInputChange = this.valueDateInputChange.bind(this)
  }

  valueDeceasedBooleanChange() {
    const value = this.state.deceasedBoolean
    const newValue = !value
    let deceasedDateInput = this.state.deceasedDateInput
    let disableDateInput = false

    if (newValue) {
      // isTrue
      disableDateInput = true
      deceasedDateInput = ''
    }

    this.setState({
      deceasedBoolean: newValue,
      disableDateInput,
      deceasedDateInput,
    })

    // return undefined if deceasedBoolean === false
    this.props.onChange({
      deceasedBoolean: newValue ? true : undefined,
    })
  }

  valueDateInputChange(value) {
    let disableCheckbox = false
    let deceasedBoolean = this.state.deceasedBoolean

    if (value !== '') {
      disableCheckbox = true
      deceasedBoolean = false
    }

    this.setState({
      deceasedDateInput: value,
      disableCheckbox,
      deceasedBoolean,
    })

    // return undefined if there is no value
    this.props.onChange({
      deceasedDateTime: value !== '' ? value : undefined,
    })
  }

  render() {
    const { i18n } = this.props

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="user-delete" /> <Trans id="Deceased" />
        </div>
        <div className={styles.cont}>
          <Row>
            <Col span={12}>
              <Checkbox
                disabled={this.state.disableCheckbox}
                checked={this.state.deceasedBoolean}
                onChange={this.valueDeceasedBooleanChange}
              >
                <Trans id="Deceased" />
              </Checkbox>
            </Col>
            <Col span={12}>
              <DateInput
                disabled={this.state.disableDateInput}
                placeholder={i18n.t`DeceasedDateTime`}
                value={this.state.deceasedDateInput}
                onChange={this.valueDateInputChange}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

Deceased.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default Deceased

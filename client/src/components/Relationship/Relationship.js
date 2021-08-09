import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { RelationshipList } from '../const'
const { Option } = Select

@withI18n()
class Relationship extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
    this.valueChange = this.valueChange.bind(this)
  }

  valueChange(value) {
    let newValue = {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
          code: value,
        },
      ],
    }

    this.props.onChange(newValue)
  }

  render() {
    const { value, disabled, i18n, ...others } = this.props

    return (
      <Select
        style={{ width: '100%' }}
        placeholder="Relationship"
        onChange={this.valueChange()}
      >
        {RelationshipList.map(v => (
          <Option key={v.label} value={v.label}>
            {v.value}
          </Option>
        ))}
      </Select>
    )
  }
}

Relationship.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
}

export default Relationship

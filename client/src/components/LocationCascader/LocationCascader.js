import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'
import { Cascader } from 'antd'
import { LocationCascaderOptions } from '../const'

function filter(inputValue, path) {
  return path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  )
}

@withI18n()
class LocationCascader extends PureComponent {
  constructor(props) {
    super(props)

    const defaultValue = props.value && [
      props.value.country,
      props.value.state,
      props.value.district,
    ]

    this.state = {
      defaultValue,
    }

    this.valueChange = this.valueChange.bind(this)
  }

  valueChange(value) {
    this.props.onChange({
      country: value['0'],
      state: value['1'],
      district: value['2'],
    })
  }

  render() {
    const { i18n } = this.props

    return (
      <Cascader
        options={LocationCascaderOptions}
        defaultValue={this.state.defaultValue}
        placeholder={i18n.t`WarningSelectAddressCountryStateDistrict`}
        showSearch={{ filter }}
        onChange={this.valueChange}
      />
    )
  }
}

LocationCascader.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
}

export default LocationCascader

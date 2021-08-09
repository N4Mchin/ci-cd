import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import styles from '../styles.less'
import { ValuesetMaritalStatus } from '../const'

const { Option } = Select

@withI18n()
class MaritalStatus extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      maritalStatus: null,
    }

    this.valueMaritalStatusChange = this.valueMaritalStatusChange.bind(this)
  }

  valueMaritalStatusChange(value) {
    let output = {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
          code: value,
        },
      ],
    }

    this.props.onChange(output)
  }

  render() {
    const { value, disabled, i18n, ...others } = this.props

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="heart" /> {i18n.t`MaritalStatus`}
        </div>

        <div className={styles.cont}>
          <Select
            style={{
              width: '100%',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onChange={this.valueMaritalStatusChange}
            placeholder={i18n.t`MaritalStatus`}
            value={
              value &&
              value.coding &&
              value.coding['0'] &&
              value.coding['0'].code
            }
          >
            {ValuesetMaritalStatus.map(v => (
              <Option key={`keyMaritalStatus.${v.code}`} value={v.code}>
                <Trans id={v.display} />
              </Option>
            ))}
          </Select>
        </div>
      </div>
    )
  }
}

MaritalStatus.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default MaritalStatus

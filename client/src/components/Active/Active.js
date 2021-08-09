import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Radio, Group } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import styles from '../styles.less'
import { i18n } from '@lingui/core'

@withI18n()
class Active extends PureComponent {
  valueChange = e => {
    const value = e.target.value
    this.props.onChange(value)
  }

  render() {
    const { i18n } = this.props

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="check-circle" /> {i18n.t`ActiveStatus`}
        </div>

        <div className={styles.cont} style={{ marginLeft: '4px' }}>
          <Radio.Group onChange={this.valueChange} value={this.props.value}>
            <Radio value={true}>{i18n.t`Active`}</Radio>
            <Radio value={false}>{i18n.t`Inactive`}</Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

Active.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Active

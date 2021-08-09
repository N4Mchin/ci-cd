import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import { i18n } from '@lingui/core'

@withI18n()
class UsageItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { image, count, title } = this.props
    return (
      <div
        style={{
          textAlign: 'center',
          lineHeight: '1',
          width: '75px',
          display: 'inline-block',
          border: 'solid 0px #cccccc',
          margin: '0 4px',
        }}
      >
        <div
          style={{
            border: 'solid 1px #cccccc',
            height: '20px',
            width: '26px',
            margin: 'auto',
            borderRadius: '3px',
            padding: '3px 0',
            marginBottom: '8px',
          }}
        >
          {count}
        </div>
        <Icon
          type={image}
          style={{ fontSize: '36px', color: '#cccccc', marginBottom: '8px' }}
        />
        <div style={{ fontSize: '9px' }}>{title}</div>
      </div>
    )
  }
}

UsageItem.propTypes = {
  image: PropTypes.string,
}

export default UsageItem

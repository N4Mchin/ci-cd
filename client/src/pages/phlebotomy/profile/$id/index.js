import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import { AccountSettings } from './components'
import styles from './index.less'

const { Text } = Typography

function Title() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Account </Text>
        <Text>Settings</Text>
      </Trans>
      <div style={{ height: '1px', background: '#E5E5E9' }} />
    </div>
  )
}

const PhlebotomyProfile = props => {
  return (
    <Board inner>
      <Title />

      <AccountSettings />
    </Board>
  )
}

PhlebotomyProfile.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy, loading }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(PhlebotomyProfile))

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import { AccountSettings } from './components'
import styles from './index.less'

const { Text } = Typography

function ProfilePageTitle() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Profile </Text>
      </Trans>
    </div>
  )
}

@withI18n()
@connect(({ labTechnicianProfile, loading }) => ({
  labTechnicianProfile,
  loading,
}))
class LaboratoryTechnician extends PureComponent {
  render() {
    return (
      <Board inner>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{ProfilePageTitle()}</div>
        </div>

        <AccountSettings />
      </Board>
    )
  }
}

LaboratoryTechnician.propTypes = {
  labTechnicianProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default LaboratoryTechnician

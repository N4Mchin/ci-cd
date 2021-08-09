import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Board } from 'components'

import DailyLogHCV from './DailyLogHCV'
import DailyLogHDV from './DailyLogHDV'
import DailyLogHBV from './DailyLogHBV'
import DailyLogHIV from './DailyLogHIV'
import DailyLogHPV from './DailyLogHPV'

const DailyLog = props => {
  const storedTestType = window.localStorage.getItem('selectedViralLoadTest')
  let testType = storedTestType && storedTestType

  return (
    <Board inner>
      <div style={{ textTransform: 'uppercase' }}></div>
      {testType === 'HCV_RNA' && <DailyLogHCV testName="viralLoadTests_HCV" />}
      {testType === 'HBV_DNA' && <DailyLogHBV testName="viralLoadTests_HBV" />}
      {testType === 'HDV_RNA' && <DailyLogHDV testName="viralLoadTests_HDV" />}
      {testType === 'HIV_RNA' && <DailyLogHIV />}
      {testType === 'HPV' && <DailyLogHPV />}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_viralLoadTests, loading }) => ({
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(DailyLog))

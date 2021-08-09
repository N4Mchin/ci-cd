import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import { withI18n, Trans } from '@lingui/react'
import styles from '../styles.less'
import ProtocolAgilent from './ProtocolAgilent'
import ProtocolBiorad from './ProtocolBiorad'
import ProtocolAbbott from './ProtocolAbbott'

import { Button, Form } from 'antd'

const DailyLogHDV = props => {
  const [clickedButton, setClickedButton] = useState()

  const onClick = buttonName => {
    setClickedButton(buttonName)
  }

  return (
    <div>
      <Button
        onClick={() => onClick('agilent')}
        className={styles.hdvProtocolButton}
        style={{
          backgroundColor: `${clickedButton === 'agilent' ? '#004d40' : ''}`,
          color: `${clickedButton === 'agilent' ? 'white' : ''}`,
        }}
      >
        <Trans>Stratagene Agilent Mx3005p</Trans>
      </Button>
      <Button
        onClick={() => onClick('biorad')}
        className={styles.hdvProtocolButton}
        style={{
          backgroundColor: `${clickedButton === 'biorad' ? '#004d40' : ''}`,
          color: `${clickedButton === 'biorad' ? 'white' : ''}`,
        }}
      >
        <Trans>Biorad CFX-96 Dx</Trans>
      </Button>
      <Button
        onClick={() => onClick('abbott')}
        className={styles.hdvProtocolButton}
        style={{
          backgroundColor: `${clickedButton === 'abbott' ? '#004d40' : ''}`,
          color: `${clickedButton === 'abbott' ? 'white' : ''}`,
        }}
      >
        <Trans> Abbott M2000</Trans>
      </Button>

      {clickedButton === 'agilent' && (
        <ProtocolAgilent testName="viralLoadTests_HDV" />
      )}
      {clickedButton === 'biorad' && (
        <ProtocolBiorad testName="viralLoadTests_HDV" />
      )}

      {clickedButton === 'abbott' && (
        <ProtocolAbbott testName="viralLoadTests_HDV" />
      )}
    </div>
  )
}
DailyLogHDV.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(
  ({ app, laboratory_test_viralLoadTests, loading, dispatch }) => ({
    laboratory_test_viralLoadTests,
    loading,
    dispatch,
    app,
  })
)(withI18n()(Form.create()(DailyLogHDV)))

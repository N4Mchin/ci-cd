import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import Protocol from './Protocol'
import ReagentConsumption from './ReagentConsumption'
import Analyzator from './Analyzator'
import TestProtocolsButton from '../../../components/TestProtocolsButton'

const DailyLog = () => {
  const [clickedButton, setClickedButton] = useState(false)
  const onClick = buttonName => {
    setClickedButton(buttonName)
  }

  return (
    <Board inner>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div
          style={{
            textTransform: 'uppercase',
            width: '100%',
            paddingRight: '5px',
          }}
        >
          <Trans>DailyLog</Trans>
          <div style={{ height: '1px', background: '#E5E5E9' }} />
        </div>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', width: '100%' }}>
        <TestProtocolsButton
          onClick={() => onClick('protocol')}
          buttonName="Protocol"
        />
        <TestProtocolsButton
          onClick={() => onClick('analyzator')}
          buttonName="Analyzator"
        />
      </div>

      {clickedButton === 'protocol' && <Protocol testName="Biochemistry" />}

      {clickedButton === 'reagentConsumption' && (
        <ReagentConsumption testName="Biochemistry" />
      )}

      {clickedButton === 'analyzator' && <Analyzator testName="Biochemistry" />}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_biochemistryTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_biochemistryTests, loading }) => ({
  laboratory_test_biochemistryTests,
  loading,
}))(withI18n()(DailyLog))

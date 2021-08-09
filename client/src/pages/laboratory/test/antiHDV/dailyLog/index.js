import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import Protocol from './Protocol'
import LabTestsReagentConsumption from '../../components/LabTestsReagentConsumption'
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
      <div style={{ marginTop: '20px' }}>
        <TestProtocolsButton
          onClick={() => onClick('protocol')}
          buttonName="Protocol"
        />

        <TestProtocolsButton
          onClick={() => onClick('reagentConsumption')}
          buttonName="Reagent Consumption"
        />
      </div>

      {clickedButton === 'protocol' && <Protocol testName="Anti_HDV" />}

      {clickedButton === 'reagentConsumption' && (
        <LabTestsReagentConsumption testName="Anti_HDV" />
      )}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_antiHDV: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_antiHDV, loading }) => ({
  laboratory_test_antiHDV,
  loading,
}))(withI18n()(DailyLog))

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import Protocol from './Protocol'
import Analyzator from './Analyzator'
import LabTestsReagentConsumption from '../../components/LabTestsReagentConsumption'
import TestLog from './TestLog'
import TestProtocolsButton from '../../../components/TestProtocolsButton'

const DailyLog = props => {
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
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          width: '100%',
        }}
      >
        <TestProtocolsButton
          buttonName="Protocol"
          onClick={() => onClick('protocol')}
        />

        <TestProtocolsButton
          buttonName="Immunology Test Log"
          onClick={() => onClick('testLog')}
        />

        <TestProtocolsButton
          buttonName="Reagent Consumption"
          onClick={() => onClick('reagentConsumption')}
        />

        <TestProtocolsButton
          buttonName="Analyzator"
          onClick={() => onClick('analyzator')}
        />
      </div>

      {clickedButton === 'protocol' && <Protocol testName="Immunology" />}

      {clickedButton === 'testLog' && <TestLog testName="Immunology" />}

      {clickedButton === 'reagentConsumption' && (
        <LabTestsReagentConsumption testName="ImmunologyTests" />
      )}

      {clickedButton === 'analyzator' && <Analyzator testName="Immunology" />}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_immunologyTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_immunologyTests, loading }) => ({
  laboratory_test_immunologyTests,
  loading,
}))(withI18n()(DailyLog))

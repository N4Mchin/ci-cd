import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import style from '../styles.less'
import Protocol from './Protocol'
import CoagulationTestLog from './CoagulationTestLog'
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

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {' '}
        <TestProtocolsButton
          buttonName="Protocol"
          onClick={() => onClick('protocol')}
        />
        <TestProtocolsButton
          buttonName="Blood Coagulation Registrations Test"
          onClick={() => onClick('coagulationTestLog')}
        />
        <TestProtocolsButton
          buttonName="Reagent Consumption"
          onClick={() => onClick('reagentConsumption')}
        />
      </div>

      {clickedButton === 'protocol' && <Protocol testName="Coagulation" />}

      {clickedButton === 'coagulationTestLog' && (
        <CoagulationTestLog testName="Coagultaion" />
      )}

      {clickedButton === 'reagentConsumption' && (
        <LabTestsReagentConsumption testName="Coagulation" />
      )}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_coagulation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_coagulation, loading }) => ({
  laboratory_test_coagulation,
  loading,
}))(withI18n()(DailyLog))

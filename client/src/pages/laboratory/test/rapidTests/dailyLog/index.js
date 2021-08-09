import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import RapidTestProtocol from './RapidTestProtocol'
import RapidTestLog from './RapidTestLog'
import ConfirmationTestProtocol from './ConfirmationTestProtocol'
import LabTestsReagentConsumption from '../../components/LabTestsReagentConsumption'
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
          justifyContent: 'flex-start',
        }}
      >
        <TestProtocolsButton
          buttonName="Protocol"
          onClick={() => onClick('rapidTestProtocol')}
        />

        <TestProtocolsButton
          buttonName="Rapid Test Log"
          onClick={() => onClick('rapidTestLog')}
        />

        <TestProtocolsButton
          buttonName="Confirmation Test Protocol"
          onClick={() => onClick('confirmationTestProtocol')}
        />

        <TestProtocolsButton
          buttonName="Reagent Consumption"
          onClick={() => onClick('reagentConsumption')}
        />
      </div>

      {clickedButton === 'rapidTestProtocol' && (
        <RapidTestProtocol testName="RapidTests" />
      )}
      {clickedButton === 'rapidTestLog' && (
        <RapidTestLog testName="RapidTests" />
      )}
      {clickedButton === 'confirmationTestProtocol' && (
        <ConfirmationTestProtocol testName="RapidTests" />
      )}

      {clickedButton === 'reagentConsumption' && (
        <LabTestsReagentConsumption testName="RapidTests" />
      )}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_rapidTests, loading }) => ({
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(DailyLog))

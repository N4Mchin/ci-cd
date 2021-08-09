import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import Protocol from './Protocol'
import Analyzator from './Analyzator'
import Monitor from './Monitor'

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
        }}
      >
        <TestProtocolsButton
          buttonName="Protocol"
          onClick={() => onClick('protocol')}
        />

        <TestProtocolsButton
          buttonName="Reagent Consumption"
          onClick={() => onClick('reagentConsumption')}
        />

        <TestProtocolsButton
          buttonName="Analyzator"
          onClick={() => onClick('analyzator')}
        />

        <TestProtocolsButton
          buttonName="Monitor"
          onClick={() => onClick('monitor')}
        />
      </div>

      {clickedButton === 'protocol' && <Protocol testName="Hematology" />}

      {clickedButton === 'reagentConsumption' && (
        <LabTestsReagentConsumption testName="Hematology" />
      )}

      {clickedButton === 'analyzator' && <Analyzator testName="Hematology" />}

      {clickedButton === 'monitor' && <Monitor testName="Hematology" />}
    </Board>
  )
}

DailyLog.propTypes = {
  laboratory_test_hematology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_hematology, loading }) => ({
  laboratory_test_hematology,
  loading,
}))(withI18n()(DailyLog))

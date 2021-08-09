import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'

import { Board } from 'components'
import OtherSampleRegistryForm from './OtherSampleRegistryForm'
import OtherSampleRegistryTable from './OtherSampleRegistryTable'
import ModalSampleLogProtocol from './ModalSampleLogProtocol'

const OtherSamplesRegistry = ({
  laboratory_otherSamplesRegistry,
  dispatch,
  location,
}) => {
  const [modalSampleLogProtocolVisible, showModalSampleLogProtocol] = useState(
    false
  )

  const onPrint = () => {
    showModalSampleLogProtocol(true)
  }

  return (
    <Board inner>
      <OtherSampleRegistryForm />
      <OtherSampleRegistryTable onSubmit={onPrint} />

      <ModalSampleLogProtocol
        visible={modalSampleLogProtocolVisible}
        onCancel={() => showModalSampleLogProtocol(false)}
        onSubmit={onPrint}
      />
    </Board>
  )
}

OtherSamplesRegistry.propTypes = {
  laboratory_otherSamplesRegistry: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_otherSamplesRegistry, loading }) => ({
  laboratory_otherSamplesRegistry,
  loading,
}))(withI18n()(OtherSamplesRegistry))

// modified:Sanjaasuren.E
// 2020-04-01

import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Form, Modal } from 'antd'
import LabTestsReagentConsumption from '../../components/LabTestsReagentConsumption'

const ModalHCVReagentConsumption = props => {
  return (
    <div>
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        width="70%"
        footer={[]}
      >
        <LabTestsReagentConsumption testName="ViralLoadTests" />
      </Modal>
    </div>
  )
}

ModalHCVReagentConsumption.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test, loading }) => ({
  app,
  laboratory_test,
  loading,
}))(withI18n()(Form.create()(ModalHCVReagentConsumption)))

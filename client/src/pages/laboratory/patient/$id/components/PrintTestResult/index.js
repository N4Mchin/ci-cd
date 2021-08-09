import React, { useRef } from 'react'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import { Drawer, Row, Col, Button, Form } from 'antd'
import ReactToPrint from 'react-to-print'
//import TestResultWrapper from './TestResultWrapper'
import { LabReport } from 'components'
const PrintTestResult = props => {
  const componentRef = useRef()

  return (
    <Drawer
      title={<Trans id="Print Test Result" />}
      width="900px"
      onClose={props.onClose}
      visible={props.visible}
      // bodyStyle={{ padding: 80 }}
      maskClosable={true}
      closable={false}
    >
      <LabReport
        {...props.data}
        patient={props.laboratory_patientProfile.patient}
        practitioner={props.app.practitioner}
        ref={componentRef}
      />
    </Drawer>
  )
}

export default connect(({ app, laboratory_patientProfile, loading }) => ({
  app,
  laboratory_patientProfile,
  loading,
}))(withI18n()(Form.create()(PrintTestResult)))

import React, { useRef } from 'react'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import { Drawer, Row, Col, Button, Form } from 'antd'
import ReactToPrint from 'react-to-print'
//import TestResultWrapper from './TestResultWrapper'
import { LabReport } from 'components'
import { useMediaQuery } from 'react-responsive'

const PrintTestResult = props => {
  const componentRef = useRef()
  const isMobile = useMediaQuery({ maxDeviceWidth: 600 })
  const isTablet = useMediaQuery({ maxDeviceWidth: 1000 })

  return (
    <Drawer
      // width={isTablet ? 600 : isMobile ? '100%' : 1000}

      width={isMobile ? '100%' : isTablet ? 600 : 1000}
      onClose={props.onClose}
      visible={props.visible}
      maskClosable={true}
      closable={false}
    >
      <Button onClick={props.onClose}>
        <Trans id={'Close'} />
      </Button>

      <LabReport
        {...props.data}
        patient={props.app.Patient}
        practitioner={props.app.practitioner}
        ref={componentRef}
        pageSize={isMobile ? 300 : isTablet ? 500 : 800}
      />
    </Drawer>
  )
}

export default connect(({ app, patient_portal, loading }) => ({
  app,
  patient_portal,
  loading,
}))(withI18n()(Form.create()(PrintTestResult)))

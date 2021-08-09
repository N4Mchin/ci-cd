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
      title={
        <Row type="flex" justify="space-between">
          <Col>
            <Trans id="Print Test Result" />
          </Col>

          {/* <Col>
             <ReactToPrint
              trigger={() => (
                <Button type="primary">
                  <Trans id="Print" />
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle={'@page {size: a4; margin: 2cm 1.5cm 2cm 3cm;}'}
            /> 
          
          </Col> */}
        </Row>
      }
      width="900px"
      onClose={props.onClose}
      visible={props.visible}
      // bodyStyle={{}}
      maskClosable={true}
      closable={false}
    >
      <LabReport
        {...props.data}
        patient={props.reception_patientProfile.patient}
        practitioner={props.app.practitioner}
        ref={componentRef}
      />
    </Drawer>
  )
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(Form.create()(PrintTestResult)))

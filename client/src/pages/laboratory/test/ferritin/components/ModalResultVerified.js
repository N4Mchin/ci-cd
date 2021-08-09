import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Button, Divider, Form, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  TestItemEditedWithDisplay,
} from 'components'

import { TestNumberLabel, OrderInfo } from '../../components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultVerified = props => {
  const {
    app,
    location,
    laboratory_test_ferritin,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const { getFieldDecorator } = form

  const {
    Ferritin,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    setLoadingData(true)

    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_ferritin/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
    }
  }, [])

  const observationArray = Object.assign([], props.rowData.observation)

  let first
  let firstValue

  if (observationArray.length >= 1) {
    first = observationArray.shift()
    firstValue = first.valueQuantity && first.valueQuantity.value
  }

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      closable={false}
      footer={[
        <Button
          key="reInput-cancel-button"
          className="button-gray uppercase"
          onClick={modalProps.onCancel}
          style={{ marginRight: '8px' }}
        >
          <Trans id="Close" />
        </Button>,
      ]}
    >
      <Row type="flex" justify="center">
        <Spin spinning={loadingData}></Spin>
      </Row>

      {!loadingData && (
        <ModuleBox title={Title}>
          <Form layout="horizontal" labelAlign="left" colon={false}>
            <OrderInfo {...props.rowData} />
            <Divider style={{ background: '#ccc' }} />
            <Row gutter={32}>
              <Col span={12}>
                <TestNumberLabel
                  key="testLabel"
                  testName={Ferritin.display}
                  value={firstValue}
                />

                {observationArray.map(obs => {
                  const val = obs.valueQuantity.value
                  return (
                    <TestItemEditedWithDisplay
                      key={`key_${obs.id}`}
                      patient={props.rowData.patient}
                      value={val}
                    />
                  )
                })}
              </Col>

              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('regulatoryNotes', {
                    initialValue: props.rowData.regulatoryNotesValue,
                    rules: [{ required: false }],
                  })(
                    <RegulatoryNotes
                      autoSize={{ minRows: 4, maxRows: 6 }}
                      disabled
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModuleBox>
      )}
    </Modal>
  )
}

ModalResultVerified.propTypes = {
  laboratory_test_ferritin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_ferritin, loading }) => ({
  app,
  laboratory_test_ferritin,
  loading,
}))(withI18n()(Form.create()(ModalResultVerified)))

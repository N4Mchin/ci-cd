import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Button, Divider, Form, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  Seperator,
  TestItemEditedWithDisplay,
} from 'components'

import { TestNumberLabel, OrderInfo } from '../../test/components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const SarsCov2IgG = props => {
  const { app, form } = props
  const { getFieldDecorator } = form

  const [rawData, setRawData] = useState()
  const [observationArray, setObservationArray] = useState([])
  const [firstValue, setFirstValue] = useState('')
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'app/queryLabResult',
        payload: {
          testKey: props.testKey,
          testCode: props.testCode,
          serviceRequestId: props.rowData.serviceRequest.id,
        },
      })
      .then(values => {
        setRawData(values)
        const newObservationArray = Object.assign([], values.observation)

        let newFirst
        let newFirstValue

        if (newObservationArray.length >= 1) {
          newFirst = newObservationArray.shift()
          newFirstValue = newFirst.valueQuantity && newFirst.valueQuantity.value
        }

        setObservationArray(newObservationArray)
        setFirstValue(newFirstValue)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }, [])

  console.log(props, rawData)
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={false}
      closable={false}
      width={props.width}
      footer={[
        <Button
          key="reInput-cancel-button"
          className="button-gray uppercase"
          onClick={props.onCancel}
          style={{ marginLeft: '8px' }}
        >
          <Trans id="Close" />
        </Button>,
        props.onReVerifyResultItem && (
          <ConfirmModal
            {...{
              showButtonProps: {
                className: 'button-dark-gray uppercase',
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <Trans id="Results to re-verify" />
                </span>
              ),
              onConfirm: () =>
                props.onReVerifyResultItem({
                  ...props.rowData,
                  ...rawData,
                }),
              loading: props.buttonLoading === 'reVerifying',
            }}
          />
        ),
        props.onVerifyResultItem && (
          <ConfirmModal
            {...{
              showButtonProps: {
                className: 'button-red uppercase',
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <Trans id="Verify Results" />
                </span>
              ),
              onConfirm: () =>
                props.onVerifyResultItem({
                  ...props.rowData,
                  ...rawData,
                }),
              loading: props.buttonLoading === 'verifying',
            }}
          />
        ),
      ]}
    >
      <Row type="flex" justify="center">
        <Spin spinning={loadingData}></Spin>
      </Row>

      {!loadingData && (
        <Form layout="horizontal" labelAlign="left" colon={false}>
          <ModuleBox title={Title}>
            <OrderInfo {...props.rowData} />
            <Seperator />

            <Row gutter={32}>
              <Col span={12}>
                <TestNumberLabel
                  key="testLabel"
                  testName={props.testName}
                  value={firstValue}
                />

                {observationArray.map(obs => {
                  const val = obs.valueQuantity.value
                  return (
                    <TestItemEditedWithDisplay
                      key={`key_${obs.id}`}
                      value={val}
                    />
                  )
                })}
              </Col>

              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('regulatoryNotes', {
                    initialValue: rawData && rawData.regulatoryNotesValue,
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
          </ModuleBox>
        </Form>
      )}
    </Modal>
  )
}

SarsCov2IgG.propTypes = {
  testKey: PropTypes.string,
  testName: PropTypes.string,
  testCode: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(Form.create()(SarsCov2IgG)))

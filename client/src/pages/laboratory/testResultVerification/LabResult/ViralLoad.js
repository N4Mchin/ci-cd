import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  TestItemEditedWithDisplay,
} from 'components'

import { TestNumberLabel } from '../../test/components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ViralLoad = props => {
  const { app, form, ...modalProps } = props

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

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      closable={false}
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
        <Form size="large">
          <ModuleBox title={Title}>
            <Row gutter={32}>
              <div style={{ display: 'flex' }}>
                <Col span={12}>
                  <TestNumberLabel
                    hasCheckbox
                    testName={props.testName}
                    value={firstValue}
                  />

                  {observationArray.map((obs, index) => {
                    const val = obs.valueQuantity.value

                    return (
                      <TestItemEditedWithDisplay
                        value={val}
                        highlight={index === observationArray.length - 1}
                      />
                    )
                  })}
                </Col>

                <Col span={12} style={{ display: 'grid' }}>
                  <Row>
                    <Form.Item>
                      {rawData &&
                        form.getFieldDecorator('regulatoryNotes', {
                          initialValue: rawData.regulatoryNotesValue,
                          rules: [{ required: false }],
                        })(
                          <RegulatoryNotes
                            autoSize={{ minRows: 5, maxRows: 7 }}
                            disabled
                          />
                        )}
                    </Form.Item>
                  </Row>
                </Col>
              </div>
            </Row>
          </ModuleBox>
        </Form>
      )}
    </Modal>
  )
}

ViralLoad.propTypes = {
  testKey: PropTypes.string,
  testName: PropTypes.string,
  testCode: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(Form.create()(ViralLoad)))

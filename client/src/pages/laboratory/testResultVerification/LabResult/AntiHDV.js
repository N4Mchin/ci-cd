import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Button, Divider, Form, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  TestItemViewWithLabel,
} from 'components'
import * as controller from 'utils/controller'
import { TestLabel, OrderInfo } from '../../test/components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const AntiHDV = props => {
  const { app, form, ...modalProps } = props

  const [rawData, setRawData] = useState()
  const [observationArray, setObservationArray] = useState([])
  const [firstValue, setFirstValue] = useState('')
  const [loadingData, setLoadingData] = useState(false)
  const {
    Anti_HDV,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include

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
          const firstValueCodeableConcept = Object.values(
            props.app.FHIR_CODES.QualitativeTestResults
          ).find(testResult => {
            return controller.codeIntersects(
              testResult.code,
              newFirst.valueCodeableConcept
            )
          })

          newFirstValue = firstValueCodeableConcept.display
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
        <Form layout="horizontal" labelAlign="left" colon={false}>
          <ModuleBox title={Title}>
            <OrderInfo {...props.rowData} />
            <Divider style={{ background: '#ccc' }} />
            <Row gutter={32}>
              <Col span={12}>
                <TestLabel
                  key="testLabel"
                  testName={Anti_HDV.display}
                  value={firstValue}
                />

                {observationArray.map(obs => {
                  const testValue = Object.values(
                    props.app.FHIR_CODES.QualitativeTestResults
                  ).find(testResult => {
                    return controller.codeIntersects(
                      testResult.code,
                      obs.valueCodeableConcept
                    )
                  })
                  return (
                    <TestItemViewWithLabel
                      key={`key_${obs.id}`}
                      value={testValue.display}
                    />
                  )
                })}
              </Col>

              <Col span={12}>
                {rawData && rawData.regulatoryNotesValue && (
                  <RegulatoryNotes
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    disabled
                    value={rawData.regulatoryNotesValue}
                  />
                )}
              </Col>
            </Row>
          </ModuleBox>
        </Form>
      )}
    </Modal>
  )
}

AntiHDV.propTypes = {
  testKey: PropTypes.string,
  testName: PropTypes.string,
  testCode: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(Form.create()(AntiHDV)))

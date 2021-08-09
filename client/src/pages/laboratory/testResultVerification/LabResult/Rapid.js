import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  StringTestItemWithHistory,
  ConfirmModal,
} from 'components'
import styles from '../styles.less'
import { codeIntersects } from 'utils/controller'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const Rapid = props => {
  const [loadingData, setLoadingData] = useState(false)
  const [rawData, setRawData] = useState({})

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
      .then(values => setRawData(values))
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      closable={false}
      width="60vw"
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin spinning={loadingData}></Spin>
      </div>
      <ModuleBox title={Title}>
        {!loadingData && (
          <Form
            className={styles.formItem}
            layout="horizontal"
            labelAlign="left"
            colon={false}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Col span={10} style={{ marginTop: '2px' }}>
                {Object.keys(
                  props.app.FHIR_CODES.UncategorizedTests.RapidTests.include
                ).map(testKey => {
                  let test
                  let valueDisplay
                  let oldValueDisplay

                  try {
                    test =
                      props.app.FHIR_CODES.UncategorizedTests.RapidTests
                        .include[testKey]
                  } catch {}

                  try {
                    const valueCodeableConcept =
                      rawData.include[testKey].latestObservation
                        .valueCodeableConcept

                    const valueCodeableConceptObject = Object.values(
                      props.app.FHIR_CODES.QualitativeTestResults
                    ).find(testResult => {
                      return codeIntersects(
                        testResult.code,
                        valueCodeableConcept
                      )
                    })

                    valueDisplay = valueCodeableConceptObject.display
                  } catch {}

                  try {
                    const oldValueCodeableConcept = rawData.include[
                      testKey
                    ].observation
                      .slice()
                      .reverse()
                      .find(o => o.status === 'cancelled').valueCodeableConcept

                    const valueCodeableConceptObject = Object.values(
                      props.app.FHIR_CODES.QualitativeTestResults
                    ).find(testResult => {
                      return codeIntersects(
                        testResult.code,
                        oldValueCodeableConcept
                      )
                    })

                    oldValueDisplay = valueCodeableConceptObject.display
                  } catch (errorInfo) {}

                  return (
                    <div style={{ height: '40px', paddingTop: '4px' }}>
                      <StringTestItemWithHistory
                        test={test}
                        oldValue={oldValueDisplay}
                        value={valueDisplay}
                      />
                    </div>
                  )
                })}
              </Col>

              <Col span={1}>
                <Divider
                  type="vertical"
                  style={{ width: '2px', height: '200px' }}
                />
              </Col>

              <Col span={13}>
                <Row gutter={[20, 20]}>
                  <RegulatoryNotes
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    value={rawData.regulatoryNotesValue}
                    disabled
                  />
                </Row>
              </Col>
            </div>
          </Form>
        )}
      </ModuleBox>
    </Modal>
  )
}

Rapid.propTypes = {
  testKey: PropTypes.string,
  testName: PropTypes.string,
  testCode: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(Form.create()(Rapid)))

import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Button, Divider, Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, RegulatoryNotes, TestItemViewWithLabel } from 'components'
import * as controller from 'utils/controller'
import { TestLabel, OrderInfo } from '../../components'

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
    laboratory_test_antiHDV,
    loading,
    i18n,
    form,
    ...modalProps
  } = props
  console.log('Modal Result Veirfied ?????>>>>>>>', props)

  const {
    Anti_HDV,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include

  const observationArray = Object.assign([], props.rowData.observation)

  let first
  let firstValue

  if (observationArray.length >= 1) {
    first = observationArray.shift()
    const firstValueCodeableConcept = Object.values(
      props.app.FHIR_CODES.QualitativeTestResults
    ).find(testResult => {
      return controller.codeIntersects(
        testResult.code,
        first.valueCodeableConcept
      )
    })
    firstValue = firstValueCodeableConcept.display
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
            <RegulatoryNotes
              autoSize={{ minRows: 4, maxRows: 6 }}
              value={props.rowData.regulatoryNotesValue}
              disabled
            />
          </Col>
        </Row>
      </ModuleBox>
    </Modal>
  )
}

ModalResultVerified.propTypes = {
  laboratory_test_antiHDV: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_antiHDV, loading }) => ({
  app,
  laboratory_test_antiHDV,
  loading,
}))(withI18n()(Form.create()(ModalResultVerified)))

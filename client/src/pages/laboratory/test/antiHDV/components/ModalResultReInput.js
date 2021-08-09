import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  SelectQualitativeTestResult,
  TestItemViewWithLabel,
} from 'components'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import { TestLabel, OrderInfo } from '../../components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultReInput = props => {
  const {
    app,
    location,
    laboratory_test_antiHDV,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const { getFieldDecorator } = form
  const {
    Anti_HDV,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
  const [submitLoading, setSubmitLoading] = useState(false)
  const [allFields, setAllFields] = useState({
    regulatoryNotes: props.rowData.regulatoryNotesValue,
  })
  const [formComplete, setFormComplete] = useState(false)

  const onSubmit = () => {
    setSubmitLoading(true)

    const { testResult, regulatoryNotes } = allFields

    if (testResult && !helper.isEmptyObject(testResult)) {
      const payload = {
        testData: props.rowData,
        testCode: Anti_HDV,
        testResult: testResult,
        regulatoryNotes: regulatoryNotes,
      }

      return props
        .dispatch({
          type: 'laboratory_test_antiHDV/editResult',
          payload: payload,
        })
        .then(() => {
          props.onSubmit()
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setSubmitLoading(false))
    }
  }

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

  const onFormChange = values => {
    if (!!values.testResult) {
      setFormComplete(true)
    } else {
      setFormComplete(false)
    }
  }
  const handleSelect = value => {
    const changingValue = { ...allFields, testResult: value }
    setAllFields(changingValue)
    onFormChange(changingValue)
  }

  const handleRegulatoryNotes = event => {
    const changingValue = { ...allFields, regulatoryNotes: event.target.value }
    setAllFields(changingValue)
    onFormChange(changingValue)
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
        <ConfirmModal
          {...{
            showButtonProps: {
              className: 'button-red uppercase',
              disabled: !formComplete,
            },
            title: <Trans id="Are you sure?" />,
            showButtonText: (
              <span>
                &nbsp;&nbsp;
                <Trans id="Save" />
              </span>
            ),
            onConfirm: onSubmit,
            loading: submitLoading,
          }}
        />,
      ]}
    >
      <ModuleBox title={Title}>
        <OrderInfo {...props.rowData} />
        <Divider style={{ background: '#ccc' }} />
        <Row gutter={32}>
          <Col span={12}>
            <TestLabel testName={Anti_HDV.display} value={firstValue} />

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

            <SelectQualitativeTestResult
              test={Anti_HDV}
              onChange={handleSelect}
            />
          </Col>

          <Col span={12}>
            <RegulatoryNotes
              autoSize={{ minRows: 4, maxRows: 6 }}
              onChange={handleRegulatoryNotes}
              value={allFields.regulatoryNotes}
            />
          </Col>
        </Row>
      </ModuleBox>
    </Modal>
  )
}

ModalResultReInput.propTypes = {
  laboratory_test_antiHDV: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_antiHDV, loading }) => ({
  app,
  laboratory_test_antiHDV,
  loading,
}))(withI18n()(Form.create()(ModalResultReInput)))

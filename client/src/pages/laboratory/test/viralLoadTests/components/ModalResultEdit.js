import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  TestItemEditedWithDisplay,
  TestItemEditWithLabel,
} from 'components'
import { TestNumberLabel } from '../../components'
import { OrderInfo } from '../../components'
const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultEdit = props => {
  const {
    app,
    location,
    laboratory_test_viralLoadTests,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const [submitLoading, setSubmitLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)

  function onSubmit() {
    setSubmitLoading(true)

    return form
      .validateFields()
      .then(values => {
        const { testResult, regulatoryNotes } = values

        const payload = {
          testData: props.rowData,
          testCode:
            props.app.FHIR_CODES.UncategorizedTests.ViralLoadTests.include[
              props.testNameString
            ],
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
          testNameString: props.testNameString,
        }

        return props.dispatch({
          type: 'laboratory_test_viralLoadTests/editResult',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  const { getFieldDecorator } = form

  const observationArray = Object.assign([], props.rowData.observation)

  let first
  let firstValue

  if (observationArray.length >= 1) {
    first = observationArray.shift()
    firstValue = first.valueQuantity && first.valueQuantity.value
  }

  const onFormChange = () => {
    const { testResult } = form.getFieldsValue()

    let valid = false
    if (testResult && !isNaN(parseFloat(testResult))) {
      valid = true
    }

    setFormComplete(valid)
  }

  return (
    <Modal
      {...modalProps}
      maskClosable={false}
      closable={false}
      footer={[
        <Button className="button-gray" onClick={props.onCancel}>
          <Trans id="Cancel" />
        </Button>,
        <ConfirmModal
          key="edit-save-button"
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
      <Form onChange={onFormChange}>
        <ModuleBox title={Title}>
          <OrderInfo {...props.rowData} />
          <Divider style={{ background: '#ccc' }} />
          <Row gutter={32}>
            <Col span={12}>
              <TestNumberLabel
                testName={props.testNameString}
                value={firstValue}
              />

              {observationArray.map(obs => {
                const val = obs.valueQuantity.value
                return <TestItemEditedWithDisplay value={val} />
              })}

              <Form.Item>
                {getFieldDecorator('testResult', {
                  rules: [
                    {
                      required: true,
                      message: i18n.t`Enter test result value`,
                    },
                  ],
                })(
                  <TestItemEditWithLabel
                    test={
                      props.app.FHIR_CODES.UncategorizedTests.ViralLoadTests
                        .include[props.testNameString]
                    }
                  />
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('regulatoryNotes', {
                  initialValue: props.rowData.regulatoryNotesValue,
                  rules: [{ required: false }],
                })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
              </Form.Item>
            </Col>
          </Row>
        </ModuleBox>
      </Form>
    </Modal>
  )
}

ModalResultEdit.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(Form.create()(ModalResultEdit)))

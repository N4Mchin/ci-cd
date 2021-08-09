import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { OrderInfo } from '../../components'
import {
  ModuleBox,
  RegulatoryNotes,
  QualitativeTestResultEdit,
  ConfirmModal,
} from 'components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultEdit = props => {
  const { getFieldDecorator } = props.form
  const RapidTestInclude =
    props.app.FHIR_CODES.UncategorizedTests.RapidTests.include

  const onSubmit = () => {
    setSubmitLoading(true)

    if (allFields && !helper.isEmptyObject(allFields)) {
      return props.form
        .validateFields()
        .then(values => {
          const { regulatoryNotes } = values
          const payload = {
            testData: props.rowData,
            testCode: RapidTestInclude,
            testResult: allFields,
            regulatoryNotes: regulatoryNotes,
          }
          return props.dispatch({
            type: 'laboratory_test_rapidTests/editResult',
            payload: payload,
          })
        })
        .then(() => props.onSubmit())
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setSubmitLoading(false))
    }
  }

  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)

  const [allFields, setAllFields] = useState()
  useEffect(() => {
    setLoadingData(true)
    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_rapidTests/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFormChange = values => {
    if (!!values) {
      setFormComplete(true)
    } else {
      setFormComplete(false)
    }
  }

  const handleSelect = (value, testKey) => {
    const changingValue = {
      ...allFields,
      [testKey]: value,
    }

    setAllFields(changingValue)
    onFormChange(changingValue)
  }
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      closable={false}
      width="80vw"
      footer={[
        <Button className="button-gray" onClick={props.onCancel}>
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin spinning={loadingData}></Spin>
      </div>
      <ModuleBox title={Title}>
        <OrderInfo {...props.rowData} />
        <Divider style={{ background: '#ccc' }} />
        {!loadingData && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Col span={12} style={{ marginTop: '2px' }}>
              {Object.keys(
                props.app.FHIR_CODES.UncategorizedTests.RapidTests.include
              ).map(testKey => {
                let test
                let firstValue
                let editable

                try {
                  test =
                    props.app.FHIR_CODES.UncategorizedTests.RapidTests.include[
                      testKey
                    ]
                } catch {}

                try {
                  // valueCodeableConcept =
                  //   modalData.include[testKey].latestObservation.valueCodeableConcept
                  //     .value

                  const firstValueCodeableConcept = Object.values(
                    props.app.FHIR_CODES.QualitativeTestResults
                  ).find(testResult => {
                    return controller.codeIntersects(
                      testResult.code,
                      modalData.include[testKey].latestObservation
                        .valueCodeableConcept
                    )
                  })

                  firstValue = firstValueCodeableConcept.display
                } catch {}

                try {
                  editable =
                    modalData.include[testKey].latestObservation.status ===
                    'preliminary'
                      ? true
                      : false
                } catch {}

                return (
                  <div
                    style={{
                      height: '40px',
                      paddingTop: '4px',
                      width: '100%',
                    }}
                  >
                    <QualitativeTestResultEdit
                      test={test}
                      value={firstValue}
                      onChange={value => handleSelect(value, testKey)}
                    />
                  </div>
                )
              })}
            </Col>

            <Col span={1}>
              <Divider
                type="vertical"
                style={{ width: '1px', height: '200px' }}
              />
            </Col>

            <Col span={11}>
              <Row gutter={[20, 20]}>
                <Form>
                  <Form.Item>
                    {getFieldDecorator('regulatoryNotes', {
                      initialValue: modalData.regulatoryNotesValue,
                      rules: [{ required: false }],
                    })(
                      <RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />
                    )}
                  </Form.Item>
                </Form>
              </Row>
            </Col>
          </div>
        )}
      </ModuleBox>
    </Modal>
  )
}

ModalResultEdit.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ModalResultEdit)))

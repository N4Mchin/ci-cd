import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  TestItemEdit,
  ConfirmModal,
} from 'components'
import styles from '../styles.less'
import { OrderInfo } from '../../components'
const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultEdit = props => {
  const { i18n } = props
  const { getFieldDecorator } = props.form

  function onSubmit() {
    setSubmitLoading(true)

    return props.form
      .validateFields()
      .then(values => {
        const { regulatoryNotes, ...testResult } = values

        const payload = {
          testData: props.rowData,
          testCode:
            props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
              .Hematology,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_hematology/editResult',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)

  useEffect(() => {
    setLoadingData(true)

    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_hematology/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    }
  }, [])

  const onFieldsChange = () => {
    const formValues = props.form.getFieldsValue()
    const { regulatoryNotes, ...testResult } = formValues

    let valueFound = false
    if (
      Object.values(testResult).some(
        value =>
          value !== undefined && value !== '' && !isNaN(parseFloat(value))
      )
    ) {
      valueFound = true
    }

    setFormComplete(valueFound)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      closable={false}
      width="60vw"
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
          <Form
            className={styles.formItem}
            layout="horizontal"
            labelAlign="left"
            colon={false}
            onChange={onFieldsChange}
          >
            <Row>
              {Object.keys(
                props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                  .Hematology.include
              ).map(testKey => {
                let test
                let valueQuantity
                let editable

                try {
                  test =
                    props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                      .Hematology.include[testKey]
                } catch {}

                try {
                  valueQuantity =
                    modalData.include[testKey].latestObservation.valueQuantity
                      .value
                } catch {}

                try {
                  editable =
                    modalData.include[testKey].latestObservation.status ===
                    'preliminary'
                      ? true
                      : false
                } catch {}

                return (
                  <Col style={{ height: '40px', paddingTop: '4px' }} span={8}>
                    <Form.Item>
                      {getFieldDecorator([testKey], {
                        rules: [
                          {
                            required: false,
                            message: i18n.t`Enter test result value`,
                          },
                        ],
                      })(
                        <TestItemEdit
                          patient={modalData.patient}
                          test={test}
                          valueQuantity={valueQuantity}
                          disabled={!editable}
                        />
                      )}
                    </Form.Item>
                  </Col>
                )
              })}
            </Row>
            <Row>
              <Form.Item>
                {getFieldDecorator('regulatoryNotes', {
                  initialValue: modalData.regulatoryNotesValue,
                  rules: [{ required: false }],
                })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
              </Form.Item>
            </Row>
          </Form>
        )}
      </ModuleBox>
    </Modal>
  )
}

ModalResultEdit.propTypes = {
  laboratory_test_hematology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_hematology, loading }) => ({
  app,
  laboratory_test_hematology,
  loading,
}))(withI18n()(Form.create()(ModalResultEdit)))

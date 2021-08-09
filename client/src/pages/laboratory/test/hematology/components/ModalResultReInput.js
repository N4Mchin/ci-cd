import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Divider, Spin, Button } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  DescriptionNotes,
  ConfirmModal,
  TestItemReInput,
} from 'components'
import styles from '../styles.less'
import { OrderInfo } from '../../components'
const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultReInput = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form
  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const HematologyInclude =
    props.app.FHIR_CODES &&
    props.app.FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology
      .include

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
        .then(() => setLoadingData(false))
    }
  }, [])

  const onSubmit = () => {
    setSubmitLoading(true)
    return form
      .validateFields()
      .then(values => {
        const payload = {
          rowData: props.rowData,
          formValues: values,
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
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      closable={false}
      width="1000px"
      heigth="400px"
      footer={[
        <Button onClick={props.onCancel}>
          <Trans id="Close" />
        </Button>,
        <ConfirmModal
          {...{
            showButtonProps: {
              className: 'button-red uppercase',
              //  disabled: !formComplete,
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

      {!loadingData && (
        <ModuleBox title={Title}>
          <OrderInfo {...props.rowData} />
          <Divider style={{ background: '#ccc' }} />
          <Form
            style={{ fontSize: '12px', lineHeight: '10px' }}
            className={styles.formItem}
            labelAlign="left"
            colon={false}
          >
            <Row gutter={16}>
              {Object.keys(HematologyInclude).map(testKey => {
                let test
                let valueQuantity
                let hasCancelled

                try {
                  test = HematologyInclude[testKey]
                } catch {}

                try {
                  valueQuantity =
                    modalData.include[testKey].latestObservation.valueQuantity
                      .value
                } catch {}

                try {
                  hasCancelled =
                    modalData.include[testKey].latestObservation.status ===
                    'cancelled'
                      ? true
                      : false
                } catch {}

                return (
                  <Col span={8}>
                    <Form.Item help={false}>
                      {getFieldDecorator(`values.${testKey}`, {
                        rules: [{ required: hasCancelled }],
                      })(
                        <TestItemReInput
                          patient={modalData.patient}
                          test={test}
                          valueQuantity={valueQuantity}
                          disabled={!hasCancelled}
                        />
                      )}
                    </Form.Item>
                  </Col>
                )
              })}
            </Row>
            <Row type="flex" align="middle" gutter={16}>
              <Col span={12}>
                <div
                  style={{
                    width: '100%',
                    border: '1px solid #C9C9C9',
                    display: 'inline-block',
                    margin: '15px 0 0 0',
                  }}
                ></div>
                <Form.Item>
                  {getFieldDecorator('descriptionNotes', {
                    initialValue: modalData.regulatoryNotesValue,
                    rules: [{ required: false }],
                  })(
                    <DescriptionNotes autosize={{ minRows: 4, maxRows: 6 }} />
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

ModalResultReInput.propTypes = {
  laboratory_test_hematology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_hematology, loading }) => ({
  app,
  laboratory_test_hematology,
  loading,
}))(withI18n()(Form.create()(ModalResultReInput)))

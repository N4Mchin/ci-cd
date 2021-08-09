import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Spin, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  EmptyTestItem,
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

const ModalResultInput = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const CoagulationInclude =
    props.app.FHIR_CODES.UncategorizedTests.OtherTests.include.Coagulation
      .include
  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})
  const [formComplete, setFormComplete] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    setLoadingData(true)

    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    )
      props
        .dispatch({
          type: 'laboratory_test_coagulation/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
  }, [])

  async function onSubmit() {
    setSubmitLoading(true)
    return await form
      .validateFields()
      .then(values => {
        const { regulatoryNotes, ...testResult } = values
        const payload = {
          testData: props.rowData,
          testCode:
            props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
              .Coagulation,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_coagulation/saveResult',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => {
        console.log(errorInfo)
      })
      .finally(() => setSubmitLoading(false))
  }

  const onFieldsChange = () => {
    const formValues = props.form.getFieldsValue()
    const { regulatoryNotes, ...testResult } = formValues

    let emptyFound = false
    if (
      Object.values(testResult).some(
        value => value === undefined || value === ''
      )
    ) {
      emptyFound = true
    }

    setFormComplete(!emptyFound)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      closable={false}
      width="60vw"
      footer={[
        <Button className="button-gray uppercase" onClick={props.onCancel}>
          <Trans id={'Cancel'} />
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

      {!loadingData && (
        <ModuleBox title={Title}>
          <OrderInfo {...props.rowData} />
          <Divider style={{ background: '#ccc' }} />
          <Form
            style={{ fontSize: '12px', lineHeight: '10px' }}
            className={styles.formItem}
            onChange={onFieldsChange}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Row>
                  {Object.keys(CoagulationInclude).map(testKey => {
                    let test
                    let included
                    try {
                      test = CoagulationInclude[testKey]
                    } catch {}
                    try {
                      included = !!modalData.include[testKey]
                    } catch {}

                    return (
                      <Col span={24}>
                        <Form.Item help={false}>
                          {getFieldDecorator([testKey], {
                            rules: [{ required: included }],
                          })(
                            <EmptyTestItem
                              patient={modalData.patient}
                              test={test}
                              disabled={!included}
                            />
                          )}
                        </Form.Item>
                      </Col>
                    )
                  })}
                </Row>
              </Col>

              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('regulatoryNotes', {
                    rules: [{ required: false }],
                  })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModuleBox>
      )}
    </Modal>
  )
}

ModalResultInput.propTypes = {
  laboratory_test_coagulation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_coagulation, loading }) => ({
  app,
  laboratory_test_coagulation,
  loading,
}))(withI18n()(Form.create()(ModalResultInput)))

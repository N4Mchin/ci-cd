import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, RegulatoryNotes, TestItemViewWithHistory } from 'components'
import styles from '../styles.less'
import { OrderInfo } from '../../components'
const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultVerified = props => {
  const { i18n } = props
  const { getFieldDecorator } = props.form

  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    setLoadingData(true)

    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_coagulation/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    }
  }, [])

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
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Col span={10} style={{ marginTop: '2px' }}>
                {Object.keys(
                  props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                    .Coagulation.include
                ).map(testKey => {
                  let test
                  let valueQuantity
                  let oldValueQuantity

                  try {
                    test =
                      props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                        .Coagulation.include[testKey]
                  } catch {}

                  try {
                    valueQuantity =
                      modalData.include[testKey].latestObservation.valueQuantity
                        .value
                  } catch {}

                  try {
                    oldValueQuantity = modalData.include[testKey].observation
                      .slice()
                      .reverse()
                      .find(o => o.status === 'cancelled').valueQuantity.value
                  } catch {}

                  return (
                    <div style={{ height: '40px', paddingTop: '4px' }}>
                      <Form.Item>
                        {getFieldDecorator([testKey], {
                          rules: [
                            {
                              required: false,
                              message: i18n.t`Enter test result value`,
                            },
                          ],
                        })(
                          <TestItemViewWithHistory
                            patient={modalData.patient}
                            test={test}
                            oldValueQuantity={oldValueQuantity}
                            valueQuantity={valueQuantity}
                          />
                        )}
                      </Form.Item>
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
                  <Form.Item>
                    {getFieldDecorator('regulatoryNotes', {
                      initialValue: modalData.regulatoryNotesValue,
                      rules: [{ required: false }],
                    })(
                      <RegulatoryNotes
                        autoSize={{ minRows: 4, maxRows: 6 }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Row>
              </Col>
            </div>
          </Form>
        )}
      </ModuleBox>
    </Modal>
  )
}

ModalResultVerified.propTypes = {
  laboratory_test_coagulation: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_coagulation, loading }) => ({
  app,
  laboratory_test_coagulation,
  loading,
}))(withI18n()(Form.create()(ModalResultVerified)))

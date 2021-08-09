import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as controller from 'utils/controller'
import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  QualitativeTestResultEdit,
} from 'components'
import { OrderInfo } from '../../components'
import styles from '../styles.less'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultVerified = props => {
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
          type: 'laboratory_test_rapidTests/queryLabTestResult',
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
                  props.app.FHIR_CODES.UncategorizedTests.RapidTests.include
                ).map(testKey => {
                  let test
                  let firstValue
                  let editable
                  try {
                    test =
                      props.app.FHIR_CODES.UncategorizedTests.RapidTests
                        .include[testKey]
                  } catch {}

                  try {
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
                        disabled={!editable}
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
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ModalResultVerified)))

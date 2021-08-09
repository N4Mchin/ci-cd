import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Spin, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import * as helper from 'utils/helper'
import { connect } from 'dva'
import { OrderInfo } from '../../components'
import {
  ModuleBox,
  RegulatoryNotes,
  QualitativeTestResultInput,
  ConfirmModal,
} from 'components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultInput = props => {
  const { getFieldDecorator } = props.form
  const RapidTestInclude =
    props.app.FHIR_CODES.UncategorizedTests.RapidTests.include

  const [modalData, setModalData] = useState({})
  const [formComplete, setFormComplete] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const [allFields, setAllFields] = useState()
  useEffect(() => {
    setLoadingData(true)
    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    )
      props
        .dispatch({
          type: 'laboratory_test_rapidTests/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            type: 'laboratory_test_rapidTests/saveResult',
            payload: payload,
          })
        })
        .then(() => props.onSubmit())
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setSubmitLoading(false))
    }
  }

  const onFormChange = values => {
    if (
      Object.keys(props.rowData.include).find(
        included => !Object.keys(values).includes(included)
      )
    ) {
      setFormComplete(false)
    } else {
      setFormComplete(true)
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

  // const handleRegulatoryNotes = event => {
  //   const changingValue = {
  //     ...allFields,
  //     regulatoryNotes: event.target.value,
  //   }
  //   setAllFields(changingValue)
  //   onFormChange(changingValue)
  // }

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
          <Row gutter={24}>
            <Col span={12}>
              <Row>
                {Object.keys(RapidTestInclude).map(testKey => {
                  let test
                  let included
                  try {
                    test = RapidTestInclude[testKey]
                  } catch {}
                  try {
                    included = !!modalData.include[testKey]
                  } catch {}

                  return (
                    <Col span={24}>
                      <QualitativeTestResultInput
                        test={test}
                        disabled={!included}
                        onChange={value => handleSelect(value, testKey)}
                      />
                    </Col>
                  )
                })}
              </Row>
            </Col>

            <Col span={12}>
              <Form>
                <Form.Item>
                  {getFieldDecorator('regulatoryNotes', {
                    initialValue: modalData.regulatoryNotesValue,
                    rules: [{ required: false }],
                  })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </ModuleBox>
      )}
    </Modal>
  )
}

ModalResultInput.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ModalResultInput)))

/**
 * author: Sod-Erdene
 * date: 2020-03-27
 *
 *
 * modified: Sod-Erdene
 * date: 2020-04-14
 *
 * modified: Sod-Erdene
 * date: 2020-04-26
 */

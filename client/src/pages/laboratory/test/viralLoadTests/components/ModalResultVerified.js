import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Divider, Button } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, RegulatoryNotes, TestItemViewWithLabel } from 'components'

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
    laboratory_test_viralLoadTests,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const { getFieldDecorator } = form

  const observationArray = Object.assign([], props.rowData.observation)

  let first
  let firstValue

  if (observationArray.length >= 1) {
    first = observationArray.shift()
    firstValue = first.valueQuantity && first.valueQuantity.value
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
      ]}
    >
      <Form size="large">
        <ModuleBox title={Title}>
          <OrderInfo {...props.rowData} />
          <Divider style={{ background: '#ccc' }} />
          <Row gutter={32}>
            <div style={{ display: 'flex' }}>
              <Col span={12}>
                <TestLabel
                  hasCheckbox
                  testName={props.testNameString}
                  value={firstValue}
                />

                {observationArray.map((obs, index) => {
                  const val = obs.valueQuantity.value

                  return (
                    <TestItemViewWithLabel
                      value={val}
                      highlight={index === observationArray.length - 1}
                    />
                  )
                })}
              </Col>

              <Col span={12} style={{ display: 'grid' }}>
                <Row>
                  <Form.Item>
                    {getFieldDecorator('regulatoryNotes', {
                      initialValue: props.rowData.regulatoryNotesValue,
                      rules: [{ required: false }],
                    })(
                      <RegulatoryNotes
                        autoSize={{ minRows: 5, maxRows: 7 }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Row>
              </Col>
            </div>
          </Row>
        </ModuleBox>
      </Form>
    </Modal>
  )
}

ModalResultVerified.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(Form.create()(ModalResultVerified)))

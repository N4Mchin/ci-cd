import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, DatePicker } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  OrganizationPicker,
  EmptyTestItem,
} from 'components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const formItemLayout = {
  labelCol: {
    sm: { span: 12 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
}

const FormModal = props => {
  const { getFieldDecorator } = props.form
  const {
    Coagulation,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
  const CoagulationInclude = Coagulation.include

  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = () => {
    setSubmitLoading(true)
    return props.form
      .validateFields()
      .then(values => {
        const {
          regulatoryNotes,
          issuedDate,
          organizationReference,
          ...testResult
        } = values

        if (!Object.values(testResult).find(value => !!value)) {
          throw new Error('No result available')
        }

        const valueQuanitities = {}
        Object.keys(testResult).forEach(testResultKey => {
          const testResultValue = testResult[testResultKey]

          if (
            !!testResultValue &&
            testResultValue !== '' &&
            !isNaN(parseFloat(testResultValue))
          ) {
            const { referenceRange, unit } = CoagulationInclude[testResultKey]
            valueQuanitities[testResultKey] = {
              valueQuantity: {
                value: parseFloat(testResultValue),
                unit: unit ? unit : undefined,
              },
            }
          }
        })

        const payload = {
          testCode: Coagulation,
          testResult: valueQuanitities,
          regulatoryNotes: regulatoryNotes,
          organizationReference: organizationReference,
          issuedDate: issuedDate,
          patient: props.practitioner_patient_profile.patient,
          observationStatus: 'final',
          diagnosticReportStatus: 'final',
        }

        return props.dispatch({
          type: 'app/saveLabResultLevel1',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => props.onError(errorInfo))
      .finally(() => setSubmitLoading(false))
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
              // disabled: !formComplete,
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
        <Form
          colon={false}
          {...formItemLayout}
          labelAlign="left"
          hideRequiredMark
        >
          <Row gutter={24}>
            <Col span={12}>
              <Row>
                {Object.keys(CoagulationInclude).map((testKey, index) => {
                  let test

                  try {
                    test = CoagulationInclude[testKey]
                  } catch {}

                  return (
                    <Col span={24}>
                      <Form.Item labelCol={0} wrapperCol={24} help={false}>
                        {getFieldDecorator([testKey], {
                          rules: [{ required: false }],
                        })(
                          <EmptyTestItem
                            key={index}
                            patient={props.practitioner_patient_profile.patient}
                            test={test}
                            disabled={false}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  )
                })}
              </Row>
            </Col>

            <Col span={12}>
              <Form.Item label={<Trans id="Date" />}>
                {getFieldDecorator('issuedDate', {
                  rules: [{ required: true }],
                })(<DatePicker />)}
              </Form.Item>

              <Form.Item label={<Trans id="Healthcare Provider" />}>
                {getFieldDecorator('organizationReference', {
                  rules: [{ required: false }],
                })(<OrganizationPicker i18n={props.i18n} />)}
              </Form.Item>

              <Form.Item labelCol={0} wrapperCol={24}>
                {getFieldDecorator('regulatoryNotes', {
                  rules: [{ required: false }],
                })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </Modal>
  )
}

FormModal.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormModal)))

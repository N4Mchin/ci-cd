import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Form, Divider, Upload, Button, Row, Input, Col } from 'antd'
import { toBase64 } from 'utils/helper'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ModuleBox } from 'components'

const MultiFileUploadWithText = props => {
  const { getFieldDecorator } = props.form
  const { i18n, multiple } = props
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleSubmit = () => {
    setSubmitLoading(true)

    return props.form.validateFields(async (error, values) => {
      if (error) {
        setSubmitLoading(false)
        return props.handleError(error)
      }

      if (!values.uploadField) {
        setSubmitLoading(false)
        return props.handleError(new Error('File list is empty'))
      }

      return Promise.all(
        values.uploadField.map(async file => {
          const { originFileObj, ...meta } = file
          const base64fileList = await toBase64(originFileObj)
          const normFile = {
            ...meta,
            base64file: base64fileList,
            description: values.description,
          }

          return normFile
        })
      )
        .then(base64fileList => {
          return props.handleSubmit(base64fileList)
        })
        .then(() => {
          return props.form.setFieldsValue({
            uploadField: undefined,
            description: undefined,
          })
        })
        .catch(errorInfo => {
          // eslint-disable-next-line no-console
          console.log(errorInfo)
          return props.handleError(errorInfo)
        })
        .finally(() => {
          setSubmitLoading(false)
        })
    })
  }

  const normalizeFile = event => {
    console.log(event)
    if (
      event.file.type === 'image/jpeg' ||
      event.file.type === 'application/pdf'
    ) {
      if (Array.isArray(event)) {
        if (multiple) {
          return event
        }
        return event.slice(-1)
      }

      if (multiple) {
        return event && event.fileList
      }
      return event && event.fileList.slice(-1)
    } else {
      props.handleError('info')
      return undefined
    }
  }

  const uploadButton = (
    <div>
      {submitLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        <Trans id="AddFile" />
      </div>
    </div>
  )

  return (
    <Form>
      <Divider style={{ backgroundColor: '#999' }} />

      <ModuleBox
        title={
          // <Trans id="AddFile" />
          <Trans>
            <span className="bold">Add </span>
            <span>File</span>
          </Trans>
        }
      >
        <Row>
          <Col span={4}>
            <Trans id="AddFile" />:
          </Col>
          <Col span={20}>
            <Form.Item>
              {getFieldDecorator('uploadField', {
                rules: [{ required: false }],
                getValueFromEvent: normalizeFile,
                valuePropName: 'fileList',
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  beforeUpload={() => false}
                  multiple={multiple}
                >
                  {uploadButton}
                </Upload>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Trans id="Description" />:
          </Col>
          <Col span={20}>
            <Form.Item>
              {getFieldDecorator('description', {
                rules: [{ required: false }],
              })(
                <Input.TextArea
                  name="description"
                  placeholder={i18n.t`Description`}
                  rows={6}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="end" style={{ marginTop: '32px' }}>
          <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
            <Trans id="Save" />
          </Button>
        </Row>
      </ModuleBox>
    </Form>
  )
}

MultiFileUploadWithText.propTypes = {
  stretch: PropTypes.bool,
}

export default withI18n()(Form.create()(MultiFileUploadWithText))

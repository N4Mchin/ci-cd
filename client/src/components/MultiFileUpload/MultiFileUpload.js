import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Form, Divider, Upload, Button, Row } from 'antd'
import { toBase64 } from 'utils/helper'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styles from '../styles.less'

const MultiFileUpload = props => {
  const { getFieldDecorator } = props.form

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
    if (
      event.file.type === 'image/jpeg' ||
      event.file.type === 'application/pdf'
    ) {
      if (Array.isArray(event)) {
        return event
      }
      return event && event.fileList
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
      <div
        className={styles.uploadSection}
        style={{
          flexDirection: 'row-reverse',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
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
              multiple={true}
              beforeUpload={() => false}
            >
              {uploadButton}
            </Upload>
          )}
        </Form.Item>
      </div>

      <Row type="flex" justify="end" style={{ marginTop: '32px' }}>
        <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
          <Trans id="FileUpload" />
        </Button>
      </Row>
    </Form>
  )
}

MultiFileUpload.propTypes = {
  stretch: PropTypes.bool,
}

export default withI18n()(Form.create()(MultiFileUpload))

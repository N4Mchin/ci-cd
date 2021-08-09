import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Board } from 'components'
import { Input, Modal, Typography } from 'antd'
import {
  InboxOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Upload, message, Col, Row } from 'antd'
const { Search } = Input
const { Text } = Typography
const { Dragger } = Upload

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const ModalFileCopy = props => {
  const draggerProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const [loadingFolder, setLoadingFolder] = useState(false)
  const [imageUrlFolder, setImageUrlFolder] = useState()
  const [loadingFile, setLoadingFile] = useState(false)
  const [imageUrlFile, setImageUrlFile] = useState()

  const handleChangeFolder = info => {
    if (info.file.status === 'uploading') {
      setLoadingFolder(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrlFolder => {
        setImageUrlFolder(imageUrlFolder), setLoadingFolder(false)
      })
    }
  }
  const handleChangeFile = info => {
    if (info.file.status === 'uploading') {
      setLoadingFile(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrlFile => {
        setImageUrlFile(imageUrlFile), setLoadingFile(false)
      })
    }
  }

  return (
    <Modal
      width="350px"
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      footer={null}
    >
      <Row style={{ margin: '18px' }} type="flex" justify="space-between">
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChangeFolder}
          >
            {imageUrlFolder ? (
              <img
                src={imageUrlFolder}
                alt="avatar"
                style={{ width: '100%' }}
              />
            ) : (
              <div style={{ width: '100%' }}>
                <FolderAddOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />
                <br />
                <Text strong>Хавтас хуулах</Text>
              </div>
            )}
          </Upload>
        </Col>
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChangeFile}
          >
            {imageUrlFile ? (
              <img src={imageUrlFile} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div style={{ width: '100%' }}>
                <UploadOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />
                <br />
                <Text strong>Файл хуулах</Text>
              </div>
            )}
          </Upload>
        </Col>

        <Row
          style={{
            width: '100%',
            marginTop: '18px',
          }}
          type="flex"
          justify="center"
        >
          <Col span={24}>
            <Dragger {...draggerProps}>
              <p className="ant-upload-hint">Энэ хэсэгт файлыг чирж </p>
              <p>авч ирэн хуулах боломжтой</p>
            </Dragger>{' '}
          </Col>
        </Row>
      </Row>
    </Modal>
  )
}
ModalFileCopy.propTypes = {
  laboratory_document: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_document_ModalFileCopy }) => ({
  laboratory_document_ModalFileCopy,
}))(withI18n()(ModalFileCopy))

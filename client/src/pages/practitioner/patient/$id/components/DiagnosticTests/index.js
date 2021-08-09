import React, { useState, useEffect } from 'react'
import PropTypes, { elementType } from 'prop-types'
import { Table, Form, Tabs, Button, Modal } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { BorderCollapse, MultiFileUpload } from 'components'
import styles from './../../styles.less'
import { PDFViewer } from 'react-view-pdf'
import * as dateTime from 'utils/datetime'
import Fibroscan from './components/Fibroscan'
//import Viewer from '@phuocng/react-pdf-viewer'; //online/url

const { TabPane } = Tabs

const CATEGORY = 'DiagnosticTests'

const DiagnosticTests = props => {
  const { i18n } = props
  const [tabIndex, setTabIndex] = useState('US')
  const [fileListDataSource, setFileListDataSource] = useState([])

  const title = <Trans id={'DiagnosticTests'} />

  const onTabChange = value => {
    setTabIndex(value)
  }

  const handleUpload = fileList => {
    return props
      .dispatch({
        type: 'practitioner_patient_profile/patientDataUpload',
        payload: {
          fileList: fileList,
          category: CATEGORY,
          subcategory: tabIndex,
        },
      })
      .then(() => {
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      .then(() => {
        return fetchFileList(tabIndex)
      })
  }

  const handleUploadError = errorInfo => {
    let type
    let content

    if (errorInfo === 'info') {
      type = 'info'
      content = i18n.t`FileTypeIsIncorrect`
    } else {
      type = 'error'
      content = i18n.t`Save failed`
    }

    return props.dispatch({
      type: 'practitioner_patient_profile/showModalMessage',
      payload: {
        type: type,
        content: content,
      },
    })
  }

  function fetchFileList(tabIndex) {
    return props
      .dispatch({
        type: 'practitioner_patient_profile/getUploadedPatientData',
        payload: {
          category: CATEGORY,
          subcategory: tabIndex,
        },
      })
      .then(result => {
        const newData = []
        result.map(element => {
          const size = element.fileSize / 1000
          const row = {
            ...element,
            fileName: element.fileName,
            fileSize: `${size} KB`,
            _createdAt: dateTime.toLocalDateTime(
              element._createdAt,
              'yyyy-mm-dd hh:mm'
            ),
          }
          newData.push(row)
        })

        return setFileListDataSource(newData)
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    fetchFileList(tabIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex])

  // useEffect(() => {
  //   fetchFileList(tabIndex)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.practitioner_patient_profile.patient.id])

  let imgData = ''
  const handleDownload = record => {
    return props
      .dispatch({
        type: 'practitioner_patient_profile/downloadUploadedPatientData',
        payload: {
          fileId: record._id,
        },
      })
      .then(response => {
        // const base64encoded = base64toBlob(response.data.file)
        // console.log(base64encoded)
        // const url = window.URL.createObjectURL(new Blob([base64encoded]))
        console.log(response)

        props.dispatch({
          type: 'practitioner_patient_profile/showModalFile',
          payload: {
            fileData: response.data,
          },
        })

        /*const link = document.createElement('a')
        link.href = response.data.file
        link.setAttribute('download', response.data.fileName)

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode.removeChild(link)*/
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  imgData = props.practitioner_patient_profile.modalFileData
  const modalData = []

  if (props.practitioner_patient_profile.modalFileData != undefined) {
    if (
      props.practitioner_patient_profile.modalFileData.fileType ===
      'application/pdf'
    ) {
      modalData.push(
        <PDFViewer
          style={{ width: '100%' }}
          url={props.practitioner_patient_profile.modalFileData.file}
        />
      )
    } else {
      modalData.push(
        <img
          style={{ width: '100%' }}
          src={props.practitioner_patient_profile.modalFileData.file}
        />
      )
    }
  }

  const modalImgProps = {
    visible: props.practitioner_patient_profile.modalFileVisible,
    maskClosable: true,
    centered: true,
    onOk(data) {
      console.log('----')
    },
    onCancel() {
      return props.dispatch({
        type: 'practitioner_patient_profile/hideModalFile',
      })
    },
  }

  const columns = [
    {
      title: <Trans id="FileName" />,
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: <Trans id="FileSize" />,
      dataIndex: 'fileSize',
      key: 'fileSize',
    },
    {
      title: <Trans id="Date" />,
      dataIndex: '_createdAt',
      key: '_createdAt',
    },
    {
      title: <Trans id="Action" />,
      key: 'action',
      render: (text, record) => {
        return (
          <Button onClick={() => handleDownload(record)}>
            <Trans id="Preview" />
          </Button>
        )
      },
    },
  ]

  return (
    <BorderCollapse displayName={title} bordered={true}>
      <Trans id="Visual Diagnostic" />
      <div style={{ borderTop: '1px solid #E9E9E9' }}></div>
      <div className="card-container">
        <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
          <TabPane tab="Fibroscan" key="Fibroscan">
            <Fibroscan writeAccess={props.writeAccess} tabIndex={tabIndex} />
          </TabPane>
          <TabPane tab="UltraSound" key="UltraSound">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>

          <TabPane tab="CT" key="CT">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="MRI" key="MRI">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="Endoscopy" key="Endoscopy">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="Opthalmalogical exam" key="OpthalmalogicalExam">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="Biopsy" key="Biopsy">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="Others" key="Others">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="EEG" key="EEG">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="ECG" key="ECG">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
          <TabPane tab="PAP smear" key="PAPsmear">
            <div className={styles.diagnoseTable}>
              <Table
                columns={columns}
                dataSource={fileListDataSource}
                rowKey={row => row._id}
              />
            </div>
            {props.writeAccess && (
              <MultiFileUpload
                handleSubmit={handleUpload}
                handleError={handleUploadError}
              />
            )}
          </TabPane>
        </Tabs>

        <Modal {...modalImgProps} width="60%" footer={null}>
          {modalData}
        </Modal>
      </div>
    </BorderCollapse>
  )
}

DiagnosticTests.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(DiagnosticTests)))

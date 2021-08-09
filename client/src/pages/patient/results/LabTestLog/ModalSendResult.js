import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, MessageModal } from 'components'
import { isEmptyObject, delay } from 'utils/helper'
import styles from './styles.less'
import { LabReport } from 'components'
import { LoadingOutlined } from '@ant-design/icons'

import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Checkbox,
  Input,
  Icon,
  Spin,
} from 'antd'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function generatePdf(document, elementId, orientation) {
  return html2canvas(document.getElementById(elementId), {
    onclone: function(documentClone) {
      documentClone.getElementById(elementId).style.opacity = '1'
    },
  }).then(canvas => {
    var imgData = canvas.toDataURL('image/png')

    /*
      Here are the numbers (paper width and height) that I found to work. 
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
    */
    var imgWidth = 210
    var pageHeight = 295
    var imgHeight = (canvas.height * imgWidth) / canvas.width - 30
    var heightLeft = imgHeight

    var doc = new jsPDF('p', 'mm')
    var position = 0

    doc.addImage(
      imgData,
      'PNG',
      0 + 15,
      position + 15,
      imgWidth - 30,
      imgHeight
    )

    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      doc.addPage()
      doc.addImage(
        imgData,
        'PNG',
        0 + 15,
        position + 15,
        imgWidth - 30,
        imgHeight
      )
      heightLeft -= pageHeight
    }

    return btoa(doc.output())
  })

  // /* #region  prev version */
  // return html2canvas(input).then(canvas => {
  //   // const imgData = canvas.toDataURL('image/png')
  //   var imgData = canvas.toDataURL('image/png')
  //   /*
  //     Here are the numbers (paper width and height) that I found to work.
  //     It still creates a little overlap part between the pages, but good enough for me.
  //     if you can find an official number from jsPDF, use them.
  //     */
  //   var imgWidth = 210
  //   var pageHeight = 295
  //   var imgHeight = (canvas.height * imgWidth) / canvas.width - 30
  //   var heightLeft = imgHeight
  //   var doc = new jsPDF('p', 'mm')
  //   var position = 0
  //   doc.addImage(
  //     imgData,
  //     'PNG',
  //     0 + 15,
  //     position + 15,
  //     imgWidth - 30,
  //     imgHeight
  //   )
  //   heightLeft -= pageHeight
  //   while (heightLeft >= 0) {
  //     position = heightLeft - imgHeight
  //     doc.addPage()
  //     doc.addImage(
  //       imgData,
  //       'PNG',
  //       0 + 15,
  //       position + 15,
  //       imgWidth - 30,
  //       imgHeight
  //     )
  //     heightLeft -= pageHeight
  //   }
  //   return btoa(doc.output())
  /* #endregion */
  /* #region  old version */
  // var pdf = new jsPDF('p', 'pt', 'a4')
  //   console.log('input.clientHeight', input.clientHeight)
  //   for (var i = 0; i <= input.clientHeight / 980; i++) {
  //     //! This is all just html2canvas stuff
  //     var srcImg = canvas
  //     var sX = 0
  //     var sY = 980 * i // start 980 pixels down for every new page
  //     var sWidth = 900
  //     var sHeight = 980
  //     var dX = 0
  //     var dY = 0
  //     var dWidth = 900
  //     var dHeight = 980
  //     const onePageCanvas = document.createElement('canvas')
  //     onePageCanvas.setAttribute('width', 900)
  //     onePageCanvas.setAttribute('height', 980)
  //     var ctx = onePageCanvas.getContext('2d')
  //     // details on this usage of this function:
  //     // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
  //     ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight)
  //     // document.body.appendChild(canvas);
  //     var canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0)
  //     var width = onePageCanvas.width
  //     var height = onePageCanvas.clientHeight
  //     //! If we're on anything other than the first page,
  //     // add another page
  //     if (i > 0) {
  //       // pdf.addPage(612, 791) //8.5" x 11" in pts (in*72)
  //       pdf.addPage(595.4, 842) // 8.27" × 11.69" in pts
  //     }
  //     //! now we declare that we're working on that page
  //     pdf.setPage(i + 1)
  //     //! now we add content to that page!
  //     pdf.addImage(canvasDataURL, 'PNG', 20, 40, width * 0.62, height * 0.62)
  //   }
  //   //! after the for loop is finished running, we save the pdf.
  //   pdf.save('Test.pdf')
  //   return btoa(pdf.output())
  //   // window.open(imgData)
  //   // const pdf = new jsPDF({
  //   //   orientation: 'landscape',
  //   // })
  //   // const imgProps = pdf.getImageProperties(imgData)
  //   // const pdfWidth = pdf.internal.pageSize.getWidth()
  //   // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  //   // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  //   // pdf.save('download.pdf')
  //   // document.body.appendChild(canvas)
  //   // const imgData = canvas.toDataURL('image/png')
  //   // window.open(imgData)
  //   // const pdf = new jsPDF({
  //   //   orientation: 'portrait',
  //   // })
  //   // const imgProps = pdf.getImageProperties(imgData)
  //   // const pdfWidth = pdf.internal.pageSize.getWidth()
  //   // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  //   // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  //   // return
  //   // return pdf.output()
  //
  /* #endregion */
  // })
}

let id = 0

const ModalSendResult = props => {
  const { i18n, data, form } = props

  const [emailAccounts, setEmailAccounts] = useState([])
  const [patientName, setPatientName] = useState()
  const [patientBarcode, setPatientBarcode] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [modalSpiningVisible, showSpinningModal] = useState(false)
  const spinningIcon = <LoadingOutlined style={{ fontSize: '70px' }} spin />
  /* #region  titles */
  const TitleInformation = (
    <Trans>
      <span className="title">Client </span>
      <span>information</span>
    </Trans>
  )

  const TitleModal = (
    <Trans>
      <span className="title">Sent </span>
      <span>result</span>
    </Trans>
  )

  const TitleChooseAccount = (
    <Trans>
      <span className="title">Choice of </span>
      <span>Email</span>
    </Trans>
  )

  /* #endregion */

  useEffect(() => {
    const { patient } = props.patient_portal

    form.resetFields()
    if (patient && !isEmptyObject(patient)) {
      const emails = patient.getEmails()
      setEmailAccounts(emails)
      setPatientName(patient.getOfficialNameString())
      setPatientBarcode(patient._getBarcode())
    }
  }, [props.patient_portal.patient])

  const { getFieldDecorator, getFieldValue } = form
  getFieldDecorator('keys', { initialValue: [] })
  const keys = getFieldValue('keys')

  function remove(k) {
    const { form } = props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one email
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  function add() {
    const { form } = props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  function onFormSubmit() {
    let emails = []

    props.form
      .validateFields()
      .then(values => {
        if (!!values.emails) {
          emails.push([...values.emails])
        }
        if (!!values.others) {
          emails.push([...values.others].filter(email => email))
        }

        // const pdfDocument = document.getElementById('pdfDocumentWrapper')

        return generatePdf(document, 'pdfDocumentWrapper', 'portrait')
        // return html2canvas(document.getElementById('pdfDocumentWrapper'), {
        //   onclone: function(documentClone) {
        //     documentClone.getElementById('pdfDocumentWrapper').style.opacity =
        //       '1'
        //   },
        // }).then(canvas => {
        //   var imgData = canvas.toDataURL('image/png')

        //   /*
        //     Here are the numbers (paper width and height) that I found to work.
        //     It still creates a little overlap part between the pages, but good enough for me.
        //     if you can find an official number from jsPDF, use them.
        //   */
        //   var imgWidth = 210
        //   var pageHeight = 295
        //   var imgHeight = (canvas.height * imgWidth) / canvas.width - 30
        //   var heightLeft = imgHeight

        //   var doc = new jsPDF('p', 'mm')
        //   var position = 0

        //   doc.addImage(
        //     imgData,
        //     'PNG',
        //     0 + 15,
        //     position + 15,
        //     imgWidth - 30,
        //     imgHeight
        //   )

        //   heightLeft -= pageHeight

        //   while (heightLeft >= 0) {
        //     position = heightLeft - imgHeight

        //     doc.addPage()
        //     doc.addImage(
        //       imgData,
        //       'PNG',
        //       0 + 15,
        //       position + 15,
        //       imgWidth - 30,
        //       imgHeight
        //     )
        //     heightLeft -= pageHeight
        //   }

        //   return btoa(doc.output())
        // })
      })
      .then(pdfDocument => {
        showSpinningModal(true)
        return props.dispatch({
          type: 'patient_portal/sendResultViaEmail',
          payload: {
            doc: pdfDocument,
            emails: emails,
            testName: props.data.display,
          },
        })
      })
      .then(async success => {
        showSpinningModal(!success)
        showMessageModal(success)
        await delay(2500)
        props.onCancel(success)
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  /* #region  col sizes */
  const emailAccounsLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 },
    },
  }

  const otherAccountsLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
    },
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 18, offset: 6 },
      sm: { span: 18, offset: 6 },
    },
  }
  /* #endregion */

  const otherAccounts = keys.map((key, index) => (
    <Form.Item
      {...(index === 0 ? otherAccountsLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? <Trans id="Other accounts" /> : ''}
      required={false}
      key={`modalSendResult_${index}`}
    >
      {getFieldDecorator(`others.${key}`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: false,
            message: 'Please input your E-mail!',
          },
        ],
      })(
        <Input
          placeholder={i18n.t`email account`}
          style={{ width: '80%', marginRight: 8 }}
        />
      )}
      {keys.length > 1 ? (
        <Icon
          className={styles['dynamic-delete-button']}
          type="minus-circle-o"
          onClick={() => remove(key)}
        />
      ) : null}
    </Form.Item>
  ))
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="900px"
      title={TitleModal}
      footer={[
        <Button
          className="button-gray"
          onClick={props.onCancel}
          key={'ModalSendResultButtonClose'}
        >
          <Trans id="Close" />
        </Button>,
        <Button
          disabled={
            !(form.getFieldsValue().emails || form.getFieldsValue().others)
              ? true
              : false
          }
          className="button-red"
          onClick={onFormSubmit}
          key={'ModalSendResultButtonSend'}
        >
          &nbsp;
          <Trans id="Send" />
        </Button>,
      ]}
    >
      <Form labelAlign="right">
        <ModuleBox title={TitleInformation}>
          <Form.Item {...emailAccounsLayout} label={i18n.t`PatientNumber`}>
            {patientBarcode}
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`PatientName`}>
            {patientName}
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`ServiceType`}>
            Лабораторийн шинжилгээ
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`ServiceName`}>
            {data.display}
          </Form.Item>
          <Form.Item
            {...emailAccounsLayout}
            label={i18n.t`SampleCollectionDate`}
          >
            {data.authoredOn}
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`RunCompletionDate`}>
            {data.issuedDate}
          </Form.Item>
        </ModuleBox>

        <ModuleBox title={TitleChooseAccount} centered>
          <Row type="flex" justify="space-between" gutter={32}>
            <Col span={12}>
              {emailAccounts.map((emailAccount, index) => (
                <Form.Item
                  label={i18n.t`RegisteredEmail`}
                  {...emailAccounsLayout}
                  key={`modalSendResult_${index}`}
                >
                  {getFieldDecorator(`emails`, {
                    rules: [{ required: false }],
                  })(
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row
                        style={{ margin: '6px 0', fontSize: '14px' }}
                        type="flex"
                        justify="space-between"
                      >
                        <Checkbox value={emailAccount}>{emailAccount}</Checkbox>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
              ))}
            </Col>
            <Col span={12}>
              <div className={styles.otherAccountsContainer}>
                {otherAccounts}
              </div>
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                  <Icon type="plus" />
                  &nbsp;
                  <Trans id="Add email" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </ModuleBox>
      </Form>

      <div style={{ height: '0', overflow: 'hidden' }}>
        <div id="pdfDocumentWrapper" style={{ opacity: '0' }}>
          <LabReport {...props.data} patient={props.app.Patient} />
        </div>
      </div>

      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={i18n.t`Test result sent successfully by Email`}
      />
      <MessageModal
        autoHide={false}
        visible={modalSpiningVisible}
        onCancel={() => showSpinningModal(false)}
        content={<Spin indicator={spinningIcon} />}
      />
    </Modal>
  )
}

ModalSendResult.propTypes = {
  patient_portal: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, patient_portal, loading }) => ({
  app,
  patient_portal,
  loading,
}))(withI18n()(Form.create()(ModalSendResult)))

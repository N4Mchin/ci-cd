const config = require('../config')
const nodemailer = require('nodemailer')
const axios = require('axios')

const env = process.env.NODE_ENV || 'dev'

async function sendSMS(mobilePhone, password, userName) {
  const emailText = `Elegnii tuv: Ta shinjilgeenii hariugaa https://app.livercenter.mn?id=${userName} -s awna uu. Ner: ${userName} ${
    password === false ? '' : `Nuuts ug: ${password}`
  } Utas: 70132006`

  const axiosConfig = {
    method: 'POST',
    url: config.lab_eleg_mn_SMS_API,
    data: {
      username: 'mono',
      password: 'msonfhir',
      mobilePhone: mobilePhone,
      message: emailText,
    },
  }

  const response = await axios(axiosConfig)
  if (response && response.status === 200) {
    return response
  } else {
    throw new Error(response)
  }
}

// async..await is not allowed in global scope, must use a wrapper
async function sendLaboratoryReport(email, pdfDocumentPath) {
  if ([email, pdfDocumentPath].includes(undefined)) {
    throw new Error('not enough parameters to send email')
  }

  /* #region  Mail settings */

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'laboratory@livercenter.mn', // generated ethereal user
      pass: 'mono2k19$', // generated ethereal password
    },
  })
  /* #endregion */

  /* #region emailText*/

  const emailText = `
    Танд энэ өдрийн мэнд хүргэе,

    Эрхэм үйлчлүүлэгч таны шинжилгээний хариуг илгээлээ.
    Та хавсралт хэсгээс шинжилгээний хариутай танилцана уу.

    Хүндэтгэсэн,

    Элэгний төв

     

    Энэхүү имэйлийг "Элэгний төв" эмнэлгээс автоматаар илгээсэн учир хариу бичих шаардлагагүй
  `

  /* #endregion */

  /* #region emailHTML*/
  const emailHtml = `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style>

          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important;
            }
            table[class=body] p,
                  table[class=body] ul,
                  table[class=body] ol,
                  table[class=body] td,
                  table[class=body] span,
                  table[class=body] a {
              font-size: 16px !important;
            }
            table[class=body] .wrapper,
                  table[class=body] .article {
              padding: 10px !important;
            }
            table[class=body] .content {
              padding: 0 !important;
            }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important;
            }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important;
            }
            table[class=body] .btn table {
              width: 100% !important;
            }
            table[class=body] .btn a {
              width: 100% !important;
            }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important;
            }
          }
          @media all {
            .ExternalClass {
              width: 100%;
            }
            .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
              line-height: 100%;
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important;
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important;
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important;
            }
          }
          </style>
        </head>
        <body class="" style="background-color: #ffffff; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <table class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #ffffff;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
        <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
        <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
        <tbody>
        <tr>
        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; box-sizing: border-box; padding: 20px;">
        <table>
        <tbody>
        <tr>
        <td style="width: 50%;">&nbsp;</td>
        <td><img style="width: 300px;" src="https://livercenter.mn/en/wp-content/uploads/2016/09/logo.png" /></td>
        <td style="width: 50%;">&nbsp;</td>
        </tr>
        <tr>
        <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
        <td colspan="3">
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Танд энэ өдрийн мэнд хүргэе,</p>
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Эрхэм үйлчлүүлэгч таны шинжилгээний хариуг илгээлээ.<br /> Та хавсралт хэсгээс шинжилгээний хариутай танилцана уу.</p>
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Хүндэтгэсэн,</p>
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Элэгний төв</p>
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">&nbsp;</p>
        <div class="gs">
        <div class="">
        <div id=":vk" class="ii gt">
        <div id=":vj" class="a3s aXjCH ">
        <div>
        <p><em>Энэхүү имэйлийг "Элэгний төв" эмнэлгээс автоматаар илгээсэн учир хариу бичих шаардлагагүй</em></p>
        </div>
        </div>
        <div class="yj6qo">&nbsp;</div>
        </div>
        <div class="hi">&nbsp;</div>
        </div>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <div style="background: #128A88; height: 1px; margin: 10px 0; opacity: 0.3;">&nbsp;</div>
        </td>
        </tr>
        </tbody>
        </table>
        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
        <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
        <p><span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;"> Элэгний төв <br /> УБ хот, СБД, 1-р хороо, 14230, Юнескогийн гудамж, <br />Далай Товер барилгын 2-р давхар</span></p>
        <p><span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Лавлах утас: 70132006</span></p>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        </tr>
        </tbody>
        </table>
        </body>
      </html>
      `

  /* #endregion */

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Элэгний төв" <laboratory@livercenter.mn>', // sender address
    to: email, // list of receivers
    subject: 'Шинжилгээний хариу',
    text: emailText,
    html: emailHtml,
    attachments: [
      {
        filename: 'laboratory_result.pdf',
        path: pdfDocumentPath,
        contentType: 'application/pdf',
      },
    ],
  })

  console.log('Email sent: %s', info.messageId)
}

async function sendResult({ contactPoint, pdfDocumentPath, patientInfo = {} }) {
  const { mobilePhones = [], emails = [] } = contactPoint
  const { password, userName } = patientInfo
  const sendEmailPromises = []

  console.log(mobilePhones, emails, pdfDocumentPath)
  emails.map(email => {
    if (env == 'production') {
      sendEmailPromises.push(sendLaboratoryReport(email, pdfDocumentPath))
    } else {
      if (
        [
          's.dalaikhuu@monosolution.co',
          'odgerel.a@monosolution.co',
          'sanjaasuren.e@monosolution.co',
          's.batbayar@monosolution.co',
        ].includes(email)
      ) {
        sendEmailPromises.push(sendLaboratoryReport(email, pdfDocumentPath))
      }
    }
  })

  const sendSmsPromises = []

  mobilePhones.forEach(mobilePhone => {
    if (env === 'production') {
      sendSmsPromises.push(sendSMS(mobilePhone, password, userName))
    } else {
      if (['95771559', '89111226', '99835737'].includes(mobilePhone)) {
        sendSmsPromises.push(sendSMS(mobilePhone, password, userName))
      }
    }
  })

  return Promise.all([...sendEmailPromises]).then(() => {
    return Promise.all([...sendSmsPromises])
  })
}

// exponential back-off
// const getResource = async (retryCount = 0, lastError = null) => {
//   if (retryCount > 5) throw new Error(lastError);
//   try {
//     return apiCall();
//   } catch (e) {
//     await delay(retryCount);
//     return getResource(retryCount + 1, e);
//   }
// };

module.exports = {
  sendResult,
}

const express = require('express')
const config = require('../config')
const nodemailer = require('nodemailer')

const router = new express.Router()

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// async..await is not allowed in global scope, must use a wrapper
async function sendPasswordRecoveryLink(payload) {
  if (payload === undefined) {
    throw new Error('not enough parameters to send email')
  }
  const prefix = `${config.frontend}/auth/passwordrecovery`
  const email = payload.email
  const link = prefix + '/' + payload.link

  /* #region  Mail settings */

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'password@livercenter.mn', // generated ethereal user
      pass: 'mono2k19$', // generated ethereal password
    },
  })
  /* #endregion */

  /* #region emailText*/
  const emailText = `
    Танд энэ өдрийн мэнд хүргэе.

    Таны доорх холбоосоор нууц үгээ солино уу.

    ${link}
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
      <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #ffffff;">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
          <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
              <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                <tr>
                  <td class="wrapper" style="font-family: sans-serif; font-size: 14px; box-sizing: border-box; padding: 20px;">
                    <table>
                      <tr>
                        <td style="width: 50%;">
                        </td>
                        <td>
                          <img src="https://livercenter.mn/en/wp-content/uploads/2016/09/logo.png"
                                          style="width: 300px"/>
                        </td>
                        <td style="width: 50%;">

                        </td>
                      </tr>
                      <tr>
                        <td colspan="3">
                          <div style="background: #128A88; height: 1px; margin: 10px 0; opacity: 0.3" />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3">
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                            Танд энэ өдрийн мэнд хүргэе,
                          </p>


                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                            Бид нууц үг шинэчлэх хүсэлт хүлээн авлаа.
                            Та доорх холбоосоор нууц үгээ шинэчилнэ үү.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                      <tr>
                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                            <tbody>
                              <tr>
                                <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                    <tbody>
                                      <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;">
                                          <a href="${link}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; border-color: #3498db;">
                                            Нууц үг шинэчлэх
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div style="background: #128A88; height: 1px; margin: 10px 0; opacity: 0.3" />
                      </tr>

                    </table>

                  </td>
                </tr>
              </table>
              <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                  <tr>
                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                      <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">
                      Элэгний төв <br />
                      УБ хот, СБД, 1-р хороо, 14230, Юнескогийн гудамж, <br />Далай Тауэр барилгын 2-р давхар, <b> </b></span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;
          </td>
        </tr>
      </table>
    </body>
  </html>
      `
  /* #endregion */

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Элэгний төв" <password@livercenter.mn>', // sender address
    to: email, // list of receivers
    subject: 'Нууц үг шинэчлэх',
    text: emailText,
    html: emailHtml,
  })
  //console.log('Message sent: %s', info.messageId)

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

// async..await is not allowed in global scope, must use a wrapper
async function sendLaboratoryResult(payload) {
  if (payload === undefined) {
    throw new Error('not enough parameters to send email')
  }

  const { emails, document, testName } = payload

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

    Эрхэм үйлчлүүлэгч таны "${testName}" шинжилгээний хариуг илгээлээ.
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
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Эрхэм үйлчлүүлэгч таны "${testName}" шинжилгээний хариуг илгээлээ.<br /> Та хавсралт хэсгээс шинжилгээний хариутай танилцана уу.</p>
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

  const FILE_CONTENT = document

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Элэгний төв" <laboratory@livercenter.mn>', // sender address
    to: emails, // list of receivers
    subject: 'Шинжилгээний хариу',
    text: emailText,
    html: emailHtml,
    attachments: [
      {
        filename: 'laboratory_result.pdf',
        content: new Buffer.from(FILE_CONTENT, 'base64'),
        contentType: 'application/pdf',
      },
    ],
  })

  console.log('Email sent: %s', info.messageId)

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = {
  sendPasswordRecoveryLink,
  sendLaboratoryResult,
}

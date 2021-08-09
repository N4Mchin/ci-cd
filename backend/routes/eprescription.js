const express = require('express')
const mongoose = require('mongoose')
const router = new express.Router()
const stream = require('stream')
const helper = require('@helper')
const FingerprintTokenModel = helper.modelLoader('FingerprintToken')
const uuid = require('uuid/v4')
const axios = require('axios')
const config = require('../config')
const qs = require('qs')
const { table } = require('console')
let token

const options = {
  data: qs.stringify(config.API.EPRESCRIPTION.data),
  method: 'POST',
  url: config.API.EPRESCRIPTION.url,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

router.get('/eprescription/token', async (req, res) => {
  const { data } = req.query
  const {
    practitionerId,
    patientId,
    patientNationalId,
    practitionerNationalId,
  } = data
  const patientBirthDate = helper.calculateBirthDate(patientNationalId)
  const patientAge = helper.calculateAgeFromBirthDate(patientBirthDate)

  const filter = {
    practitionerId: practitionerId,
    patientId: patientId,
  }
  const fingerPrintTokenDocument = await FingerprintTokenModel.findOne(
    filter
  ).exec()

  const fingerPrintToken =
    fingerPrintTokenDocument && fingerPrintTokenDocument.toObject()

  if (fingerPrintToken) {
    return res.json({
      success: true,
      data: {
        token: fingerPrintToken.token,
        patientFingerprint: fingerPrintToken.patientFingerprint,
        practitionerFingerprint: fingerPrintToken.practitionerFingerprint,
      },
    })
  }

  try {
    const token = await generateToken()

    const fingerprintTokens = new FingerprintTokenModel({
      practitionerId,
      practitionerNationalId,
      patientId,
      patientNationalId,
      token,
      isChild: patientAge < 18,
    })

    const document = await fingerprintTokens.save()

    const documentObject = document.toObject()

    return res.json({
      success: true,
      data: { token: documentObject.token },
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(500).send({
      success: false,
    })
  }
})

router.post('/eprescription/fingerprint', async (req, res) => {
  const {
    token,
    practitionerFingerprint,
    patientFingerprint,
    parentFingerprint,
    parentNationalIdentificationNumber,
  } = req.body
  const parentRegNo = parentNationalIdentificationNumber

  const filter = {
    token: token,
  }
  const fingerPrintTokenDocument = await FingerprintTokenModel.findOne(
    filter
  ).exec()

  if (!fingerPrintTokenDocument) {
    return res.status(403).send({
      success: false,
      message: 'Invalid token',
    })
  }

  const fingerPrintTokenObject = fingerPrintTokenDocument.toObject()

  if (
    fingerPrintTokenObject.isChild === true &&
    (parentFingerprint === undefined ||
      parentFingerprint === '' ||
      parentRegNo === undefined ||
      parentRegNo === '')
  ) {
    return res.status(403).send({
      success: false,
      message: 'Bad request',
    })
  }

  const practitionerBase64 = Buffer.from(practitionerFingerprint, 'base64')
  const patientBase64 =
    patientFingerprint && Buffer.from(patientFingerprint, 'base64')
  const parentBase64 =
    parentFingerprint && Buffer.from(parentFingerprint, 'base64')

  const practitionerBufferStrean = new stream.PassThrough()
  const patientBufferStream = new stream.PassThrough()
  const parentBufferStream = new stream.PassThrough()

  practitionerBufferStrean.end(practitionerBase64)
  patientBase64 && patientBufferStream.end(patientBase64)
  parentBase64 && parentBufferStream.end(parentBase64)

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'fingerprints',
  })

  function uploadFingerpringImage(stream, fileName) {
    return new Promise((resolve, reject) => {
      stream
        .pipe(bucket.openUploadStream(fileName))
        .on('error', function(error) {
          reject(error)
        })
        .on('finish', function(fileDoc) {
          resolve(fileDoc)
        })
    })
  }

  try {
    const practitionerFingerprintDoc = await uploadFingerpringImage(
      practitionerBufferStrean,
      `${uuid()}.png`
    )

    const patientFingerprintDoc =
      patientBase64 &&
      (await uploadFingerpringImage(patientBufferStream, `${uuid()}.png`))

    const parentFingerprintDoc =
      parentBase64 &&
      (await uploadFingerpringImage(parentBufferStream, `${uuid()}.png`))

    await FingerprintTokenModel.findOneAndUpdate(
      { token: token },
      {
        practitionerFingerprint: practitionerFingerprintDoc.filename,
        patientFingerprint:
          patientFingerprintDoc && patientFingerprintDoc.filename,
        parentFingerprint:
          parentFingerprintDoc && parentFingerprintDoc.filename,
        parentNationalId: parentRegNo,
      },
      {
        new: true,
      }
    )
    return res.status(200).send({
      success: true,
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

async function generateToken() {
  const token = helper.generateDigits(6)
  const result = await FingerprintTokenModel.find({
    token: token,
  })

  if (result.length > 0) {
    return generateToken()
  } else {
    return token
  }
}
//Эмийн жагсаалт авах
router.get('eprescription/prescription', async (req, res) => {
  try {
    const response = await axios({
      url: config.API.EPRESCRIPTION.prescription_url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        // Accept: 'application/json',
        'Content-Type': `application/json`,
      },
    })

    return res.status(200).send({
      success: true,
      data: response.data,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: true,
      message: 'Do nothing',
    })
  }
})

//Иргэний мэдээлэл авах
router.post('/eprescription/citizenInfo', async (req, res) => {
  const regNo = req.body.regNo
  const authorNo = req.body.authorRegNo
  let parentRegNo
  let practitionerFingerBase64
  let patientFingerBase64
  /////////////////////////////
  let practitionerFingerprintFilename
  let patientFingerprintFilename
  let parentFingerprintFilename
  let isChild
  const filter = {
    practitionerNationalId: authorNo,
    patientNationalId: regNo,
  }
  const fingerPrintModel = await FingerprintTokenModel.findOne(filter).exec()
  if (fingerPrintModel) {
    practitionerFingerprintFilename =
      fingerPrintModel.practitionerFingerprint &&
      fingerPrintModel.practitionerFingerprint !== '' &&
      fingerPrintModel.practitionerFingerprint
    parentFingerprintFilename =
      fingerPrintModel.parentFingerprint &&
      fingerPrintModel.parentFingerprint !== '' &&
      fingerPrintModel.parentFingerprint
    patientFingerprintFilename =
      fingerPrintModel.patientFingerprint &&
      fingerPrintModel.patientFingerprint !== '' &&
      fingerPrintModel.patientFingerprint
    parentRegNo =
      fingerPrintModel.parentNationalId &&
      fingerPrintModel.parentNationalId !== '' &&
      fingerPrintModel.parentNationalId
    isChild = fingerPrintModel.isChild
  }

  if (
    fingerPrintModel.isChild === true &&
    (parentFingerprint === undefined ||
      parentFingerprint === '' ||
      parentRegNo === undefined ||
      parentRegNo === '')
  ) {
    return res.status(403).send({
      success: false,
      message: 'Bad request',
    })
  }

  const gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'fingerprints',
  })
  function readFingerprint(fileName) {
    return new Promise((resolve, reject) => {
      const chunkArray = []
      gridfsbucket
        .openDownloadStreamByName(fileName)
        .on('data', function(chunk) {
          chunkArray.push(chunk)
        })
        .on('end', function() {
          const buffer = Buffer.concat(chunkArray)
          resolve(buffer)
        })
        .on('error', function(errorInfo) {
          reject(errorInfo)
        })
    })
  }

  try {
    const [
      practitionerFingerprintBuffer,
      patientFingerprintBuffer,
      parentFingerprintBuffer,
    ] = await Promise.all([
      readFingerprint(practitionerFingerprintFilename),
      patientFingerprintFilename && readFingerprint(patientFingerprintFilename),
      parentFingerprintFilename && readFingerprint(parentFingerprintFilename),
    ])
    practitionerFingerBase64 = practitionerFingerprintBuffer.toString('base64')
    patientFingerBase64 =
      patientFingerprintBuffer && patientFingerprintBuffer.toString('base64')
    parentFingerBase64 =
      parentFingerprintBuffer && parentFingerprintBuffer.toString('base64')
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.sendStatus(500)
  }

  try {
    const apiResponse = await axios(options)
    token = apiResponse.data.access_token
  } catch (errorInfo) {
    console.log(errorInfo)
  }
  let data = {}
  if (isChild === true) {
    data = {
      regNo: regNo,
      fingerPrint: patientFingerBase64,
      isChild: isChild,
      parentRegNo: parentRegNo,
      parentFingerPrint: parentFingerBase64,
      authorRegNo: authorNo,
      authorFingerPrint: practitionerFingerBase64,
    }
  } else {
    data = {
      regNo: regNo,
      fingerPrint: patientFingerBase64,
      isChild: isChild,
      authorRegNo: authorNo,
      authorFingerPrint: practitionerFingerBase64,
    }
  }
  try {
    const response = await axios({
      data: qs.stringify(data),
      method: 'POST',
      url: config.API.EPRESCRIPTION.citizenInfo_url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log('citizenInfo', response.data)
    return res.status(200).send({
      success: true,
      data: response.data,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: false,
      message: 'Do nothing',
    })
  }
})

//Хурууны хээ уншуулах боломжгүй иргэний мэдээлэл лавлах
router.get('/eprescription/citizenInfoWithoutFinger', async (req, res) => {
  const { regNo } = req.query

  try {
    const apiResponse = await axios(options)
    token = apiResponse.data.access_token
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    const response = await axios({
      url: config.API.EPRESCRIPTION.getNoFinger_url,
      method: 'GET',
      params: {
        regNo: regNo,
      },
      headers: {
        Authorization: 'Bearer ' + token,
        // Accept: 'application/json',
        'Content-Type': `application/json`,
      },
    })
    return res.status(200).send({
      success: true,
      data: response.data,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: true,
      message: 'Do nothing',
    })
  }
})
//Жор үүсгэх
router.post('/eprescription/savePrescription', async (req, res) => {
  const { formValues } = req.body
  let receiptDiag
  const tablets = []
  Object.keys(formValues).forEach(formValue => {
    receiptDiag = formValues[formValue].medication.diagnoseData.diagCode
    const tablet = {
      name: formValues[formValue].medication.selectedData.tbltNameInter,
      desc: formValues[formValue].note,
      packGroup: formValues[formValue].medication.selectedData.packGroup,
      dailyCount: formValues[formValue].timingRepeatFrequency.dateValue,
      isDiscount: formValues[formValue].medication.selectedData.isDiscount,
      totalDays: formValues[formValue].initialFillDuration.dateValue,
      tbltSize: formValues[formValue].initialFillQuantity,
      icdCode: receiptDiag,
      tbltTypeName: formValues[formValue].medication.selectedData.tbltId,
      tbltId: formValues[formValue].medication.selectedData.tbltId,
    }
    tablets.push(tablet)
  })
  const {
    SystolicArterialPressure,
    DiastolicBloodPressure,
    practitionerNationalId,
    patientNationalId,
    HeartRate,
    BodyHeight,
    BodyWeight,
    BodyTemperature,
    RespiratoryRate,
  } = req.body

  let practitionerFingerBase64
  let patientFingerBase64
  /////////////////////////////
  let practitionerFingerprintFilename
  let patientFingerprintFilename
  const filter = {
    practitionerNationalId: practitionerNationalId,
    patientNationalId: patientNationalId,
  }
  const fingerPrintModel = await FingerprintTokenModel.findOne(filter).exec()

  if (fingerPrintModel) {
    practitionerFingerprintFilename = fingerPrintModel.practitionerFingerprint

    patientFingerprintFilename = fingerPrintModel.patientFingerprint
  }
  const gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'fingerprints',
  })
  function readFingerprint(fileName) {
    return new Promise((resolve, reject) => {
      const chunkArray = []
      gridfsbucket
        .openDownloadStreamByName(fileName)
        .on('data', function(chunk) {
          chunkArray.push(chunk)
        })
        .on('end', function() {
          const buffer = Buffer.concat(chunkArray)
          resolve(buffer)
        })
        .on('error', function(errorInfo) {
          reject(errorInfo)
        })
    })
  }

  try {
    const [
      practitionerFingerprintBuffer,
      patientFingerprintBuffer,
    ] = await Promise.all([
      readFingerprint(practitionerFingerprintFilename),
      readFingerprint(patientFingerprintFilename),
    ])
    practitionerFingerBase64 = practitionerFingerprintBuffer.toString('base64')
    patientFingerBase64 = patientFingerprintBuffer.toString('base64')
  } catch (errorInfo) {
    return res.sendStatus(500)
  }
  ////////////////////////////////////////////////////////////////////

  try {
    const apiResponse = await axios(options)

    token = apiResponse.data.access_token
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    const encoded = encodeURI(practitionerNationalId)
    ///Жор бичих эрхтэй эмчийн РД
    // const encoded = encodeURI('ЕЦ95042801')
    const response = await axios({
      data: {
        receiptType: 1,
        receiptDiag: receiptDiag,
        desc: '',
        patient: {
          regNo: patientNationalId,
          fingerPrint: patientFingerBase64,
        },
        doctor: {
          fingerImage: practitionerFingerBase64,
        },
        survey: {
          heigth: BodyHeight,
          weigth: BodyWeight,
          waist: '',
          pulse: HeartRate,
          breath: RespiratoryRate,
          temp: BodyTemperature,
          saturatsi: '',
          sugar: '',
          cholesterol: '',
          maxPressure: SystolicArterialPressure,
          minPressure: DiastolicBloodPressure,
          isSmoke: false,
        },
        tablets: tablets,
      },
      //data: request,

      method: 'POST',
      url: config.API.EPRESCRIPTION.savePrescription_url,
      headers: {
        'Account-RegNo': encoded,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    console.log('savePrescription', response.data)
    return res.status(200).send({
      success: true,
      data: response.data,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: true,
      message: 'Do nothing',
    })
  }
})
//Үүсгэсэн жорын мэдээлэл лавалх сервис
router.get('/eprescription/savedPrescriptionByType', async (req, res) => {
  const { regNo } = req.query

  try {
    const apiResponse = await axios(options)
    token = apiResponse.data.access_token
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    const response = await axios({
      url: config.API.EPRESCRIPTION.savedPrescriptionByType_url,
      method: 'GET',
      params: {
        regNo: regNo,
        receiptNumber: '',
        type: 1,
      },
      headers: {
        Authorization: 'Bearer ' + token,
        // Accept: 'application/json',
        'Content-Type': `application/json`,
      },
    })
    //Тест хийхэд хэрэг болж байгаа тул битгий устгаарай
    console.log('savedPrescriptionByType', response.data)
    return res.status(200).send({
      success: true,
      data: response.data,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: true,
      message: 'Do nothing',
    })
  }
})
//Өвчний оношоор эмийн мэдээлэл харах
router.get('/eprescription/drugInfoByDiagnose', async (req, res) => {
  const { diagCode, regNo } = req.query

  try {
    const apiResponse = await axios(options)

    token = apiResponse.data.access_token
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  let newToken

  try {
    const response = await axios({
      url: config.API.EPRESCRIPTION.drugInfoByDiagnose_url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      params: {
        diagCode: diagCode,
        regNo: regNo,
        receiptType: 1,
      },
    })

    return res.status(200).send({
      success: true,
      data: response.data,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: false,
      message: 'request failed',
    })
  }
})

module.exports = router

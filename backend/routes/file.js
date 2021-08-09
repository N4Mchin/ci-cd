const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const helper = require('@helper')
const mime = require('mime')

const router = new express.Router()
router.use(bodyParser.json())
const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
})

const FileModel = helper.modelLoader('File')

router.post('/file', upload.any(), (req, res) => {
  const {
    fileList,
    category,
    subcategory,
    patientId,
    recordedPractitionerId,
  } = req.body

  if (!patientId || !category || !recordedPractitionerId || !fileList) {
    return res.status(200).json({
      success: false,
      message: 'Upload failed',
    })
  }

  const fileListParsed = JSON.parse(fileList)

  const filePromises = fileListParsed.map(file => {
    if (!file.name || !file.type || !file.size) {
      throw new Error('file data is sufficient')
    }

    const fileInstance = new FileModel({
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      fileSize: file.size,
      fileName: file.name,
      fileType: file.type,
      category: category,
      subcategory: subcategory,
      recordedPractitionerId: recordedPractitionerId,
      patientId: patientId,
      file: file.base64file,
    })

    return fileInstance.save()
  })

  Promise.all(filePromises)
    .then(() => {
      console.log('saved')
      return res.status(200).json({
        success: true,
        message: 'Upload successful',
      })
    })
    .catch(errorInfo => {
      console.log("couldn't save file", errorInfo)
      return res.status(200).json({
        success: false,
        message: 'Upload failed',
      })
    })
})

router.get('/file/info/:patientId', async (req, res) => {
  const { patientId } = req.params
  const { category, subcategory } = req.query

  const fileListDocuments = await FileModel.find({
    patientId: patientId,
    category: category,
    subcategory: subcategory,
  })

  const fileList = fileListDocuments.map(document => document.getInfo())

  return res.status(200).json({
    success: true,
    data: fileList,
  })
})

router.get('/file/:patientId/:fileId', async (req, res) => {
  const { patientId, fileId } = req.params

  const fileDocument = await FileModel.findOne({
    patientId: patientId,
    _id: fileId,
  })

  const fileObject = fileDocument.toObject()
  // const fileBuffer = Buffer.from(fileObject.file, 'base64')

  // fileObject.file = fileBuffer
  console.log(fileObject)
  // res.setHeader(
  //   'Content-disposition',
  //   `attachment; filename=${fileObject.fileName}`
  // )
  // res.setHeader('content-type', 'blob')
  // return res.send(fileObject)
  return res.status(200).json({
    success: true,
    data: fileObject,
  })
  // return res.download(fileBuffer, fileO)
})

module.exports = router

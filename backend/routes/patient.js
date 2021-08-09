const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const CONFIG = require('@config')
const helper = require('@helper')
const controller = require('@controller')
const fhirRequest = require('@utils/fhirRequest')
const Identifiers = require('@constants/Identifiers')
const PatientBarcodeModel = helper.modelLoader('PatientBarcode')
const userModel = helper.modelLoader('user')
const fhirService = require('@services/fhir')

const router = new express.Router()
router.use(bodyParser.json())

// Create request with transaction
router.post('/patient/patientInformationList', (req, res) => {
  const transactionRequest = req.body
  const patientResource = transactionRequest.entry.find(
    v => v.resource && v.resource.resourceType === 'Patient'
  ).resource
  const Patient = controller.loadResource(patientResource)
  const patientName = patientResource.name
  let firstName
  let patientEmail = Patient.getEmails().toString()
  let lastName
  let userId
  let NInum = patientResource.identifier
    .find(i => i.system === Identifiers.NationalIdentificationNumber.system)
    .value.toUpperCase()

  const patientInstance = new PatientBarcodeModel({
    patientName: patientName,
    nationalIdentificationNumber: NInum,
  })

  let barcode
  let patientResourceResult

  console.log('patientInstance---------------', patientInstance)
  patientInstance
    .save()
    .then(doc => {
      const docObject = doc.toObject()
      barcode = docObject.barcode

      // add barcode to patient resource
      transactionRequest.entry
        .find(v => v.resource && v.resource.resourceType === 'Patient')
        .resource.identifier.push({
          ...Identifiers.LiverCenter.PatientIdentifier,
          value: barcode.toString(),
        })

      return transactionRequest
    })
    .then(data =>
      // send to fhir
      {
        return fhirRequest({
          method: 'POST',
          url: `/api`,
          data: data,
        })
      }
    )
    .then(response => {
      const transactionResponse = response.data
      patientResourceResult = transactionResponse.entry.find(
        v => v.resource && v.resource.resourceType === 'Patient'
      ).resource

      let { name, id, identifier } = patientResourceResult
      userId = id
      const officialName = name.find(n => n.use === 'official')
      firstName = officialName.given[0]
      lastName = officialName.family

      return PatientBarcodeModel.findOneAndUpdate(
        {
          barcode: identifier.find(
            v => v.system === Identifiers.LiverCenter.PatientIdentifier.system
          ).value,
        },
        {
          patientName: name,
          patientFirstName: firstName,
          patientLastName: lastName,
          patientId: id,
        }
      )
    })
    .then(doc => {
      const docObject = doc.toObject()
      const password = docObject.nationalIdentificationNumber.substring(4)

      const newUserInstance = new userModel({
        permission: {
          role: CONFIG.ROLE_TYPE.PATIENT,
          access: {
            write: true,
            read: true,
          },
          scope: [CONFIG.ROLE_TYPE.PATIENT],
        },
        email: patientEmail ? patientEmail : undefined,
        username: docObject.barcode,
        nationalIdentificationNumber: docObject.nationalIdentificationNumber,
        password: password,
        firstName: firstName,
        lastName: lastName,
        patientId: userId,
      })

      return newUserInstance.save()
    })
    .then(doc => {
      return res.status(200).json({
        success: true,
        message: 'Patient saved successfully.',
        data: {
          patient: patientResourceResult,
        },
      })
    })
    .catch(async errorInfo => {
      let status
      let msg

      try {
        if (
          errorInfo.message.startsWith('E11000 duplicate key error collection')
        ) {
          // do sth.
          status = 400
          msg = 'Duplicate key error'
        } else {
          console.error(errorInfo)
          await PatientBarcodeModel.findOneAndDelete({
            barcode: barcode,
          }).exec()
          status = 400
          msg = 'Save patient resource failed'
        }
      } catch (dbError) {
        console.log(dbError)
        status = 500
        msg = 'Server internal error'
      }

      return res.status(status).json({ success: false, message: msg })
    })
})

// Create request with transaction
router.put('/patient/patientInformationList', (req, res) => {
  const { transaction } = req.body

  const axiosConfig = {
    method: 'POST',
    url: `${CONFIG.fhirServer}/api`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
    data: transaction,
  }

  axios(axiosConfig)
    .then(function(result) {
      // console.log(result.data)
      return res
        .status(200)
        .json({ success: true, message: 'Patient saved successfully.' })
    })
    .catch(err => {
      console.log('GetPatients error: ', err.response.data)
      return res.status(400).json({ success: false, data: err })
    })
})

router.get('/patient/patientInformationList/:id', (req, res) => {
  const query = `subject=Patient/${req.params.id}&identifier=http://livercenter.mn|PatientInformation`
  const listRequestConfig = {
    method: 'GET',
    url: `${CONFIG.fhirServer}/api/List?${query}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
  }

  // console.log(req.params.id, listRequestConfig)

  const batchRequestConfig = {
    method: 'POST',
    url: `${CONFIG.fhirServer}/api`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
  }

  axios(listRequestConfig)
    .then(function(response) {
      let batch = {
        resourceType: 'Bundle',
        type: 'batch',
        entry: [],
      }
      let list = response.data.entry.find(
        value => value.resource && value.resource.resourceType === 'List'
      ).resource

      batch.entry = list.entry.map(value => {
        return {
          request: {
            method: 'GET',
            url: value.item.reference,
          },
        }
      })

      batch.entry.push({
        request: {
          method: 'GET',
          url: `List/${list.id}`,
        },
      })

      return batch
    })
    .then(function(batch) {
      batchRequestConfig.data = batch
      return axios(batchRequestConfig)
    })
    .then(function(response) {
      console.log(
        'response received',
        response.data.entry[0].resource.identifier[0].type
      )
      return res.status(200).json({ success: true, data: response.data })
    })
    .catch(err => {
      return res.status(400).json({ success: false, data: err })
    })
})

const getPatient = async id => {
  const axiosConfig = {
    method: 'get',
    url: `${CONFIG.fhirServer}/api/Patient/${id}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
  }

  try {
    return await axios(axiosConfig)
  } catch (error) {
    console.error(error)
    return error
  }
}

const makeRequestOne = async (req, res, id) => {
  try {
    const result = await getPatient(id)

    if (!!result) {
      // console.log(result.data)
      return res.status(200).json({
        success: true,
        data: result.data,
      })
    }

    return res.status(404)
  } catch (err) {
    console.log(err)
  }
}

router.get('/patient', (req, res) => {
  return fhirService
    .getResource('Patient', req.query)
    .then(response => {
      return res.status(200).json({
        success: true,
        data: response.data,
        total: response.data.length,
      })
    })
    .catch(errorInfo => {
      console.log('GetPatients error: ', errorInfo)

      return res.json({ success: false, status: 200 })
    })
})

router.get('/patient/:id', (req, res) => {
  return makeRequestOne(req, res, req.params.id)
})

module.exports = router

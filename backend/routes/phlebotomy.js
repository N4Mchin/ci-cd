const express = require('express')
const bodyParser = require('body-parser')
const helper = require('@helper')
const config = require('../config')
const axios = require('axios')
const Identifiers = require('@constants/Identifiers')

const router = new express.Router()
const SpecimenBarcodeModel = require('../models/specimenBarcode')
router.use(bodyParser.json())

/* #region  barcode */

const LiverCenterSpecimenSystem = Identifiers.LiverCenter.Specimen.system

router.get('/phlebotomy/specimenReference', async (req, res) => {
  const { requisition } = req.query

  try {
    const SpecimenModel = helper.modelLoader('specimenReference')
    const document = await SpecimenModel.findOne({
      'requisition.system': requisition.system,
      'requisition.value': requisition.value,
    })

    const resDocument = document.toJSON()

    if (resDocument) {
      return res.status(200).json({
        success: true,
        message: 'Read specimen reference successful',
        data: {
          specimenReference: resDocument,
        },
      })
    }
  } catch {}

  // return message of reading specimen reference which send to
  // phlebotomys orderservice

  return res.status(200).json({
    success: false,
    message: 'Та сорьц захиалаагүй байна',
  })

  // else {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Та сорьц захиалаагүй байна",
  //   });
  // }
})

router.post('/phlebotomy/specimenBarcode', async (req, res) => {
  const {
    testNameString,
    testCodes,
    specimenFullUrl,
    transaction,
    requisition,
    patientInformation,
    dataSource,
  } = req.body
  console.log(dataSource)

  const usedEquipmentObject = dataSource.map(v => {
    return {
      equipmentName: v.name,
      productId: v.productId,
      number: v.quantity,
    }
  })

  const specimenBarcode = new SpecimenBarcodeModel({ test: testNameString })
  let specimenResult
  let specimenBarcodeResult
  specimenBarcode
    .save()
    .then(result => {
      specimenBarcodeResult = result
      const specimenIdentifier = {
        use: 'usual',
        system: LiverCenterSpecimenSystem,
        value: result.barcode.toString(),
      }
      transaction.entry.find(
        v =>
          v.resource &&
          v.resource.resourceType === 'Specimen' &&
          v.fullUrl === specimenFullUrl
      ).resource.identifier = [specimenIdentifier]

      transaction.entry.find(
        v =>
          v.resource &&
          v.resource.resourceType === 'Specimen' &&
          v.fullUrl === specimenFullUrl
      ).resource.accessionIdentifier = specimenIdentifier
      return transaction
    })
    .then(data => {
      const axiosConfig = {
        method: 'POST',
        url: `${config.fhirServer}/api`,
        headers: {
          'Content-Type': 'application/fhir+json',
          Accept: 'application/fhir+json',
        },
        data: data,
      }

      return axios(axiosConfig)
    })
    .then(response => {
      specimenResult = response.data.entry.find(
        v =>
          v.resource &&
          v.resource.resourceType === 'Specimen' &&
          v.resource.identifier.some(
            identifierItem =>
              identifierItem.system === LiverCenterSpecimenSystem &&
              identifierItem.value === specimenBarcodeResult.barcode
          )
      ).resource

      let { id, identifier, subject, request } = specimenResult

      return SpecimenBarcodeModel.findOneAndUpdate(
        {
          barcode: identifier.find(v => v.system === LiverCenterSpecimenSystem)
            .value,
        },
        {
          specimenId: id,
          specimenSubject: subject,
          specimenRequest: request,
          requisition: requisition,
        }
      )
    })
    .then(async () => {
      var SpecimenModel = helper.modelLoader('specimenReference')
      let document = await SpecimenModel.findOne({
        'requisition.system': requisition.system,
        'requisition.value': requisition.value,
      })

      if (document) {
        // update
        const resSpecimenModel = document.toJSON()

        let { specimen } = resSpecimenModel

        specimen.push({
          test: testNameString,
          testCodes: testCodes,
          barcode: specimenBarcodeResult.barcode,
          usedEquipments: usedEquipmentObject,
        })
        return SpecimenModel.findOneAndUpdate(
          {
            'requisition.system': requisition.system,
            'requisition.value': requisition.value,
          },
          { specimen },
          {
            new: true,
          }
        )
      } else {
        // create
        const instance = new SpecimenModel({
          patient: patientInformation,
          requisition: requisition,
          specimen: [
            {
              test: testNameString,
              testCodes: testCodes,
              barcode: specimenBarcodeResult.barcode,
              usedEquipments: usedEquipmentObject,
            },
          ],
        })

        return instance.save()
      }
    })
    .then(async () => {
      var ExternalSpecimenLogModel = helper.modelLoader('ExternalSpecimenLog')
      let document = await ExternalSpecimenLogModel.findOneAndUpdate(
        {
          'requisition.system': requisition.system,
          'requisition.value': requisition.value,
        },
        { $push: { barcode: specimenBarcodeResult.barcode } }
      )
    })
    .then(specimenReferenceResult => {
      return res.status(200).json({
        success: true,
        message: 'Specimen saved successfully.',
        data: {
          specimen: specimenResult,
          specimenReference: specimenReferenceResult,
        },
      })
    })
    .catch(err => {
      console.log(Object.keys(err), err)
      return res.status(400).json({ success: false, data: err })
    })
})

/* #endregion */

/* #region  phlebotomy materials */

router.get('/phlebotomy/exposureMaterials', async (req, res) => {
  //ugugdliin sangaas husnegt songoh
  const Model = helper.modelLoader('materials')
  // console.log(req);
  //husnegtees ogogdol awah
  const document = await Model.find({ type: 'exposureKit' })

  // console.log(document);
  if (document) {
    console.log('success of materials')
  } else {
    console.log('failed')
  }

  return res.status(200).json({
    success: true,
    message: 'Read successful',
    data: document,
  })
})

router.get('/phlebotomy/equipmentMaterials', async (req, res) => {
  console.log('hi there its backend')
  const Model = helper.modelLoader('materials')

  const document = await Model.find({ type: 'tool' })

  if (document) {
    console.log('success of tool')
  } else {
    console.log('failed')
  }

  return res.status(200).json({
    success: true,
    message: 'Read Equipments/tool',
    data: document,
  })
})

router.post('/phlebotomy/deleteMaterials', async (req, res) => {
  const { dataSource } = req.body

  //ugugdliin sangaas husnegt songoh
  const Model = helper.modelLoader('materials')
  if (dataSource) {
    dataSource.map(materials => {
      return Model.findOne({ productId: materials.productId })
        .then(doc => {
          if (doc) {
            Model.findOneAndUpdate({})
            return Model.update(
              {
                productId: materials.productId,
                lotNumber: materials.lotNumber,
              },
              {
                quantity: doc.quantity - materials.quantity,
              },
              { new: true }
            )
          } else {
            material.type = ''
            materials.id = materials.productId
            const materialsInstance = new Model(materials)
            return materialsInstance.save()
          }
        })
        .catch(errorInfo => {
          console.log(errorInfo)
          res.status(200).json({
            success: false,
            message: 'Create failed',
          })
        })
    })
    return res.status(200).json({
      success: true,
      message: 'Create successful',
    })
  } else {
    return res.status(200).json({
      success: true,
      message: 'Do nothing',
    })
  }
})

router.get('/phlebotomy/firstAidMaterials', async (req, res) => {
  //ugugdliin sangaas husnegt songoh
  const Model = helper.modelLoader('materials')
  // console.log(req);
  //husnegtees ogogdol awah
  const document = await Model.find({ type: 'firstAidKit' })

  // console.log(document);
  if (document) {
    console.log('success of materials')
  } else {
    console.log('failed')
  }

  return res.status(200).json({
    success: true,
    message: 'Read successful',
    data: document,
  })
})

router.post('/phlebotomy/materials', async (req, res) => {
  const { dataSource } = req.body

  //ugugdliin sangaas husnegt songoh
  const Model = helper.modelLoader('materials')
  const productId = 0
  dataSource.map(materials => {
    return Model.findOne({ productId: materials.productId })
      .then(doc => {
        // console.log(doc);

        if (doc) {
          Model.findOneAndUpdate({})
          return Model.update(
            {
              productId: materials.productId,
              lotNumber: materials.lotNumber,
            },
            {
              quantity: doc.quantity + materials.quantity,
            },
            { new: true }
          )
        } else {
          materials.type = 'tool'
          materials.id = materials.productId
          const materialsInstance = new Model(materials)
          return materialsInstance.save()
        }
      })
      .catch(errorInfo => {
        console.log(errorInfo)
        res.status(200).json({
          success: false,
          message: 'Create failed',
        })
      })
  })
  return res.status(200).json({
    success: true,
    message: 'Create successful',
  })
})

/* #endregion */

router.get('/phlebotomy/searchBarcodeEquipment', async (req, res) => {
  console.log('it is barcode searching in backend')
})

/* #region  barcode and national identification number search*/
router.get('/phlebotomy/patientList/:id', async (req, res) => {
  const { id } = req.params

  let searchedClientInformation
  if (!!id) {
    const searchedValue = new RegExp('^' + id)

    if (id[0].match(/^[0-9]$/)) {
      try {
        searchedClientInformation = await helper.getResource('barcode', {
          barcode: searchedValue,
        })
      } catch {}
    } else {
      try {
        searchedClientInformation = await helper.getResource('barcode', {
          nationalIdentificationNumber: searchedValue,
        })
      } catch {}
    }

    if (searchedClientInformation) {
      return res.status(200).json({
        success: true,
        message: 'Success of searching client',
        data: {
          clientInformations: searchedClientInformation,
        },
      })
    } else {
      console.log('failed')
    }
  }
})
/* #endregion */

module.exports = router

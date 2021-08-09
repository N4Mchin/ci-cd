const express = require('express')
const bodyParser = require('body-parser')
const helper = require('@helper')

const router = new express.Router()
router.use(bodyParser.json())

router.get('/search/searchPatientList/:id', async (req, res) => {
  const { id } = req.params

  let searchedClientInformation
  if (!!id) {
    const searchedBarcodeValue = new RegExp('^' + id)

    if (id[0].match(/^[0-9]$/)) {
      try {
        searchedClientInformation = await helper.getResource('barcode', {
          barcode: searchedBarcodeValue,
        })
      } catch {}
    } else {
      try {
        searchedClientInformation = await helper.getResource('barcode', {
          nationalIdentificationNumber: searchedBarcodeValue,
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

module.exports = router

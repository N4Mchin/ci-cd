const express = require('express')
const helper = require('@helper')

const specimenBarcodeModel = helper.modelLoader('specimenBarcode')

const router = new express.Router()

router.get('/externalSamples', async (req, res) => {
  const result = await specimenBarcodeModel.find()

  return res.status(200).send({
    success: true,
    data: result,
  })
})

router.put('/externalSamples', async (req, res) => {
  const updatePromises = req.body.dataSource.map(item => {
    const { barcode } = item

    return specimenBarcodeModel.findOneAndUpdate({ barcode }, item, {
      new: true,
    })
  })

  try {
    await Promise.all(updatePromises)
    return res.status(200).send({
      success: true,
      data: {},
    })
  } catch (error) {
    return res.status(200).send({
      success: false,
      data: error,
    })
  }
})

module.exports = router

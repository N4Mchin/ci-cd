const mongoose = require('mongoose')
const helper = require('@helper')

const SpecimenBarcodeSchema = new mongoose.Schema(
  {
    barcode: String,
    test: String,
    _createdAt: { type: String, unique: false },
  },
  { strict: false }
)

SpecimenBarcodeSchema.pre('save', async function saveHook(next) {
  try {
    let tempBarcode
    do {
      tempBarcode = helper.generateBarcode({
        standard: 'ean13',
        type: 'specimen',
      })
    } while (
      (await SpecimenBarcodeModel.countDocuments({
        barcode: tempBarcode,
      }).exec()) !== 0
    )

    this.barcode = tempBarcode
    next()
  } catch (errorInfo) {
    console.log(errorInfo)
    throw errorInfo
  }
})

const SpecimenBarcodeModel = mongoose.model(
  'specimenBarcode',
  SpecimenBarcodeSchema,
  'specimenBarcodes'
)

module.exports = SpecimenBarcodeModel

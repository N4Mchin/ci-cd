const mongoose = require('mongoose')
const helper = require('@helper')

const PatientBarcodeSchema = new mongoose.Schema(
  {
    barcode: { type: String, unique: true },
    nationalIdentificationNumber: { type: String, unique: true },
    patientId: String,
    patientName: mongoose.Schema.Types.Mixed,
    _createdAt: { type: String, unique: false },
  },
  { strict: false }
)

PatientBarcodeSchema.pre('save', async function saveHook(next) {
  try {
    let tempBarcode
    do {
      tempBarcode = helper.generateBarcode({
        standard: 'ean13',
        type: 'patient',
      })
    } while (
      (await PatientBarcodeModel.countDocuments({
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

const PatientBarcodeModel = mongoose.model(
  'PatientBarcode',
  PatientBarcodeSchema,
  'PatientBarcodes'
)

module.exports = PatientBarcodeModel

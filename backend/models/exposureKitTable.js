const mongoose = require('mongoose')
const helper = require('@helper')
// define the ExposureKitTable model schema
const ExposureKitTableSchema = new mongoose.Schema({
  id: { type: String, required: true },
  medicationName: { type: String, required: false },
  quantity: { type: Number, required: false },
  measurementUnit: { type: String, required: false },
  theAmountInPerPackage: { type: String, required: false },
  productId: { type: String, required: false },
  lotNumber: { type: String, required: false },
  expirationDate: { type: Date, required: false },
  _createdAt: { type: String, unique: false },
})
ExposureKitTableSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

ExposureKitTableSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'exposureKitTable',
  ExposureKitTableSchema,
  'ExposureKitTable'
)

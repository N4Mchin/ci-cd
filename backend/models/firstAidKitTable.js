const mongoose = require('mongoose')
const helper = require('@helper')
// define the firstAidKitTable model schema
const FirstAidKitTableSchema = new mongoose.Schema({
  id: { type: String, required: true },
  materialName: { type: String, required: false },
  quantity: { type: Number, required: false },
  measurementUnit: { type: String, required: false },
  dose_shape: { type: String, required: false },
  productId: { type: String, required: false },
  lotNumber: { type: String, required: false },
  expirationDate: { type: Date, required: false },
  _createdAt: { type: String, unique: false },
})

FirstAidKitTableSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

FirstAidKitTableSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'FirstAidKitTable',
  FirstAidKitTableSchema,
  'FirstAidKitTable'
)

const mongoose = require('mongoose')
const helper = require('@helper')
// define the Materials model schema
const MaterialsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, require: false },
    quantity: { type: Number, required: false },
    icon: { type: String, required: false },
    backgroundColor: { type: String, required: false },
    measurementUnit: { type: String, required: false },
    dose_shape: { type: String, required: false },
    amountPerPackage: { type: String, required: false },
    productId: { type: String, required: false },
    lotNumber: { type: String, required: false },
    sortKey: { type: Number, required: false },
    expirationDate: { type: Date, required: false },
    _createdAt: { type: String, unique: false },
  },
  {
    strict: false,
  }
)
MaterialsSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

MaterialsSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('Materials', MaterialsSchema, 'Materials')

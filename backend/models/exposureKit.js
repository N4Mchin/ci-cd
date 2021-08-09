const mongoose = require('mongoose')
const helper = require('@helper')
// define the Equpment model schema
const ExposureKitSchema = new mongoose.Schema({
  id: { type: String, required: true },
  cycloferon: { type: Number, required: false },
  azitron: { type: Number, required: false },
  benzylpenicillin: { type: Number, required: false },
  iodum: { type: Number, required: false },
  sodiumChloride: { type: Number, required: false },
  ofloxacin: { type: Number, required: false },
  levosinMethyluracil: { type: Number, required: false },
  tetracycline: { type: Number, required: false },
  sterileGlove: { type: Number, required: false },
  redVacutainerNeedle: { type: Number, required: false },
  exposureAlcoholPad: { type: Number, required: false },
  syringe3gr: { type: Number, required: false },
  syringe10gr: { type: Number, required: false },
  exposureCottonBud: { type: Number, required: false },
  exposureAdhesiveBandage: { type: Number, required: false },
  _createdAt: { type: String, unique: false },
})

ExposureKitSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

ExposureKitSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'ExposureKit',
  ExposureKitSchema,
  'ExposureKits'
)

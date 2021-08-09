const mongoose = require('mongoose')
const helper = require('@helper')
// define the Paymenttype model schema
const SampleModuleSchema = new mongoose.Schema({
  serviceRequestId: { type: String, required: true, unique: true },
  apparatus: { type: String, required: true },
  module: { type: String, required: true },
  _createdAt: { type: String, unique: false },
})

SampleModuleSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

SampleModuleSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('SampleModules', SampleModuleSchema)

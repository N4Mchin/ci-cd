const mongoose = require('mongoose')
const helper = require('@helper')
// define the ExposureKitTable model schema
const CancelledServiceRequestSchema = new mongoose.Schema(
  {
    cancellationReason: Object,
    cancellationDescription: String,
    practitioner: Object,
    serviceRequestId: String,
    selectedTests: String,
    _createdAt: { type: String, unique: false },
  },
  {
    strict: false,
  }
)

CancelledServiceRequestSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

CancelledServiceRequestSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'CancelledServiceRequest',
  CancelledServiceRequestSchema,
  'CancelledServiceRequests'
)

const mongoose = require('mongoose')

const FingerprintTokenSchema = new mongoose.Schema({
  practitionerId: { type: String, required: false },
  practitionerFingerprint: { type: String, required: false },
  patientId: { type: String, required: false },
  patientNationalId: { type: String, required: false },
  practitionerNationalId: { type: String, required: false },
  parentNationalId: { type: String, required: false },
  parentFingerprint: { type: String, required: false },
  patientFingerprint: { type: String, required: false },
  isChild: { type: String, required: false },
  token: { type: String, required: true },
  meta: {
    createdAt: { type: Date, expires: '15m', default: Date.now },
    lastUpdated: { type: Date },
  },
})

FingerprintTokenSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'FingerprintToken',
  FingerprintTokenSchema,
  'FingerprintToken'
)

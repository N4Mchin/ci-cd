const mongoose = require('mongoose')
const helper = require('@helper')
const ExternalSpecimenLogSchema = new mongoose.Schema(
  {
    _createdAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
  }
)

ExternalSpecimenLogSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

ExternalSpecimenLogSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'ExternalSpecimenLog',
  ExternalSpecimenLogSchema,
  'ExternalSpecimenLogs'
)

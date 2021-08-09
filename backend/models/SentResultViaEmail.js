const mongoose = require('mongoose')
const helper = require('@helper')

const sentResultViaEmail = new mongoose.Schema(
  {
    _createdAt: { type: String, unique: false },
    labResult: { type: String, unique: false },
    labReportDocument: { type: String, unique: false },
    diagnosticReportId: { type: String, unique: false },
  },
  {
    strict: false,
  }
)

sentResultViaEmail.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

sentResultViaEmail.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'SentResultViaEmail',
  sentResultViaEmail,
  'SentResultViaEmail'
)

const mongoose = require('mongoose')
const helper = require('@helper')

const internalMonitor = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    materialName: { type: String, unique: false },
    lotNumberExpirationDate: { type: String, unique: false },
    isNormal: { type: String, unique: false },
    note: { type: String, unique: false },
    decision: { type: String, unique: false },
  },
  {
    strict: false,
  }
)

internalMonitor.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

internalMonitor.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'InternalMonitor',
  internalMonitor,
  'InternalMonitor'
)

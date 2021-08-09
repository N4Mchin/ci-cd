const mongoose = require('mongoose')
const helper = require('@helper')

const specialTestProtocolSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    values: Object,
  },
  {
    strict: false,
  }
)

specialTestProtocolSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

specialTestProtocolSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'specialTestProtocol',
  specialTestProtocolSchema,
  'specialTestProtocols'
)

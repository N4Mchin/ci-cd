const mongoose = require('mongoose')
const helper = require('@helper')

const testProtocolSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    values: Object,
  },
  {
    strict: false,
  }
)

testProtocolSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

testProtocolSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'TestProtocol',
  testProtocolSchema,
  'TestProtocols'
)

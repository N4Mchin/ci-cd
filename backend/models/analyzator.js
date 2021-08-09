const mongoose = require('mongoose')
const helper = require('@helper')

const analyzatorSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    month: { type: String, unique: false },
  },
  {
    strict: false,
  }
)

analyzatorSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

analyzatorSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('Analyzator', analyzatorSchema, 'Analyzator')

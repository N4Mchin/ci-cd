const mongoose = require('mongoose')
const helper = require('@helper')
const ValuesetSchema = new mongoose.Schema(
  {
    language: { type: String },
    id: { type: String, index: true, unique: true, required: true },
    _createdAt: { type: String, unique: false },
  },
  { strict: false }
)

ValuesetSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

ValuesetSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('Valueset', ValuesetSchema)

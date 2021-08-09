const mongoose = require('mongoose')
const helper = require('@helper')
const icd9Schema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    _createdAt: { type: String, unique: false },
  },
  {
    strict: false,
    versionKey: false,
    toObject: {
      transform: function(doc, ret) {
        delete ret._id
      },
    },
  }
)
icd9Schema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

icd9Schema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('icd9', icd9Schema, 'icd9')

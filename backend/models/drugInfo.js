const mongoose = require('mongoose')
const helper = require('@helper')
const DrugInfoSchema = new mongoose.Schema(
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
DrugInfoSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

DrugInfoSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('drugInfo', DrugInfoSchema, 'drugInfo')

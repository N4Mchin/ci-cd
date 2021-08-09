const mongoose = require('mongoose')
const helper = require('@helper')

const reagentSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    values: {
      reagentLotNumber: { type: String, unique: false },
      reagentExpirationDate: { type: String, unique: false },
      totalRemain: { type: Number, unique: false },
      dose: { type: String, unique: false },
    },
  },
  {
    strict: false,
  }
)

reagentSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

reagentSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('Reagent', reagentSchema, 'Reagent')

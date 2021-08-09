const mongoose = require('mongoose')
const helper = require('@helper')

const totalReagentSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    reagentLotNumber: { type: String, unique: false },
    reagentExpirationDate: { type: String, unique: false },
    total: { type: String, unique: false },
  },
  {
    strict: false,
  }
)

totalReagentSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

totalReagentSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'TotalReagent',
  totalReagentSchema,
  'TotalReagent'
)

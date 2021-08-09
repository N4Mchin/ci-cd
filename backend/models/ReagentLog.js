const mongoose = require('mongoose')
const helper = require('@helper')

const reagentLogSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    values: {
      reagentLotNumber: { type: String, unique: false },
      reagentExpirationDate: { type: String, unique: false },
      firstRemain: { type: Number, unique: false },
      consumptionValue: { type: Number, unique: false },
      quantity: { type: Number, unique: false },
      dose: { type: String, unique: false },
      description: { type: String, unique: false },
      recordedLaboratoryTechnician: { type: String, unique: false },
    },
  },
  {
    strict: false,
  }
)

reagentLogSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

reagentLogSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('ReagentLog', reagentLogSchema, 'ReagentLog')

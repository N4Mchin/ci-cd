const mongoose = require('mongoose')
const helper = require('@helper')

const reagentConsumptionSchema = new mongoose.Schema(
  {
    testName: { type: String, unique: false },
    _createdAt: { type: String, unique: false },
    reagentLotNumber: { type: String, unique: false },
    totalReagentQuantity: { type: String, unique: false },
    reagentExpirationDate: { type: String, unique: false },
    expenseReagentQuantity: { type: String, unique: false },
    testQuantity: { type: String, unique: false },
    remainReagentQuantity: { type: String, unique: false },
  },
  {
    strict: false,
  }
)

reagentConsumptionSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

reagentConsumptionSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'ReagentConsumption',
  reagentConsumptionSchema,
  'ReagentConsumption'
)

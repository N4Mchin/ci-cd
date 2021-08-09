const mongoose = require('mongoose')
const helper = require('@helper')
// define the Equpment model schema
const EquipmentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  tubePink: { type: Number, required: false },
  tubePurple: { type: Number, required: false },
  tubeRed: { type: Number, required: false },
  tubeYellow: { type: Number, required: false },
  tubeGray: { type: Number, required: false },
  tubeMintGreen: { type: Number, required: false },
  alcoholPad: { type: Number, required: false },
  adhesiveBandage: { type: Number, required: false },
  printer: { type: Number, required: false },
  _createdAt: { type: String, unique: false },
})

EquipmentSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

EquipmentSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('Equipment', EquipmentSchema, 'Equipments')

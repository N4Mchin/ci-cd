const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('@helper')
const StorageLocationSchema = new mongoose.Schema({
  index: { type: String, required: true, unique: true },
  barcode: { type: String, required: false },
  size: { type: String, required: false },
  freezer: { type: String, required: false },
  compartment: { type: String, required: false },
  layer: { type: String, required: false },
  row: { type: String, required: false },
  col: { type: String, required: false },
  location: { type: String, required: false },
  _createdAt: { type: String, unique: false },
})

StorageLocationSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

StorageLocationSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'StorageLocation',
  StorageLocationSchema,
  'StorageLocation'
)

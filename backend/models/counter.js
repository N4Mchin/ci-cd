const mongoose = require('mongoose')
const helper = require('@helper')
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
  _createdAt: { type: String, unique: false },
})

CounterSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

module.exports = mongoose.model('counter', CounterSchema, 'counters')

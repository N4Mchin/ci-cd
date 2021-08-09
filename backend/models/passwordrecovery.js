const mongoose = require('mongoose')
const helper = require('@helper')

const PasswordRecoverySchema = new mongoose.Schema({
  email: { type: String, index: true, unique: true, required: true },
  link: { type: String, index: true, unique: true, required: true },
  _createdAt: { type: Date, expires: '15m', default: Date.now },
  //createdAt: { type: Date, expires: '15m', default: Date.now },
})

// PasswordRecoverySchema.pre('save', function saveHook(next) {
//   Object.assign(this, {
//     _createdAt: helper.getDate(),
//   })

// next()
// })
module.exports = mongoose.model('PasswordRecovery', PasswordRecoverySchema)

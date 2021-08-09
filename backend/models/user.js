const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('@helper')
// define the User model schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    nationalIdentificationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    email: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nameDisplay: { type: String, required: false },
    roleDisplay: { type: String, required: false },
    patientId: { type: String, required: false },
    practitionerId: { type: String, required: false },
    profession: String,
    position: String,
    mobile: String,
    permission: {
      role: { type: String, required: true },
      access: { read: Boolean, write: Boolean },
      scope: [{ type: String }],
    },
    pic: String,
    load: Number,
    _createdAt: { type: String, unique: false },
  },
  {
    toObject: {
      transform: function(doc, ret) {
        delete ret.password
      },
    },
  }
)

UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password)
}

UserSchema.pre('save', function saveHook(next) {
  const user = this

  if (!user.isModified('password')) return next()

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError)
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError)
      }

      user.password = hash
      return next()
    })
  })
})

UserSchema.pre('findOneAndUpdate', function(next, rrr) {
  const user = this._update
  if (!user.password) return next()
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError)
    }
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError)
      }
      user.password = hash
      return next()
    })
  })
})

UserSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model('User', UserSchema)

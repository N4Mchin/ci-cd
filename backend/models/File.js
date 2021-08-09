const mongoose = require('mongoose')
const helper = require('@helper')

const FileSchema = new mongoose.Schema({
  _createdAt: { type: Date, required: false },
  lastModified: { type: String, required: false },
  lastModifiedDate: { type: String, required: false },
  fileSize: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: String, required: true },
  patientId: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  file: { type: String, required: true },
  recordedPractitionerId: { type: String, required: true },
})

FileSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: new Date().toISOString(),
  })

  next()
})

FileSchema.methods.toJSON = function() {
  return this.toObject()
}

FileSchema.methods.getInfo = function() {
  const object = this.toObject()
  delete object.file
  return object
}

module.exports = mongoose.model('File', FileSchema, 'Files')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('@helper')
const SpecimenBarcode = require('./specimenBarcode')

const SpecimenReferenceSchema = new mongoose.Schema(
  {
    _createdAt: { type: String, unique: false },
    requisition: { type: Object, required: true },
    patient: {
      ageSex: { type: String, required: false },
      barcode: { type: String, required: false },
      id: { type: String, required: false },
      lastName: { type: String, required: false },
      firstName: { type: String, required: false },
      nationalIdentifierNumber: { type: String, required: false },
    },
    specimen: [
      {
        test: { type: String, required: true },
        testCodes: { type: Array, required: true },
        barcode: { type: String, required: true },
        usedEquipments: { type: Object, required: false },
        storage: {
          storedAt: { type: Date, default: undefined },
          size: { type: String, required: false },
          freezer: { type: String, required: false },
          compartment: { type: String, required: false },
          layer: { type: String, required: false },
          row: { type: String, required: false },
          col: { type: String, required: false },
          location: { type: String, required: false },
        },
      },
    ],
  },
  {
    toObject: {
      transform: function(doc, ret) {
        delete ret._id
      },
    },
  }
)

SpecimenReferenceSchema.pre('findOneAndUpdate', function(next, err) {
  const specimenReference = this._update
  const updatedStorageDetail = this._conditions

  specimenReference.specimen.forEach(subSpecimen => {
    if (
      subSpecimen.storage &&
      subSpecimen.barcode === updatedStorageDetail['specimen.barcode']
    ) {
      subSpecimen.storage.storedAt = new Date()
    }
  })

  return next()
})

SpecimenReferenceSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

SpecimenReferenceSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'SpecimenReference',
  SpecimenReferenceSchema,
  'SpecimenReferences'
)

const mongoose = require('mongoose')
const helper = require('@helper')
// define the Paymenttype model schema
const FirstAidKitSchema = new mongoose.Schema({
  id: { type: String, required: true },
  aminophylline: { type: Number, required: false },
  atropine: { type: Number, required: false },
  aminocaproicAcid: { type: Number, required: false },
  glycerylTrinitrate: { type: Number, required: false },
  dibazol: { type: Number, required: false },
  diazepam: { type: Number, required: false },
  drotaverine: { type: Number, required: false },
  dexamethasone: { type: Number, required: false },
  dextran: { type: Number, required: false },
  cordiamineNikethamide: { type: Number, required: false },
  calciumGluconate: { type: Number, required: false },
  cocarboxylase: { type: Number, required: false },
  lidocaine: { type: Number, required: false },
  magnesiumSulfate: { type: Number, required: false },
  prednisolone: { type: Number, required: false },
  ringerLactateSolution: { type: Number, required: false },
  revalgin: { type: Number, required: false },
  gStrophanthin: { type: Number, required: false },
  epinephrine: { type: Number, required: false },
  ephedrineHydrochloride: { type: Number, required: false },
  methimazole: { type: Number, required: false },
  diclofenacSodium: { type: Number, required: false },
  enalapril: { type: Number, required: false },
  _createdAt: { type: String, unique: false },
})

FirstAidKitSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

FirstAidKitSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'FirstAidKit',
  FirstAidKitSchema,
  'FirstAidKits'
)

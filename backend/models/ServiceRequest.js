const mongoose = require('mongoose')
const helper = require('@helper')
const ServiceRequestSchema = new mongoose.Schema({
  byCredit: Number,
  discount: Number,
  inCash: Number,
  insurance: Number,
  insuranceHBV: Number,
  insuranceHCV: Number,
  insuranceHDV: Number,
  checkupCost: Number,
  filterItem: Object,
  customersDiscount: Number,
  diagnosticTestCost: Number,
  labTestCost: Number,
  research: Array,
  relatedCompanyBills: Number,
  specialDiscount: Number,
  staffsDiscount: Number,
  totalAmount: Number,
  totalIncome: Number,
  transaction: Object,
  _createdAt: { type: Date, default: Date.now },
  patientName: mongoose.Schema.Types.Mixed,
  patientId: mongoose.Schema.Types.Mixed,
  barcode: String,
  user: Object,
  requisition: Object,
  SelectedTests: Object,
  SelectedCheckup: Object,
  SelectedDiagnosticTests: Object,
  status: String,
})

ServiceRequestSchema.pre('save', function saveHook(next) {
  Object.assign(this, {
    _createdAt: helper.getDate(),
  })

  next()
})

ServiceRequestSchema.methods.toJSON = function() {
  return this.toObject()
}

module.exports = mongoose.model(
  'ServiceRequest',
  ServiceRequestSchema,
  'ServiceRequests'
)

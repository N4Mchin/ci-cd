const express = require('express')
const mongoose = require('mongoose')

const config = require('../config')
const responseUtils = require('./response')

var Ajv = require('ajv')
var ajv = new Ajv()
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

var fhirSchema = require('../standards/fhir.schema.json')
var validate = ajv.compile(fhirSchema)
//console.log(fhirSchema.definitions.Patient)

module.exports.validate = function validate(resource_json) {
  if (resource_json) {
    return ajv.validate(fhirSchema, resource_json)
  }

  return false
}

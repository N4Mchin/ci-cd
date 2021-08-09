const config = require('@config')
const axios = require('axios')

module.exports = options => {
  const fhirOptions = {
    baseURL: config.fhirServer,
    ...options,
  }

  fhirOptions.headers = {
    ...options.headers,
    'Content-Type': 'application/fhir+json',
    Accept: 'application/fhir+json',
  }

  return axios(fhirOptions)
}

const config = require('../config')
const axios = require('axios')

const actions = {
  POST: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-DocumentCompletion',
        code: 'CREATE',
        display: 'create',
      },
    ],
  },
  PUT: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-DocumentCompletion',
        code: 'UPDATE',
        display: 'update',
      },
    ],
  },
  DELETE: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-DocumentCompletion',
        code: 'DELETE',
        display: 'delete',
      },
    ],
  },
}

/**
 * @description When resources are read in the controller functions
 * they all need to respond in a similar manner
 * @function handleSingleReadResponse
 * @param {Express.response} res - Express response object
 * @param {function} next - next function from express middleware
 * @param {string} base_version - Which spec version is this request coming from
 * @param {T} Resource - Resource class to use for the results
 * @param {object} resource_json - resulting json to be passed in to the class
 */

const getDate = () => {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // months start from 0  [ 0 : Jan, 1: Feb]
  let day = date.getDay()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  let strDateTime = `${year}-${month}-${day}`
  return strDateTime
}

const getInstant = () => {
  return new Date().toISOString()
}

const sendRequest = (options = {}, practitionerId) => {
  const PractitionerRef = {
    reference: `config.fhirServer/Practitioner/${practitionerId}`,
  }

  const AgentTypeEnterer = {
    coding: [
      {
        system:
          'http://terminology.hl7.org/CodeSystem/provenance-participant-type',
        code: 'enterer',
        display: 'Enterer',
      },
    ],
  }

  const X_Provenance = {
    occuredDateTime: getDate(),
    recorded: getInstant(),
    agent: [
      {
        type: AgentTypeEnterer,
        who: PractitionerRef,
      },
    ],
  }

  X_Provenance.activity = actions[options.method.toUpperCase()]

  const axiosConfig = {
    baseURL: config.fhirServer,
    method: options.method || 'GET',
    url: options.url,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
      'X-Provenance': X_Provenance,
    },
  }

  if (options.method !== 'GET') {
    axiosConfig.data = options.data
  }

  return axios(axiosConfig)
}

module.exports = {
  sendRequest,
}

const customOpt = {
  // url: options.url,
  // method: options.method,
  // data: data,
  // withCredentials: true
  // headers: {
  //   'X-Provenance': {
  //     occuredDateTime: getDate(),
  //     recorded: getInstant(),
  //     activity: {
  //       coding: [
  //         {
  //           system:
  //             'http://terminology.hl7.org/CodeSystem/v3-DocumentCompletion',
  //           code: 'CREATE',
  //           display: 'create',
  //         },
  //       ],
  //     },
  //     agent: [
  //       {
  //         type: {
  //           coding: [
  //             {
  //               system:
  //                 'http://terminology.hl7.org/CodeSystem/provenance-participant-type',
  //               code: 'enterer',
  //               display: 'Enterer',
  //             },
  //           ],
  //         },
  //         who: {
  //           reference: `config.fhirServer/Practitioner/${practitionerId}`,
  //         },
  //       },
  //     ],
  //   },
  // },
}

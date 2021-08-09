const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const config = require('../config')

const router = new express.Router()
router.use(bodyParser.json())

const getPractitionerList = async () => {
  const axiosConfig = {
    method: 'get',
    url: `${config.fhirServer}/api/Practitioner`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
  }
  // if case-sensitive
  // url: /api/practitioner
  try {
    return await axios(axiosConfig)
      .then(function(response) {
        return response
      })
      .catch(err => console.log('GetPractitionerList error: ', err))
  } catch (error) {
    console.error(error)
  }
}

const getPractitioner = async id => {
  const axiosConfig = {
    method: 'get',
    url: `${config.fhirServer}/api/Practitioner/${id}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
  }

  try {
    return await axios(axiosConfig)
  } catch (error) {
    console.error(error)
    return error
  }
}

const makeRequest = async (req, res) => {
  try {
    const result = await getPractitionerList()
    // temporary fix by sending one patient info in an array
    // var bar = []
    // bar.push(result.data)

    if (typeof result === 'undefined') {
      return res.status(404).send()
    }

    if (typeof result.data['_doc'].entry !== 'undefined') {
      return res.status(200).json({
        data: result.data['_doc'].entry,
        total: result.data['_doc'].total,
      })
    } else {
      console.log('no practitioner data in db')
      return res.status(404).send()
    }
  } catch (err) {
    console.log(err)
    return res.status(404).send()
  }
}

const makeRequestOne = async (req, res, id) => {
  try {
    // TODO
    // change to fineOne
    const result = await getPractitioner(id)
    // console.log("sending this data: ", result)
    if (typeof result !== 'undefined') {
      return res.status(200).json(result.data)
    }

    return res.status(404)
  } catch (err) {
    console.log(err)
  }
}

router.get('/practitioner', (req, res) => {
  console.log('practitionerList request received')
  return makeRequest(req, res)
})

router.get('/practitioner/:id', (req, res) => {
  return makeRequestOne(req, res, req.params.id)
})

module.exports = router

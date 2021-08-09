const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const config = require('../config')
const helper = require('@helper')

const router = new express.Router()
router.use(bodyParser.json())

router.put('/resource', (req, res) => {
  const resource = req.body

  const axiosConfig = {
    method: 'PUT',
    url: `${config.fhirServer}/api/${resource.resourceType}/${resource.id}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
      ifMatch: `W/\"${resource.meta.versionId}\"`,
    },
    data: resource,
  }

  return axios(axiosConfig)
    .then(result => {
      return res.status(200).json({
        success: true,
        message: 'Resource update successful',
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(200).json({
        success: false,
        data: err,
        message: 'Resource update failed',
      })
    })
})

router.post('/resource', (req, res) => {
  const resource = req.body

  const axiosConfig = {
    method: 'POST',
    url: `${config.fhirServer}/api/${resource.resourceType}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
    data: resource,
  }

  return axios(axiosConfig)
    .then(result => {
      return res.status(200).json({
        success: true,
        message: 'Test result saved successfully.',
      })
    })
    .catch(err => {
      return res
        .status(200)
        .json({ success: false, data: err, message: 'Test result not saved.' })
    })
})

router.get('/resource', (req, res) => {
  const { resourceType, ...params } = req.query

  const axiosConfig = {
    method: 'GET',
    url: `${config.fhirServer}/api/${resourceType}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
    params: params,
  }

  return axios(axiosConfig)
    .then(result => {
      return res.status(200).json({
        success: true,
        data: result.data,
      })
    })
    .catch(err => {
      return res
        .status(200)
        .json({ success: false, data: err, message: 'Read failed' })
    })
})

router.get('/resource/:id', (req, res) => {
  const { resourceType, ...params } = req.query

  const axiosConfig = {
    method: 'GET',
    url: `${config.fhirServer}/api/${resourceType}/${req.params.id}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
    params: params,
  }

  return axios(axiosConfig)
    .then(result => {
      return res.status(200).json({
        success: true,
        data: result.data,
      })
    })
    .catch(err => {
      return res
        .status(200)
        .json({ success: false, data: err, message: 'Read failed' })
    })
})

module.exports = router

/**
 * author: Sod-Erdene
 * date: 2020-04-02
 *
 */

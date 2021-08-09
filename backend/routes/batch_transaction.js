const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const config = require('../config')

const router = new express.Router()
router.use(bodyParser.json())

router.post('/batch_transaction', (req, res) => {
  const resource = req.body

  if (
    !(
      resource.resourceType === 'Bundle' &&
      (resource.type === 'batch' || resource.type === 'transaction')
    )
  ) {
    return res.status(200).json({
      success: false,
      message: 'Bundle request body is invalid',
    })
  }

  const axiosConfig = {
    method: 'POST',
    url: `${config.fhirServer}/api`,
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
        message: 'Test result update successful',
        data: result.data,
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(200).json({
        success: false,
        data: err,
        message: 'Test result update failed',
      })
    })
})

module.exports = router
/**
 * author: Sod-Erdene
 * date: 2020-04-06
 *
 */

const express = require('express')
const config = require('../config')
const axios = require('axios')
const qs = require('qs')

const router = new express.Router()

router.post('/token', async function(req, res) {
  const { api } = req.body

  if (api === 'ICD') {
    const options = {
      data: qs.stringify({
        client_id: config.API.ICD.client_id,
        client_secret: config.API.ICD.client_secret,
        scope: 'icdapi_access',
        grant_type: 'client_credentials',
      }),
      method: 'post',
      url: config.API.ICD.token_access_path,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    try {
      const apiResponse = await axios(options)

      return res.status(200).json({
        success: true,
        data: apiResponse.data,
      })
    } catch (error) {
      console.log(error.response.data)
      return res.status(200).json({
        success: false,
        message: 'Could not get new token',
      })
    }
  }

  return res.status(200).json({
    success: false,
    message: 'No API provided in request body',
  })
})

module.exports = router

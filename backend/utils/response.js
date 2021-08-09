const express = require("express")
const mongoose = require("mongoose")
const config = require("../config")

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

// function respond({ response, status, error, json }) {
//   console.log(error)

//   return res.status(status).json(json)
// }

const handleSingleReadResponse = (res, resource_json) => {
  if (resource_json) {
    res.set("ETag", `W/"${resource_json.meta.versionId}"`)
    res.set("Last-Modified", `${resource_json.meta.lastUpdated}`)
    //res.type(getContentType(base_version))
    //res.status(200).json(new Resource(resource_json))

    res.status(200).json(resource_json)
  } else {
    //next(errors.notFound(`${Resource.__resourceType} NotFound.`, base_version));
    console.log("error while handleSingleReadResponse")
  }
}

const handleStatusCode = (res, statusCode, data) => {
  var msg

  switch (statusCode) {
    case 200:
      msg = data
      break
    case 201:
      msg = "Brought Back To Life / Re-Created"
      break
    case 202:
      msg = "Accepted"
      break
    case 204:
      msg = "No Content with no response payload"
      break
    case 400:
      msg = "Bad Request"
      break
    case 401:
      msg = "Not Authorized"
      break
    case 404:
      msg = "Unknown Resource / NotFound"
      break
    case 405:
      msg = "Method Not Allowed"
      break
    case 409:
      msg = "Version Conflict Management"
      break
    case 410:
      msg = "Deleted Resource / No Longer Found"
      break
    case 412:
      msg = "Precondition Failed"
      break
    case 422:
      msg = "Unprocessable Entity"
      break
    case 500:
      msg = "Server Internal Error"
      break
    default:
    // code block
  }

  res.status(statusCode).send(msg)
}

module.exports = {
  handleSingleReadResponse,
  handleStatusCode
  // respond
}

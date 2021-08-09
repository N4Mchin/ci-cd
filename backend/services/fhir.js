const fhirRequest = require('@utils/fhirRequest')
const schemas = require('@schemas')

function getResource(resourceType, params) {
  return fhirRequest({
    method: 'GET',
    url: `/api/${resourceType}`,
    params: params,
  })
}

function postResource(resourceType, data) {
  return fhirRequest({
    method: 'POST',
    url: `/api/${resourceType}`,
    data: data,
  })
}

function putResource(resourceType, resource) {
  return fhirRequest({
    method: 'PUT',
    url: `/api/${resourceType}/${resource.id}`,
    headers: {
      ifMatch: `W/"${resource.meta.versionId}"`,
    },
    data: resource,
  })
}

function deleteResource(resourceType, resourceId) {
  return fhirRequest({
    method: 'DELETE',
    url: `/api/${resourceType}/${resourceId}`,
  })
}

function sendBatchTransactionRequest(bundle) {
  return fhirRequest({
    method: 'POST',
    url: `/api`,
    data: bundle,
  })
}

function getResourceById(resourceType, resourceId) {
  return fhirRequest({
    method: 'GET',
    url: `/api/${resourceType}/${resourceId}`,
  })
}

function getViralLoadTestProtocolData(params) {
  return fhirRequest({
    method: 'GET',
    url: `/viralLoadTestsVerifiedResults`,
    data: params.data,
  })
}

function loadResource(resource) {
  const Resource = schemas[resource.resourceType.toLowerCase()]
  return new Resource(resource)
}

function loadResourceArray(resourceArray) {
  return resourceArray.map(resource => loadResource(resource))
}

module.exports = {
  getResource,
  getResourceById,
  putResource,
  postResource,
  deleteResource,
  loadResource,
  loadResourceArray,
  sendBatchTransactionRequest,
  getViralLoadTestProtocolData,
}

import request from 'utils/request'
import { apiPrefix, backend, API } from 'utils/config'
import { isObject, isArray } from 'utils/helper'
import api from './api'
import router from 'umi/router'

const gen = params => {
  // let url = apiPrefix + params
  let url = params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    // url = apiPrefix + paramsArray[1]
    url = paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}

APIFunction.uploadFiles = params => {
  const formData = new FormData()

  Object.keys(params).forEach(key => {
    if (isObject(params[key]) || isArray(params[key])) {
      formData.append([key], JSON.stringify(params[key]))
    } else {
      formData.append([key], params[key])
    }
  })

  return request({
    url: `${backend.host}${backend.api}/file`,
    method: 'POST',
    headers: {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`,
    },
    data: formData,
  })
}

APIFunction.queryNewToken = async params => {
  const { api } = params
  const response = await request({
    url: `${backend.host}${backend.api}/token`,
    method: 'POST',
    data: {
      api: api,
    },
  })

  const { access_token, expires_in, token_type } = response.data
  const token = {
    access_token,
    token_type,
    expiry: new Date().getTime() + expires_in * 1000,
  }

  return token
}

APIFunction.queryExternalAPI = async params => {
  const { api, data } = params

  if (api === 'ICD') {
    return queryICD(data)
  } else if (api === 'ICD-9') {
    return queryICD9(data)
  } else if (api === 'DrugInfo') {
    return queryDrugInfo(data)
  } else if (api === 'DrugInformationList') {
    return drugInformationList(data)
  }
}

APIFunction.getFile = params => {
  const { dataSource, excelHeader, endPointLink } = params
  const double = {
    dataSource,
    excelHeader,
  }
  return request({
    url: `${backend.host}${backend.api}${endPointLink}`,
    method: 'GET',
    // params: {
    // dataSource: dataSource,
    // excelHeader: excelHeader,
    // },
    params: double,
    responseType: 'blob',
    // transformResponse: [
    // function(data) {
    // // let blob = new window.Blob([data], { type: 'application/pdf' })
    // return data
    // },
    // ],
  })
}

APIFunction.getLaboratoryReport = params => {
  return request(
    {
      url: `${backend.host}${backend.api}/laboratory/testResult`,
      method: 'GET',
      params: params,
    }
    // {
    //   responseType: 'blob',
    //   transformResponse: [
    //     function(data) {
    //       let blob = new window.Blob([data], { type: 'application/pdf' })
    //       return window.URL.createObjectURL(blob)
    //     },
    //   ],
    // }
    // {
    //   parseResponse: true,
    //   responseType: 'blob',
    // }
  )
}

function getAccessToken(data) {
  const { access_token, expiry, token_type } = data
  if (new Date().getTime() > expiry) {
    throw new Error('Token expired')
  }
  return access_token
}

async function queryICD(data) {
  let access_token

  try {
    const tokenResponseRaw = localStorage.getItem('API.ICD.TOKEN')

    const tokenResponse = tokenResponseRaw && JSON.parse(tokenResponseRaw)
    access_token = getAccessToken(tokenResponse)
    throw new Error('')
  } catch (error) {
    localStorage.removeItem('API.ICD.TOKEN')
    const token = await APIFunction.queryNewToken({ api: 'ICD' })
    localStorage.setItem('API.ICD.TOKEN', JSON.stringify(token))
    access_token = getAccessToken(token)
  }

  if (!access_token) {
    throw new Error('Token is undefined')
  }

  const { host, release, search } = API['ICD']

  const formData = new FormData()

  Object.keys(data).forEach(key => {
    if (isObject(data[key]) || isArray(data[key])) {
      formData.append([key], JSON.stringify(data[key]))
    } else {
      formData.append([key], data[key])
    }
  })

  return request({
    url: `${host}${release}${search}`,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json',
      'Accept-Language': 'en',
      'API-Version': 'v2',
      'content-type': `multipart/form-data; boundary=${formData._boundary}`,
    },
    data: formData,
  })
}

// async function queryPrescription(data) {
//   const { host, release, search } = API['Prescription']

//   return request({
//     url: `${host}${release}${search}`,
//     method: 'GET',
//     headers: {
//       // Authorization: 'Bearer ' + access_token,
//       Accept: 'application/json',
//       'Content-Type': `application/json`,
//     },
//   })
// }

async function queryICD9(data) {
  const { host, release, search } = API['ICD9']

  if (data.type === 'search') {
    return request({
      url: `${host}${release}${search}`,
      method: 'GET',
      data: data.search,
    })
  } else if (data.type === 'list') {
    return request({
      url: `${host}${release}${search}/list`,
      method: 'GET',
      data: data.list,
    })
  }
}

async function queryDrugInfo(data) {
  const { host, release, search } = API['DrugInfo']

  return request({
    url: `${host}${release}${search}`,
    method: 'GET',
    data: data,
  })
}

async function drugInformationList(data) {
  const { host, release, search } = API['DrugInformationList']

  return request({
    url: `${host}${release}${search}`,
    method: 'GET',
    data: data,
  })
}

export default APIFunction

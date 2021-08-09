import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

import qs from 'qs'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { backend } from 'utils/config'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method = 'get' } = options

  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url

    // You can mock server responses here, by adding urls in mock array
    const mock = [
      // `${apiPrefix}/api/v1/dashboard`,
      // `${apiPrefix}/api/v1/serviceRequest`,
      // `${apiPrefix}/api/v1/serviceRequest?code=http://snomed.info/sct|122366001`,
    ]

    if (mock.includes(url)) {
      // if (mock.find(item => url.startsWith(item))) {
      // mock server is at the frontend
      url = url.replace(':3336', ':7000')
    }
  } catch (e) {
    //console.log('error...',e);
    message.error(e.message)
  }

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : url
  options.method = method
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  if (url.startsWith(backend.host)) {
    options.withCredentials = true
  }

  options.data = data

  console.log('Here are the options', options)

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response
      console.log('response ', response, typeof data, response.headers)
      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        } else if (data instanceof Blob) {
          result.data = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      })
    })
    .catch(error => {
      console.log("We've got a problem here", error)
      const { response, message } = error
      console.log(message)
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
          message: CANCEL_REQUEST_MESSAGE,
        }
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}

// if (data && data.REQUEST_TYPE === 'upload') {
//   const formData = new FormData()

//   Object.keys(data).forEach(key => {
//     if (isObject(data[key]) || isArray(data[key])) {
//       formData.append([key], JSON.stringify(data[key]))
//     } else {
//       formData.append([key], data[key])
//     }
//   })

//   options.headers = {
//     'content-type': `multipart/form-data; boundary=${formData._boundary}`,
//   }
//   options.data = formData
// }

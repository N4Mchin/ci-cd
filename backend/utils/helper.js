const uuidv4 = require('uuid/v4')

function modelLoader(modelName) {
  return require(`@models/${modelName}`)
}

//async function getResource(resourceType, filter) {
//  const Model = modelLoader(resourceType)
//  doc = await Model.findOne({ ...filter }).exec()
//  if (!doc) throw new Error(`resource not found: ${resourceType}/${filter}`)
//
//  return doc.toJSON()
//}

function generateFullUrl() {
  return `urn:uuid:${uuidv4()}`
}

function calculateChecksumEAN13(value) {
  // 13 digit could be used for validating purposes
  if (value.length !== 12 && value.length !== 13) {
    throw new Error('length of parameter is invalid', value)
  }

  const valueString = value.toString()
  const rsum =
    parseInt(valueString[11]) +
    parseInt(valueString[9]) +
    parseInt(valueString[7]) +
    parseInt(valueString[5]) +
    parseInt(valueString[3]) +
    parseInt(valueString[1])
  const multiplied = rsum * 3

  const lsum =
    parseInt(valueString[10]) +
    parseInt(valueString[8]) +
    parseInt(valueString[6]) +
    parseInt(valueString[4]) +
    parseInt(valueString[2]) +
    parseInt(valueString[0])

  const total = multiplied + lsum
  const rounded = Math.ceil(total / 10) * 10

  const diff = rounded - total

  return diff
}

function generateEAN13(type) {
  // 12 digit random value
  let randomValue = Math.floor(100000000000 + Math.random() * 900000000000)
  let initialString = randomValue.toString()
  let finalString

  // setting prefix
  if (type === 'patient') {
    finalString = '0' + initialString.slice(1)
  } else if (type === 'specimen') {
    // uncomment next line if prefix is needed for specimen
    finalString = '1' + initialString.slice(1)
  } else {
    finalString = initialString.slice()
  }

  const checksum = calculateChecksumEAN13(finalString)
  const output = `${finalString}${checksum}`

  return output
}

function generateBarcode({ standard, type }) {
  if (standard === 'ean13') {
    return generateEAN13(type)
  }
}

async function getResource(resourceType, filter) {
  console.log(resourceType)
  const Model = modelLoader(resourceType)
  docs = await Model.find({ ...filter }).exec()
  if (!docs) throw new Error(`resource not found: ${resourceType}/${filter}`)
  resDocs = docs.map(doc => doc.toJSON())

  return resDocs
}

function getDate() {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // months start from 0  [ 0 : Jan, 1: Feb]
  let day = date.getDate()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  let strDateTime = `${year}-${month}-${day}`
  return strDateTime
}

function toLocalDateTime(dateTimeString, format) {
  if (!dateTimeString) {
    return
  }

  const date = new Date(dateTimeString)
  let day = date.getDate()
  let hours = date.getHours()
  let year = date.getFullYear()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  let month = date.getMonth() + 1 // months start from 0  [ 0 : Jan, 1: Feb]

  day = day < 10 ? '0' + day : day
  month = month < 10 ? '0' + month : month
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  let strDateTime

  switch (format) {
    case 'hh:mm':
      strDateTime = `${hours}:${minutes}`
      break
    case 'yyyy-mm-dd':
      strDateTime = `${year}-${month}-${day}`
      break
    case 'yyyy-mm-dd hh:mm:ss':
      strDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      break
    default:
      // 'yyyy-mm-dd hh:mm':
      strDateTime = `${year}-${month}-${day} ${hours}:${minutes}`
      break
  }

  return strDateTime
}

function isArray(variable) {
  return Object.prototype.toString.call(variable) === '[object Array]'
}

function isObject(variable) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}

function isEmptyObject(variable) {
  return (
    variable &&
    Object.keys(variable).length === 0 &&
    variable.constructor === Object
  )
}

function orderBy(array = [], key, opt = 'asc') {
  const newArray = Object.assign([], array)
  if (opt === 'asc') {
    newArray.sort((a, b) => (a[key] < b[key] ? -1 : 1))
  } else if (opt === 'desc') {
    newArray.sort((a, b) => (a[key] < b[key] ? 1 : -1))
  }

  return newArray
}

function getReference(resource) {
  const reference = {
    reference: `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  }

  return reference
}
function getReferenceUrl(resource) {
  return `${resource.resourceType}/${resource.id}`
}
function generateDigits(digits) {
  // return
  let startNumber = 1
  let endNumber = 9
  for (i = 1; i < digits; i++) {
    startNumber *= 10
    endNumber *= 10
  }
  return Math.floor(startNumber + Math.random() * endNumber)
}
function calculateAgeFromBirthDate(birthDate) {
  try {
    const dateOfBirth = new Date(birthDate)
    const dateNow = new Date()

    const yearDiff = dateNow.getFullYear() - dateOfBirth.getFullYear()
    const monthDiff = dateNow.getMonth() - dateOfBirth.getMonth()
    const dayDiff = dateNow.getDate() - dateOfBirth.getDate()

    let age = yearDiff

    if (monthDiff < 0) {
      age = age - 1
    } else {
      if (dayDiff < 0) {
        age = age - 1
      }
    }

    if (age < 0) {
      age = 0
    }

    if (age < 200) {
      return age
    }
  } catch {}
  return ''
}
function calculateBirthDate(NationalID) {
  // sub = **XX******
  if (NationalID.length < 4) return
  let sub = parseInt(NationalID.substring(2, 4))
  let thisYear = new Date().getFullYear()
  let year, month, day

  if (sub >= parseInt(thisYear.toString().substring(2, 4))) {
    // subtract 100 years and 19 years
    // getting to 1900
    year = thisYear - 100 - parseInt(thisYear.toString().substring(2, 4)) + sub
    month = parseInt(NationalID.substring(4, 6))
    day = parseInt(NationalID.substring(6, 8))

    if (month <= 0 || isNaN(month) || day <= 0 || isNaN(day)) return

    let dob = [
      year,
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0'),
    ].join('-')

    return dob
  } else {
    // if less than 19  -> thisYear = 2019
    // subtract 20 from month
    year = parseInt(sub) + 2000
    month = parseInt(NationalID.substring(4, 6)) - 20
    day = parseInt(NationalID.substring(6, 8))

    if (month <= 0 || isNaN(month) || day <= 0 || isNaN(day)) return

    let dob = [
      year,
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0'),
    ].join('-')
    return dob
  }
}

module.exports = {
  isArray,
  isObject,
  isEmptyObject,
  getDate,
  toLocalDateTime,
  getResource,
  getReference,
  getReferenceUrl,
  generateBarcode,
  generateFullUrl,
  modelLoader,
  orderBy,
  generateDigits,
  calculateBirthDate,
  calculateAgeFromBirthDate,
}

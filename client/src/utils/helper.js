import * as schemas from 'schemas'
import uuidv4 from 'uuid/v4'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { config } from 'utils'
import moment from 'moment'

const dictionary = {
  А: 'A',
  а: 'a',
  Б: 'B',
  б: 'b',
  В: 'W',
  в: 'w',
  Г: 'G',
  г: 'g',
  Д: 'D',
  д: 'd',
  Е: 'Ye',
  е: 'ye',
  Ё: 'Yo',
  ё: 'yo',
  Ж: 'J',
  ж: 'j',
  З: 'Z',
  з: 'z',
  И: 'I',
  и: 'i',
  Й: 'I',
  й: 'i',
  К: 'K',
  к: 'k',
  Л: 'L',
  л: 'l',
  М: 'M',
  м: 'm',
  Н: 'N',
  н: 'n',
  О: 'O',
  о: 'o',
  Ө: 'U',
  ө: 'u',
  Р: 'R',
  р: 'r',
  С: 'S',
  с: 's',
  Т: 'T',
  т: 't',
  У: 'U',
  у: 'u',
  Ү: 'U',
  ү: 'u',
  Ф: 'F',
  ф: 'f',
  Х: 'Kh',
  х: 'kh',
  Ц: 'Ts',
  ц: 'ts',
  Ч: 'Ch',
  ч: 'ch',
  Ш: 'Sh',
  ш: 'sh',
  Щ: 'ShTs',
  щ: 'shts',
  Ъ: '-',
  ъ: '-',
  Ь: 'I',
  ь: 'i',
  Ы: '-',
  ы: '-',
  Э: 'E',
  э: 'e',
  Ю: 'Yu',
  ю: 'Yu',
  Я: 'Ya',
  я: 'ya',
}

export function cyrillicToLatin(text) {
  let target = ''

  for (let i = 0; i < text.length; i++) {
    if (dictionary[text.charAt(i)] === undefined) {
      target = target + text.charAt(i)
    } else {
      target = target + dictionary[text.charAt(i)]
    }
  }
  return target
}

export function toPrice(number) {
  return number.toLocaleString('en-EN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function getReference(resource) {
  const reference = {
    reference: `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  }

  return reference
}

export function findByReference(resourceArray, referenceObject) {
  const [type, id] = referenceObject.reference.split('/').slice(-2)
  return resourceArray.find(
    resource => resource.resourceType === type && resource.id === id
  )
}

export function printBase64(base64WithHeader) {
  const base64data = base64WithHeader.split('base64,')[1]
  // open PDF received as Base64 encoded string in new tab
  const byteCharacters = atob(base64data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const file = new Blob([byteArray], { type: 'application/pdf;base64' })
  const fileURL = URL.createObjectURL(file)
  // window.open(fileURL);
  window.open(fileURL, 'PRINT', 'height=400,width=600')
}
export function getReferenceUrl(resource) {
  return `${resource.resourceType}/${resource.id}`
}

export function generateFullUrl() {
  return `urn:uuid:${uuidv4()}`
}

export function generateUuid() {
  return uuidv4()
}

export function loadResource(resource) {
  const Resource = schemas[resource.resourceType.toLowerCase()]
  return new Resource(resource)
}

export function loadResourceArray(resourceArray) {
  return resourceArray.map(resource => loadResource(resource))
}

export function deepGet(obj, props) {
  try {
    return props.reduce((acc, el) => acc[el], obj)
  } catch (e) {
    return undefined
  }
}

export function isArray(variable) {
  return Object.prototype.toString.call(variable) === '[object Array]'
}

export function isObject(variable) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}

export function isEmptyObject(variable) {
  return (
    variable &&
    Object.keys(variable).length === 0 &&
    variable.constructor === Object
  )
}

export function orderBy(array = [], key, opt = 'asc') {
  const newArray = Object.assign([], array)
  if (opt === 'asc') {
    newArray.sort((a, b) => (a[key] < b[key] ? -1 : 1))
  } else if (opt === 'desc') {
    newArray.sort((a, b) => (a[key] < b[key] ? 1 : -1))
  }

  return newArray
}

export function sortByDate(array, dateKey) {
  return array.sort((a, b) => {
    const dateA = new Date(a[dateKey])
    const dateB = new Date(b[dateKey])
    return dateA <= dateB ? -1 : 1
  })
}

export function pushToArray(array, element) {
  if (isArray(array)) {
    array.push(element)
  } else {
    array = [element]
  }
}

export function calculateBodyMassIndex(height, weight) {
  if (height.length <= 0 || weight.length <= 0) {
    return
  }

  let bodyMassIndexDisplay
  let bodyMassIndex = (
    parseFloat(weight, 10) /
    ((parseFloat(height, 10) * parseFloat(height, 10)) / 10000)
  ).toFixed(2)

  if (isNaN(bodyMassIndex)) return

  if (bodyMassIndex < 18.5) {
    bodyMassIndexDisplay = 'Underweight'
  } else if (bodyMassIndex < 24.9) {
    bodyMassIndexDisplay = 'Normal Weight'
  } else if (bodyMassIndex < 29.9) {
    bodyMassIndexDisplay = 'Overweight'
  } else if (bodyMassIndex < 34.9) {
    bodyMassIndexDisplay = 'Obese class I'
  } else if (bodyMassIndex < 39.9) {
    bodyMassIndexDisplay = 'Obese class II'
  } else if (bodyMassIndex > 39.9) {
    bodyMassIndexDisplay = 'Obese class III'
  }

  return {
    bodyMassIndex,
    bodyMassIndexDisplay: bodyMassIndexDisplay,
  }
}

/**
 * Checks if obj1 contains every element of obj2
 * @param {Object} obj1 subset
 * @param {Object} obj2 superset
 * @returns {boolean} whether obj1 contains obj2
 */
export function matchElements(obj1, obj2) {
  // obj1 contains every element of obj2

  return Object.keys(obj1).every(key => {
    const v = obj1[key]

    if (typeof v === 'object' && v !== null) {
      return matchElements(v, obj2[key])
    }

    return v === obj2[key]
  })
}

/**
 * Checks if obj1 contains every key of obj2
 * @param {Object} obj1 subset
 * @param {Object} obj2 superset
 * @returns {boolean} whether obj1 contains obj2
 */
export function matchKeys(obj1, obj2) {
  // obj1 contains every element of obj2

  return Object.keys(obj1).every(key => {
    const v = obj1[key]

    if (typeof v === 'object' && v !== null) {
      return matchKeys(v, obj2[key])
    }

    return obj2.hasOwnProperty(key)
  })
}

export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

/**
 * Taking national identificition number to calculate gender
 * @param {string} NationalID subset
 * @returns {string} male or female defends on last digit
 */
export function calculateGender(NationalID) {
  if (NationalID.length !== 10) return

  let genderIdentity = parseInt(NationalID[8])
  if (genderIdentity % 2 === 1) return 'male'
  else return 'female'
}

/**
 * Taking birth date to calculate the age of client
 * This function is used when page is needed to show the age of client
 * @param {string} birthDate subset
 * @returns {number} (client age)
 */
export function calculateAgeFromBirthDate(birthDate) {
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

/**
 * Taking national idenfication number to calculate the birthdate
 * @param {string} NationalID subset
 * @returns {string} birthdate of client (yyyy-mm-dd)
 */
export function calculateBirthDate(NationalID) {
  // sub = **XX******
  if (NationalID.length < 4) return
  let sub = parseInt(NationalID.substring(2, 4))
  let thisYear = new Date().getFullYear()
  let year, month, day

  if (sub > parseInt(thisYear.toString().substring(2, 4))) {
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

export async function generatePdf(document, elementId, orientation) {
  console.log(document, elementId)
  const canvas = await html2canvas(document.getElementById(elementId), {
    width: 1000,
    // height: 1200
    onclone: function(documentClone) {
      documentClone.getElementById(elementId).style.opacity = '1'
      documentClone.getElementById(elementId).style.width = '1000px'
      // documentClone.getElementById(elementId).style.height = '794px'
    },
    logging: false,
  })

  if (!canvas) {
    return
  }
  console.log(canvas)
  console.log(canvas.height, canvas.width)

  const imgData = canvas.toDataURL('image/png')
  /*
    Here are the numbers (paper width and height) that I found to work.
    It still creates a little overlap part between the pages, but good enough for me.
    if you can find an official number from jsPDF, use them.
  */

  let doc

  if (orientation === 'portrait') {
    doc = new jsPDF('p', 'mm')
    let imgWidth = 210
    let pageHeight = 295
    let imgHeight = (canvas.height * imgWidth) / canvas.width - 30
    let heightLeft = imgHeight

    let position = 0
    doc.addImage(
      imgData,
      'PNG',
      0 + 15,
      position + 15,
      imgWidth - 30,
      imgHeight
    )
    heightLeft -= pageHeight
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight

      doc.addPage()
      doc.addImage(
        imgData,
        'PNG',
        0 + 15,
        position + 15,
        imgWidth - 30,
        imgHeight
      )
      heightLeft -= pageHeight
    }
  } else if (orientation === 'landscape') {
    doc = new jsPDF('l', 'mm')
    let imgWidth = 295
    let pageHeight = 210
    let imgHeight = (canvas.height * imgWidth) / canvas.width - 30
    let heightLeft = imgHeight

    let position = 0
    doc.addImage(
      imgData,
      'PNG',
      0 + 15,
      position + 15,
      imgWidth - 30,
      imgHeight
    )
    heightLeft -= pageHeight
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight

      doc.addPage()
      doc.addImage(
        imgData,
        'PNG',
        0 + 15,
        position + 15,
        imgWidth - 30,
        imgHeight
      )
      heightLeft -= pageHeight
    }
  }

  return btoa(doc.output())
}

/**
 * Taking number, which is the value of time to show the models such as "Create successful", "Save successful"
 * @param {number} delayInms value of delaying time
 * @returns {function} delaying time (showing time of model)
 */

export async function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, delayInms)
  })
}

export function pushRequest(
  { resource, newResource },
  method = '',
  tempId = ''
) {
  switch (method.toUpperCase()) {
    case 'POST': {
      const fullUrl = tempId.length > 0 ? tempId : generateFullUrl()
      const requestUrl = newResource.resourceType
      return {
        fullUrl: fullUrl,
        resource: newResource,
        request: {
          method: method.toUpperCase(),
          url: requestUrl,
        },
      }
    }
    case 'DELETE': {
      const vid = resource.meta.versionId
      const fullUrl = [
        config.fhirBaseUrl,
        resource.resourceType,
        resource.id,
      ].join('/')
      const requestUrl = [resource.resourceType, resource.id].join('/')
      return {
        fullUrl: fullUrl,
        resource: resource, // old resource
        request: {
          method: method.toUpperCase(),
          url: requestUrl,
          ifMatch: `W/"${vid}"`,
        },
      }
    }
    default: {
      const vid = resource.meta.versionId
      const fullUrl = [
        config.fhirBaseUrl,
        resource.resourceType,
        resource.id,
      ].join('/')
      const requestUrl = [resource.resourceType, resource.id].join('/')
      return {
        fullUrl: fullUrl,
        resource: newResource, // new resource
        request: {
          method: method.toUpperCase(),
          url: requestUrl,
          ifMatch: `W/"${vid}"`,
        },
      }
    }
  }
}

/**
 * Taking codeable concept to get display value of coding array
 * @param {object} codeableObject subset
 * @returns {text} if taken object has a code, it returns display of codeableConcept
 */
export function getDisplayOfCodeAbleConcept(codeableObject) {
  if (!!codeableObject.code) {
    const display = codeableObject.code.coding.find(v => v.display).display
    return display
  } else {
    return codeableObject
  }
}

export function calculateChecksumEAN13(value) {
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

export function calculatePreciseAge(birthDate) {
  // format is YYYY-MM-DD
  if (typeof birthDate !== 'string' || birthDate.length !== 10) {
    throw new Error('birthDate format should be YYYY-MM-DD')
  }
  const year = birthDate.slice(0, 4)
  const month = birthDate.slice(5, 7)
  const day = birthDate.slice(8, 10)
  const thisYear = moment().year()
  const yearDiff = moment().diff(moment(birthDate), 'years')
  const millisecondDiff = moment().diff(
    moment(`${thisYear}-${month}-${day}`),
    'milliseconds'
  )

  let result = {
    year: undefined,
    day: undefined,
  }

  const isLeap = moment([thisYear]).isLeapYear()
  const numberOfDays = isLeap ? 366 : 365
  const dayDiff = millisecondDiff / (1000 * 60 * 60 * 24)

  if (millisecondDiff >= 0) {
    // birthday is ahead
    result.year = yearDiff
    result.day = dayDiff
  } else {
    // birthday is behind
    result.year = yearDiff
    result.day = numberOfDays - Math.abs(dayDiff)
  }

  return result
}
//search between two date 'in queryTestsAwaited,queryTestsInInspection,queryTestsVerified'
export function searchByTwoConvertedTime(filteredDate) {
  const end = new Date(filteredDate)
  end.setDate(end.getDate() + 1)

  let startTime = moment.tz(filteredDate, 'Asia/Ulaanbaatar')

  let convertedStartTime = moment.tz(
    {
      year: startTime.year(),
      month: startTime.month(),
      day: startTime.date(),
      hour: 0,
      minute: 0,
      second: 0,
    },
    'Asia/Ulaanbaatar'
  )
  let endTime = moment.tz(end, 'Asia/Ulaanbaatar')

  let convertedEndTime = moment.tz(
    {
      year: endTime.year(),
      month: endTime.month(),
      day: endTime.date(),
      hour: 0,
      minute: 0,
      second: 0,
    },
    'Asia/Ulaanbaatar'
  )

  return { convertedStartTime, convertedEndTime }
}

export function getRelatedReferenceRange(referenceRange, patient) {
  if (!referenceRange) {
    throw new Error('referenceRange undefined')
  }

  if (
    !patient.gender ||
    !Object.keys(referenceRange).includes(patient.gender)
  ) {
    throw new Error('gender not in referenceRange')
  }

  if (!patient.birthDate) {
    throw new Error('birthDate undefined')
  }

  const patientPreciseAge = calculatePreciseAge(patient.birthDate)

  const genderReferenceRange = referenceRange[patient.gender]

  const relatedReferenceRange = genderReferenceRange.find(referenceRange => {
    if (
      patientPreciseAge.year > referenceRange.minAge.year ||
      (patientPreciseAge.year === referenceRange.minAge.year &&
        patientPreciseAge.day >= referenceRange.minAge.day)
    ) {
      if (
        patientPreciseAge.year < referenceRange.maxAge.year ||
        (patientPreciseAge.year === referenceRange.minAge.year &&
          patientPreciseAge.day < referenceRange.minAge.day)
      ) {
        // this is the one
        return true
      }
    }
    return false
  })

  return relatedReferenceRange
}

export function getInterpretation(
  Interpretations,
  valueQuantity,
  relatedReferenceRange
) {
  if (!Interpretations || !valueQuantity || !relatedReferenceRange) {
    throw new Error(
      'Undefined parameter',
      Interpretations,
      valueQuantity,
      relatedReferenceRange
    )
  }

  let interpretation

  if (
    parseFloat(valueQuantity.value) < relatedReferenceRange.low.value &&
    parseFloat(valueQuantity.value) >= relatedReferenceRange.criticalLow.value
  ) {
    interpretation = [Interpretations.CriticalLow]
  } else if (
    parseFloat(valueQuantity.value) < relatedReferenceRange.low.value &&
    parseFloat(valueQuantity.value) >= relatedReferenceRange.criticalLow.value
  ) {
    interpretation = [Interpretations.Low]
  } else if (
    parseFloat(valueQuantity.value) >= relatedReferenceRange.high.value
  ) {
    interpretation = [Interpretations.High]
  } else if (
    parseFloat(valueQuantity.value) < relatedReferenceRange.high.value &&
    parseFloat(valueQuantity.value) >= relatedReferenceRange.low.value
  ) {
    interpretation = [Interpretations.Normal]
  }

  return interpretation
}

export function getInterpretationNew(
  Interpretations,
  valueQuantity,
  relatedReferenceRange
) {
  if (!Interpretations || !valueQuantity || !relatedReferenceRange) {
    throw new Error(
      'Undefined parameter',
      Interpretations,
      valueQuantity,
      relatedReferenceRange
    )
  }

  const interpretation = relatedReferenceRange.interpretation.find(
    interpretation => {
      const greaterThanMin = interpretation.min
        ? parseFloat(valueQuantity.value) >= interpretation.min
        : true
      const lessThanMax = interpretation.max
        ? parseFloat(valueQuantity.value) < interpretation.max
        : true

      if (greaterThanMin && lessThanMax) {
        return true
      }

      return false
    }
  )

  const interpretationCoding = Interpretations[interpretation.type]

  return interpretationCoding
}

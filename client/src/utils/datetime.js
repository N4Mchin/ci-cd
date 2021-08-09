/**
 * Convert a string specifying date to local date string.
 * @param   {string}    dateTimeString  String to be Converted.
 * @param   {string}    format  Date format.
 * @return  {string}    Return a local date-time string.
 */
export function toLocalDateTime(dateTimeString, format) {
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

export function getInstant() {
  return new Date().toISOString()
}

export function findDayOfWeek(dateString) {
  const dayOfWeekDictionary = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const dateOfSchedule = new Date(dateString)

  const dayOfWeekIndex = dateOfSchedule.getDay()
  const dayOfWeek = dayOfWeekDictionary[dayOfWeekIndex]

  return dayOfWeek
}

export function getDate() {
  const date = new Date()
  let day = date.getDate()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // months start from 0  [ 0 : Jan, 1: Feb]

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  let strDateTime = `${year}-${month}-${day}`
  return strDateTime
}

export function getMonth() {
  const date = new Date()
  let month = date.getMonth() + 1 // months start from 0  [ 0 : Jan, 1: Feb]

  month = month < 10 ? '0' + month : month

  return month
}

export function getDaysInMonth(month) {
  const date = new Date()

  return new Date(date.getFullYear(), month, 0).getDate()
}

/**
 * Getting object to calculate the past date from past time and spent time
 * @param {object} dateObject - Object includes the date type and number of date
 * @return {string} result: string of date type (iso string)
 */
export function calculateDateFromSpentDate(dateObject) {
  let onSetTime
  const currentDateValue = new Date()

  if (!!dateObject) {
    if (dateObject.dateType === 'day') {
      onSetTime = new Date(
        currentDateValue.setDate(
          currentDateValue.getDate() - dateObject.dateValue
        )
      ).toISOString()
    } else if (dateObject.dateType === 'month') {
      onSetTime = new Date(
        currentDateValue.setMonth(
          currentDateValue.getMonth() - dateObject.dateValue
        )
      ).toISOString()
    } else if (dateObject.dateType === 'year') {
      onSetTime = new Date(
        currentDateValue.setFullYear(
          currentDateValue.getFullYear() - dateObject.dateValue
        )
      ).toISOString()
    }
  }

  return onSetTime
}

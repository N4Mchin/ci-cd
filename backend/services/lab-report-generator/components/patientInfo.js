const translate = require('./translate')

const SURNAME = 'Surname'
const GIVEN_NAME = 'Given name'
const AGE = 'Age'
const NATIONAL_IDENTIFICATION_NUMBER = 'National ID'
const GENDER = 'Gender'
const GENDER_VALUES = {
  male: 'Male',
  female: 'Female',
}
const MOBILE = 'Phone number'

module.exports = function drawPatientInfo({
  doc,
  language,
  pageSettings,
  lastName,
  firstName,
  age,
  gender,
  nationalIdentificationNumber,
  mobile,
}) {
  const { leftAlign } = pageSettings

  const surnameField = `${translate(SURNAME, language)}: ${lastName}`
  const givenNameField = `${translate(GIVEN_NAME, language)}: ${firstName}`
  const ageField = `${translate(AGE, language)}: ${age}`
  const nationalIdentificationNumberField = `${translate(
    NATIONAL_IDENTIFICATION_NUMBER,
    language
  )}: ${nationalIdentificationNumber}`
  const genderField = `${translate(GENDER, language)}: ${translate(
    GENDER_VALUES[gender],
    language
  )}`
  const mobileField = `${translate(MOBILE, language)}: ${mobile}`

  doc
    .font('./fonts/Helvetica-Neue.woff')
    .fontSize(11)
    .text(
      [
        surnameField,
        ageField,
        nationalIdentificationNumberField,
        givenNameField,
        genderField,
        mobileField,
      ].join('\n'),
      leftAlign,
      doc.y,
      {
        width: 500,
        align: 'justify',
        indent: 0,
        columns: 2,
        height: 40,
        ellipsis: true,
      }
    )
}

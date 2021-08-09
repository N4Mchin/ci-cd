const SNOMED = {
  system: 'http://snomed.info/sct',
}

const LOINC = {
  system: 'http://loinc.org/',
}

const ROLE_TYPE = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer',
  LABORATORY_TECHNICIAN: 'laboratory-technician',
  SENIOR_LABORATORY_TECHNICIAN: 'senior-laboratory-technician',
  PHLEBOTOMIST: 'phlebotomist',
  RECEPTIONIST: 'receptionist',
  PRACTITIONER: 'practitioner',
  PATIENT: 'patient',
  EXTERNAL_RECEPTIONIST: 'external-receptionist',
}

const CANCEL_REQUEST_MESSAGE = 'cancel request'

const RESULT_STATUS = {
  notAvailable: 'resultNotAvailable',
  entered: 'resultEntered',
  verified: 'resultVerified',
  reVerified: 'resultReVerified',
  reVerificationRequired: 'resultReVerificationRequired',
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

module.exports = {
  SNOMED,
  LOINC,
  ROLE_TYPE,
  CANCEL_REQUEST_MESSAGE,
  RESULT_STATUS,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
}

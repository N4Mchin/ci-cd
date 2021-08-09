export const SNOMED = {
  system: 'http://snomed.info/sct',
}

export const LOINC = {
  system: 'http://loinc.org/',
}

export const ROLE_TYPE = {
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

export const CANCEL_REQUEST_MESSAGE = 'cancel request'

export const RESULT_STATUS = {
  notAvailable: 'resultNotAvailable',
  entered: 'resultEntered',
  verified: 'resultVerified',
  reVerified: 'resultReVerified',
  reVerificationRequired: 'resultReVerificationRequired',
}

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 20

export const STATUS = {
  EXTERNAL_SPECIMEN_LOG: {
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    CONFIRMED: 'confirmed',
  },
}

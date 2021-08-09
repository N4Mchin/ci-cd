const schemas = require('@schemas')
const BundleEntry = require('@schemas/bundleentry')
const helper = require('@helper')
const moment = require('moment')
const constant = require('@constant')

function codeIntersects(codeElementA, codeElementB) {
  const codingA = codeElementA.coding
  const codingB = codeElementB.coding

  let matchFound = false

  if (codingA && codingB) {
    for (let codeA of codingA) {
      for (let codeB of codingB) {
        if (codeA.system === codeB.system && codeA.code === codeB.code) {
          matchFound = true
          break
        }
      }
      if (matchFound) {
        break
      }
    }
  }

  return matchFound
}

function loadResource(resource) {
  const Resource = schemas[resource.resourceType.toLowerCase()]
  return new Resource(resource)
}

function loadResourceArray(resourceArray) {
  return resourceArray.map(resource => loadResource(resource))
}

function groupByRequisition(resourceArray, requisitionCode) {
  const group = {}
  const resourceDictionary = createResourceDictionary(resourceArray)

  resourceArray
    .filter(r => r.resourceType === 'ServiceRequest')
    .forEach(serviceRequest => {
      const { requisition } = serviceRequest

      if (requisition.system === requisitionCode.system) {
        group[requisition.value] = pushToArray(
          serviceRequest,
          group[requisition.value]
        )
      }
    })

  Object.keys(group).forEach(requisitionId => {
    const serviceRequests = group[requisitionId]

    const SetFromRefs = {}

    serviceRequests.forEach(serviceRequest => {
      const serviceRequestRefUrl = helper.getReferenceUrl(serviceRequest)

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          if (
            observation.basedOn &&
            observation.basedOn.some(v => v.reference === serviceRequestRefUrl)
          ) {
            SetFromRefs[helper.getReferenceUrl(observation)] = observation
          }
        })

      resourceDictionary['Specimen'] &&
        resourceDictionary['Specimen'].forEach(specimen => {
          if (
            // specimen.request &&
            // specimen.request.some(v => v.reference === serviceRequestRefUrl)
            serviceRequest.specimen &&
            serviceRequest.specimen.some(spRef =>
              spRef.reference.endsWith(helper.getReferenceUrl(specimen))
            )
          ) {
            SetFromRefs[helper.getReferenceUrl(specimen)] = specimen
          }
        })

      resourceDictionary['Patient'] &&
        resourceDictionary['Patient'].forEach(patient => {
          if (
            serviceRequest.subject.reference.endsWith(
              helper.getReferenceUrl(patient)
            )
          ) {
            SetFromRefs[helper.getReferenceUrl(patient)] = patient
          }
        })

      resourceDictionary['DiagnosticReport'] &&
        resourceDictionary['DiagnosticReport'].forEach(diagnosticReport => {
          if (
            diagnosticReport.basedOn &&
            diagnosticReport.basedOn.some(
              v => v.reference === serviceRequestRefUrl
            )
          ) {
            SetFromRefs[
              helper.getReferenceUrl(diagnosticReport)
            ] = diagnosticReport
          }
        })
    })

    group[requisitionId].push(...Object.values(SetFromRefs))
  })

  return group
}

function createResourceDictionary(resourceArray, dict = {}) {
  resourceArray.forEach(resource => {
    const { resourceType } = resource
    dict[resourceType] = pushToArray(resource, dict[resourceType])
  })

  return dict
}

function pushToArray(obj, arr = []) {
  if (helper.isObject(obj)) {
    if (helper.isArray(arr)) {
      arr.push(obj)
    } else {
      arr = [obj]
    }
    return arr
  }
  throw new Error('pushToArray only accepts an object')
}

function recursiveTestDataBuilder(
  resourceArray,
  testCodings,
  serviceRequestId
) {
  const data = {}
  const resourceDictionary = createResourceDictionary(resourceArray)

  const serviceRequest = resourceDictionary['ServiceRequest'].find(sr => {
    if (serviceRequestId) {
      if (sr.id === serviceRequestId) {
        return true
      } else {
        return false
      }
    } else if (sr.code && codeIntersects(sr.code, testCodings.code)) {
      return true
    }
    return false
  })

  if (!serviceRequest) {
    return
  }

  const serviceRequestRef = getReference(serviceRequest)
  const serviceRequestRefUrl = getReferenceUrl(serviceRequest)
  const specimen =
    resourceDictionary['Specimen'] &&
    resourceDictionary['Specimen'].filter(
      sp =>
        serviceRequest.specimen &&
        serviceRequest.specimen.some(
          srSpecimen => srSpecimen.reference === getReferenceUrl(sp)
        )
    )

  Object.assign(data, {
    serviceRequest,
    serviceRequestRef,
    specimen,
  })

  if (resourceDictionary['Observation']) {
    const observation = resourceDictionary['Observation'].filter(
      ob =>
        ob.code &&
        codeIntersects(testCodings.code, ob.code) &&
        ob.basedOn &&
        ob.basedOn.some(v => v.reference === serviceRequestRefUrl)
    )

    sortByDate(observation, 'issued')
    const latestObservation = getLastResource(observation)

    Object.assign(data, {
      observation,
      latestObservation,
    })
  }

  if (testCodings.include) {
    data['include'] = {}

    Object.keys(testCodings.include).forEach(childKey => {
      const childValue = testCodings['include'][childKey]

      const includeResources = recursiveTestDataBuilder(
        resourceArray,
        childValue
      )

      includeResources &&
        Object.assign(data['include'], {
          [childKey]: includeResources,
        })
    })
  }
  return data
}

function getReferenceUrl(resource) {
  return `${resource.resourceType}/${resource.id}`
}

function getReference(resource) {
  const reference = {
    reference: `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  }

  return reference
}

function getLastResource(resourceArray) {
  return resourceArray.slice(-1).pop()
}

function sortByDate(array, dateKey) {
  return array.sort((a, b) => {
    const dateA = new Date(a[dateKey])
    const dateB = new Date(b[dateKey])
    return dateA <= dateB ? -1 : 1
  })
}

function containsReference(obj, reference) {
  const [type, id] = reference.split('/').slice(-2)
  if (helper.isArray(obj)) {
    return obj.some(o => o.reference.endsWith(`${type}/${id}`))
  } else if (helper.isObject(obj)) {
    return obj.reference.endsWith(`${type}/${id}`)
  }
}

function findByReference(resourceArray, referenceObject) {
  const [type, id] = referenceObject.reference.split('/').slice(-2)
  return resourceArray.find(
    resource => resource.resourceType === type && resource.id === id
  )
}

function getRelatedReferenceRange(referenceRange, patient) {
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

function calculatePreciseAge(birthDate) {
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

function hasCancelled(data) {
  // latestObservation is cancelled

  if (!data) {
    return false
  }

  if (!!data.latestObservation) {
    if (data.latestObservation.status === 'cancelled') {
      return true
    }
  }

  if (!!data.include) {
    const childHasCancelled = Object.values(data.include)
      .map(i => hasCancelled(i))
      .includes(true)

    if (childHasCancelled) {
      return true
    }
  }

  return false
}

function hadBeenCancelled(data) {
  // contains cancelled observation in observation array
  // but latest observation is updated

  if (!data) {
    return false
  }

  if (helper.isArray(data.observation) && data.observation.length > 0) {
    const hadContainedCancelled = data.observation
      .map(o => o.status)
      .includes('cancelled')
    if (hadContainedCancelled) {
      return true
    }
  }

  if (!!data.include) {
    const childHadBeenCancelled = Object.values(data.include)
      .map(i => hadBeenCancelled(i))
      .includes(true)

    if (childHadBeenCancelled) {
      return true
    }
  }

  return false
}

function getIdFromRef(ref) {
  return !!ref && ref.split('/').pop()
}

function groupByRequisition(resourceArray, requisitionCode) {
  const group = {}
  const resourceDictionary = createResourceDictionary(resourceArray)

  resourceArray
    .filter(r => r.resourceType === 'ServiceRequest')
    .forEach(serviceRequest => {
      const { requisition } = serviceRequest

      if (requisition.system === requisitionCode.system) {
        group[requisition.value] = pushToArray(
          serviceRequest,
          group[requisition.value]
        )
      }
    })

  Object.keys(group).forEach(requisitionId => {
    const serviceRequests = group[requisitionId]

    const SetFromRefs = {}

    serviceRequests.forEach(serviceRequest => {
      const serviceRequestRefUrl = getReferenceUrl(serviceRequest)

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          if (
            observation.basedOn &&
            observation.basedOn.some(v => v.reference === serviceRequestRefUrl)
          ) {
            SetFromRefs[getReferenceUrl(observation)] = observation
          }
        })

      resourceDictionary['Specimen'] &&
        resourceDictionary['Specimen'].forEach(specimen => {
          if (
            // specimen.request &&
            // specimen.request.some(v => v.reference === serviceRequestRefUrl)
            serviceRequest.specimen &&
            serviceRequest.specimen.some(spRef =>
              spRef.reference.endsWith(getReferenceUrl(specimen))
            )
          ) {
            SetFromRefs[getReferenceUrl(specimen)] = specimen
          }
        })

      resourceDictionary['Patient'] &&
        resourceDictionary['Patient'].forEach(patient => {
          if (
            serviceRequest.subject.reference.endsWith(getReferenceUrl(patient))
          ) {
            SetFromRefs[getReferenceUrl(patient)] = patient
          }
        })

      resourceDictionary['DiagnosticReport'] &&
        resourceDictionary['DiagnosticReport'].forEach(diagnosticReport => {
          if (
            diagnosticReport.basedOn &&
            diagnosticReport.basedOn.some(
              v => v.reference === serviceRequestRefUrl
            )
          ) {
            SetFromRefs[getReferenceUrl(diagnosticReport)] = diagnosticReport
          }
        })
    })

    group[requisitionId].push(...Object.values(SetFromRefs))
  })

  return group
}

function generateTableData(bundle, FHIR_CODES, TEST) {
  const entry = bundle.entry.map(e => new BundleEntry(e))

  // Converting to class, we can call helper funLabTestsh as getFullName, etc.
  const resourceArray = loadResourceArray(entry.map(e => e.resource))
  // const resourceDictionary = createResourceDictionary(resourceArray)

  const groups = groupByRequisition(
    resourceArray,
    FHIR_CODES.Identifiers.ServiceRequestRequisition
  )

  const TEST_CODE = TEST.code
  // const subTestsCodings = TEST.value

  const dataSource = Object.keys(groups).map(requisitionId => {
    const group = groups[requisitionId]

    const resourceDictionary = createResourceDictionary(group)
    const serviceRequests = resourceDictionary['ServiceRequest']

    // check if all subjects are the same
    if (
      !serviceRequests
        .map(serviceRequest => serviceRequest.subject.reference)
        .every((ref, i, refs) => ref === refs[0])
    ) {
      // faulty group
      throw new Error('service requests reference more than 1 patient')
    }

    const patient = findByReference(
      resourceDictionary['Patient'],
      serviceRequests[0].subject
    )

    const mainServiceRequest = serviceRequests.find(
      sr => sr.code && codeIntersects(sr.code, TEST_CODE)
    )

    // if (
    //   mainServiceRequest.status !== 'active' ||
    //   mainServiceRequest.status !== 'completed'
    // ) {
    //   return {}
    // }

    const testData = recursiveTestDataBuilder(group, TEST)

    let latestAccessionIdentifier
    let latestCollectedDateTime
    let specimen

    console.log(resourceDictionary['Specimen'])
    if (!resourceDictionary['Specimen']) {
      return {}
    }

    if (mainServiceRequest && mainServiceRequest.specimen) {
      const specimenIds = mainServiceRequest.specimen.map(specimen =>
        getIdFromRef(specimen.reference)
      )

      specimen = resourceDictionary['Specimen'].filter(sp =>
        specimenIds.includes(sp.id)
      )
      sortByDate(specimen, 'collection.collectedDateTime')

      const latestSpecimen = specimen.slice(-1)[0]

      if (latestSpecimen.status !== 'available') {
        return null
      }

      if (
        latestSpecimen.accessionIdentifier.system ===
        FHIR_CODES.Identifiers.LiverCenter.Specimen.system
      ) {
        latestAccessionIdentifier = latestSpecimen.accessionIdentifier.value
        latestCollectedDateTime =
          latestSpecimen && latestSpecimen.collection.collectedDateTime
      }
    }

    let lastUpdated = mainServiceRequest && mainServiceRequest.meta.lastUpdated

    const mainTestReference = getReference(mainServiceRequest)

    const diagnosticReport =
      resourceDictionary['DiagnosticReport'] &&
      resourceDictionary['DiagnosticReport'].find(
        dr =>
          dr.basedOn &&
          dr.basedOn.some(basedOnRef =>
            basedOnRef.reference.endsWith(getReferenceUrl(mainServiceRequest))
          )
      )

    const regulatoryNotesObservation =
      resourceDictionary['Observation'] &&
      resourceDictionary['Observation'].find(
        obs =>
          obs.code &&
          codeIntersects(FHIR_CODES.Observations.RegulatoryNotes.code, obs.code)
      )

    const regulatoryNotesValue =
      regulatoryNotesObservation && regulatoryNotesObservation.valueString

    const containsCancelledObservation = hasCancelled(testData)
    const hadContainedCancelledObservation = hadBeenCancelled(testData)

    let status = constant.RESULT_STATUS.notAvailable

    if (diagnosticReport) {
      if (
        diagnosticReport.status === 'preliminary' &&
        mainServiceRequest.status === 'completed'
      ) {
        status = constant.RESULT_STATUS.reVerificationRequired
      } else if (diagnosticReport.status === 'final') {
        if (containsCancelledObservation) {
          status = constant.RESULT_STATUS.reVerified
        } else {
          status = constant.RESULT_STATUS.verified
        }
      } else if (diagnosticReport.status === 'partial') {
        status = constant.RESULT_STATUS.entered
      }
    }

    const data = {
      key: mainServiceRequest.id,
      serviceRequestId: mainServiceRequest.id,
      requisition: mainServiceRequest.requisition,
      date: lastUpdated,
      sampleAccessionIdentifier: latestAccessionIdentifier,
      sampleCollectionDateTime: latestCollectedDateTime,

      testName: TEST.display,
      patientName: patient.getOfficialNameString({ short: true }),
      patient: patient,
      lastName: patient.getLastName(),
      firstName: patient.getFirstName(),
      patientNumber: patient._getBarcode(),
      emails: patient.getEmails(),
      mobilePhones: patient.getMobilePhones(),
      serviceRequestStatus: mainServiceRequest.status,
      subject: patient.getReference(),
      mainTestReference: mainTestReference,
      diagnosticReport: diagnosticReport,
      ...testData,
      containsCancelledObservation,
      hadContainedCancelledObservation,
      status,
      regulatoryNotesObservation,
      regulatoryNotesValue,
    }

    // if (subTestsCodings) {
    //   // if test has child tests
    //   const tests = createTestDictionary(
    //     groups[requisitionId].filter(
    //       resource => resource.resourceType === 'ServiceRequest'
    //     ),
    //     resourceArray,
    //     subTestsCodings
    //   )

    //   Object.assign(data, {
    //     ...tests,
    //   })
    // }

    if (
      mainServiceRequest.status === 'active' &&
      mainServiceRequest.priority === 'stat'
    ) {
      data.status = 'cito'
    }

    return data
  })

  const filtered = dataSource.filter(d => d && !helper.isEmptyObject(d))

  return filtered
}

module.exports = {
  codeIntersects,
  groupByRequisition,
  createResourceDictionary,
  loadResource,
  loadResourceArray,
  recursiveTestDataBuilder,
  getReferenceUrl,
  containsReference,
  findByReference,
  sortByDate,
  getRelatedReferenceRange,
  generateTableData,
  hasCancelled,
  hadBeenCancelled,
  getIdFromRef,
}

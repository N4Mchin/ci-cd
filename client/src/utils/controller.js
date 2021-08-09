/* eslint-disable no-console */
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import { bundleentry as BundleEntry } from 'schemas'
import { RESULT_STATUS } from 'utils/constant'
import { toLocalDateTime } from 'utils/datetime'

function addToReferenceArrayIfNotExists(refArray = [], resource) {
  const refObj = helper.getReference(resource)
  if (
    !refArray.some(refItemObj =>
      refItemObj.reference.endsWith(refObj.reference)
    )
  ) {
    refArray.push(refObj)
  }
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

function getUrlFromResource(resource) {
  return `${resource.resourceType}/${resource.id}`
}

function getIdFromRef(ref) {
  return !!ref && ref.split('/').pop()
}

function findResourceById(resourceArray, id) {
  return resourceArray.find(resource => resource.id === id)
}

function createResourceDictionary(resourceArray, dict = {}) {
  resourceArray.forEach(resource => {
    const { resourceType } = resource
    dict[resourceType] = pushToArray(resource, dict[resourceType])
  })

  return dict
}

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

function createTestDictionary(serviceRequests, resourceArray, subTestsCodings) {
  const dict = {}

  serviceRequests.forEach(serviceRequest => {
    const { code } = serviceRequest

    subTestsCodings.forEach(labTest => {
      if (codeIntersects(labTest.code, code)) {
        if (dict[labTest.name] !== undefined) {
          throw new Error('Duplicate lab test')
        }

        const serviceRequestRefUrl = `${serviceRequest.resourceType}/${serviceRequest.id}`

        const Observation = resourceArray.find(
          resource =>
            resource.basedOn &&
            resource.basedOn.some(v => v.reference === serviceRequestRefUrl)
        )

        const observationRefUrl =
          Observation && `${Observation.resourceType}/${Observation.id}`
        const status = Observation && Observation.status
        const reVerify = status === 'entered-in-error' ? true : false

        const value =
          Observation &&
          Observation.valueCodeableConcept &&
          Observation.valueCodeableConcept.text

        dict[labTest.name] = {
          status: status,
          value: value,
          reVerify: reVerify,
          serviceRequestRef: {
            reference: serviceRequestRefUrl,
          },
          observationRef: {
            reference: observationRefUrl,
          },
        }
      }
    })
  })

  return dict
}

function getLastResource(resourceArray) {
  return resourceArray.slice(-1).pop()
}

function generateTableData(bundle, FHIR_CODES, TEST) {
  const entry = bundle.entry.map(e => new BundleEntry(e))

  // Converting to class, we can call helper functions such as getFullName, etc.
  const resourceArray = helper.loadResourceArray(entry.map(e => e.resource))
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

    const patient = helper.findByReference(
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
      helper.sortByDate(specimen, 'collection.collectedDateTime')

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

    const mainTestReference = helper.getReference(mainServiceRequest)

    const diagnosticReport =
      resourceDictionary['DiagnosticReport'] &&
      resourceDictionary['DiagnosticReport'].find(
        dr =>
          dr.basedOn &&
          dr.basedOn.some(basedOnRef =>
            basedOnRef.reference.endsWith(
              helper.getReferenceUrl(mainServiceRequest)
            )
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

    let status = RESULT_STATUS.notAvailable

    if (diagnosticReport) {
      if (
        diagnosticReport.status === 'preliminary' &&
        mainServiceRequest.status === 'completed'
      ) {
        status = RESULT_STATUS.reVerificationRequired
      } else if (diagnosticReport.status === 'final') {
        if (containsCancelledObservation) {
          status = RESULT_STATUS.reVerified
        } else {
          status = RESULT_STATUS.verified
        }
      } else if (diagnosticReport.status === 'partial') {
        status = RESULT_STATUS.entered
      }
    }

    const data = {
      key: mainServiceRequest.id,
      serviceRequestId: mainServiceRequest.id,
      requisition: mainServiceRequest.requisition,
      date: dateTime.toLocalDateTime(lastUpdated),
      sampleAccessionIdentifier: latestAccessionIdentifier,
      sampleCollectionDateTime: dateTime.toLocalDateTime(
        latestCollectedDateTime
      ),
      testName: TEST.display,
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

  console.log(dataSource)

  const filtered = dataSource.filter(d => d && !helper.isEmptyObject(d))

  return filtered
}

function generatePhlebotomyTableData(bundle, FHIR_CODES) {
  const entry = bundle.entry.map(e => new BundleEntry(e))

  if (entry.length === 0) {
    return []
  }

  // Converting to class, we can call helper functions such as getFullName, etc.
  const resourceArray = helper.loadResourceArray(entry.map(e => e.resource))

  const resourceDictionary = createResourceDictionary(resourceArray)

  const dataSource = resourceDictionary['List']
    .map(list => {
      const date = dateTime.toLocalDateTime(list.date, 'yyyy-mm-dd hh:mm')

      const patient = resourceDictionary['Patient'].find(
        p => helper.getReferenceUrl(p) === list.subject.reference
      )

      const id = list.id
      const firstName = patient.getFirstName()
      const lastName = patient.getLastName()
      const barcode = patient._getBarcode()
      const NInum = patient.getNationalIdentificationNumber()

      const phlebotomyRequests = list.entry
        .map(entryItem =>
          findByReference(
            resourceDictionary['ServiceRequest'],
            entryItem.item.reference
          )
        )
        .filter(serviceRequest =>
          codeIntersects(
            serviceRequest.code,
            FHIR_CODES.Phlebotomy.PhlebotomyServiceRequest.code
          )
        )

      const totalPhlebotomy = phlebotomyRequests.length

      const completedPhlebotomy = phlebotomyRequests.filter(
        sr => sr.status === 'completed'
      ).length
      const remainingPhlebotomy = phlebotomyRequests.filter(
        sr => sr.status === 'active'
      ).length

      const data = {
        id,
        date,
        firstName,
        lastName,
        barcode,
        NInum,
        totalPhlebotomy,
        completedPhlebotomy,
        remainingPhlebotomy,
      }

      return data
    })
    .filter(val => !!val)

  return dataSource
}

function generateLaboratoryTestList(bundle, FHIR_CODES, LabTests) {
  const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())
  const dataSource = []

  const resourceDictionary = createResourceDictionary(resourceArray)

  resourceDictionary['ServiceRequest'].forEach(serviceRequest => {
    if (!serviceRequest.code) {
      return
    }

    const testKey = Object.keys(LabTests).find(labTestKey =>
      codeIntersects(serviceRequest.code, LabTests[labTestKey].code)
    )

    if (!testKey) {
      return
    }

    const testName = LabTests[testKey].display

    const patient = helper.findByReference(
      resourceDictionary['Patient'],
      serviceRequest.subject
    )

    const diagnosticReport =
      resourceDictionary['DiagnosticReport'] &&
      resourceDictionary['DiagnosticReport'].find(
        diagnosticReport =>
          // diagnosticReport.code &&
          // codeIntersects(diagnosticReport.code, LabTests[testKey].code)
          diagnosticReport.basedOn &&
          diagnosticReport.basedOn.some(basedOnRef =>
            basedOnRef.reference.endsWith(
              helper.getReferenceUrl(serviceRequest)
            )
          )
      )

    let specimen
    let latestCollectedDateTime
    let latestAccessionIdentifier

    specimen =
      serviceRequest.specimen &&
      serviceRequest.specimen.map(spRef =>
        helper.findByReference(resourceDictionary['Specimen'], spRef)
      )

    // if (!specimen) return
    // if (!specimen.some(sp => sp.status === 'available')) return

    if (specimen) {
      helper.sortByDate(specimen, 'collection.collectedDateTime')
      let latestSpecimen = specimen.slice(-1)[0]
      latestCollectedDateTime = latestSpecimen.collection.collectedDateTime

      if (
        latestSpecimen.accessionIdentifier.system ===
        FHIR_CODES.Identifiers.LiverCenter.Specimen.system
      ) {
        latestAccessionIdentifier = latestSpecimen.accessionIdentifier.value
      }
    }

    // const testData = recursiveTestDataBuilder(
    //   resourceArray,
    //   LabTests[testKey],
    //   serviceRequest.id
    // )

    const resourceGroup =
      diagnosticReport &&
      buildTestDataTree(resourceArray, diagnosticReport, LabTests[testKey])

    const testData = resourceGroup

    const containsCancelledObservation = hasCancelled(testData)
    const hadContainedCancelledObservation = hadBeenCancelled(testData)

    let status = RESULT_STATUS.notAvailable

    if (diagnosticReport) {
      if (diagnosticReport.status === 'partial') {
        status = RESULT_STATUS.entered
      } else if (diagnosticReport.status === 'preliminary') {
        status = RESULT_STATUS.reVerificationRequired
      } else if (diagnosticReport && diagnosticReport.status === 'final') {
        if (containsCancelledObservation) {
          status = RESULT_STATUS.reVerified
        } else {
          status = RESULT_STATUS.verified
        }
      }
    }

    // if (
    //   mainServiceRequest.status === 'active' &&
    //   mainServiceRequest.priority === 'stat'
    // ) {
    //   data.status = 'cito'
    // }

    const data = {
      testKey,
      testName,
      patient,
      key: serviceRequest.id,
      serviceRequest: serviceRequest,
      patientNumber: patient._getBarcode(),
      firstName: patient.getFirstName(),
      lastName: patient.getLastName(),
      status,
      diagnosticReport,
      sampleCollectionDateTime: latestCollectedDateTime,
      sampleAccessionIdentifier: latestAccessionIdentifier,
    }

    dataSource.push(data)
  })

  const filtered = dataSource.filter(d => d && !helper.isEmptyObject(d))

  return filtered
}

function recursiveTestDataBuilder(
  resourceArray,
  testCodings,
  serviceRequestId
) {
  const data = {}
  const resourceDictionary = createResourceDictionary(resourceArray)

  const serviceRequest = resourceDictionary['ServiceRequest'].find(sr => {
    console.log(sr)
    if (serviceRequestId) {
      if (sr.id === serviceRequestId) {
        return true
      } else {
        return false1
      }
    } else if (sr.code && codeIntersects(sr.code, testCodings.code)) {
      return true
    }
    return false
  })

  if (!serviceRequest) {
    return
  }

  const serviceRequestRef = helper.getReference(serviceRequest)
  const serviceRequestRefUrl = helper.getReferenceUrl(serviceRequest)
  const specimen =
    resourceDictionary['Specimen'] &&
    resourceDictionary['Specimen'].filter(
      sp =>
        serviceRequest.specimen &&
        serviceRequest.specimen.some(
          srSpecimen => srSpecimen.reference === helper.getReferenceUrl(sp)
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

    helper.sortByDate(observation, 'issued')
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

function getFirstCoding(code) {
  return code.coding && code.coding[0]
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

function latestObservationCollector(data, observations = []) {
  if (data && helper.isObject(data.latestObservation)) {
    observations.push(data.latestObservation)
  }

  if (data && data.include && helper.isObject(data.include)) {
    Object.values(data.include).forEach(included => {
      latestObservationCollector(included, observations)
    })
  }

  return observations
}

// function generatePanelReport(bundle, TEST) {
//   const entry = bundle.entry.map(e => new BundleEntry(e))

//   // Converting to class, we can call helper functions such as getFullName, etc.
//   const resourceArray = helper.loadResourceArray(entry.map(e => e.resource))
//   const resourceDictionary = createResourceDictionary(resourceArray)

//   const observationArray = resourceDictionary["Observation"]

//   observationArray.map(observation => {
//     const testCode=  TEST.code
//     observationArray.find()
//   })

//   console.log(resourceArray)
// }

function buildTestDataTree(resourceArray, resource, TEST_DATA) {
  const result = iterativeGet(resourceArray, [resource])

  const testData = recursiveTestDataBuilder(result, TEST_DATA)

  return testData
}

/**
 * Get resources iteratively (extends resource array)
 * @param {Array} resourceArray - resource array
 * @param {Array} resources - resources to iterate
 * @param {Array} result - resolved resource array
 * @return {Array} result: array of included resources
 */
function iterativeGet(resourceArray, resources, result = []) {
  if (!resourceArray || !resources) {
    throw new Error('insufficient parameters')
  }

  const refSet = new Set([])
  resources.forEach(resource => getRefSet(resource, refSet))

  const refArray = [...refSet]

  const includeRefs = refArray.filter(
    ref =>
      !ref.startsWith('#') &&
      !result.some(resultItem =>
        ref.endsWith(`${resultItem.resourceType}/${resultItem.id}`)
      )
  )

  if (includeRefs.length > 0) {
    const includeResources = includeRefs
      .map(ref => findByReference(resourceArray, ref))
      .filter(val => !!val)
    result.push(...includeResources)
    iterativeGet(resourceArray, includeResources, result)
  }

  return result
}

function getRefSet(obj, refSet = new Set([])) {
  Object.keys(obj).forEach(key => {
    if (key === 'reference' && obj[key] !== undefined) {
      refSet.add(obj[key])
    } else if (typeof obj[key] === 'object') {
      // object || array
      getRefSet(obj[key], refSet)
    }
  })

  return refSet
}

function findByReference(resourceArray, reference) {
  const [type, id] = reference.split('/').slice(-2)
  return resourceArray.find(
    resource => resource.resourceType === type && resource.id === id
  )
}

function containsReference(obj, reference) {
  const [type, id] = reference.split('/').slice(-2)
  if (helper.isArray(obj)) {
    return obj.some(o => o.reference.endsWith(`${type}/${id}`))
  } else if (helper.isObject(obj)) {
    return obj.reference.endsWith(`${type}/${id}`)
  }
}

/**
 * Get resource dictionary of brief general examination to generate the data
 * Print inspection note and examination view section
 * @param {Object} valueSet - To generate the data
 * @param {Object} interpretation - To sort the observation's interpretation
 * @param {Object} resourceDictionaryArray - resource dictionary array
 * @param {Array} briefGeneralExaminationList - brief general examination list
 * @return {Array} result: generated data of examination
 */
function generateBriefGeneralExamination(
  valueSet,
  interpretation,
  resourceDictionaryArray,
  briefGeneralExaminationList
) {
  const patientBriefHistoryList = []
  const {
    VitalSignsFinding,
    BodyMassIndex,
    GeneralPhysicalFinding,
    PhysicalFindingsOfGastrointestinalSystem,
    PhysicalFindingsOfGenitourinaryTract,
  } = valueSet.include

  briefGeneralExaminationList.forEach(examination => {
    const examinationSubObject = {}

    const recordedDate = toLocalDateTime(examination.date, 'yyyy-mm-dd')

    examination.section.forEach(compositionSection => {
      if (
        /* #region  VitalSignsFinding */
        codeIntersects(compositionSection.code, VitalSignsFinding.code)
      ) {
        const observationObject = {}

        Object.keys(VitalSignsFinding.include).forEach(includeKey => {
          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            const {
              DiastolicBloodPressure,
              SystolicArterialPressure,
            } = VitalSignsFinding.include.BloodPressure.component

            if (
              codeIntersects(
                VitalSignsFinding.include[includeKey].code,
                observation.code
              )
            ) {
              // энэ хэсэгт зөвхөн нэг л утга өөр төрөл буюу
              // component хэлбэртээ хадгалагдаж байгаа
              // аль болох цэвэрхэн харагдах талаасаа давталт
              // ашиглан хийгээгүй байгаа

              if (observation.component) {
                observation.component.forEach(componentValue => {
                  if (
                    codeIntersects(
                      DiastolicBloodPressure.code,
                      componentValue.code
                    )
                  ) {
                    observationObject['DiastolicBloodPressure'] = {
                      designation: DiastolicBloodPressure.designation,
                      value: componentValue.valueQuantity.value,
                      unit: VitalSignsFinding.include.BloodPressure.unit,
                    }
                  }

                  if (
                    codeIntersects(
                      SystolicArterialPressure.code,
                      componentValue.code
                    )
                  ) {
                    observationObject['SystolicArterialPressure'] = {
                      designation: SystolicArterialPressure.designation,
                      value: componentValue.valueQuantity.value,
                      unit: VitalSignsFinding.include.BloodPressure.unit,
                    }
                  }
                })
              } else {
                observationObject[includeKey] = {
                  designation:
                    VitalSignsFinding.include[includeKey].designation,
                  value: observation.valueQuantity.value,
                  unit: VitalSignsFinding.include[includeKey].unit,
                  valueType: VitalSignsFinding.include[includeKey].valueType,
                }
              }
            }
          })
        })

        examinationSubObject['VitalSignsFinding'] = {
          designation: VitalSignsFinding.designation,
          include: observationObject,
        }
        console.log(examinationSubObject['VitalSignsFinding'])
        /* #endregion */
      } else if (
        /* #region  GeneralPhysicalFinding */
        codeIntersects(compositionSection.code, GeneralPhysicalFinding.code)
      ) {
        const observationObject = {}

        Object.keys(GeneralPhysicalFinding.include).forEach(includeKey => {
          const valueType = GeneralPhysicalFinding.include[includeKey].valueType

          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            if (
              codeIntersects(
                GeneralPhysicalFinding.include[includeKey].code,
                observation.code
              )
            ) {
              let observationValue

              const interpretationStatus =
                observation.interpretation &&
                Object.values(interpretation).find(interpretationValue =>
                  codeIntersects(
                    interpretationValue,
                    observation.interpretation.find(v => v.coding)
                  )
                )

              console.log(
                GeneralPhysicalFinding.include[includeKey].designation,
                includeKey
              )

              if (valueType === 'valueCodeableConceptWithBodySite') {
                const { Edema } = GeneralPhysicalFinding.include
                let edamaValue
                const bodySiteValues = []

                console.log(observation.interpretation)

                if (observation.valueCodeableConcept) {
                  edamaValue = Object.values(Edema.include).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation
                }

                if (!!observation.bodySite) {
                  bodySiteValues.push(
                    Object.values(
                      Edema.include.OnExaminationEdema.bodySite
                    ).find(includeValue =>
                      codeIntersects(includeValue.code, observation.bodySite)
                    ).designation
                  )
                } else if (!!observation.component) {
                  observation.component.forEach(componentValue => {
                    bodySiteValues.push(
                      Object.values(
                        Edema.include.OnExaminationEdema.bodySite
                      ).find(includeValue =>
                        codeIntersects(
                          includeValue.code,
                          componentValue.valueCodeableConcept
                        )
                      ).designation
                    )
                  })
                }

                observationValue = {
                  designation: edamaValue,
                  bodySite: bodySiteValues,
                  interpretationStatus: interpretationStatus,
                }
              } else if (valueType === 'valueCodeableConceptWithNote') {
                observationValue = {
                  designation: Object.values(
                    GeneralPhysicalFinding.include[includeKey].include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation,
                  text:
                    observation.note &&
                    observation.note.find(noteItem => noteItem.text).text,
                  interpretationStatus: interpretationStatus,
                }
              } else {
                observationValue = {
                  designation: Object.values(
                    GeneralPhysicalFinding.include[includeKey].include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation,
                  interpretationStatus: interpretationStatus,
                }
              }

              observationObject[includeKey] = {
                designation:
                  GeneralPhysicalFinding.include[includeKey].designation,
                value: observationValue,
                valueType: GeneralPhysicalFinding.include[includeKey].valueType,
              }
            }
          })
        })

        examinationSubObject['GeneralPhysicalFinding'] = {
          designation: GeneralPhysicalFinding.designation,
          include: observationObject,
        }
        console.log(examinationSubObject['GeneralPhysicalFinding'])
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfGastrointestinalSystem */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfGastrointestinalSystem.code
        )
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsOfGastrointestinalSystem.include).forEach(
          includeKey => {
            const valueType =
              PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                .valueType

            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                    .code,
                  observation.code
                )
              ) {
                let observationValue

                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                if (valueType === 'hasMemberSection') {
                  console.log('has member section', observation)
                  const hasMemberValues = {}

                  Object.keys(
                    PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                      .hasMember
                  ).forEach(hasMemberValue => {
                    const hasMemberSubValues = {}

                    const hasMemberValueSet =
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        includeKey
                      ].hasMember[hasMemberValue]

                    observation.hasMember.forEach(observationHasMember => {
                      const hasMemberObservation = helper.findByReference(
                        resourceDictionaryArray['Observation'],
                        observationHasMember
                      )

                      console.log(hasMemberObservation)

                      if (
                        codeIntersects(
                          hasMemberValueSet.code,
                          hasMemberObservation.code
                        )
                      ) {
                        if (hasMemberValueSet.component) {
                          Object.keys(hasMemberValueSet.include).forEach(
                            includeValue => {
                              if (
                                codeIntersects(
                                  hasMemberObservation.valueCodeableConcept,
                                  hasMemberValueSet.include[includeValue].code
                                )
                              ) {
                                if (includeValue === 'Pain') {
                                  console.log(hasMemberObservation)

                                  hasMemberObservation.component.forEach(
                                    hasMemberComponent => {
                                      hasMemberSubValues[includeValue] = {
                                        designation:
                                          hasMemberValueSet.include[
                                            includeValue
                                          ].designation,
                                        component: hasMemberObservation.component && {
                                          designation:
                                            hasMemberValueSet.component
                                              .designation,
                                          value: Object.values(
                                            hasMemberValueSet.component.include
                                          ).find(includeValue =>
                                            codeIntersects(
                                              includeValue.code,
                                              hasMemberComponent.code
                                            )
                                          ).designation,
                                        },
                                      }
                                    }
                                  )
                                } else {
                                  hasMemberSubValues[includeValue] =
                                    hasMemberValueSet.include[
                                      includeValue
                                    ].designation
                                }
                              }
                            }
                          )
                        } else {
                          Object.keys(hasMemberValueSet.include).forEach(
                            includeValue => {
                              if (
                                codeIntersects(
                                  hasMemberObservation.valueCodeableConcept,
                                  hasMemberValueSet.include[includeValue].code
                                )
                              ) {
                                hasMemberSubValues[includeValue] =
                                  hasMemberValueSet.include[
                                    includeValue
                                  ].designation
                              }
                            }
                          )
                        }
                      }
                    })

                    hasMemberValues[hasMemberValue] = {
                      designation: hasMemberValueSet.designation,
                      value: hasMemberSubValues,
                    }
                  })

                  observationValue = {
                    interpretationStatus: interpretationStatus,
                    include: hasMemberValues,
                  }
                } else {
                  observationValue = {
                    designation: Object.values(
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        includeKey
                      ].include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    interpretationStatus: interpretationStatus,
                  }
                }

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                      .designation,
                  value: observationValue,
                  valueType:
                    PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                      .valueType,
                }
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfGastrointestinalSystem'] = {
          designation: PhysicalFindingsOfGastrointestinalSystem.designation,
          include: observationObject,
        }

        console.log(
          examinationSubObject['PhysicalFindingsOfGastrointestinalSystem']
        )
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfGenitourinaryTract */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfGenitourinaryTract.code
        )
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsOfGenitourinaryTract.include).forEach(
          includeKey => {
            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfGenitourinaryTract.include[includeKey].code,
                  observation.code
                )
              ) {
                /* #region  interpretationStatus нэмэгдэхээс өмнөх хувилбар */
                // const observationValue = Object.values(
                //   PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                //     .include
                // ).find(includeValue =>
                //   codeIntersects(
                //     includeValue.code,
                //     observation.valueCodeableConcept
                //   )
                // ).designation

                // observationObject[includeKey] = {
                //   designation:
                //     PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                //       .designation,
                //   value: observationValue,
                //   valueType:
                //     PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                //       .valueType,
                // }

                /* #endregion */

                let observationValue

                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                observationValue = {
                  designation: Object.values(
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation,
                  interpretationStatus: interpretationStatus,
                }

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .designation,
                  value: observationValue,
                  valueType:
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .valueType,
                }
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfGenitourinaryTract'] = {
          designation: PhysicalFindingsOfGenitourinaryTract.designation,
          include: observationObject,
        }

        console.log(
          examinationSubObject['PhysicalFindingsOfGenitourinaryTract']
        )
        /* #endregion */
      } else if (
        /* #region  BodyMassIndex */
        codeIntersects(compositionSection.code, BodyMassIndex.code)
      ) {
        const observationObject = {}

        Object.keys(BodyMassIndex.include).forEach(includeKey => {
          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            if (
              codeIntersects(
                BodyMassIndex.include[includeKey].code,
                observation.code
              )
            ) {
              observationObject[includeKey] = {
                designation: BodyMassIndex.include[includeKey].designation,
                value: observation.valueQuantity.value,
                unit: BodyMassIndex.include[includeKey].unit,
              }
            } else if (codeIntersects(observation.code, BodyMassIndex.code)) {
              observationObject['BodyMassIndex'] = {
                designation: BodyMassIndex.designation,
                value: observation.valueQuantity.value,
                unit: BodyMassIndex.unit,
              }
            }
          })
        })

        examinationSubObject['BodyMassIndex'] = {
          designation: BodyMassIndex.designation,
          include: observationObject,
        }
        console.log(examinationSubObject['BodyMassIndex'])
      }
      /* #endregion */
    })

    patientBriefHistoryList.push({
      recordedDate: recordedDate,
      include: examinationSubObject,
    })
  })

  if (patientBriefHistoryList.length > 0) {
    return patientBriefHistoryList
  } else {
    return undefined
  }
}

/**
 * Get resource dictionary of physical general examination to generate the data
 * Print inspection note and examination view section
 * @param {Object} valueSet - To generate the data
 * @param {Object} interpretation - To sort the observation's interpretation
 * @param {Object} resourceDictionaryArray - resource dictionary array
 * @param {Array} generalPhysicalFindingList - brief general examination list
 * @return {Array} result: generated data of examination
 */
function generateGeneralPhysicalFindingExamination(
  valueSet,
  interpretation,
  resourceDictionaryArray,
  generalPhysicalFindingList
) {
  const patientPhysicalExaminationList = []
  const {
    VitalSignsFinding,
    BodyMassIndex,
    GeneralPhysicalFinding,
    PhysicalFindingsOfRespiratorySystem,
    PhysicalFindingsOfCardiovascularSystem,
    PhysicalFindingsOfGastrointestinalSystem,
    PhysicalFindingsOfGenitourinaryTract,
    PhysicalFindingsOfNervousSystem,
    PhysicalFindingsSensation,
  } = valueSet.include

  generalPhysicalFindingList.forEach(examination => {
    const examinationSubObject = {}

    const recordedDate = toLocalDateTime(examination.date, 'yyyy-mm-dd')

    console.log(examination)
    // valueSet ийн өгөгдлийн дагуу давтаж байгааг анзааарана уу!
    examination.section.forEach(compositionSection => {
      if (
        /* #region  VitalSignsFinding */
        codeIntersects(compositionSection.code, VitalSignsFinding.code)
      ) {
        const observationObject = {}

        Object.keys(VitalSignsFinding.include).forEach(includeKey => {
          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            const {
              DiastolicBloodPressure,
              SystolicArterialPressure,
            } = VitalSignsFinding.include.BloodPressure.component

            if (
              codeIntersects(
                VitalSignsFinding.include[includeKey].code,
                observation.code
              )
            ) {
              // энэ хэсэгт зөвхөн нэг л утга өөр төрөл буюу
              // component хэлбэртээ хадгалагдаж байгаа
              // аль болох цэвэрхэн харагдах талаасаа давталт
              // ашиглан хийгээгүй байгаа

              if (observation.component) {
                observation.component.forEach(componentValue => {
                  if (
                    codeIntersects(
                      DiastolicBloodPressure.code,
                      componentValue.code
                    )
                  ) {
                    observationObject['DiastolicBloodPressure'] = {
                      designation: DiastolicBloodPressure.designation,
                      value: componentValue.valueQuantity.value,
                      unit: VitalSignsFinding.include.BloodPressure.unit,
                    }
                  }

                  if (
                    codeIntersects(
                      SystolicArterialPressure.code,
                      componentValue.code
                    )
                  ) {
                    observationObject['SystolicArterialPressure'] = {
                      designation: SystolicArterialPressure.designation,
                      value: componentValue.valueQuantity.value,
                      unit: VitalSignsFinding.include.BloodPressure.unit,
                    }
                  }
                })
              } else {
                observationObject[includeKey] = {
                  designation:
                    VitalSignsFinding.include[includeKey].designation,
                  value: observation.valueQuantity.value,
                  unit: VitalSignsFinding.include[includeKey].unit,
                  valueType: VitalSignsFinding.include[includeKey].valueType,
                }
              }
            }
          })
        })

        examinationSubObject['VitalSignsFinding'] = {
          designation: VitalSignsFinding.designation,
          include: observationObject,
        }
        console.log(examinationSubObject['VitalSignsFinding'])
        /* #endregion */
      } else if (
        /* #region  GeneralPhysicalFinding */
        codeIntersects(compositionSection.code, GeneralPhysicalFinding.code)
      ) {
        const observationObject = {}
        const lymphoidNoduleBodySite = []

        Object.keys(GeneralPhysicalFinding.include).forEach(includeKey => {
          const valueType = GeneralPhysicalFinding.include[includeKey].valueType

          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            if (
              codeIntersects(
                GeneralPhysicalFinding.include[includeKey].code,
                observation.code
              )
            ) {
              let observationValue

              const interpretationStatus =
                observation.interpretation &&
                Object.values(interpretation).find(interpretationValue =>
                  codeIntersects(
                    interpretationValue,
                    observation.interpretation.find(v => v.coding)
                  )
                )

              console.log(
                GeneralPhysicalFinding.include[includeKey].designation,
                includeKey,
                valueType
              )

              if (valueType === 'valueCodeableConceptWithBodySite') {
                const { Edema } = GeneralPhysicalFinding.include
                let edamaValue
                const bodySiteValues = []

                if (observation.valueCodeableConcept) {
                  edamaValue = Object.values(Edema.include).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation
                }

                if (!!observation.bodySite) {
                  bodySiteValues.push(
                    Object.values(
                      Edema.include.OnExaminationEdema.bodySite
                    ).find(includeValue =>
                      codeIntersects(includeValue.code, observation.bodySite)
                    ).designation
                  )
                } else if (!!observation.component) {
                  observation.component.forEach(componentValue => {
                    bodySiteValues.push(
                      Object.values(
                        Edema.include.OnExaminationEdema.bodySite
                      ).find(includeValue =>
                        codeIntersects(
                          includeValue.code,
                          componentValue.valueCodeableConcept
                        )
                      ).designation
                    )
                  })
                }

                observationValue = {
                  designation: edamaValue,
                  bodySite: bodySiteValues,
                  interpretationStatus: interpretationStatus,
                }
              } else if (valueType === 'componentWithBodySite') {
                const { LymphoidNodule } = GeneralPhysicalFinding.include

                let sizeValue
                let painValue

                if (observation.bodySite) {
                  let observationBodySite

                  if (
                    codeIntersects(
                      observation.bodySite,
                      LymphoidNodule.bodySite.include.Other.code
                    )
                  ) {
                    console.log(observation)
                    observationBodySite = {
                      text: observation.bodySite.text,
                      designation:
                        LymphoidNodule.bodySite.include.Other.designation,
                    }
                  } else {
                    observationBodySite = Object.values(
                      LymphoidNodule.bodySite.include
                    ).find(includeValue =>
                      codeIntersects(includeValue.code, observation.bodySite)
                    ).designation
                  }

                  lymphoidNoduleBodySite.push(observationBodySite)
                }

                console.log(lymphoidNoduleBodySite)

                if (observation.component) {
                  const { Size, Pain } = LymphoidNodule.component

                  observation.component.forEach(componentValue => {
                    if (codeIntersects(componentValue.code, Size.code)) {
                      sizeValue = {
                        designation: Size.designation,
                        value: {
                          designation: Object.values(
                            Size.include
                          ).find(includeValue =>
                            codeIntersects(
                              includeValue.code,
                              componentValue.valueCodeableConcept
                            )
                          ).designation,
                        },
                      }
                    }

                    if (codeIntersects(componentValue.code, Pain.code)) {
                      painValue = {
                        designation: Pain.designation,
                        value: {
                          designation: Object.values(
                            Pain.include
                          ).find(includeValue =>
                            codeIntersects(
                              includeValue.code,
                              componentValue.valueCodeableConcept
                            )
                          ).designation,
                        },
                      }

                      console.log(painValue)
                    }
                  })
                }

                /////////////////////////////////////////////////////////////////

                observationValue = {
                  bodySite: {
                    designation: LymphoidNodule.bodySite.designation,
                    include: lymphoidNoduleBodySite,
                  },
                  size: sizeValue && sizeValue,
                  pain: painValue && painValue,
                }
              } else if (valueType === 'componentSection') {
                const jointObservableValue = {}

                const {
                  JointAngulationUpper,
                  JointAngulationBottom,
                  RangeOfJointUpperMovement,
                  RangeOfJointBottomMovement,
                } = GeneralPhysicalFinding.include.JointObservable.component

                observation.component &&
                  observation.component.forEach(componentValue => {
                    if (
                      codeIntersects(
                        componentValue.code,
                        JointAngulationUpper.code
                      )
                    ) {
                      jointObservableValue['JointAngulationUpper'] = {
                        designation: JointAngulationUpper.designation,
                        value: {
                          designation: Object.values(
                            JointAngulationUpper.include
                          ).find(includeValue =>
                            codeIntersects(
                              includeValue.code,
                              componentValue.valueCodeableConcept
                            )
                          ).designation,
                        },
                        text:
                          'Abnormal shape (qualifier value)' ===
                            componentValue.valueCodeableConcept.text ||
                          'Normal joint shape (finding)' ===
                            componentValue.valueCodeableConcept.text
                            ? ''
                            : componentValue.valueCodeableConcept.text,
                      }
                    } else if (
                      codeIntersects(
                        componentValue.code,
                        RangeOfJointUpperMovement.code
                      )
                    ) {
                      jointObservableValue['RangeOfJointUpperMovement'] = {
                        designation: RangeOfJointUpperMovement.designation,
                        value: {
                          designation: Object.values(
                            RangeOfJointUpperMovement.include
                          ).find(includeValue =>
                            codeIntersects(
                              includeValue.code,
                              componentValue.valueCodeableConcept
                            )
                          ).designation,
                        },
                      }
                    } else if (
                      codeIntersects(
                        componentValue.code,
                        JointAngulationBottom.code
                      )
                    ) {
                      jointObservableValue['JointAngulationBottom'] = {
                        designation: JointAngulationBottom.designation,
                        value: {
                          designation: Object.values(
                            JointAngulationBottom.include
                          ).find(includeValue =>
                            codeIntersects(
                              includeValue.code,
                              componentValue.valueCodeableConcept
                            )
                          ).designation,
                        },
                        text:
                          'Abnormal shape (qualifier value)' ===
                            componentValue.valueCodeableConcept.text ||
                          'Normal joint shape (finding)' ===
                            componentValue.valueCodeableConcept.text
                            ? ''
                            : componentValue.valueCodeableConcept.text,
                      }
                    } else if (
                      codeIntersects(
                        componentValue.code,
                        RangeOfJointBottomMovement.code
                      )
                    ) {
                      jointObservableValue['RangeOfJointBottomMovement'] = {
                        designation: RangeOfJointBottomMovement.designation,
                        value: {
                          designation: Object.values(
                            RangeOfJointBottomMovement.include
                          ).find(includeValue =>
                            codeIntersects(
                              includeValue.code,
                              componentValue.valueCodeableConcept
                            )
                          ).designation,
                        },
                      }
                    }
                  })

                observationValue = jointObservableValue
              } else if (valueType === 'valueCodeableConceptWithNote') {
                observationValue = {
                  designation: Object.values(
                    GeneralPhysicalFinding.include[includeKey].include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation,
                  text:
                    observation.note &&
                    observation.note.find(noteItem => noteItem.text).text,
                  interpretationStatus: interpretationStatus,
                }
              } else {
                if (
                  GeneralPhysicalFinding.include[includeKey].include.Other &&
                  codeIntersects(
                    GeneralPhysicalFinding.include[includeKey].include.Other
                      .code,
                    observation.valueCodeableConcept
                  )
                ) {
                  console.log(observation)

                  observationValue = {
                    designation:
                      GeneralPhysicalFinding.include[includeKey].include.Other
                        .designation,
                    interpretationStatus: interpretationStatus,
                    text: observation.valueCodeableConcept.text,
                  }
                } else {
                  observationValue = {
                    designation: Object.values(
                      GeneralPhysicalFinding.include[includeKey].include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    text: observation.valueCodeableConcept.text,
                    interpretationStatus: interpretationStatus,
                  }
                }
              }

              observationObject[includeKey] = {
                designation:
                  GeneralPhysicalFinding.include[includeKey].designation,
                value: observationValue,
                valueType: GeneralPhysicalFinding.include[includeKey].valueType,
              }
            }
          })
        })

        examinationSubObject['GeneralPhysicalFinding'] = {
          designation: GeneralPhysicalFinding.designation,
          include: observationObject,
        }
        console.log(examinationSubObject['GeneralPhysicalFinding'])

        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfRespiratorySystem */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfRespiratorySystem.code
        )
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsOfRespiratorySystem.include).forEach(
          includeKey => {
            const valueType =
              PhysicalFindingsOfRespiratorySystem.include[includeKey].valueType

            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfRespiratorySystem.include[includeKey].code,
                  observation.code
                )
              ) {
                let observationValue

                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                console.log(interpretationStatus, valueType)

                if (valueType === 'valueCodeableConceptSectionWithComponent') {
                  /* #region  withComponent */
                  let componentValues

                  console.log(
                    Object.values(
                      PhysicalFindingsOfRespiratorySystem.include[includeKey]
                        .include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ),
                    PhysicalFindingsOfRespiratorySystem.include[includeKey]
                      .include,
                    observation.valueCodeableConcept
                  )
                  const observationDesignation = Object.values(
                    PhysicalFindingsOfRespiratorySystem.include[includeKey]
                      .include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation

                  if (observation.component) {
                    let observationComponentValue

                    const componentData = Object.values(
                      PhysicalFindingsOfRespiratorySystem.include[includeKey]
                        .include
                    ).find(includeValue => includeValue.component)

                    observation.component.forEach(componentValue => {
                      observationComponentValue = Object.values(
                        componentData.component.include
                      ).find(includeValue =>
                        codeIntersects(includeValue.code, componentValue.code)
                      ).designation
                    })

                    componentValues = {
                      designation: componentData.component.designation,
                      value: observationComponentValue,
                    }
                  }

                  observationValue = {
                    component: componentValues,
                    designation: observationDesignation,
                    interpretationStatus: interpretationStatus,
                  }
                  /* #endregion */
                } else if (
                  valueType === 'valueCodeableConceptSectionWithComponents'
                ) {
                  /* #region  withComponents */
                  let componentValues

                  const {
                    AddedRespiratorySounds,
                    OnExaminationBreathSoundsAbnormal,
                  } = PhysicalFindingsOfRespiratorySystem.include

                  const observationDesignation = Object.values(
                    PhysicalFindingsOfRespiratorySystem.include[includeKey]
                      .include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation

                  if (
                    codeIntersects(
                      observation.code,
                      AddedRespiratorySounds.code
                    )
                  ) {
                    const observationComponent = {}

                    observation.component &&
                      Object.keys(AddedRespiratorySounds.component).forEach(
                        componentValue => {
                          observation.component.forEach(
                            observationComponentValue => {
                              if (
                                codeIntersects(
                                  AddedRespiratorySounds.component[
                                    componentValue
                                  ].code,
                                  observationComponentValue.code
                                )
                              ) {
                                observationComponent[componentValue] = {
                                  designation:
                                    AddedRespiratorySounds.component[
                                      componentValue
                                    ].designation,
                                  value: {
                                    designation: Object.values(
                                      AddedRespiratorySounds.component[
                                        componentValue
                                      ].include
                                    ).find(includeValue =>
                                      codeIntersects(
                                        includeValue.code,
                                        observationComponentValue.valueCodeableConcept
                                      )
                                    ).designation,
                                  },
                                }
                              }
                            }
                          )
                        }
                      )

                    componentValues = { ...observationComponent }
                  } else if (
                    codeIntersects(
                      observation.code,
                      OnExaminationBreathSoundsAbnormal.code
                    )
                  ) {
                    const observationComponent = {}

                    observation.component &&
                      observation.component.forEach(componentValue => {
                        observationComponent['Present'] = {
                          designation:
                            OnExaminationBreathSoundsAbnormal.component.Present
                              .designation,
                          value: {
                            designation: Object.values(
                              OnExaminationBreathSoundsAbnormal.component
                                .Present.include
                            ).find(includeValue =>
                              codeIntersects(
                                includeValue.code,
                                componentValue.code
                              )
                            ).designation,
                          },
                        }
                      })

                    componentValues = { ...observationComponent }
                  }

                  observationValue = {
                    component: componentValues,
                    designation: observationDesignation,
                    interpretationStatus: interpretationStatus,
                  }
                  /* #endregion */
                } else {
                  /* #region  else value codeable concept */
                  const {
                    OnExaminationChestExpansion,
                    OnExaminationChestExpansionBreathe,
                  } = PhysicalFindingsOfRespiratorySystem.include

                  // энэ хэсэгт observation ий code 2 давхцаж байгаа бөгөөд
                  // нэмэлт нөхцөл заавал шалгах шаардлагатай болсон

                  if (
                    codeIntersects(
                      observation.code,
                      OnExaminationChestExpansion.code
                    )
                  ) {
                    let designationValue
                    if (
                      Object.values(
                        OnExaminationChestExpansion.include
                      ).find(includeValue =>
                        codeIntersects(
                          includeValue.code,
                          observation.valueCodeableConcept
                        )
                      )
                    ) {
                      designationValue = {
                        designation: Object.values(
                          OnExaminationChestExpansion.include
                        ).find(includeValue =>
                          codeIntersects(
                            includeValue.code,
                            observation.valueCodeableConcept
                          )
                        ).designation,
                        interpretationStatus: interpretationStatus,
                      }
                    } else {
                      designationValue = {
                        designation: Object.values(
                          OnExaminationChestExpansionBreathe.include
                        ).find(includeValue =>
                          codeIntersects(
                            includeValue.code,
                            observation.valueCodeableConcept
                          )
                        ).designation,
                        interpretationStatus: interpretationStatus,
                      }
                    }

                    observationValue = designationValue && designationValue
                  } else {
                    observationValue = {
                      designation: Object.values(
                        PhysicalFindingsOfRespiratorySystem.include[includeKey]
                          .include
                      ).find(includeValue =>
                        codeIntersects(
                          includeValue.code,
                          observation.valueCodeableConcept
                        )
                      ).designation,
                      interpretationStatus: interpretationStatus,
                      text:
                        !observation.valueCodeableConcept.coding.some(
                          coding =>
                            coding.display ===
                            observation.valueCodeableConcept.text
                        ) && observation.valueCodeableConcept.text,
                    }
                  }
                  /* #endregion */
                }

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfRespiratorySystem.include[includeKey]
                      .designation,
                  value: observationValue,
                  valueType:
                    PhysicalFindingsOfRespiratorySystem.include[includeKey]
                      .valueType,
                }

                console.log(includeKey)
                console.log(observationObject[includeKey])
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfRespiratorySystem'] = {
          designation: PhysicalFindingsOfRespiratorySystem.designation,
          include: observationObject,
        }

        console.log(examinationSubObject['PhysicalFindingsOfRespiratorySystem'])
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfCardiovascularSystem */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfCardiovascularSystem.code
        )
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsOfCardiovascularSystem.include).forEach(
          includeKey => {
            const valueType =
              PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                .valueType

            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                    .code,
                  observation.code
                )
              ) {
                let observationValue

                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                if (valueType === 'hasMemberSection') {
                  const observationHasMemberValues = {}
                  console.log('has member section', observation)

                  observation.hasMember &&
                    Object.keys(
                      PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                        .hasMember
                    ).forEach(hasMemberValue => {
                      const hasMemberValueSet =
                        PhysicalFindingsOfCardiovascularSystem.include[
                          includeKey
                        ].hasMember[hasMemberValue]

                      observation.hasMember.forEach(observationHasMember => {
                        const hasMemberObservation = helper.findByReference(
                          resourceDictionaryArray['Observation'],
                          observationHasMember
                        )

                        if (
                          codeIntersects(
                            hasMemberValueSet.code,
                            hasMemberObservation.code
                          )
                        ) {
                          // heart rate тэй холбоотой асуултын code нь адилхан
                          // байсан учир өгөгдлийн сан дээр тулгууралсан
                          // нөхцөл шалгалт ашиглаж байгаа

                          if (
                            hasMemberValueSet.include &&
                            hasMemberObservation.valueCodeableConcept
                          ) {
                            observationHasMemberValues[hasMemberValue] = {
                              designation: hasMemberValueSet.designation,
                              value: {
                                designation: Object.values(
                                  hasMemberValueSet.include
                                ).find(includeValue =>
                                  codeIntersects(
                                    includeValue.code,
                                    hasMemberObservation.valueCodeableConcept
                                  )
                                ).designation,
                              },
                            }
                          } else if (
                            hasMemberValueSet.unit &&
                            hasMemberObservation.valueQuantity
                          ) {
                            observationHasMemberValues[hasMemberValue] = {
                              designation: hasMemberValueSet.designation,
                              value: hasMemberObservation.valueQuantity.value,
                              unit: hasMemberValueSet.unit,
                            }
                          }
                        }
                      })
                    })

                  console.log(observationHasMemberValues)

                  observationValue = {
                    component: observationHasMemberValues,
                    interpretationStatus: interpretationStatus,
                  }
                } else if (valueType === 'componentSection') {
                  let componentValues

                  const {
                    HeartMurmur,
                  } = PhysicalFindingsOfCardiovascularSystem.include

                  const observationDesignation = Object.values(
                    PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                      .include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation

                  if (codeIntersects(observation.code, HeartMurmur.code)) {
                    const observationComponent = {}

                    // component дотор байгаа утганууд өөр өөр төрлөөр байгаа учих нэмэлт
                    // nest оруулж ирэх шаардлагатай болсон

                    observation.component &&
                      Object.keys(HeartMurmur.component).forEach(
                        componentValue => {
                          const observationComponentInclude = {}

                          observation.component.forEach(
                            observationComponentValue => {
                              if (
                                codeIntersects(
                                  observationComponentValue.code &&
                                    HeartMurmur.component[componentValue].code,
                                  observationComponentValue.code
                                )
                              ) {
                                Object.keys(
                                  HeartMurmur.component[componentValue].include
                                ).forEach(includeValue => {
                                  if (
                                    codeIntersects(
                                      observationComponentValue.valueCodeableConcept &&
                                        HeartMurmur.component[componentValue]
                                          .include[includeValue].code,
                                      observationComponentValue.valueCodeableConcept
                                    )
                                  ) {
                                    observationComponentInclude[
                                      includeValue
                                    ] = {
                                      designation:
                                        HeartMurmur.component[componentValue]
                                          .designation,
                                      value: {
                                        designation:
                                          HeartMurmur.component[componentValue]
                                            .include[includeValue].designation,
                                      },
                                    }
                                  }
                                })
                              }
                            }
                          )

                          observationComponent[componentValue] = {
                            ...observationComponentInclude,
                          }
                        }
                      )

                    componentValues = { ...observationComponent }
                  }

                  observationValue = {
                    component: componentValues,
                    designation: observationDesignation,
                    interpretationStatus: interpretationStatus,
                  }
                } else {
                  observationValue = {
                    designation: Object.values(
                      PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                        .include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    interpretationStatus: interpretationStatus,
                  }
                }

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                      .designation,
                  value: observationValue,
                  valueType:
                    PhysicalFindingsOfCardiovascularSystem.include[includeKey]
                      .valueType,
                }
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfCardiovascularSystem'] = {
          designation: PhysicalFindingsOfCardiovascularSystem.designation,
          include: observationObject,
        }

        console.log(
          examinationSubObject['PhysicalFindingsOfCardiovascularSystem']
        )
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfGastrointestinalSystem */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfGastrointestinalSystem.code
        )
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsOfGastrointestinalSystem.include).forEach(
          includeKey => {
            const valueType =
              PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                .valueType

            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                    .code,
                  observation.code
                )
              ) {
                let observationValue

                console.log(
                  valueType,
                  PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                )

                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                if (valueType === 'valueStringSection') {
                  observationValue = observation.valueCodeableConcept.text
                } else if (valueType === 'componentSection') {
                  console.log(observation)
                  /* #region  componentSection */
                  let componentValue

                  observation.component &&
                    observation.component.forEach(observationComponent => {
                      componentValue = Object.values(
                        PhysicalFindingsOfGastrointestinalSystem.include[
                          includeKey
                        ].component.include
                      ).find(includeValue =>
                        codeIntersects(
                          includeValue.code,
                          observationComponent.code
                        )
                      ).designation
                    })

                  observationValue = {
                    designation: Object.values(
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        includeKey
                      ].include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    text: observation.valueCodeableConcept.text,
                    component: {
                      designation:
                        PhysicalFindingsOfGastrointestinalSystem.include[
                          includeKey
                        ].component.designation,
                      value: { designation: componentValue },
                      interpretationStatus: interpretationStatus,
                    },
                  }
                  /* #endregion */
                } else if (valueType === 'componentsSection') {
                  const componentValues = {}

                  observation.component &&
                    Object.keys(
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        includeKey
                      ].component
                    ).forEach(componentValue => {
                      const componentValueSet =
                        PhysicalFindingsOfGastrointestinalSystem.include[
                          includeKey
                        ].component[componentValue]

                      observation.component.forEach(observationComponent => {
                        if (
                          codeIntersects(
                            componentValueSet.code,
                            observationComponent.code
                          )
                        ) {
                          componentValues[componentValue] = {
                            designation: componentValueSet.designation,
                            value: {
                              designation: Object.values(
                                componentValueSet.include
                              ).find(includeValue =>
                                codeIntersects(
                                  includeValue.code,
                                  observationComponent.valueCodeableConcept
                                )
                              ).designation,
                            },
                            interpretationStatus: interpretationStatus,
                          }
                        }
                      })
                    })

                  observationValue = { ...componentValues }
                } else if (valueType === 'hasMemberSection') {
                  // console.log('has member section', observation)
                  const hasMemberValues = {}

                  Object.keys(
                    PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                      .hasMember
                  ).forEach(hasMemberValue => {
                    const hasMemberSubValues = {}

                    const hasMemberValueSet =
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        includeKey
                      ].hasMember[hasMemberValue]

                    observation.hasMember.forEach(observationHasMember => {
                      const hasMemberObservation = helper.findByReference(
                        resourceDictionaryArray['Observation'],
                        observationHasMember
                      )

                      // console.log(hasMemberObservation)
                      // console.log(hasMemberValueSet)

                      if (
                        codeIntersects(
                          hasMemberValueSet.code,
                          hasMemberObservation.code
                        )
                      ) {
                        if (hasMemberValueSet.component) {
                          Object.keys(hasMemberValueSet.include).forEach(
                            includeValue => {
                              if (
                                codeIntersects(
                                  hasMemberObservation.valueCodeableConcept,
                                  hasMemberValueSet.include[includeValue].code
                                )
                              ) {
                                if (includeValue === 'Pain') {
                                  console.log(hasMemberObservation)

                                  hasMemberObservation.component.forEach(
                                    hasMemberComponent => {
                                      hasMemberSubValues[includeValue] = {
                                        designation:
                                          hasMemberValueSet.include[
                                            includeValue
                                          ].designation,
                                        component: hasMemberObservation.component && {
                                          designation:
                                            hasMemberValueSet.component
                                              .designation,
                                          value: {
                                            designation: Object.values(
                                              hasMemberValueSet.component
                                                .include
                                            ).find(includeValue =>
                                              codeIntersects(
                                                includeValue.code,
                                                hasMemberComponent.code
                                              )
                                            ).designation,
                                          },
                                        },
                                      }
                                    }
                                  )
                                } else {
                                  hasMemberSubValues[includeValue] = {
                                    designation:
                                      hasMemberValueSet.include[includeValue]
                                        .designation,
                                  }
                                }
                              }
                            }
                          )
                        } else {
                          Object.keys(hasMemberValueSet.include).forEach(
                            includeValue => {
                              if (
                                codeIntersects(
                                  hasMemberObservation.valueCodeableConcept,
                                  hasMemberValueSet.include[includeValue].code
                                )
                              ) {
                                const hasMemberNote =
                                  hasMemberObservation.note &&
                                  hasMemberObservation.note.find(
                                    noteItem => noteItem.text
                                  ).text

                                hasMemberSubValues[includeValue] = {
                                  designation:
                                    hasMemberValueSet.include[includeValue]
                                      .designation,
                                  note: hasMemberNote,
                                }
                              }
                            }
                          )
                        }
                      }
                    })

                    // console.log(hasMemberSubValues)

                    hasMemberValues[hasMemberValue] = {
                      designation: hasMemberValueSet.designation,
                      value: hasMemberSubValues,
                    }
                  })

                  observationValue = {
                    include: hasMemberValues,
                    interpretationStatus: interpretationStatus,
                  }
                } else {
                  observationValue = {
                    designation: Object.values(
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        includeKey
                      ].include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    interpretationStatus: interpretationStatus,
                  }
                }

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                      .designation,
                  value: observationValue,
                  valueType:
                    PhysicalFindingsOfGastrointestinalSystem.include[includeKey]
                      .valueType,
                }
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfGastrointestinalSystem'] = {
          designation: PhysicalFindingsOfGastrointestinalSystem.designation,
          include: observationObject,
        }

        // console.log(
        //   examinationSubObject['PhysicalFindingsOfGastrointestinalSystem']
        // )
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfGenitourinaryTract */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfGenitourinaryTract.code
        )
      ) {
        const observationObject = {}
        const valueCodeableConcepts = {}

        Object.keys(PhysicalFindingsOfGenitourinaryTract.include).forEach(
          includeKey => {
            const valueType =
              PhysicalFindingsOfGenitourinaryTract.include[includeKey].valueType

            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfGenitourinaryTract.include[includeKey].code,
                  observation.code
                )
              ) {
                let observationValue

                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                if (valueType === 'valueCodeableConceptWithComponentSection') {
                  const componentValueSet =
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .include
                  let componentValue

                  observation.component &&
                    observation.component.forEach(observationComponent => {
                      componentValue = {
                        designation: Object.values(componentValueSet).find(
                          includeValue => includeValue.component
                        ).component.designation,
                        value: observationComponent.valueInteger,
                      }
                    })

                  observationValue = {
                    designation: Object.values(
                      componentValueSet
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    component: componentValue,
                    interpretationStatus: interpretationStatus,
                  }
                } else if (
                  valueType === 'valueCodeableConceptWithBodySiteSection'
                ) {
                  const bodySiteValueSet =
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .include

                  const values = {
                    designation: Object.values(
                      bodySiteValueSet
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    bodySite: observation.bodySite && {
                      designation: bodySiteValueSet.Pain.bodySite.designation,
                      value: {
                        designation: Object.values(
                          bodySiteValueSet.Pain.bodySite.include
                        ).find(includeValue =>
                          codeIntersects(
                            includeValue.code,
                            observation.bodySite
                          )
                        ).designation,
                      },
                    },
                    interpretationStatus: interpretationStatus,
                  }

                  if (Object.keys(observationObject).includes(includeKey)) {
                    observationValue = [
                      { ...observationObject[includeKey].value },
                      { ...values },
                    ]
                  } else {
                    observationValue = values
                  }
                } else if (valueType === 'valueCodeableConcepts') {
                  // console.log(observation)

                  const valueCodeableValueSet =
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .include

                  Object.keys(valueCodeableValueSet).forEach(includeValue => {
                    if (
                      codeIntersects(
                        observation.valueCodeableConcept,
                        valueCodeableValueSet[includeValue].code
                      )
                    ) {
                      valueCodeableConcepts[includeValue] = {
                        designation:
                          valueCodeableValueSet[includeValue].designation,
                      }
                    }
                  })

                  // console.log(valueCodeableConcepts)

                  observationValue = valueCodeableConcepts
                } else {
                  observationValue = {
                    designation: Object.values(
                      PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                        .include
                    ).find(includeValue =>
                      codeIntersects(
                        includeValue.code,
                        observation.valueCodeableConcept
                      )
                    ).designation,
                    interpretationStatus: interpretationStatus,
                  }
                }

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .designation,
                  value: observationValue,
                  valueType:
                    PhysicalFindingsOfGenitourinaryTract.include[includeKey]
                      .valueType,
                }
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfGenitourinaryTract'] = {
          designation: PhysicalFindingsOfGenitourinaryTract.designation,
          include: observationObject,
        }

        // console.log(
        //   examinationSubObject['PhysicalFindingsOfGenitourinaryTract']
        // )
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsOfNervousSystem */
        codeIntersects(
          compositionSection.code,
          PhysicalFindingsOfNervousSystem.code
        )
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsOfNervousSystem.include).forEach(
          includeKey => {
            compositionSection.entry.forEach(entryValue => {
              const observation = helper.findByReference(
                resourceDictionaryArray['Observation'],
                entryValue
              )

              if (
                codeIntersects(
                  PhysicalFindingsOfNervousSystem.include[includeKey].code,
                  observation.code
                )
              ) {
                const interpretationStatus =
                  observation.interpretation &&
                  Object.values(interpretation).find(interpretationValue =>
                    codeIntersects(
                      interpretationValue,
                      observation.interpretation.find(v => v.coding)
                    )
                  )

                const observationValue = Object.values(
                  PhysicalFindingsOfNervousSystem.include[includeKey].include
                ).find(includeValue =>
                  codeIntersects(
                    includeValue.code,
                    observation.valueCodeableConcept
                  )
                ).designation

                observationObject[includeKey] = {
                  designation:
                    PhysicalFindingsOfNervousSystem.include[includeKey]
                      .designation,
                  value: {
                    designation: observationValue,
                    interpretationStatus: interpretationStatus,
                  },
                  valueType:
                    PhysicalFindingsOfNervousSystem.include[includeKey]
                      .valueType,
                }
              }
            })
          }
        )

        examinationSubObject['PhysicalFindingsOfNervousSystem'] = {
          designation: PhysicalFindingsOfNervousSystem.designation,
          include: observationObject,
        }
        /* #endregion */
      } else if (
        /* #region  PhysicalFindingsSensation */
        codeIntersects(compositionSection.code, PhysicalFindingsSensation.code)
      ) {
        const observationObject = {}

        Object.keys(PhysicalFindingsSensation.include).forEach(includeKey => {
          const valueType =
            PhysicalFindingsSensation.include[includeKey].valueType

          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            if (
              codeIntersects(
                PhysicalFindingsSensation.include[includeKey].code,
                observation.code
              )
            ) {
              let observationValue

              const interpretationStatus =
                observation.interpretation &&
                Object.values(interpretation).find(interpretationValue =>
                  codeIntersects(
                    interpretationValue,
                    observation.interpretation.find(v => v.coding)
                  )
                )

              if (valueType === 'valueCodeableConceptWithNote') {
                observationValue = {
                  designation: Object.values(
                    PhysicalFindingsSensation.include[includeKey].include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation,
                  text:
                    observation.note &&
                    observation.note.find(noteItem => noteItem.text).text,
                  interpretationStatus: interpretationStatus,
                }
              } else {
                observationValue = {
                  designation: Object.values(
                    PhysicalFindingsSensation.include[includeKey].include
                  ).find(includeValue =>
                    codeIntersects(
                      includeValue.code,
                      observation.valueCodeableConcept
                    )
                  ).designation,
                  interpretationStatus: interpretationStatus,
                }
              }

              observationObject[includeKey] = {
                designation:
                  PhysicalFindingsSensation.include[includeKey].designation,
                value: observationValue,
                valueType:
                  PhysicalFindingsSensation.include[includeKey].valueType,
              }
            }
          })
        })

        examinationSubObject['PhysicalFindingsSensation'] = {
          designation: PhysicalFindingsSensation.designation,
          include: observationObject,
        }
        /* #endregion */
      } else if (
        /* #region  BodyMassIndex */
        codeIntersects(compositionSection.code, BodyMassIndex.code)
      ) {
        const observationObject = {}

        Object.keys(BodyMassIndex.include).forEach(includeKey => {
          compositionSection.entry.forEach(entryValue => {
            const observation = helper.findByReference(
              resourceDictionaryArray['Observation'],
              entryValue
            )

            if (
              codeIntersects(
                BodyMassIndex.include[includeKey].code,
                observation.code
              )
            ) {
              observationObject[includeKey] = {
                designation: BodyMassIndex.include[includeKey].designation,
                value: observation.valueQuantity.value,
                unit: BodyMassIndex.include[includeKey].unit,
              }
            } else if (codeIntersects(observation.code, BodyMassIndex.code)) {
              observationObject['BodyMassIndex'] = {
                designation: BodyMassIndex.designation,
                value: observation.valueQuantity.value,
                unit: BodyMassIndex.unit,
              }
            }
          })
        })

        examinationSubObject['BodyMassIndex'] = {
          designation: BodyMassIndex.designation,
          include: observationObject,
        }
        // console.log(examinationSubObject['BodyMassIndex'])
      }
      /* #endregion */
    })

    patientPhysicalExaminationList.push({
      recordedDate: recordedDate,
      include: examinationSubObject,
    })
  })

  if (patientPhysicalExaminationList.length > 0) {
    return patientPhysicalExaminationList
  } else {
    return undefined
  }
}

export {
  addToReferenceArrayIfNotExists,
  codeIntersects,
  createResourceDictionary,
  generateTableData,
  generatePhlebotomyTableData,
  generateLaboratoryTestList,
  getFirstCoding,
  getUrlFromResource,
  groupByRequisition,
  hasCancelled,
  hadBeenCancelled,
  latestObservationCollector,
  recursiveTestDataBuilder,
  buildTestDataTree,
  containsReference,
  findByReference,
  generateBriefGeneralExamination,
  generateGeneralPhysicalFindingExamination,
}

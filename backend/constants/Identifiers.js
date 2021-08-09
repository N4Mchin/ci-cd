const Identifiers = {
  LiverCenter: {
    Appointment: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/appointment',
    },
    Specimen: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/specimen',
    },
    PatientIdentifier: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/patient',
    },
    Schedule: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/schedule',
    },
    Dlivr: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/clinical-trial',
      value: 'dlivr-clinical-trial',
    },
    DlivrExcluded: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/clinical-trial',
      value: 'dlivr-clinical-trial-excluded',
    },
    DlivrPreScreening: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/clinical-trial',
      value: 'dlivr-clinical-trial-pre-screening',
    },
    DlivrScreening: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/clinical-trial',
      value: 'dlivr-clinical-trial-screening',
    },
    DlivrTreatment: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/clinical-trial',
      value: 'dlivr-clinical-trial-treatment',
    },
    DlivrPostTreatment: {
      use: 'usual',
      system: 'http://livercenter.mn/fhir/identifiers/clinical-trial',
      value: 'dlivr-clinical-trial-post-treatment',
    },
  },
  HealthInsuranceNumber: {
    use: 'official',
    system: 'http://livercenter.mn/fhir/identifiers/health-insurance-number',
    type: {
      coding: [
        {
          system: 'http://livercenter.mn/fhir/ValueSet',
          code: 'health-insurance-number',
        },
      ],
      text: 'Health Insurance Number',
    },
  },
  NationalIdentificationNumber: {
    use: 'official',
    system: 'http://fhir.mn/identifiers/person/national-identification-number',
    type: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
          code: 'NNmng',
        },
      ],
    },
  },
  NationalPersonIdentifierOfForeigners: {
    system:
      'http://livercenter.mn/fhir/identifiers/national-person-identifier-of-foreigners',
    type: { text: 'National Person Identifier of Foreigners' },
  },
  ServiceRequestRequisition: {
    use: 'official',
    system:
      'http://livercenter.mn/fhir/identifiers/service-request-requisition',
  },
  SpecimenCollection: {
    use: 'official',
    system: 'http://livercenter.mn/identifiers/collection',
  },
  SpecimenAccession: {
    use: 'official',
    system: 'http://livercenter.mn/identifiers/specimen-accession',
  },
  Observations: {
    use: 'official',
    system: 'http://livercenter.mn/fhir/identifiers/observation',
  },
  Conditions: {
    use: 'official',
    system: 'http://livercenter.mn/fhir/identifiers/condition',
  },
  TaxIdNumber: {
    use: 'official',
    type: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
          code: 'TAX',
        },
      ],
    },
  },
  DiagnosticReport: {
    use: 'official',
    system: 'http://livercenter.mn/identifiers/diagnostic-reports',
  },
}

module.exports = Identifiers

const Categories = {
  Imaging: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '363679005',
        display: 'Imaging (procedure)',
      },
    ],
  },
  Counselling: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '409063005',
        display: 'Counseling (procedure)',
      },
    ],
  },
  ChildServiceRequest: {
    coding: [
      {
        system: 'http://livercenter.mn/fhir/CodeSystem/categories',
        code: 'ChildServiceRequest',
        display: 'Child service request',
      },
    ],
  },

  EncounterDiagnosis: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/condition-category',
        code: 'encounter-diagnosis',
        display: 'Encounter Diagnosis',
      },
    ],
  },
  Outpatient: {
    coding: [
      {
        system:
          'http://terminology.hl7.org/CodeSystem/medicationrequest-category',
        code: 'outpatient',
        display: 'Outpatient',
      },
    ],
  },
  GrandparentServiceRequest: {
    coding: [
      {
        system: 'http://livercenter.mn/fhir/CodeSystem/categories',
        code: 'GrandparentServiceRequest',
        display: 'Grandparent service request',
      },
    ],
  },
  Laboratory: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: 'laboratory',
        display: 'Laboratory',
      },
    ],
  },
  LaboratoryProcedure: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '108252007',
        display: 'Laboratory procedure',
      },
    ],
  },
  ParentServiceRequest: {
    coding: [
      {
        system: 'http://livercenter.mn/fhir/CodeSystem/categories',
        code: 'ParentServiceRequest',
        display: 'Parent service request',
      },
    ],
  },
  ProblemListItem: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/condition-category',
        code: 'problem-list-item',
        display: 'Problem List Item',
      },
    ],
  },
  Complaint: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '409586006',
        display: 'Complaint (finding)',
      },
    ],
  },
  /* #region  Anamnesis Vitae */
  HistoryOfInfectiousDisease: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '161413004',
        display: 'History of infectious disease (situation)',
      },
    ],
  },
  AccidentalEvent: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '418019003',
        display: 'Accidental event (event)',
      },
    ],
  },
  ChronicDisease: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '27624003',
        display: 'Chronic disease (disorder)',
      },
    ],
  },
  /* #endregion */
  HistoryOfPresentIllness: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '422625006',
        display: 'History of present illness section',
      },
    ],
  },
  SocialHistory: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: 'social-history',
        display: 'Social History',
      },
    ],
  },
  VitalSigns: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: 'vital-signs',
        display: 'Vital Signs',
      },
    ],
  },
}

module.exports = Categories

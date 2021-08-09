const Schedules = {
  ServiceCategory: {
    GeneralPractice: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/service-category',
          code: '17',
          display: 'General Practice',
        },
      ],
    },
  },
  ServiceType: {
    GeneralPractice: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/service-type',
          code: '124',
          display: 'General Practice',
        },
      ],
    },
  },
  Specialty: {
    GeneralPractice: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '394814009',
          display: 'General practice',
        },
      ],
    },
  },
}

module.exports = Schedules

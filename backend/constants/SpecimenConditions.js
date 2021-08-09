const SpecimenConditions = {
  SampleHemolyzed: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '118128002',
        display: 'Sample hemolyzed',
      },
    ],
  },
  SampleMilky: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '263811001',
        display: 'Milky',
      },
    ],
  },
  SampleLeaked: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '281263003',
        display: 'Sample Leaked',
      },
    ],
  },
  // SampleAmountInsufficient: {},
  SampleInadequate: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '71978007',
        display: 'Sample Inadequate',
      },
    ],
  },
  Other: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '74964007',
        display: 'Other',
      },
    ],
  },
}
module.exports = SpecimenConditions

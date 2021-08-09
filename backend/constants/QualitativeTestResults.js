const QualitativeTestResults = {
  positive: {
    display: 'Positive',
    // designation
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '10828004',
          display: 'Positive',
        },
      ],
    },
  },
  negative: {
    display: 'Negative',
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '260385009',
          display: 'Negative',
        },
      ],
    },
  },
  weaklyPositive: {
    display: 'Weakly positive',
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '260408008',
          display: 'Weakly positive',
        },
      ],
    },
  },
}

module.exports = QualitativeTestResults

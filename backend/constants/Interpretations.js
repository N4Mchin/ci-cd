const Interpretations = {
  CriticalLow: {
    coding: [
      {
        system:
          'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
        code: 'LL',
        display: 'Critical low',
      },
    ],
  },
  Low: {
    coding: [
      {
        system:
          'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
        code: 'L',
        display: 'Low',
      },
    ],
  },
  High: {
    coding: [
      {
        system:
          'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
        code: 'H',
        display: 'High',
      },
    ],
  },
  Normal: {
    coding: [
      {
        system:
          'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
        code: 'N',
        display: 'Normal',
      },
    ],
  },
}

module.exports = Interpretations

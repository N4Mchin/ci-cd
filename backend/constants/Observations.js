const Observations = {
  RegulatoryNotes: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '398007000',
          display: 'Regulatory notes (record artifact)',
        },
      ],
      text: 'Regulatory notes (record artifact)',
    },
  },
  BloodGroup: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '112143006',
          display: 'ABO group phenotype',
        },
        {
          system: 'http://loinc.org',
          code: '883-9',
          display: 'ABO group [Type] in Blood',
        },
      ],
      text: 'Blood group',
    },
  },
  RhStatus: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '115758001',
          display: 'Rh blood group phenotype',
        },
      ],
      text: 'Rh status',
    },
  },
  BloodGroupPanel: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '34532-2',
          display: 'Blood type and Indirect antibody screen panel - Blood',
        },
      ],
      text: 'Blood group panel',
    },
  },
  VitalSigns: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '85353-1',
          display:
            'Vital signs, weight, height, head circumference, oxygen saturation and BMI panel',
        },
      ],
      text:
        'Vital signs, weight, height, head circumference, oxygen saturation and BMI panel',
    },
  },
  BodyWeight: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '29463-7',
          display: 'Body Weight',
        },
        {
          system: 'http://loinc.org',
          code: '3141-9',
          display: 'Body weight Measured',
        },
        {
          system: 'http://snomed.info/sct',
          code: '27113001',
          display: 'Body weight',
        },
        {
          system: 'http://acme.org/devices/clinical-codes',
          code: 'body-weight',
          display: 'Body Weight',
        },
      ],
      text: 'Body Weight',
    },
  },
  BodyHeight: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '8302-2',
          display: 'Body height',
        },
      ],
      text: 'Body height',
    },
  },
  BodyMassIndex: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '60621009',
          display: 'Body mass index',
        },
        {
          system: 'http://loinc.org',
          code: '39156-5',
          display: 'Body mass index (BMI) [Ratio]',
        },
      ],
      text: 'Body mass index',
    },
  },
  GeneralHealth: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '11323-3',
          display: 'General health',
        },
      ],
    },
    display: 'General health',
    include: {
      SubcompensatedChronicSick: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir',
            code: '40000001',
            display: 'Subcompensated Chronic Sick',
          },
        ],
      },
      DecompensatedChronicSick: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir',
            code: '40000002',
            display: 'Decompensated Chronic Sick',
          },
        ],
      },
      FitAndWell: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '102499006',
            display: 'Fit and well',
          },
        ],
      },
      PatientFeelsWell: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '267112005',
            display: 'Patient feels well',
          },
        ],
      },
      ChronicSick: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '161901003',
            display: 'Chronic sick',
          },
        ],
      },
    },
  },
  Occupation: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '74287-4',
          display: 'Occupation',
        },
      ],
      text: 'Occupation',
    },
  },
  Salary: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '91570-2',
          display: 'Employment net income in past 30 days',
        },
      ],
      text: 'Employment net income in past 30 days',
    },
  },
  Accommodation: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '46672-2',
          display: 'Accommodation',
        },
      ],
      text: 'Accommodation',
    },
  },
  HouseHoldSize: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '86639-2',
          display: 'House Hold Size',
        },
      ],
      text: 'House Hold Size',
    },
  },
  DietaryFinding: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '41829006',
          display: 'Dietary finding',
        },
      ],
      text: 'Dietary finding',
    },
    display: 'Dietary finding',
    include: {
      NormalDiet: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '36823005',
            display: 'Normal diet',
          },
        ],
        text: 'Normal diet',
      },
      Vegan: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '24930006',
            display: 'Vegan',
          },
        ],
        text: 'Vegan',
      },
      Vegetarian: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '300928006',
            display: 'Vegetarian',
          },
        ],
        text: 'Vegetarian',
      },
      Other: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '74964007',
            display: 'Other',
          },
        ],
        text: 'Other',
      },
    },
  },
  PatientInformation: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '52460-3',
          display: 'Patient Information',
        },
      ],
      text: 'Patient Information',
    },
  },
  HighestLevelOfEducation: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '82589-3',
          display: 'Highest level of education',
        },
      ],
      text: 'Highest level of education',
    },
    display: 'Highest level of education',
    include: {
      NoFormalEducation: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '224294005',
            display: 'No formal education',
          },
        ],
      },
      EducatedToHighSchoolLevel: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '473461003',
            display: 'Educated to high school level',
          },
        ],
      },
      ReceivedElementarySchoolEducation: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '473463000',
            display: 'Received elementary school education',
          },
        ],
      },
      ReceivedEducationAtTechnicalCollege: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '722465008',
            display: 'Received education at technical college',
          },
        ],
      },
      EducatedToSecondarySchoolLevel: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '224297003',
            display: 'Educated to secondary school level',
          },
        ],
      },
      ReceivedGraduateEducation: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '426769009',
            display: 'Received graduate education',
          },
        ],
      },
    },
  },
  EmploymentStatus: {
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '67875-5',
          display: 'Employment Status',
        },
      ],
      text: 'Employment Status',
    },
    display: 'Employment Status',
    include: {
      Worker: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '106541005',
            display: 'Worker',
          },
        ],
      },
      Employee: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '224528001',
            display: 'Employee',
          },
        ],
      },
      Stockman: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '159823003',
            display: 'Stockman',
          },
        ],
      },
      RetiredWorker: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '712889009',
            display: 'Retired worker',
          },
        ],
      },
      Student: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '65853000',
            display: 'Student',
          },
        ],
      },
      SchoolChild: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '160498000',
            display: 'School Child',
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
      Unemployed: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '73438004',
            display: 'Unemployed',
          },
        ],
      },
    },
  },
  WorkEnvironment: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '285441008',
          display: 'Work environment',
        },
      ],
      text: 'Work environment',
    },
    display: 'Work Environment',
    include: {
      LowRisk: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '285139007',
            display: 'Low risk environment',
          },
        ],
        text: 'Low risk environment',
      },
      HighRisk: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '224779005',
            display: 'High risk environment',
          },
        ],
        text: 'High risk environment',
      },
      Toxic: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '285121003',
            display: 'Toxic environment',
          },
        ],
        text: 'Toxic environment',
      },
      Other: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '74964007',
            display: 'Other',
          },
        ],
        text: 'Other',
      },
    },
  },
  ValueQuantityUnit: {
    BodyTemperature: {
      unit: 'degree Celsius',
      system: 'http://unitsofmeasure.org',
      code: 'cel(1 K)',
    },
    HemoglobinSaturationWithOxygen: {
      unit: 'degree Celsius',
      system: 'http://unitsofmeasure.org',
      code: '%',
    },
  },
  MedicationStatementDerivedFrom: {
    coding: [
      {
        system: 'http://livercenter.mn/fhir/Anamnesis/medication-statement',
        code: '10000022',
        display: 'Length of medication use',
      },
    ],
    text: 'Length of medication use',
  },
  Interpretation: {
    Normal: {
      coding: [
        {
          system:
            'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
          code: 'N',
          display: 'Normal',
        },
      ],
      text: 'Normal',
    },
    Abnormal: {
      coding: [
        {
          system:
            'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
          code: 'A',
          display: 'Abnormal',
        },
      ],
      text: 'Abnormal',
    },
  },
  MELD: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '866002000',
          display: 'MELD-Assessment using Model for End-stage Liver Disease',
        },
      ],
    },
  },
  ChildPugh: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '3191000175106',
          display: 'Child-Pugh score',
        },
      ],
    },
    include: {
      ClassA: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '710065009',
            display: 'Child-Pugh score class A',
          },
        ],
      },
      ClassB: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '710066005',
            display: 'Child-Pugh score class B',
          },
        ],
      },
      ClassC: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '710067001',
            display: 'Child-Pugh score class C',
          },
        ],
      },
    },
  },
  FraminghamCoronaryHeartDiseaseRiskScore: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '315039001',
          display: 'Framingham coronary heart disease 10 year risk score',
        },
      ],
    },
  },
  ReachB: {
    code: {
      coding: [
        {
          system: 'http://livercenter.mn/fhir/CodeSystem',
          code: '70000001',
          display: 'Reach-B',
        },
      ],
    },
  },
}

module.exports = Observations

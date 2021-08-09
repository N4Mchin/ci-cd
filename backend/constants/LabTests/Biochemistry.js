const BiochemistryTests = {
  display: 'Biochemistry',
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '166312007',
        display: 'Blood chemistry',
      },
    ],
    text: 'Blood chemistry',
  },
  include: {
    Liver_Function_test: {
      display: 'Liver function test',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '26958001',
            display: 'Hepatic function panel',
          },
        ],
        text: 'Hepatic function panel',
      },
      cost: 27500,
      include: {
        // засварласан
        T_Bil: {
          display: 'T.Bil',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313840000',
                display: 'Serum total bilirubin measurement',
              },
            ],
            text: 'Serum total bilirubin measurement',
          },
          cost: 4500,
          unit: 'μmol/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 22.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 22.0,
                },
              },
            ],
          },
        },

        // засварласан
        D_Bil: {
          display: 'D.Bill',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313856005',
                display: 'Serum conjugated bilirubin measurement',
              },
            ],
            text: 'Serum conjugated bilirubin measurement',
          },
          cost: 4000,
          unit: 'μmol/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 5.2,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 5.2,
                },
              },
            ],
          },
        },

        // засварласан
        AST: {
          display: 'AST',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '250641004',
                display: 'Aspartate aminotransferase serum measurement',
              },
            ],
            text: 'Aspartate aminotransferase serum measurement',
          },
          cost: 4000,
          unit: 'U/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 35.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 31.0,
                },
              },
            ],
          },
        },

        // засварласан
        ALT: {
          display: 'ALT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '250637003',
                display: 'Alanine aminotransferase - blood measurement',
              },
            ],
            text: 'Alanine aminotransferase - blood measurement',
          },
          cost: 4000,
          unit: 'U/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 45.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 34.0,
                },
              },
            ],
          },
        },

        // засварласан
        ALB: {
          display: 'ALB',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104485008',
                display: 'Albumin measurement, serum',
              },
            ],
            text: 'Albumin measurement, serum',
          },
          cost: 4000,
          unit: 'g/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 38.0,
                },
                high: {
                  value: 54.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 35.0,
                },
                high: {
                  value: 52.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 38.0,
                },
                high: {
                  value: 54.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 35.0,
                },
                high: {
                  value: 52.0,
                },
              },
            ],
          },
        },

        // засварласан
        TP: {
          display: 'TP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '304383000',
                display: 'Total protein measurement',
              },
            ],
            text: 'Total protein measurement',
          },
          cost: 4000,
          unit: 'g/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 60.0,
                },
                high: {
                  value: 80.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 64.0,
                },
                high: {
                  value: 83.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 60.0,
                },
                high: {
                  value: 80.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 64.0,
                },
                high: {
                  value: 83.0,
                },
              },
            ],
          },
        },

        // засварласан
        ALP: {
          display: 'ALP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271234008',
                display: 'Serum alkaline phosphatase measurement',
              },
            ],
            text: 'Serum alkaline phosphatase measurement',
          },
          cost: 4000,
          unit: 'U/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 54.0,
                },
                high: {
                  value: 369.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 60,
                  day: 0,
                },
                low: {
                  value: 53.0,
                },
                high: {
                  value: 128.0,
                },
              },
              {
                minAge: {
                  year: 60,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 56.0,
                },
                high: {
                  value: 119.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 18,
                  day: 0,
                },
                low: {
                  value: 54.0,
                },
                high: {
                  value: 369.0,
                },
              },
              {
                minAge: {
                  year: 18,
                  day: 0,
                },
                maxAge: {
                  year: 60,
                  day: 0,
                },
                low: {
                  value: 42.0,
                },
                high: {
                  value: 98.0,
                },
              },
              {
                minAge: {
                  year: 60,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 53.0,
                },
                high: {
                  value: 141.0,
                },
              },
            ],
          },
        },

        // засварласан
        GGT: {
          display: 'GGT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313849004',
                display: 'Serum gamma-glutamyl transferase measurement',
              },
            ],
            text: 'Serum gamma-glutamyl transferase measurement',
          },
          cost: 4500,
          unit: 'U/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 55.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 38.0,
                },
              },
            ],
          },
        },

        // засварласан
        LDH: {
          display: 'LDH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '273974004',
                display: 'Serum total lactate dehydrogenase measurement',
              },
            ],
            text: 'Serum total lactate dehydrogenase measurement',
          },
          cost: 4500,
          unit: 'U/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 225,
                },
                high: {
                  value: 450,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 225,
                },
                high: {
                  value: 450,
                },
              },
            ],
          },
        },

        // засварласан
        GLU: {
          display: 'GLU',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '22569008',
                display: 'Glucose measurement, serum',
              },
            ],
            text: 'Glucose measurement, serum',
          },
          cost: 4500,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 3.4,
                },
                high: {
                  value: 5.8,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 3.9,
                },
                high: {
                  value: 6.9,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 3.4,
                },
                high: {
                  value: 5.8,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 3.9,
                },
                high: {
                  value: 6.9,
                },
              },
            ],
          },
        },

        CRYO: {
          display: 'CRYO',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '391328008',
                display: 'Serum cryoglobulin level',
              },
            ],
            text: 'Serum cryoglobulin level',
          },
          cost: 0,
          performed: false,
        },

        Haptoglobin: {
          display: 'Haptoglobin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166580005',
                display: 'Serum haptoglobin measurement',
              },
            ],
            text: 'Serum haptoglobin measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    /////////
    Kidney_Function_Test: {
      display: 'Kidney Function Test',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '54610007',
            display: 'Kidney panel',
          },
        ],
        text: 'Kidney panel',
      },
      cost: 15000,
      include: {
        Cyst_C: {
          display: 'Cyst C',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '408650007',
                display: 'Serum cystatin C measurement',
              },
            ],
            text: 'Serum cystatin C measurement',
          },
          cost: 0,
          performed: false,
        },

        // засварласан
        Creatinine: {
          display: 'Creatinine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '113075003',
                display: 'Creatinine measurement, serum',
              },
            ],
            text: 'Creatinine measurement, serum',
          },
          cost: 5000,
          unit: 'μmol/L',
          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 26.5,
                },
                high: {
                  value: 61.8,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 61.6,
                },
                high: {
                  value: 114.4,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 26.5,
                },
                high: {
                  value: 61.8,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 52.8,
                },
                high: {
                  value: 88.0,
                },
              },
            ],
          },
        },

        // засварласан
        Urea: {
          display: 'Urea',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '273967009',
                display: 'Serum urea measurement',
              },
            ],
            text: 'Serum urea measurement',
          },
          cost: 5000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 2.5,
                },
                high: {
                  value: 6.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 3.2,
                },
                high: {
                  value: 7.3,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 2.5,
                },
                high: {
                  value: 6.0,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 2.6,
                },
                high: {
                  value: 6.7,
                },
              },
            ],
          },
        },

        // засварласан
        UA: {
          display: 'UA',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '275740009',
                display: 'Serum uric acid measurement',
              },
            ],
            text: 'Serum uric acid measurement',
          },
          cost: 5000,
          unit: 'μmol/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 210.0,
                },
                high: {
                  value: 432.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 156.0,
                },
                high: {
                  value: 360.0,
                },
              },
            ],
          },
        },

        PreALb: {
          display: 'PreALb',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '395043005',
                display: 'Serum prealbumin level',
              },
            ],
            text: 'Serum prealbumin level',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Lipids: {
      display: 'Lipids',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '16254007',
            display: 'Lipid panel',
          },
        ],
        text: 'Lipid panel',
      },
      cost: 30000,
      include: {
        // засварласан
        CHOL: {
          display: 'CHOL',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '412808005',
                display: 'Serum total cholesterol measurement',
              },
            ],
            text: 'Serum total cholesterol measurement',
          },
          cost: 5000,
          unit: 'mmol/l',
          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 4.4,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 5.0,
                },
              },
            ],

            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 4.4,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 5.0,
                },
              },
            ],
          },
        },

        // засварласан
        HDL: {
          display: 'HDL',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166832000',
                display:
                  'Serum high density lipoprotein cholesterol measurement',
              },
            ],
            text: 'Serum high density lipoprotein cholesterol measurement',
          },
          cost: 10000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.9,
                },
                high: {
                  value: 2.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 1.1,
                },
                high: {
                  value: 2.3,
                },
              },
            ],
          },
        },

        // засварласан
        LDL: {
          display: 'LDL',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166833005',
                display:
                  'Serum low density lipoprotein cholesterol measurement',
              },
            ],
            text: 'Serum low density lipoprotein cholesterol measurement',
          },
          cost: 10000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 2.6,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 2.6,
                },
              },
            ],
          },
        },

        LPA: {
          display: 'LPA',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '121806006',
                display: 'Lipoprotein (a) measurement',
              },
            ],
            text: 'Lipoprotein (a) measurement',
          },
          cost: 0,
          performed: false,
        },

        Triglycerides: {
          display: 'Triglycerides',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271245006',
                display: 'Measurement of serum triglyceride level',
              },
            ],
            text: 'Measurement of serum triglyceride level',
          },
          cost: 5000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 1.7,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 1.7,
                },
              },
            ],
          },
        },

        Kappa_Light_Chains: {
          display: 'Kappa Light Chains',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '121802008',
                display: 'Kappa light chain measurement',
              },
            ],
            text: 'Kappa light chain measurement',
          },
          cost: 0,
          performed: false,
        },

        Lambda_Light_Chains: {
          display: 'Lambda Light Chains',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '121803003',
                display: 'Lambda light chain measurement',
              },
            ],
            text: 'Lambda light chain measurement',
          },
          cost: 0,
          performed: false,
        },

        Lipoprotein: {
          display: 'Lipoprotein',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '167062004',
                display: 'Serum lipoprotein measurement',
              },
            ],
            text: 'Serum lipoprotein measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    /////////
    Pancreas_Function_test: {
      display: 'Pancreas function test',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '250646009',
            display: 'Pancreatic enzyme measurement',
          },
        ],
        text: 'Pancreatic enzyme measurement',
      },
      cost: 0,
      include: {
        // засварласан
        Amylase_Tot: {
          display: 'Amylase-Tot',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '89659001',
                display: 'Amylase measurement, serum',
              },
            ],
            text: 'Amylase measurement, serum',
          },
          cost: 8000,
          unit: 'U/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 80.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 80.0,
                },
              },
            ],
          },
        },

        Amylase_Pancr: {
          display: 'Amylase-Pancr',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '1805-1',
                display:
                  'Amylase.pancreatic [Enzymatic activity/volume] in Serum or Plasma',
              },
            ],
            text:
              'Amylase.pancreatic [Enzymatic activity/volume] in Serum or Plasma',
          },
          cost: 0,
          unit: 'U/L',
          performed: false,
        },

        LIPA: {
          display: 'LIPA',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271232007',
                display: 'Serum lipase measurement',
              },
            ],
            text: 'Serum lipase measurement',
          },
          cost: 0,
          performed: false,
          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0,
                },
                high: {
                  value: 60,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0,
                },
                high: {
                  value: 60,
                },
              },
            ],
          },
        },

        HbA1C: {
          display: 'HbA1C',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '43396009',
                display: 'emoglobin A1c measurement',
              },
            ],
            text: 'emoglobin A1c measurement',
          },
          cost: 0,
          unit: '%',
          performed: false,
          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 4.0,
                },
                high: {
                  value: 6.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 4.0,
                },
                high: {
                  value: 6.0,
                },
              },
            ],
          },
        },
      },
    },
    ////////////////////////////////
    Electrolytes: {
      display: 'Electrolytes',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '20109005',
            display: 'Electrolytes measurement, serum',
          },
        ],
        text: 'Electrolytes measurement, serum',
      },
      cost: 34000,
      include: {
        // засварласан
        Ca: {
          display: 'Ca',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271240001',
                display: 'Serum calcium measurement',
              },
            ],
            text: 'Serum calcium measurement',
          },
          cost: 7000,
          unit: 'mg/dl',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 9.3,
                },
                high: {
                  value: 10.6,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 60,
                  day: 0,
                },
                low: {
                  value: 8.6,
                },
                high: {
                  value: 10.2,
                },
              },
              {
                minAge: {
                  year: 60,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 8.8,
                },
                high: {
                  value: 10.2,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 9.3,
                },
                high: {
                  value: 10.6,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 60,
                  day: 0,
                },
                low: {
                  value: 8.6,
                },
                high: {
                  value: 10.2,
                },
              },
              {
                minAge: {
                  year: 60,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 8.8,
                },
                high: {
                  value: 10.2,
                },
              },
            ],
          },
        },

        Mg: {
          display: 'Mg',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '63571001',
                display: 'Magnesium measurement, serum',
              },
            ],
            text: 'Magnesium measurement, serum',
          },
          cost: 7000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.66,
                },
                high: {
                  value: 1.07,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.66,
                },
                high: {
                  value: 1.07,
                },
              },
            ],
          },
        },

        // засварласан
        Fe: {
          display: 'Fe',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '250216004',
                display: 'Serum iron measurement',
              },
            ],
            text: 'Serum iron measurement',
          },
          cost: 7000,
          unit: 'μmol/L',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 0,
                  day: 90,
                },
                low: {
                  value: 7.2,
                },
                high: {
                  value: 17.9,
                },
              },
              {
                minAge: {
                  year: 0,
                  day: 90,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 9.0,
                },
                high: {
                  value: 21.5,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 11.6,
                },
                high: {
                  value: 31.3,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 0,
                  day: 90,
                },
                low: {
                  value: 7.2,
                },
                high: {
                  value: 17.9,
                },
              },
              {
                minAge: {
                  year: 0,
                  day: 90,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 9.0,
                },
                high: {
                  value: 21.5,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 9.0,
                },
                high: {
                  value: 30.4,
                },
              },
            ],
          },
        },

        // засварласан
        Р: {
          display: 'Р',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '8364005',
                display: 'Phosphorus measurement',
              },
            ],
            text: 'Phosphorus measurement',
          },
          cost: 6000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 1.3,
                },
                high: {
                  value: 2.2,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.8,
                },
                high: {
                  value: 1.4,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 17,
                  day: 0,
                },
                low: {
                  value: 1.3,
                },
                high: {
                  value: 2.2,
                },
              },
              {
                minAge: {
                  year: 17,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.8,
                },
                high: {
                  value: 1.4,
                },
              },
            ],
          },
        },

        Na: {
          display: 'Na',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104934005',
                display: 'Sodium measurement, serum',
              },
            ],
            text: 'Sodium measurement, serum',
          },
          cost: 0,
          unit: 'mmol/l',
          performed: false,
        },

        K: {
          display: 'K',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271236005',
                display: 'Serum potassium measurement',
              },
            ],
            text: 'Serum potassium measurement',
          },
          cost: 0,
          unit: 'mmol/l',
          performed: false,
        },

        Cl: {
          display: 'Cl',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271238006',
                display: 'Serum chloride measurement',
              },
            ],
            text: 'Serum chloride measurement',
          },
          cost: 7000,
          unit: 'mmol/l',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 98.0,
                },
                high: {
                  value: 107.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 98.0,
                },
                high: {
                  value: 107.0,
                },
              },
            ],
          },
        },

        Cu: {
          display: 'Cu',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '85554007',
                display: 'Copper measurement, serum',
              },
            ],
            text: 'Copper measurement, serum',
          },
          cost: 0,
          performed: false,
        },

        Ammonia: {
          display: 'Ammonia',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '441601006',
                display: 'Measurement of ammonia in venous blood specimen',
              },
            ],
            text: 'Measurement of ammonia in venous blood specimen',
          },
          cost: 0,
          performed: false,
        },

        Bicarbonate: {
          display: 'Bicarbonate',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271239003',
                display: 'Serum bicarbonate measurement',
              },
            ],
            text: 'Serum bicarbonate measurement',
          },
          cost: 0,
          performed: false,
        },

        Fructosamine: {
          display: 'Fructosamine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270997002',
                display: 'Serum fructosamine measurement',
              },
            ],
            text: 'Serum fructosamine measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    ////////////
    Rheumatology: {
      display: 'Rheumatology',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '310059000',
            display: 'Rheumatology service',
          },
        ],
        text: 'Rheumatology service',
      },
      cost: 34000,
      include: {
        PCT: {
          display: 'PCT',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '33959-8',
                display: 'Procalcitonin [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Procalcitonin [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },

        IL6: {
          display: 'IL6',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '22766004',
                display: 'Interleukin-6 assay',
              },
            ],
            text: 'Interleukin-6 assay',
          },
          cost: 0,
          performed: false,
        },

        RF: {
          display: 'RF',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '54921001',
                display: 'Rheumatoid factor measurement',
              },
            ],
            text: 'Rheumatoid factor measurement',
          },
          cost: 12000,
          unit: 'IU/mL',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 20.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 20.0,
                },
              },
            ],
          },
        },

        CRP: {
          display: 'CRP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '135842001',
                display: 'Serum C reactive protein level',
              },
            ],
            text: 'Serum C reactive protein level',
          },
          cost: 12000,
          unit: 'mg/dl',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 1.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 1.0,
                },
              },
            ],
          },
        },

        // засварласан
        ASO: {
          display: 'ASO',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '41451006',
                display: 'Antistreptolysin-O test',
              },
            ],
            text: 'Antistreptolysin-O test',
          },
          cost: 10000,
          unit: 'IU/ml',

          referenceRange: {
            male: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 200.0,
                },
              },
            ],
            female: [
              {
                minAge: {
                  year: 0,
                  day: 0,
                },
                maxAge: {
                  year: 200,
                  day: 0,
                },
                low: {
                  value: 0.0,
                },
                high: {
                  value: 200.0,
                },
              },
            ],
          },
        },
      },
    },

    Drugs_Of_Abuse: {
      display: 'Drugs of Abuse',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '89732002',
            display: 'Drug of abuse screen',
          },
        ],
        text: 'Drug of abuse screen',
      },
      cost: 0,
      include: {
        Amphetamines: {
          display: 'Amphetamines',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '442555003',
                display: 'Measurement of amphetamine in serum specimen',
              },
            ],
            text: 'Measurement of amphetamine in serum specimen',
          },
          cost: 0,
          performed: false,
        },

        Barbiturates: {
          display: 'Barbiturates',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '441650000',
                display: 'Measurement of barbiturate in serum specimen',
              },
            ],
            text: 'Measurement of barbiturate in serum specimen',
          },
          cost: 0,
          performed: false,
        },

        Benzodiazepines: {
          display: 'Benzodiazepines',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '574005',
                display: 'Benzodiazepine measurement',
              },
            ],
            text: 'Benzodiazepine measurement',
          },
          cost: 0,
          performed: false,
        },

        Cannabinoids: {
          display: 'Cannabinoids',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '66689000',
                display: 'Cannabinoids measurement',
              },
            ],
            text: 'Cannabinoids measurement',
          },
          cost: 0,
          performed: false,
        },

        Cocain_Metabolite: {
          display: 'Cocain Metabolite',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '73823-7',
                display:
                  'Cocaine+Benzoylecgonine [Presence] in Serum, Plasma or Blood by Screen method',
              },
            ],
            text:
              'Cocaine+Benzoylecgonine [Presence] in Serum, Plasma or Blood by Screen method',
          },
          cost: 0,
          performed: false,
        },

        Ethanol: {
          display: 'Ethanol',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313634009',
                display: 'Serum ethanol measurement',
              },
            ],
            text: 'Serum ethanol measurement',
          },
          cost: 0,
          performed: false,
        },

        Methadone: {
          display: 'Methadone',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '391425005',
                display: 'Serum methadone level',
              },
            ],
            text: 'Serum methadone level',
          },
          cost: 0,
          performed: false,
        },

        EDDP: {
          display: 'EDDP',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '60071-8',
                display:
                  '2-Ethylidene-1,5-Dimethyl-3,3-Diphenylpyrrolidine (EDDP) [Mass/volume] in Serum or Plasma',
              },
            ],
            text:
              '2-Ethylidene-1,5-Dimethyl-3,3-Diphenylpyrrolidine (EDDP) [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },

        Opiates: {
          display: 'Opiates',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '8217-2',
                display: 'Opiates [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Opiates [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },

        Oxycodone: {
          display: 'Oxycodone',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '105278002',
                display: 'Oxycodone measurement',
              },
            ],
            text: 'Oxycodone measurement',
          },
          cost: 0,
          performed: false,
        },

        Phencyclidine: {
          display: 'Phencyclidine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '20857001',
                display: 'Phencyclidine measurement',
              },
            ],
            text: 'Phencyclidine measurement',
          },
          cost: 0,
          performed: false,
        },

        Propoxyphene: {
          display: 'Propoxyphene',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '3543-6',
                display: 'Propoxyphene [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Propoxyphene [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },

        LSD: {
          display: 'LSD',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '5022001',
                display: 'Lysergic acid diethylamide measurement',
              },
            ],
            text: 'Lysergic acid diethylamide measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    ////////////////////
    Specific_Proteins: {
      display: 'Specific proteins',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '74040009',
            display: 'Protein measurement',
          },
        ],
        text: 'Protein measurement',
      },
      cost: 0,
      include: {
        Acetaminophen: {
          display: 'Acetaminophen',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269874008',
                display: 'Serum paracetamol measurement',
              },
            ],
            text: 'Serum paracetamol measurement',
          },
          cost: 0,
          performed: false,
        },

        Amikacin: {
          display: 'Amikacin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313536001',
                display: 'Serum amikacin measurement',
              },
            ],
            text: 'Serum amikacin measurement',
          },
          cost: 0,
          performed: false,
        },

        Carbamazepine: {
          display: 'Carbamazepine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269869000',
                display: 'Serum carbamazepine measurement',
              },
            ],
            text: 'Serum carbamazepine measurement',
          },
          cost: 0,
          performed: false,
        },

        Cyclosporine: {
          display: 'Cyclosporine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166976008',
                display: 'Serum cyclosporin measurement',
              },
            ],
            text: 'Serum cyclosporin measurement',
          },
          cost: 0,
          performed: false,
        },

        C3с: {
          display: 'C3с',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104351008',
                display: 'Complement C3c measurement',
              },
            ],
            text: 'Complement C3c measurement',
          },
          cost: 0,
          performed: false,
        },

        C4: {
          display: 'C4',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '31483002',
                display: 'C4 complement assay',
              },
            ],
            text: 'C4 complement assay',
          },
          cost: 0,
          performed: false,
        },

        IgA: {
          display: 'IgA',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '442529004',
                display: 'Measurement of immunoglobulin A in serum specimen',
              },
            ],
            text: 'Measurement of immunoglobulin A in serum specimen',
          },
          cost: 0,
          performed: false,
        },

        IgE: {
          display: 'IgE',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '41960005',
                display: 'Immunoglobulin E measurement',
              },
            ],
            text: 'Immunoglobulin E measurement',
          },
          cost: 0,
          performed: false,
        },

        IgG: {
          display: 'IgG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '45293001',
                display: 'Immunoglobulin G measurement',
              },
            ],
            text: 'Immunoglobulin G measurement',
          },
          cost: 0,
          performed: false,
        },

        IgM: {
          display: 'IgM',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '45764000',
                display: 'Immunoglobulin M measurement',
              },
            ],
            text: 'Immunoglobulin M measurement',
          },
          cost: 0,
          performed: false,
        },

        Digitoxin: {
          display: 'Digitoxin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '73577003',
                display: 'Digitoxin measurement',
              },
            ],
            text: 'Digitoxin measurement',
          },
          cost: 0,
          performed: false,
        },

        Digoxin: {
          display: 'Digoxin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269872007',
                display: 'Serum digoxin measurement',
              },
            ],
            text: 'Serum digoxin measurement',
          },
          cost: 0,
          performed: false,
        },

        Gentamicin: {
          display: 'Gentamicin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313714001',
                display: 'Serum gentamicin measurement',
              },
            ],
            text: 'Serum gentamicin measurement',
          },
          cost: 0,
          performed: false,
        },

        Lithium: {
          display: 'Lithium',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269871000',
                display: 'Serum lithium measurement',
              },
            ],
            text: 'Serum lithium measurement',
          },
          cost: 0,
          performed: false,
        },

        Lidocaine: {
          display: 'Lidocaine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '13661007',
                display: 'Lidocaine measurement',
              },
            ],
            text: 'Lidocaine measurement',
          },
          cost: 0,
          performed: false,
        },

        MPA: {
          display: 'MPA',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '439261002',
                display: 'Measurement of mycophenolic acid',
              },
            ],
            text: 'Measurement of mycophenolic acid',
          },
          cost: 0,
          performed: false,
        },

        free_MPA: {
          display: 'free MPA',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '30000001',
                display: 'Measurement of mycophenolic acid',
              },
            ],
            text: 'Measurement of mycophenolic acid',
          },
          cost: 0,
          performed: false,
        },

        NAPA: {
          display: 'NAPA',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '105251004',
                display: 'N-acetylprocainamide measurement',
              },
            ],
            text: 'N-acetylprocainamide measurement',
          },
          cost: 0,
          performed: false,
        },

        Phenobarb: {
          display: 'Phenobarb',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269866007',
                display: 'Serum phenobarbitone measurement',
              },
            ],
            text: 'Serum phenobarbitone measurement',
          },
          cost: 0,
          performed: false,
        },

        Phenytoin: {
          display: 'Phenytoin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269867003',
                display: 'Serum phenytoin measurement',
              },
            ],
            text: 'Serum phenytoin measurement',
          },
          cost: 0,
          performed: false,
        },

        Procainamide: {
          display: 'Procainamide',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '59014001',
                display: 'Procainamide measurement',
              },
            ],
            text: 'Procainamide measurement',
          },
          cost: 0,
          performed: false,
        },

        Quinidine: {
          display: 'Quinidine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '82650003',
                display: 'Quinidine measurement',
              },
            ],
            text: 'Quinidine measurement',
          },
          cost: 0,
          performed: false,
        },

        Salicylate: {
          display: 'Salicylate',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '269873002',
                display: 'Serum salicylate measurement',
              },
            ],
            text: 'Serum salicylate measurement',
          },
          cost: 0,
          performed: false,
        },

        Theophylline: {
          display: 'Theophylline',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '390971003',
                display: 'Serum theophylline level',
              },
            ],
            text: 'Serum theophylline level',
          },
          cost: 0,
          performed: false,
        },

        Tobramycin: {
          display: 'Tobramycin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313788005',
                display: 'Serum tobramycin measurement',
              },
            ],
            text: 'Serum tobramycin measurement',
          },
          cost: 0,
          performed: false,
        },

        Valproic: {
          display: 'Valproic',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '71466003',
                display: 'Valproic acid measurement',
              },
            ],
            text: 'Valproic acid measurement',
          },
          cost: 0,
          performed: false,
        },

        Vancomycin: {
          display: 'Vancomycin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313712002',
                display: 'Serum vancomycin measurement',
              },
            ],
            text: 'Serum vancomycin measurement',
          },
          cost: 0,
          performed: false,
        },

        Ethanol_Gen_2: {
          display: 'Ethanol Gen.2 ',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313634009',
                display: 'Serum ethanol measurement',
              },
            ],
            text: 'Serum ethanol measurement',
          },
          cost: 0,
          performed: false,
        },

        PCP: {
          display: 'PCP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '20857001',
                display: 'Phencyclidine measurement',
              },
            ],
            text: 'Phencyclidine measurement',
          },
          cost: 0,
          performed: false,
        },

        THC: {
          display: 'THC',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '105151007',
                display: 'Delta-9-tetrahydrocannabinol measurement',
              },
            ],
            text: 'Delta-9-tetrahydrocannabinol measurement',
          },
          cost: 0,
          performed: false,
        },

        CHE: {
          display: 'CHE',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '86761000',
                display: 'Acetylcholinesterase measurement',
              },
            ],
            text: 'Acetylcholinesterase measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    ////////
    Diabetes_Test: {
      display: 'Diabetes Test',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '171183004',
            display: 'Diabetes mellitus screening',
          },
        ],
        text: 'Diabetes mellitus screening',
      },
      cost: 0,
      include: {
        Insulin: {
          display: 'Insulin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271226002',
                display: 'Serum insulin measurement',
              },
            ],
            text: 'Serum insulin measurement',
          },
          cost: 0,
          performed: false,
        },

        Lactate: {
          display: 'Lactate',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270982000',
                display: 'Serum lactate measurement',
              },
            ],
            text: 'Serum lactate measurement',
          },
          cost: 0,
          performed: false,
        },

        C_peptid: {
          display: 'C peptid',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271227006',
                display: 'Serum insulin - C-polypeptide measurement',
              },
            ],
            text: 'Serum insulin - C-polypeptide measurement',
          },
          cost: 0,
          performed: false,
        },

        HbA1C: {
          display: 'HbA1C',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '43396009',
                display: 'Hemoglobin A1c measurement',
              },
            ],
            text: 'Hemoglobin A1c measurement',
          },
          cost: 0,
          performed: false,
        },

        OGTT: {
          display: 'OGTT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '113076002',
                display: 'Oral glucose tolerance test',
              },
            ],
            text: 'Oral glucose tolerance test',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    //////////
    Others: {
      display: 'Others',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '394841004',
            display: 'Other category',
          },
        ],
        text: 'Other category',
      },
      cost: 0,
      include: {
        AmmoniaMeasurement: {
          display: 'Ammonia measurement',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '59960001',
                display: 'Ammonia measurement',
              },
            ],
            text: 'Ammonia measurement',
          },
          cost: 0,
          performed: false,
        },

        ApolipoproteinB: {
          display: 'Apolipoprotein B (substance)',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '26821000',
                display: 'Apolipoprotein B (substance)',
              },
            ],
            text: 'Apolipoprotein B (substance)',
          },
          cost: 0,
          performed: false,
        },

        AT_III_Coagulogram: {
          display: 'AT III- Coagulogram',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '36288005',
                display: 'Antithrombin III assay',
              },
            ],
            text: 'Antithrombin III assay',
          },
          cost: 0,
          performed: false,
        },

        D_Dimer_Coagulogramm: {
          display: 'D-Dimer Coagulogramm',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '70648006',
                display: 'D-dimer assay',
              },
            ],
            text: 'D-dimer assay',
          },
          cost: 0,
          performed: false,
        },

        alpha1_Acid_Glycoprotein: {
          display: 'α1-Acid Glycoprotein',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270978002',
                display: 'Serum A1 acid glycoprotein measurement',
              },
            ],
            text: 'Serum A1 acid glycoprotein measurement',
          },
          cost: 0,
          performed: false,
        },

        alpha1_Antitrypsin: {
          display: 'α1-Antitrypsin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270976003',
                display: 'Serum A1 antitrypsin measurement',
              },
            ],
            text: 'Serum A1 antitrypsin measurement',
          },
          cost: 0,
          performed: false,
        },

        alpha1_Microglobulin: {
          display: 'α1-Microglobulin',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '48413-9',
                display:
                  'Alpha-1-Microglobulin [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Alpha-1-Microglobulin [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },

        betta1_Microglobuline: {
          display: 'β1-Microglobuline',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166587008',
                display: 'Serum beta 2 microglobulin measurement',
              },
            ],
            text: 'Serum beta 2 microglobulin measurement',
          },
          cost: 0,
          performed: false,
        },

        APO_A1_Lipid: {
          display: 'APO A1 Lipid',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313768006',
                display: 'Serum apolipoprotein A-I measurement',
              },
            ],
            text: 'Serum apolipoprotein A-I measurement',
          },
          cost: 0,
          performed: false,
        },

        APO_B_Lipids: {
          display: 'APO B Lipids',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313770002',
                display: 'Serum apolipoprotein B measurement',
              },
            ],
            text: 'Serum apolipoprotein B measurement',
          },
          cost: 0,
          performed: false,
        },

        Ceruloplasmin: {
          display: 'Ceruloplasmin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270975004',
                display: 'Serum ceruloplasmin measurement',
              },
            ],
            text: 'Serum ceruloplasmin measurement',
          },
          cost: 0,
          performed: false,
        },

        Cholinesterase: {
          display: 'Cholinesterase',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313815007',
                display: 'Serum cholinesterase measurement',
              },
            ],
            text: 'Serum cholinesterase measurement',
          },
          cost: 0,
          performed: false,
        },

        HBDH: {
          display: 'HBDH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313960007',
                display: 'Serum hydroxybutyrate dehydrogenase measurement',
              },
            ],
            text: 'Serum hydroxybutyrate dehydrogenase measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
  },
}

module.exports = BiochemistryTests

const UncategorizedTests = {
  RapidTests: {
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '708099001',
          display: 'Rapid immunoassay technique',
        },
      ],
      text: 'Rapid immunoassay technique',
    },
    display: 'Rapid Test',
    include: {
      anti_HCV: {
        display: 'anti-HCV',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '64411004',
              display: 'Hepatitis C antibody measurement',
            },
          ],
          text: 'Hepatitis C antibody measurement',
        },
        cost: 5000,
      },
      HBsAg: {
        display: 'HBsAg',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '75408-5',
              display:
                'Hepatitis B virus e Ag [Presence] in Serum, Plasma or Blood by Rapid immunoassay',
            },
          ],
          text:
            'Hepatitis B virus e Ag [Presence] in Serum, Plasma or Blood by Rapid immunoassay',
        },
        cost: 5000,
      },
      HIV: {
        display: 'HIV',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '409788009',
              display:
                'Rapid human immunodeficiency virus type 1 antibody test',
            },
          ],
          text: 'Rapid human immunodeficiency virus type 1 antibody test',
        },
        cost: 8000,
      },
      Syphills: {
        display: 'Syphills',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '82191002',
              display: 'Syphilis test, qualitative',
            },
          ],
          text: 'Syphilis test, qualitative',
        },
        cost: 8000,
      },
      TPHA: {
        display: 'TPHA',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '269829001',
              display: 'Treponema pallidum hemaglutination test',
            },
          ],
          text: 'Treponema pallidum hemaglutination test',
        },
        cost: 0,
        performed: false,
      },
      RPR: {
        display: 'RPR',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '19869000',
              display: 'Rapid plasma reagin test',
            },
          ],
          text: 'Rapid plasma reagin test',
        },
        cost: 0,
        performed: false,
      },
    },
  },
  ViralLoadTests: {
    display: 'Viral Load Test',
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '395058002',
          display: 'Viral Load',
        },
      ],
      text: 'Viral Load',
    },
    include: {
      HCV_RNA: {
        display: 'HCV-RNA',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '122366001',
              display: 'Hepatitis C virus ribonucleic acid assay',
            },
          ],
          text: 'Hepatitis C virus ribonucleic acid assay',
        },
        cost: 120000,
        unit: '(IU/mL)',
      },
      HBV_DNA: {
        display: 'HBV-DNA',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '122335007',
              display:
                'Hepatitis B virus polymerase deoxyribonucleic acid assay',
            },
          ],
          text: 'Hepatitis B virus polymerase deoxyribonucleic acid assay',
        },
        cost: 120000,
        unit: '(IU/mL)',
      },
      HDV_RNA: {
        display: 'HDV-RNA',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '122368000',
              display: 'Hepatitis D virus ribonucleic acid assay',
            },
          ],
          text: 'Hepatitis D virus ribonucleic acid assay',
        },
        cost: 120000,
        unit: '(IU/mL)',
      },
      HIV_RNA: {
        display: 'HIV-RNA',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '117752001',
              display: 'Human immunodeficiency virus 1 ribonucleic acid assay',
            },
          ],
          text: 'Human immunodeficiency virus 1 ribonucleic acid assay',
        },
        cost: 0,
        performed: false,
      },
      HPV: {
        display: 'HPV',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '35904009',
              display: 'Human papillomavirus deoxyribonucleic acid detection',
            },
          ],
          text: 'Human papillomavirus deoxyribonucleic acid detection',
        },
        cost: 0,
        performed: false,
      },
    },
  },
  Genotype: {
    display: 'Genotype',
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '117591009',
          display: 'Infectious agent genotype identification',
        },
      ],
      text: 'Infectious agent genotype identification',
    },
    include: {
      HCV_Genotype: {
        display: 'HCV-Genotype',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '48575-5',
              display:
                'Hepatitis C virus genotype [Identifier] in Unspecified specimen by NAA with probe detection',
            },
          ],
          text:
            'Hepatitis C virus genotype [Identifier] in Unspecified specimen by NAA with probe detection',
        },
        cost: 0,
        performed: false,
      },
      HBV_Genotype: {
        display: 'HBV-Genotype',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '32366-7',
              display:
                'Hepatitis B virus genotype [Identifier] in Serum or Plasma by NAA with probe detection',
            },
          ],
          text:
            'Hepatitis B virus genotype [Identifier] in Serum or Plasma by NAA with probe detection',
        },
        cost: 0,
        performed: false,
      },
      HDV_Genotype: {
        display: 'HDV-Genotype',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '72606-7',
              display:
                'Hepatitis D virus genotype [Identifier] in Unspecified specimen by NAA with probe detection',
            },
          ],
          text:
            'Hepatitis D virus genotype [Identifier] in Unspecified specimen by NAA with probe detection',
        },
        cost: 0,
        performed: false,
      },
    },
  },
  OtherTests: {
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
    display: 'Other Tests',
    include: {
      Hematology: {
        display: 'Hematology',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '26604007',
              display: 'Complete blood count',
            },
          ],
          text: 'Complete blood count',
        },
        cost: 20000,
        include: {
          WBC: {
            display: 'WBC',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '767002',
                  display: 'White blood cell count (procedure)',
                },
              ],
              text: 'White blood cell count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.23 },
                  high: { value: 9.07 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.23 },
                  high: { value: 9.07 },
                },
              ],
            },
          },
          RBC: {
            display: 'RBC',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '14089001',
                  display: 'Red blood cell count (procedure)',
                },
              ],
              text: 'Red blood cell count (procedure)',
            },
            unit: '10⁶/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.63 },
                  high: { value: 6.08 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.63 },
                  high: { value: 6.08 },
                },
              ],
            },
          },
          HGB: {
            display: 'HGB',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '104142005',
                  display:
                    'Measurement of total hemoglobin concentration in plasma specimen (procedure)',
                },
              ],
              text:
                'Measurement of total hemoglobin concentration in plasma specimen (procedure)',
            },
            unit: 'g/L',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 137 },
                  high: { value: 175 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 137 },
                  high: { value: 175 },
                },
              ],
            },
          },
          HCT: {
            display: 'HCT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '28317006',
                  display: 'Hematocrit determination (procedure)',
                },
              ],
              text: 'Hematocrit determination (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 40.1 },
                  high: { value: 51.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 40.1 },
                  high: { value: 51.0 },
                },
              ],
            },
          },
          MCV: {
            display: 'MCV',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '104133003',
                  display:
                    'Erythrocyte mean corpuscular volume determination (procedure)',
                },
              ],
              text:
                'Erythrocyte mean corpuscular volume determination (procedure)',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 79.0 },
                  high: { value: 92.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 79.0 },
                  high: { value: 92.2 },
                },
              ],
            },
          },
          MCH: {
            display: 'MCH',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '54706004',
                  display:
                    'Mean corpuscular hemoglobin determination (procedure)',
                },
              ],
              text: 'Mean corpuscular hemoglobin determination (procedure)',
            },
            unit: 'pg',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 25.7 },
                  high: { value: 32.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 25.7 },
                  high: { value: 32.2 },
                },
              ],
            },
          },
          MCHC: {
            display: 'MCHC',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '37254006',
                  display:
                    'Mean corpuscular hemoglobin concentration determination (procedure)',
                },
              ],
              text:
                'Mean corpuscular hemoglobin concentration determination (procedure)',
            },
            unit: 'g/dL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 32.3 },
                  high: { value: 36.5 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 32.3 },
                  high: { value: 36.5 },
                },
              ],
            },
          },
          PLT: {
            display: 'PLT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '61928009',
                  display: 'Platelet count (procedure)',
                },
              ],
              text: 'Platelet count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 163.0 },
                  high: { value: 337.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 163.0 },
                  high: { value: 337.0 },
                },
              ],
            },
          },
          RDWsd: {
            display: 'RDW-SD',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000034',
                  display: 'Red cell distribution width - Standard deviation',
                },
              ],
              text: 'Red cell distribution width - Standard deviation',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 35.1 },
                  high: { value: 43.9 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 35.1 },
                  high: { value: 43.9 },
                },
              ],
            },
          },
          RDWcv: {
            display: 'RDW-CV',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000035',
                  display:
                    'Red cell distribution width - Coefficient of variation',
                },
              ],
              text: 'Red cell distribution width - Coefficient of variation',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 11.6 },
                  high: { value: 14.4 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 11.6 },
                  high: { value: 14.4 },
                },
              ],
            },
          },
          PDWcv: {
            display: 'PDW*',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000031',
                  display:
                    'Platelet distribution width - Coefficient of variation',
                },
              ],
              text: 'Platelet distribution width - Coefficient of variation',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 17.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 17.0 },
                },
              ],
            },
          },
          MPV: {
            display: 'MPV',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '75672003',
                  display: 'Platelet mean volume determination (procedure)',
                },
              ],
              text: 'Platelet mean volume determination (procedure)',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 13.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 13.0 },
                },
              ],
            },
          },

          PLCR: {
            display: 'P-LCR*',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000032',
                  display: 'Platelet large cell ratio',
                },
              ],
              text: 'Platelet large cell ratio',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 13.0 },
                  high: { value: 43.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 13.0 },
                  high: { value: 43.0 },
                },
              ],
            },
          },
          PCT: {
            display: 'PCT*',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '250314004',
                  display: 'Platelet hematocrit measurement (procedure)',
                },
              ],
              text: 'Platelet hematocrit measurement (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.17 },
                  high: { value: 0.35 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.17 },
                  high: { value: 0.35 },
                },
              ],
            },
          },
          Neutrophil: {
            display: 'Neutrophil#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '30630007',
                  display: 'Neutrophil count (procedure)',
                },
              ],
              text: 'Neutrophil count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.78 },
                  high: { value: 5.38 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.78 },
                  high: { value: 5.38 },
                },
              ],
            },
          },
          Lymphocyte: {
            display: 'Lymphocyte#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '74765001',
                  display: 'Lymphocyte count (procedure)',
                },
              ],
              text: 'Lymphocyte count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.32 },
                  high: { value: 3.57 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.32 },
                  high: { value: 3.57 },
                },
              ],
            },
          },
          Monocyte: {
            display: 'Monocyte#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '67776007',
                  display: 'Monocyte count (procedure)',
                },
              ],
              text: 'Monocyte count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.3 },
                  high: { value: 0.82 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.3 },
                  high: { value: 0.82 },
                },
              ],
            },
          },
          Eosinophil: {
            display: 'Eosinophil#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '71960002',
                  display: 'Eosinophil count (procedure)',
                },
              ],
              text: 'Eosinophil count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.04 },
                  high: { value: 0.54 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.04 },
                  high: { value: 0.54 },
                },
              ],
            },
          },
          Basophil: {
            display: 'Basophil#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '42351005',
                  display: 'Basophil count (procedure)',
                },
              ],
              text: 'Basophil count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.01 },
                  high: { value: 0.08 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.01 },
                  high: { value: 0.08 },
                },
              ],
            },
          },
          ImmatureGranulocyte: {
            display: 'Immature Granulocyte#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '726594001',
                  display: 'Immature granulocyte (cell)',
                },
              ],
              text: 'Immature granulocyte (cell)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.06 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.06 },
                },
              ],
            },
          },
          Neutrophil_Percentage: {
            display: 'Neutrophil %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271035003',
                  display: 'Neutrophil percent differential count (procedure)',
                },
              ],
              text: 'Neutrophil percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 34.0 },
                  high: { value: 67.9 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 34.0 },
                  high: { value: 67.9 },
                },
              ],
            },
          },

          Lymphocyte_Percentage: {
            display: 'Lymphocyte %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271036002',
                  display: 'Lymphocyte percent differential count (procedure)',
                },
              ],
              text: 'Lymphocyte percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 21.8 },
                  high: { value: 53.1 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 21.8 },
                  high: { value: 53.1 },
                },
              ],
            },
          },
          Monocyte_Percentage: {
            display: 'Monocyte %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271037006',
                  display: 'Monocyte percent differential count (procedure)',
                },
              ],
              text: 'Monocyte percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 5.3 },
                  high: { value: 12.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 5.3 },
                  high: { value: 12.2 },
                },
              ],
            },
          },
          Eosinophil_Percentage: {
            display: 'Eosinophil %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '310540006',
                  display: 'Eosinophil percent differential count (procedure)',
                },
              ],
              text: 'Eosinophil percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.8 },
                  high: { value: 7.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.8 },
                  high: { value: 7.0 },
                },
              ],
            },
          },
          Basophil_Percentage: {
            display: 'Basophil %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271038001',
                  display: 'Basophil percent differential count (procedure)',
                },
              ],
              text: 'Basophil percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.2 },
                  high: { value: 1.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.2 },
                  high: { value: 1.2 },
                },
              ],
            },
          },
          ImmatureGranulocyte_Percentage: {
            display: 'Immature granulocyte %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '726595000',
                  display:
                    'Population of all immature granulocytes in portion of fluid (body structure)',
                },
              ],
              text:
                'Population of all immature granulocytes in portion of fluid (body structure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.6 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.6 },
                },
              ],
            },
          },
          // MixedPercent: {
          //   display: 'MXD%',
          //   code: {
          //     coding: [
          //       {
          //         system: 'http://livercenter.mn/fhir',
          //         code: '30000036',
          //         display: 'Mixed Percent',
          //       },
          //     ],
          //     text: 'Mixed Percent',
          //   },
          //   unit: '%',
          //   referenceRange: {
          //     male: [
          //       {
          //         minAge: { year: 0, day: 0 },
          //         maxAge: { year: 200, day: 0 },
          //         low: { value: 8.0 },
          //         high: { value: 13.4 },
          //       },
          //     ],
          //     female: [
          //       {
          //         minAge: { year: 0, day: 0 },
          //         maxAge: { year: 200, day: 0 },
          //         low: { value: 8.0 },
          //         high: { value: 13.4 },
          //       },
          //     ],
          //   },
          // },
          // MixedCount: {
          //   display: 'MXD#',
          //   code: {
          //     coding: [
          //       {
          //         system: 'http://livercenter.mn/fhir',
          //         code: '30000037',
          //         display: 'Mixed Count',
          //       },
          //     ],
          //     text: 'Mixed Count',
          //   },
          //   unit: '10³/μl',
          //   referenceRange: {
          //     male: [
          //       {
          //         minAge: { year: 0, day: 0 },
          //         maxAge: { year: 200, day: 0 },
          //         low: { value: 0.6 },
          //         high: { value: 1.0 },
          //       },
          //     ],
          //     female: [
          //       {
          //         minAge: { year: 0, day: 0 },
          //         maxAge: { year: 200, day: 0 },
          //         low: { value: 0.6 },
          //         high: { value: 1.0 },
          //       },
          //     ],
          //   },
          // },
        },
      },
      HematologyOld: {
        display: 'Hematology',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '26604007',
              display: 'Complete blood count',
            },
          ],
          text: 'Complete blood count',
        },
        cost: 20000,
        include: {
          WBC: {
            display: 'WBC',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '767002',
                  display: 'White blood cell count (procedure)',
                },
              ],
              text: 'White blood cell count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.23 },
                  high: { value: 9.07 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.23 },
                  high: { value: 9.07 },
                },
              ],
            },
          },
          RBC: {
            display: 'RBC',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '14089001',
                  display: 'Red blood cell count (procedure)',
                },
              ],
              text: 'Red blood cell count (procedure)',
            },
            unit: '10⁶/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.63 },
                  high: { value: 6.08 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 4.63 },
                  high: { value: 6.08 },
                },
              ],
            },
          },
          HGB: {
            display: 'HGB',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '104142005',
                  display:
                    'Measurement of total hemoglobin concentration in plasma specimen (procedure)',
                },
              ],
              text:
                'Measurement of total hemoglobin concentration in plasma specimen (procedure)',
            },
            unit: 'g/L',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 137 },
                  high: { value: 175 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 137 },
                  high: { value: 175 },
                },
              ],
            },
          },
          HCT: {
            display: 'HCT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '28317006',
                  display: 'Hematocrit determination (procedure)',
                },
              ],
              text: 'Hematocrit determination (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 40.1 },
                  high: { value: 51.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 40.1 },
                  high: { value: 51.0 },
                },
              ],
            },
          },
          MCV: {
            display: 'MCV',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '104133003',
                  display:
                    'Erythrocyte mean corpuscular volume determination (procedure)',
                },
              ],
              text:
                'Erythrocyte mean corpuscular volume determination (procedure)',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 79.0 },
                  high: { value: 92.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 79.0 },
                  high: { value: 92.2 },
                },
              ],
            },
          },
          MCH: {
            display: 'MCH',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '54706004',
                  display:
                    'Mean corpuscular hemoglobin determination (procedure)',
                },
              ],
              text: 'Mean corpuscular hemoglobin determination (procedure)',
            },
            unit: 'pg',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 25.7 },
                  high: { value: 32.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 25.7 },
                  high: { value: 32.2 },
                },
              ],
            },
          },
          MCHC: {
            display: 'MCHC',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '37254006',
                  display:
                    'Mean corpuscular hemoglobin concentration determination (procedure)',
                },
              ],
              text:
                'Mean corpuscular hemoglobin concentration determination (procedure)',
            },
            unit: 'g/dL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 32.3 },
                  high: { value: 36.5 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 32.3 },
                  high: { value: 36.5 },
                },
              ],
            },
          },
          PLT: {
            display: 'PLT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '61928009',
                  display: 'Platelet count (procedure)',
                },
              ],
              text: 'Platelet count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 163.0 },
                  high: { value: 337.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 163.0 },
                  high: { value: 337.0 },
                },
              ],
            },
          },
          RDWsd: {
            display: 'RDW-SD',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000034',
                  display: 'Red cell distribution width - Standard deviation',
                },
              ],
              text: 'Red cell distribution width - Standard deviation',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 35.1 },
                  high: { value: 43.9 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 35.1 },
                  high: { value: 43.9 },
                },
              ],
            },
          },
          RDWcv: {
            display: 'RDW-CV',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000035',
                  display:
                    'Red cell distribution width - Coefficient of variation',
                },
              ],
              text: 'Red cell distribution width - Coefficient of variation',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 11.6 },
                  high: { value: 14.4 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 11.6 },
                  high: { value: 14.4 },
                },
              ],
            },
          },
          PDWcv: {
            display: 'PDW*',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000031',
                  display:
                    'Platelet distribution width - Coefficient of variation',
                },
              ],
              text: 'Platelet distribution width - Coefficient of variation',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 17.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 17.0 },
                },
              ],
            },
          },
          MPV: {
            display: 'MPV',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '75672003',
                  display: 'Platelet mean volume determination (procedure)',
                },
              ],
              text: 'Platelet mean volume determination (procedure)',
            },
            unit: 'fL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 13.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 9.0 },
                  high: { value: 13.0 },
                },
              ],
            },
          },

          PLCR: {
            display: 'P-LCR*',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000032',
                  display: 'Platelet large cell ratio',
                },
              ],
              text: 'Platelet large cell ratio',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 13.0 },
                  high: { value: 43.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 13.0 },
                  high: { value: 43.0 },
                },
              ],
            },
          },
          PCT: {
            display: 'PCT*',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '250314004',
                  display: 'Platelet hematocrit measurement (procedure)',
                },
              ],
              text: 'Platelet hematocrit measurement (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.17 },
                  high: { value: 0.35 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.17 },
                  high: { value: 0.35 },
                },
              ],
            },
          },
          Neutrophil: {
            display: 'Neutrophil#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '30630007',
                  display: 'Neutrophil count (procedure)',
                },
              ],
              text: 'Neutrophil count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.78 },
                  high: { value: 5.38 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.78 },
                  high: { value: 5.38 },
                },
              ],
            },
          },
          Lymphocyte: {
            display: 'Lymphocyte#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '74765001',
                  display: 'Lymphocyte count (procedure)',
                },
              ],
              text: 'Lymphocyte count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.32 },
                  high: { value: 3.57 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 1.32 },
                  high: { value: 3.57 },
                },
              ],
            },
          },
          Monocyte: {
            display: 'Monocyte#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '67776007',
                  display: 'Monocyte count (procedure)',
                },
              ],
              text: 'Monocyte count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.3 },
                  high: { value: 0.82 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.3 },
                  high: { value: 0.82 },
                },
              ],
            },
          },
          Eosinophil: {
            display: 'Eosinophil#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '71960002',
                  display: 'Eosinophil count (procedure)',
                },
              ],
              text: 'Eosinophil count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.04 },
                  high: { value: 0.54 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.04 },
                  high: { value: 0.54 },
                },
              ],
            },
          },
          Basophil: {
            display: 'Basophil#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '42351005',
                  display: 'Basophil count (procedure)',
                },
              ],
              text: 'Basophil count (procedure)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.01 },
                  high: { value: 0.08 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.01 },
                  high: { value: 0.08 },
                },
              ],
            },
          },
          ImmatureGranulocyte: {
            display: 'Immature Granulocyte#',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '726594001',
                  display: 'Immature granulocyte (cell)',
                },
              ],
              text: 'Immature granulocyte (cell)',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.06 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.06 },
                },
              ],
            },
          },
          Neutrophil_Percentage: {
            display: 'Neutrophil %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271035003',
                  display: 'Neutrophil percent differential count (procedure)',
                },
              ],
              text: 'Neutrophil percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 34.0 },
                  high: { value: 67.9 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 34.0 },
                  high: { value: 67.9 },
                },
              ],
            },
          },

          Lymphocyte_Percentage: {
            display: 'Lymphocyte %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271036002',
                  display: 'Lymphocyte percent differential count (procedure)',
                },
              ],
              text: 'Lymphocyte percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 21.8 },
                  high: { value: 53.1 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 21.8 },
                  high: { value: 53.1 },
                },
              ],
            },
          },
          Monocyte_Percentage: {
            display: 'Monocyte %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271037006',
                  display: 'Monocyte percent differential count (procedure)',
                },
              ],
              text: 'Monocyte percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 5.3 },
                  high: { value: 12.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 5.3 },
                  high: { value: 12.2 },
                },
              ],
            },
          },
          Eosinophil_Percentage: {
            display: 'Eosinophil %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '310540006',
                  display: 'Eosinophil percent differential count (procedure)',
                },
              ],
              text: 'Eosinophil percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.8 },
                  high: { value: 7.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.8 },
                  high: { value: 7.0 },
                },
              ],
            },
          },
          Basophil_Percentage: {
            display: 'Basophil %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271038001',
                  display: 'Basophil percent differential count (procedure)',
                },
              ],
              text: 'Basophil percent differential count (procedure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.2 },
                  high: { value: 1.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.2 },
                  high: { value: 1.2 },
                },
              ],
            },
          },
          ImmatureGranulocyte_Percentage: {
            display: 'Immature granulocyte %',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '726595000',
                  display:
                    'Population of all immature granulocytes in portion of fluid (body structure)',
                },
              ],
              text:
                'Population of all immature granulocytes in portion of fluid (body structure)',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.6 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.0 },
                  high: { value: 0.6 },
                },
              ],
            },
          },
          MixedPercent: {
            display: 'MXD%',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000036',
                  display: 'Mixed Percent',
                },
              ],
              text: 'Mixed Percent',
            },
            unit: '%',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 8.0 },
                  high: { value: 13.4 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 8.0 },
                  high: { value: 13.4 },
                },
              ],
            },
          },
          MixedCount: {
            display: 'MXD#',
            code: {
              coding: [
                {
                  system: 'http://livercenter.mn/fhir',
                  code: '30000037',
                  display: 'Mixed Count',
                },
              ],
              text: 'Mixed Count',
            },
            unit: '10³/μl',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.6 },
                  high: { value: 1.0 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.6 },
                  high: { value: 1.0 },
                },
              ],
            },
          },
        },
      },
      Vitamin_D3: {
        display: 'Vitamin D',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '1990-1',
              display:
                'Cholecalciferol (Vit D3) [Mass/volume] in Serum or Plasma',
            },
          ],
          text: 'Cholecalciferol (Vit D3) [Mass/volume] in Serum or Plasma',
        },
        referenceRange: {
          male: [
            {
              minAge: { year: 0, day: 0 },
              maxAge: { year: 200, day: 0 },
              interpretation: [
                {
                  type: 'CriticalLow',
                  min: -Infinity,
                  max: 10,
                },
                { type: 'Low', min: 10, max: 30 },
                { type: 'Normal', min: 30, max: 100 },
                { type: 'High', min: 100, max: Infinity },
              ],
            },
          ],
          female: [
            {
              minAge: { year: 0, day: 0 },
              maxAge: { year: 200, day: 0 },
              interpretation: [
                {
                  type: 'CriticalLow',
                  min: -Infinity,
                  max: 10,
                },
                { type: 'Low', min: 10, max: 30 },
                { type: 'Normal', min: 30, max: 100 },
                { type: 'High', min: 100, max: Infinity },
              ],
            },
          ],
        },
        unit: 'ng/ml',
        cost: 30000,
      },
      Anti_HDV: {
        display: 'Anti-HDV',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '61082006',
              display: 'Hepatitis D antibody measurement',
            },
          ],
          text: 'Hepatitis D antibody measurement',
        },
        cost: 25000,
      },
      Coagulation: {
        display: 'Coagulation',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '252278002',
              display: 'Coagulation pathway screening',
            },
          ],
          text: 'Coagulation pathway screening',
        },
        cost: 30000,
        include: {
          PT: {
            display: 'PT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '396451008',
                  display: 'Prothrombin time (procedure)',
                },
              ],
              text: 'Prothrombin time (procedure)',
            },
            unit: 'sec',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 11 },
                  high: { value: 15 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 11 },
                  high: { value: 15 },
                },
              ],
            },
          },
          INR: {
            display: 'INR',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '440685005',
                  display:
                    'Calculation of international normalized ratio (procedure)',
                },
              ],
              text: 'Calculation of international normalized ratio (procedure)',
            },
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.9 },
                  high: { value: 1.2 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 0.9 },
                  high: { value: 1.2 },
                },
              ],
            },
          },
          aPTT: {
            display: 'aPTT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '42525009',
                  display: 'Partial thromboplastin time, activated (procedure)',
                },
              ],
              text: 'Partial thromboplastin time, activated (procedure)',
            },
            unit: 'sec',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 26 },
                  high: { value: 36 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 26 },
                  high: { value: 36 },
                },
              ],
            },
          },
          TT: {
            display: 'TT',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '55323000',
                  display: 'Thrombin time (procedure)',
                },
              ],
              text: 'Thrombin time (procedure)',
            },
            unit: 'sec',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 14 },
                  high: { value: 21 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 14 },
                  high: { value: 21 },
                },
              ],
            },
          },
          Fibrinogen: {
            display: 'Fibrinogen',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '250192008',
                  display: 'Detection of fibrinogen (procedure)',
                },
              ],
              text: 'Detection of fibrinogen (procedure)',
            },
            unit: 'mg/dL',
            referenceRange: {
              male: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 200 },
                  high: { value: 400 },
                },
              ],
              female: [
                {
                  minAge: { year: 0, day: 0 },
                  maxAge: { year: 200, day: 0 },
                  low: { value: 200 },
                  high: { value: 400 },
                },
              ],
            },
          },
        },
      },
      Ferritin: {
        display: 'Ferritin',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '269821003',
              display: 'Serum ferritin measurement',
            },
          ],
          text: 'Serum ferritin measurement',
        },
        unit: 'ng/ml',
        cost: 25000,
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
                value: 20,
              },
              high: {
                value: 350,
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
                value: 10,
              },
              high: {
                value: 200,
              },
            },
          ],
        },
      },
      ESR: {
        display: 'ESR',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '416838001',
              display: 'Erythrocyte sedimentation rate measurement',
            },
          ],
          text: 'Erythrocyte sedimentation rate measurement',
        },
        cost: 0,
        performed: false,
      },
      Urinalysis: {
        display: 'Urinalysis',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '27171005',
              display: 'Urinalysis',
            },
          ],
          text: 'Urinalysis',
        },
        cost: 0,
        performed: false,
      },
      Sars_Cov2_IgG: {
        display: 'Sars-Cov 2-IgG',
        code: {
          coding: [
            {
              system: 'http://livercenter.mn/fhir',
              code: '30000040',
              display: 'Sars-Cov 2-IgG',
            },
          ],
          text: 'Sars-Cov 2-IgG',
        },
        referenceRange: {
          male: [
            {
              minAge: { year: 0, day: 0 },
              maxAge: { year: 200, day: 0 },
              interpretation: [
                {
                  type: 'Negative',
                  min: 0,
                  max: 1,
                },
                { type: 'Positive', min: 1, max: Infinity },
              ],
            },
          ],
          female: [
            {
              minAge: { year: 0, day: 0 },
              maxAge: { year: 200, day: 0 },
              interpretation: [
                {
                  type: 'Negative',
                  min: 0,
                  max: 1,
                },
                { type: 'Positive', min: 1, max: Infinity },
              ],
            },
          ],
        },
        cost: 50000,
      },
      Sars_Cov2_IgG_Elisa: {
        display: 'Sars-Cov 2-IgG Elisa',
        code: {
          coding: [
            {
              system: 'http://livercenter.mn/fhir',
              code: '30000041',
              display: 'Sars-Cov 2-IgG',
            },
          ],
          text: 'Sars-Cov 2-IgG',
        },
        referenceRange: {
          male: [
            {
              minAge: { year: 0, day: 0 },
              maxAge: { year: 200, day: 0 },
              interpretation: [
                {
                  type: 'Negative',
                  min: 0,
                  max: 1,
                },
                { type: 'Positive', min: 1, max: Infinity },
              ],
            },
          ],
          female: [
            {
              minAge: { year: 0, day: 0 },
              maxAge: { year: 200, day: 0 },
              interpretation: [
                {
                  type: 'Negative',
                  min: 0,
                  max: 1,
                },
                { type: 'Positive', min: 1, max: Infinity },
              ],
            },
          ],
        },
        cost: 40000,
      },
    },
  },
  IronExchange: {
    code: {
      coding: [
        {
          system: 'http://livercenter.mn/fhir',
          code: '30000038',
          display: 'Iron exchange',
        },
      ],
      text: 'Iron exchange',
    },
    display: 'Iron exchange',
    include: {
      ApolipoproteinB: {
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '26821000',
              display: 'Apolipoprotein B (substance)',
            },
          ],
        },
        display: 'Apolipoprotein B (substance)',
      },
      TotalIronBindingCapacityMeasurement: {
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '359979000',
              display: 'Total iron binding capacity measurement',
            },
          ],
        },
        display: 'Total iron binding capacity measurement',
      },
      TransferrinSaturationIndex: {
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '165730006',
              display: 'Transferrin saturation index',
            },
          ],
        },
        display: 'Transferrin saturation index',
      },
      Transferrin: {
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '359982005',
              display: 'Transferrin',
            },
          ],
        },
        display: 'Transferrin',
      },
      Ferritin: {
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '489004',
              display: 'Ferritin',
            },
          ],
        },
        display: 'Ferritin',
      },
      PlasmaIronLevel: {
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '390957006',
              display: 'Plasma iron level',
            },
          ],
        },
        display: 'Plasma iron level',
      },
    },
  },
}

module.exports = UncategorizedTests

const ImmunologyTests = {
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '252318005',
        display: 'Immunology laboratory test',
      },
    ],
    text: 'Immunology laboratory test',
  },
  display: 'Immunology',
  include: {
    Tumor_Markers: {
      display: 'Tumor markers',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '250724005',
            display: 'Tumor marker measurement',
          },
        ],
        text: 'Tumor marker measurement',
      },
      include: {
        AFP: {
          display: 'AFP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104404005',
                display: 'Alpha-1-fetoprotein measurement, serum',
              },
            ],
            text: 'Alpha-1-fetoprotein measurement, serum',
          },
          unit: 'ng/ml',
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
                  value: 10,
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
                  value: 10,
                },
              },
            ],
          },
          cost: 28000,
        },
        AFP_L3: {
          display: 'AFP L3',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '707213008',
                display: 'Alpha fetoprotein, L3',
              },
            ],
            text: 'Alpha fetoprotein, L3',
          },
          cost: 0,
          performed: false,
        },
        CA_125_II: {
          display: 'CA 125 II',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '83082-8',
                display:
                  'Cancer Ag 125 [Units/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Cancer Ag 125 [Units/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        CA_15_3: {
          display: 'CA 15-3',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '83083-6',
                display:
                  'Cancer Ag 15-3 [Units/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Cancer Ag 15-3 [Units/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        CA_19_9: {
          display: 'CA 19-9',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '83084-4',
                display:
                  'Cancer Ag 19-9 [Units/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Cancer Ag 19-9 [Units/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        CA_72_4: {
          display: 'CA 72-4',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '17843-4',
                display: 'Cancer Ag 72-4 [Units/volume] in Serum or Plasma',
              },
            ],
            text: 'Cancer Ag 72-4 [Units/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        CEA: {
          display: 'CEA',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '83085-1',
                display:
                  'Carcinoembryonic Ag [Mass/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Carcinoembryonic Ag [Mass/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        CYFRA_21_1: {
          display: 'CYFRA 21-1',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '25390-6',
                display: 'Cytokeratin 19 [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Cytokeratin 19 [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        free_PSA: {
          display: 'free PSA',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '83113-1',
                display:
                  'Prostate Specific Ag Free [Mass/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Prostate Specific Ag Free [Mass/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        NSE: {
          display: 'NSE',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '35785002',
                display: 'Neuron-specific enolase',
              },
            ],
            text: 'Neuron-specific enolase',
          },
          cost: 0,
          performed: false,
        },
        M2BPGi: {
          display: 'M2BPGi',
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir',
                code: '30000039',
                display: 'M2BPGi',
              },
            ],
            text: 'M2BPGi',
          },
          cost: 0,
          performed: false,
        },
        Total_PSA: {
          display: 'Total PSA',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '83112-3',
                display:
                  'Prostate specific Ag [Mass/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Prostate specific Ag [Mass/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        Pivka_II: {
          display: 'Pivka II',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '34444-0',
                display: 'Acarboxyprothrombin [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Acarboxyprothrombin [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
          unit: 'mAU/ml',
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
                  value: 40,
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
                  value: 40,
                },
              },
            ],
          },
        },
        ACP: {
          display: 'ACP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271233002',
                display: 'Serum acid phosphatase measurement',
              },
            ],
            text: 'Serum acid phosphatase measurement',
          },
          cost: 0,
          performed: false,
        },
        GLDH: {
          display: 'GLDH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271231000',
                display: 'Serum glutamate dehydrogenase measurement',
              },
            ],
            text: 'Serum glutamate dehydrogenase measurement',
          },
          cost: 0,
          performed: false,
        },
        TNF: {
          display: 'TNF',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '8612007',
                display: 'Tumor necrosis factor',
              },
            ],
            text: 'Tumor necrosis factor',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Infectious_Diseases: {
      display: 'Infectious Diseases',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '243790003',
            display: 'Infection screening',
          },
        ],
        text: 'Infection screening',
      },
      include: {
        HBeAg: {
          display: 'HBeAg',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313476009',
                display: 'Hepatitis B e antigen test',
              },
            ],
            text: 'Hepatitis B e antigen test',
          },
          unit: 'C.O.I',
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
                  value: 1,
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
                  value: 1,
                },
              },
            ],
          },
          cost: 40000,
        },
        HBsAg_quantification: {
          display: 'HBsAg quantification',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '30000004',
                display:
                  'Hepatitis B virus surface Ag in Serum or Plasma by Quantification method',
              },
            ],
            text:
              'Hepatitis B virus surface Ag in Serum or Plasma by Quantification method',
          },
          cost: 30000,
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
                  value: 0,
                },
                high: {
                  value: 0.03,
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
                  value: 0.03,
                },
              },
            ],
          },
        },

        Anti_Hbs: {
          display: 'Anti-Hbs',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '65911000',
                display: 'Hepatitis B surface antibody measurement',
              },
            ],
            text: 'Hepatitis B surface antibody measurement',
          },
          unit: 'mIU/ml',
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
                  value: 10,
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
                  value: 10,
                },
              },
            ],
          },
          cost: 25000,
        },
        Anti_HCV: {
          display: 'Anti-HCV quantification',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '30000003',
                display:
                  'Hepatitis C antibody measurement Quantification method',
              },
            ],
            text: 'Hepatitis C antibody measurement Quantification method',
          },
          unit: 'C.O.I',
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
                  value: 1,
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
                  value: 1,
                },
              },
            ],
          },
          cost: 30000,
        },
        HBsAg: {
          display: 'HBsAg',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '70154-0',
                display:
                  'Hepatitis B virus surface Ag in Serum or Plasma by Confirmatory method',
              },
            ],
            text:
              'Hepatitis B virus surface Ag in Serum or Plasma by Confirmatory method',
          },
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
                  value: 0,
                },
                high: {
                  value: 0.03,
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
                  value: 0.03,
                },
              },
            ],
          },
          cost: 30000,
        },
        Anti_IgE: {
          display: 'Anti-IgE',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '117194009',
                display: 'Anti-Immunoglobulin E antibody',
              },
            ],
            text: 'Anti-Immunoglobulin E antibody',
          },
          cost: 0,
          performed: false,
        },
        Anti_HAV_Total: {
          display: 'Anti-HAV Total',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104374007',
                display: 'Hepatitis A virus antibody, total measurement',
              },
            ],
            text: 'Hepatitis A virus antibody, total measurement',
          },
          cost: 0,
          performed: false,
        },
        Anti_HAV_IgM: {
          display: 'Anti-HAV IgM',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '88159009',
                display: 'Hepatitis A virus antibody, immunoglobulin M type',
              },
            ],
            text: 'Hepatitis A virus antibody, immunoglobulin M type',
          },
          cost: 0,
          performed: false,
        },
        Anti_HBc: {
          display: 'Anti-HBc',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '59582004',
                display: 'Hepatitis B core antibody measurement',
              },
            ],
            text: 'Hepatitis B core antibody measurement',
          },
          cost: 0,
          performed: false,
        },
        Anti_HBc_IgM: {
          display: 'Anti-HBc IgM',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '50506008',
                display:
                  'Hepatitis B core antibody measurement, immunoglobulin M type',
              },
            ],
            text:
              'Hepatitis B core antibody measurement, immunoglobulin M type',
          },
          cost: 0,
          performed: false,
        },
        Anti_Hbe: {
          display: 'Anti-Hbe',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '79172007',
                display: 'Hepatitis Be antibody measurement',
              },
            ],
            text: 'Hepatitis Be antibody measurement',
          },
          unit: 'Inh%',
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
                  value: 50,
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
                  value: 50,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        CMV_IgG: {
          display: 'CMV IgG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313604004',
                display:
                  'Cytomegalovirus immunoglobulin G antibody measurement',
              },
            ],
            text: 'Cytomegalovirus immunoglobulin G antibody measurement',
          },
          cost: 0,
          performed: false,
        },
        CMV_IgM: {
          display: 'CMV IgM',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104309001',
                display: 'Cytomegalovirus immunoglobulin M antibody assay',
              },
            ],
            text: 'Cytomegalovirus immunoglobulin M antibody assay',
          },
          cost: 0,
          performed: false,
        },
        CMV_IgG_Avidity: {
          display: 'CMV IgG Avidity',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '52984-2',
                display:
                  'Cytomegalovirus IgG Ab avidity [Ratio] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Cytomegalovirus IgG Ab avidity [Ratio] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        HSV_1_IgG: {
          display: 'HSV-1 IgG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '720053009',
                display: 'Immunoglobulin G antibody to Herpes simplex virus 1',
              },
            ],
            text: 'Immunoglobulin G antibody to Herpes simplex virus 1',
          },
          cost: 0,
          performed: false,
        },
        HSV_2_IgG: {
          display: 'HSV-2 IgG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '720055002',
                display: 'Immunoglobulin G antibody to Herpes simplex virus 2',
              },
            ],
            text: 'Immunoglobulin G antibody to Herpes simplex virus 2',
          },
          cost: 0,
          performed: false,
        },
        HIV_Antigen: {
          display: 'HIV Antigen',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '31676001',
                display: 'Human immunodeficiency virus antigen test',
              },
            ],
            text: 'Human immunodeficiency virus antigen test',
          },
          cost: 0,
          performed: false,
        },
        HIV_combi_Pt: {
          display: 'HIV combi Pt',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '710311002',
                display:
                  'Human immunodeficiency virus 1 and virus 2 antibodies and Human immunodeficiency virus 1 p24 antigen combination immunoassay',
              },
            ],
            text:
              'Human immunodeficiency virus 1 and virus 2 antibodies and Human immunodeficiency virus 1 p24 antigen combination immunoassay',
          },
          cost: 0,
          performed: false,
        },
        Rub_Ig_G: {
          display: 'Rub Ig G',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313670007',
                display: 'Rubella immunoglobulin G measurement',
              },
            ],
            text: 'Rubella immunoglobulin G measurement',
          },
          cost: 0,
          performed: false,
        },
        Rub_Ig_M: {
          display: 'Rub Ig M',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313670007',
                display: 'Rubella immunoglobulin G measurement',
              },
            ],
            text: 'Rubella immunoglobulin G measurement',
          },
          cost: 0,
          performed: false,
        },
        Toxo_Ig_G: {
          display: 'Toxo Ig G',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '315199001',
                display: 'Toxoplasma immunoglobulin G level',
              },
            ],
            text: 'Toxoplasma immunoglobulin G level',
          },
          cost: 0,
          performed: false,
        },
        Toxo_Ig_M: {
          display: 'Toxo Ig M',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104306008',
                display:
                  'Measurement of Toxoplasma species immunoglobulin M antibody',
              },
            ],
            text: 'Measurement of Toxoplasma species immunoglobulin M antibody',
          },
          cost: 0,
          performed: false,
        },
        HIV_Antigen_confirmatory: {
          display: 'HIV Antigen confirmatory',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '30000005',
                display:
                  'Human immunodeficiency virus antigen test Confirmatory method',
              },
            ],
            text:
              'Human immunodeficiency virus antigen test Confirmatory method',
          },
          cost: 0,
          performed: false,
        },
        HIV_combi: {
          display: 'HIV combi',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '30000006',
                display: 'Human immunodeficiency virus test combi',
              },
            ],
            text: 'Human immunodeficiency virus test combi',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Thyroid_Function: {
      display: 'Thyroid Function',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '35650009',
            display: 'Thyroid panel',
          },
        ],
        text: 'Thyroid panel',
      },
      cost: 0,
      performed: false,
      include: {
        Anti_TG: {
          display: 'Anti-TG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '17164004',
                display: 'Thyroglobulin antibody measurement',
              },
            ],
            text: 'Thyroglobulin antibody measurement',
          },
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
                  value: 0,
                },
                high: {
                  value: 115,
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
                  value: 115,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        Anti_TPO: {
          display: 'Anti-TPO',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '118002003',
                display: 'Measurement of thyroperoxidase antibody',
              },
            ],
            text: 'Measurement of thyroperoxidase antibody',
          },
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
                  value: 0,
                },
                high: {
                  value: 34,
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
                  value: 34,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        Anti_TSHR: {
          display: 'Anti-TSHR',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '54495009',
                display:
                  'Antibody to thyroid stimulating hormone receptor measurement',
              },
            ],
            text:
              'Antibody to thyroid stimulating hormone receptor measurement',
          },
          unit: 'U/l',
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
                  value: 1.5,
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
                  value: 1.5,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        Calcitonin: {
          display: 'Calcitonin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271230004',
                display: 'Serum calcitonin measurement',
              },
            ],
            text: 'Serum calcitonin measurement',
          },
          cost: 0,
          performed: false,
        },
        FT3: {
          display: 'FT3',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313836009',
                display: 'Serum free triiodothyronine measurement',
              },
            ],
            text: 'Serum free triiodothyronine measurement',
          },
          unit: 'pmol/l',
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
                  value: 3.1,
                },
                high: {
                  value: 6.8,
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
                  value: 3.1,
                },
                high: {
                  value: 6.8,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        FT4: {
          display: 'FT4',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313837000',
                display: 'Serum free T4 measurement',
              },
            ],
            text: 'Serum free T4 measurement',
          },
          unit: 'pmol/l',
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
                  value: 12,
                },
                high: {
                  value: 22,
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
                  value: 12,
                },
                high: {
                  value: 22,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        T3: {
          display: 'T3',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166324000',
                display: 'Serum T3 measurement',
              },
            ],
            text: 'Serum T3 measurement',
          },
          unit: 'nmol/l',
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
                  value: 1.3,
                },
                high: {
                  value: 3.1,
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
                  value: 1.3,
                },
                high: {
                  value: 3.1,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        T4: {
          display: 'T4',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166329005',
                display: 'Serum T4 measurement',
              },
            ],
            text: 'Serum T4 measurement',
          },
          unit: 'nmol/l',
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
                  value: 58.1,
                },
                high: {
                  value: 154.8,
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
                  value: 58.1,
                },
                high: {
                  value: 154.8,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        T_Uptake: {
          display: 'T-Uptake',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '275756004',
                display: 'T3 uptake test',
              },
            ],
            text: 'T3 uptake test',
          },
          cost: 0,
          performed: false,
        },
        Tg: {
          display: 'Tg',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '391378005',
                display: 'Serum thyroglobulin level',
              },
            ],
            text: 'Serum thyroglobulin level',
          },
          unit: 'ng/ml',
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
                  value: 1.4,
                },
                high: {
                  value: 78,
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
                  value: 1.4,
                },
                high: {
                  value: 78,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
        Tg_hs: {
          display: 'Tg hs',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '30000001',
                display: 'Serum thyroglobulin level highly sensitive',
              },
            ],
            text: 'Serum thyroglobulin level highly sensitive',
          },
          cost: 0,
          performed: false,
        },
        TSH: {
          display: 'TSH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313440008',
                display: 'Measurement of serum thyroid stimulating hormone',
              },
            ],
            text: 'Measurement of serum thyroid stimulating hormone',
          },
          unit: 'mIU/l',
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
                  value: 0.27,
                },
                high: {
                  value: 4.2,
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
                  value: 0.27,
                },
                high: {
                  value: 4.2,
                },
              },
            ],
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Cardiac_Function: {
      display: 'Cardiac function',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '74500006',
            display: 'Cardiac enzymes/isoenzymes measurement',
          },
        ],
        text: 'Cardiac enzymes/isoenzymes measurement',
      },
      cost: 0,
      performed: false,
      include: {
        CK_MB_mass: {
          display: 'CK-MB (mass)',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166672007',
                display: 'Serum creatine kinase MB isoenzyme measurement',
              },
            ],
            text: 'Serum creatine kinase MB isoenzyme measurement',
          },
          cost: 0,
          performed: false,
        },
        CK_MB_mass_STAT: {
          display: 'CK-MB (mass) STAT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166672007',
                display: 'Serum creatine kinase MB isoenzyme measurement',
              },
            ],
            text: 'Serum creatine kinase MB isoenzyme measurement',
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
        Myoglobin: {
          display: 'Myoglobin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '391573002',
                display: 'Serum myoglobin level',
              },
            ],
            text: 'Serum myoglobin level',
          },
          cost: 0,
          performed: false,
        },
        Myoglobin_STAT: {
          display: 'Myoglobin STAT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '391573002',
                display: 'Serum myoglobin level',
              },
            ],
            text: 'Serum myoglobin level',
          },
          cost: 0,
          performed: false,
        },
        NT_pro_BNP: {
          display: 'NT-pro BNP',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '33762-6',
                display:
                  'Natriuretic peptide.B prohormone N-Terminal [Mass/volume] in Serum or Plasma',
              },
            ],
            text:
              'Natriuretic peptide.B prohormone N-Terminal [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        TNT_I: {
          display: 'TNT-I',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313616005',
                display: 'Serum troponin I measurement',
              },
            ],
            text: 'Serum troponin I measurement',
          },
          cost: 0,
          performed: false,
        },
        Troponin_T: {
          display: 'Troponin T',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166794009',
                display: 'Serum troponin T measurement',
              },
            ],
            text: 'Serum troponin T measurement',
          },
          cost: 0,
          performed: false,
        },
        Troponin_T_hs: {
          display: 'Troponin T hs',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '67151-1',
                display:
                  'Troponin T.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method',
              },
            ],
            text:
              'Troponin T.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method',
          },
          cost: 0,
          performed: false,
        },
        Troponin_T_hs_STAT: {
          display: 'Troponin T hs STAT',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '67151-1',
                display:
                  'Troponin T.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method',
              },
            ],
            text:
              'Troponin T.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method',
          },
          cost: 0,
          performed: false,
        },
        Troponin_T_STAT: {
          display: 'Troponin T STAT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166794009',
                display: 'Serum troponin T measurement',
              },
            ],
            text: 'Serum troponin T measurement',
          },
          cost: 0,
          performed: false,
        },
        IMA: {
          display: 'IMA',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '75239-4',
                display: 'Albumin.ischemia modified [Units/volume] in Serum',
              },
            ],
            text: 'Albumin.ischemia modified [Units/volume] in Serum',
          },
          cost: 0,
          performed: false,
        },
      },
    },

    First_Trimester_Screening: {
      display: 'First trimester screening',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '88291001',
            display: 'Obstetric panel',
          },
        ],
        text: 'Obstetric panel',
      },
      include: {
        HCGInUrine: {
          display: 'HCG in urine',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '167376008',
                display: 'Urine chorionic gonadotrophin',
              },
            ],
            text: 'Urine chorionic gonadotrophin',
          },
          cost: 0,
          performed: false,
        },
        HCGInBlood: {
          display: 'HCG in blood',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '67900009',
                display: 'Human chorionic gonadotrophin',
              },
            ],
            text: 'Human chorionic gonadotrophin',
          },
          cost: 0,
          performed: false,
        },
        Free_beta_HCG: {
          display: 'Free beta HCG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313872002',
                display:
                  'Serum free beta human chorionic gonadotrophin measurement',
              },
            ],
            text: 'Serum free beta human chorionic gonadotrophin measurement',
          },
          cost: 0,
          performed: false,
        },
        PAPP_A: {
          display: 'PAPP-A',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '48407-1',
                display:
                  'Pregnancy associated plasma protein A [Mass/volume] in Serum or Plasma',
              },
            ],
            text:
              'Pregnancy associated plasma protein A [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        PIGF: {
          display: 'PIGF',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '74755-0',
                display: 'Placental growth factor [Mass/volume] in Serum',
              },
            ],
            text: 'Placental growth factor [Mass/volume] in Serum',
          },
          cost: 0,
          performed: false,
        },
        sFLT_1: {
          display: 'sFLT-1',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '74756-8',
                display:
                  'Soluble fms-like tyrosine kinase-1 [Mass/volume] in Serum',
              },
            ],
            text: 'Soluble fms-like tyrosine kinase-1 [Mass/volume] in Serum',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Anemia: {
      display: 'Anemia',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '171201007',
            display: 'Anemia screening',
          },
        ],
        text: 'Anemia screening',
      },
      include: {
        Folate: {
          display: 'Folate',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '60306005',
                display: 'Folic acid measurement, serum',
              },
            ],
            text: 'Folic acid measurement, serum',
          },
          cost: 0,
          performed: false,
        },
        RBC_Folate: {
          display: 'RBC Folate',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '69152001',
                display: 'Folic acid measurement, red blood cell',
              },
            ],
            text: 'Folic acid measurement, red blood cell',
          },
          cost: 0,
          performed: false,
        },
        Vitamin_B12: {
          display: 'Vitamin B12',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271216009',
                display: 'Serum vitamin B12 measurement',
              },
            ],
            text: 'Serum vitamin B12 measurement',
          },
          cost: 0,
          performed: false,
        },
        UIBC: {
          display: 'UIBC',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '415796002',
                display: 'Unsaturated iron binding capacity measurement',
              },
            ],
            text: 'Unsaturated iron binding capacity measurement',
          },
          cost: 0,
          performed: false,
        },
        TIBC: {
          display: 'TIBC',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271027001',
                display: 'Serum total iron binding capacity measurement',
              },
            ],
            text: 'Serum total iron binding capacity measurement',
          },
          cost: 0,
          performed: false,
        },
        Transferrin: {
          display: 'Transferrin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '359982005',
                display: 'Serum transferrin measurement',
              },
            ],
            text: 'Serum transferrin measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Bone_Markers: {
      display: 'Bone markers',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '167036008',
            display: 'Bone profile',
          },
        ],
        text: 'Bone profile',
      },
      cost: 0,
      performed: false,
      include: {
        Intact_PTH: {
          display: 'Intact PTH',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2731-8',
                display: 'Parathyrin.intact [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Parathyrin.intact [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        N_MID_Osteocalcin: {
          display: 'N-MID Osteocalcin',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2697-1',
                display: 'Osteocalcin [Mass/volume] in Serum or Plasma',
              },
            ],
            text: 'Osteocalcin [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        P1NP: {
          display: 'P1NP',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '77370-5',
                display:
                  'Procollagen type I.N-terminal propeptide [Mass/volume] in Serum or Plasma by Immunoassay',
              },
            ],
            text:
              'Procollagen type I.N-terminal propeptide [Mass/volume] in Serum or Plasma by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
        PTH_STAT: {
          display: 'PTH-STAT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271541003',
                display: 'Serum parathyroid hormone measurement',
              },
            ],
            text: 'Serum parathyroid hormone measurement',
          },
          cost: 0,
          performed: false,
        },
        Beta_CrossLaps: {
          display: 'Beta-CrossLaps',
          code: {
            coding: [
              {
                system:
                  'http://livercenter.mn/fhir/ValueSet/laboratory-test-codes',
                code: '1990-1',
                display: 'Beta-CrossLaps',
              },
            ],
            text: 'Beta-CrossLaps',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Rheumatoid_Arthritis: {
      display: 'Rheumatoid arthritis',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '171239004',
            display: 'Rheumatoid arthritis screening',
          },
        ],
        text: 'Rheumatoid arthritis screening',
      },
      cost: 0,
      performed: false,
      include: {
        Anti_CCP: {
          display: 'Anti-CCP',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '32218-0',
                display:
                  'Cyclic citrullinated peptide Ab [Units/volume] in Serum by Immunoassay',
              },
            ],
            text:
              'Cyclic citrullinated peptide Ab [Units/volume] in Serum by Immunoassay',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Auto_Immune_Markers: {
      display: 'Auto-immune markers',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '165877005',
            display: 'Autoimmunity profile',
          },
        ],
        text: 'Autoimmunity profile',
      },
      cost: 0,
      performed: false,
      include: {
        ANAs: {
          display: 'ANAs',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '359788000',
                display: 'Antinuclear antibody measurement',
              },
            ],
            text: 'Antinuclear antibody measurement',
          },
          cost: 0,
          performed: false,
        },
        AMAs: {
          display: 'AMAs',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '104328008',
                display: 'Antibody to mitochondria measurement',
              },
            ],
            text: 'Antibody to mitochondria measurement',
          },
          cost: 0,
          performed: false,
        },
        LKM_1: {
          display: 'LKM-1',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '32220-6',
                display: 'Liver kidney microsomal 1 Ab [Units/volume] in Serum',
              },
            ],
            text: 'Liver kidney microsomal 1 Ab [Units/volume] in Serum',
          },
          cost: 0,
          performed: false,
        },
        LC_1: {
          display: 'LC-1',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '34621-3',
                display: 'Liver cytosol Ab [Units/volume] in Serum',
              },
            ],
            text: 'Liver cytosol Ab [Units/volume] in Serum',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Fertility_Hormones: {
      display: 'Fertility/Hormones',
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '395117007',
            display: 'Infertility studies',
          },
        ],
        text: 'Infertility studies',
      },
      include: {
        InhibinB: {
          display: 'Inhibin B',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '414499000',
                display: 'Inhibin B',
              },
            ],
            text: 'Inhibin B',
          },
          cost: 0,
          performed: false,
        },
        ACTH: {
          display: 'ACTH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271536006',
                display: 'Measurement of serum adrenocorticotropic hormone',
              },
            ],
            text: 'Measurement of serum adrenocorticotropic hormone',
          },
          cost: 0,
          performed: false,
        },
        C_Peptide: {
          display: 'C-Peptide',
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
        Cortisol: {
          display: 'Cortisol',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271535005',
                display: 'Serum cortisol measurement',
              },
            ],
            text: 'Serum cortisol measurement',
          },
          cost: 0,
          performed: false,
        },
        DHEA_s: {
          display: 'DHEA-s',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166468004',
                display: 'Serum dehydroepiandrosterone measurement',
              },
            ],
            text: 'Serum dehydroepiandrosterone measurement',
          },
          cost: 0,
          performed: false,
        },
        Estradiol: {
          display: 'Estradiol',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166448005',
                display: 'Serum estradiol measurement',
              },
            ],
            text: 'Serum estradiol measurement',
          },
          cost: 0,
          performed: false,
        },
        FSH: {
          display: 'FSH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '273971007',
                display: 'Serum follicle stimulating hormone measurement',
              },
            ],
            text: 'Serum follicle stimulating hormone measurement',
          },
          cost: 0,
          performed: false,
        },
        HCG_Beta_II: {
          display: 'HCG+Beta II',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55869-2',
                display:
                  'Choriogonadotropin.beta subunit [Mass/volume] in Serum or Plasma',
              },
            ],
            text:
              'Choriogonadotropin.beta subunit [Mass/volume] in Serum or Plasma',
          },
          cost: 0,
          performed: false,
        },
        HCG_STAT: {
          display: 'HCG STAT',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '167037004',
                display:
                  'Measurement of serum total human chorionic gonadotropin',
              },
            ],
            text: 'Measurement of serum total human chorionic gonadotropin',
          },
          cost: 0,
          performed: false,
        },
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
        LH: {
          display: 'LH',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '273969007',
                display: 'Serum luteinizing hormone measurement',
              },
            ],
            text: 'Serum luteinizing hormone measurement',
          },
          cost: 0,
          performed: false,
        },
        Progesterone: {
          display: 'Progesterone',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270972001',
                display: 'Serum progesterone measurement',
              },
            ],
            text: 'Serum progesterone measurement',
          },
          cost: 0,
          performed: false,
        },
        Prolactin: {
          display: 'Prolactin',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '313442000',
                display: 'Serum prolactin measurement',
              },
            ],
            text: 'Serum prolactin measurement',
          },
          cost: 0,
          performed: false,
        },
        SHBG: {
          display: 'SHBG',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '166585000',
                display: 'Serum sex hormone binding globulin measurement',
              },
            ],
            text: 'Serum sex hormone binding globulin measurement',
          },
          cost: 0,
          performed: false,
        },
        Testosterone: {
          display: 'Testosterone',
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '270973006',
                display: 'Serum testosterone measurement',
              },
            ],
            text: 'Serum testosterone measurement',
          },
          cost: 0,
          performed: false,
        },
      },
    },
    Critical_Care: {
      display: 'Critical care',
      code: {
        coding: [
          {
            code: '408478003',
            system: 'http://snomed.info/sct',
            display: 'Critical care medicine (qualifier value)',
          },
        ],
        text: 'Critical care medicine (qualifier value)',
      },
      cost: 0,
      performed: false,
      include: {
        IL_6: {
          display: 'IL-6',
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
        S100: {
          display: 'S100',
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '47275-3',
                display:
                  'S100 calcium binding protein B [Mass/volume] in Serum',
              },
            ],
            text: 'S100 calcium binding protein B [Mass/volume] in Serum',
          },
          cost: 0,
          performed: false,
        },
      },
    },
  },
}

module.exports = ImmunologyTests

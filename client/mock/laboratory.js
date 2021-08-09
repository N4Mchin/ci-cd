import { Mock, Constant } from './_utils'

const { ApiPrefix } = Constant

const ServiceRequestList = Mock.mock({
  resourceType: 'Bundle',
  id: 'searchset_response',
  meta: {
    lastUpdated: '2019-11-26T09:42:44.223Z',
  },
  type: 'searchset',
  contained: [
    {
      resourceType: 'Patient',
      id: '3499243190',
      name: [
        {
          use: 'official',
          text: 'Овог3 Нэр3',
          given: ['Нэр3'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог3',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '00000017',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen001',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/3499243190',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2015-08-16T06:40:17Z',
      },
    },
  ],
  entry: [
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'draft',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'routine',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '166312007',
              display: 'Blood chemistry',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'active',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'routine',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '166312007',
              display: 'Blood chemistry',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'active',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'stat',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '395058002',
              display: 'Viral Load',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'completed',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'routine',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '166312007',
              display: 'Blood chemistry',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'on-hold',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'routine',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '166312007',
              display: 'Blood chemistry',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'revoked',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'routine',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '166312007',
              display: 'Blood chemistry',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/3860207119',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-26T09:42:44.223Z',
        },
        resourceType: 'ServiceRequest',
        status: 'unknown',
        intent: 'order',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        priority: 'routine',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '166312007',
              display: 'Blood chemistry',
            },
          ],
        },
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '3860207119',
      },
      search: {
        mode: 'match',
      },
    },
  ],
})

const ViralLoadTests = Mock.mock({
  resourceType: 'Bundle',
  id: 'searchset_response',
  meta: {
    lastUpdated: '2019-11-26T09:42:44.223Z',
  },
  type: 'searchset',
  contained: [
    {
      resourceType: 'Patient',
      id: '3499243190',
      name: [
        {
          use: 'official',
          text: 'Овог3 Нэр3',
          given: ['Нэр3'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог3',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '00000017',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen001',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/3499243190',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2015-08-16T06:40:17Z',
      },
    },
    {
      resourceType: 'Patient',
      id: '1539913844',
      name: [
        {
          use: 'official',
          text: 'Овог2 Нэр2',
          given: ['Нэр2'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог2',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '00000017',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen001',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/3499243190',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2015-08-16T06:40:17Z',
      },
    },
  ],
  entry: [
    {
      fullUrl: 'http://localhost:3335/api/undefined/1342901188',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-21T11:14:10.302Z',
        },
        resourceType: 'ServiceRequest',
        status: 'draft',
        intent: 'order',
        priority: 'routine',
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
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/3499243190',
        },
        authoredOn: '2019-11-21T19:14:07+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/2531781648',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574334847431',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000017',
          },
        ],
        id: '1342901188',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/api/undefined/811789311',
      resource: {
        meta: {
          profile: [],
          versionId: '1',
          lastUpdated: '2019-11-28T04:19:58.603Z',
        },
        resourceType: 'ServiceRequest',
        status: 'draft',
        intent: 'order',
        priority: 'routine',
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
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/1539913844',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/1396604943',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '00000016',
          },
        ],
        id: '811789311',
      },
      search: {
        mode: 'match',
      },
    },
  ],
})

const RapidTests = Mock.mock({
  resourceType: 'Bundle',
  id: 'searchset_response',
  meta: {
    lastUpdated: '2019-11-26T09:42:44.223Z',
  },
  type: 'searchset',
  contained: [
    {
      resourceType: 'Patient',
      id: 'patient001',
      name: [
        {
          use: 'official',
          text: 'Овог1 Нэр1',
          given: ['Нэр1'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог1',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '0000001',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen001',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/patient001',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2019-12-09T11:40:17Z',
      },
    },
    {
      resourceType: 'Patient',
      id: 'patient002',
      name: [
        {
          use: 'official',
          text: 'Овог2 Нэр2',
          given: ['Нэр2'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог2',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '0000002',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen002',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/patient002',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2019-12-09T12:40:17Z',
      },
    },
    {
      resourceType: 'Patient',
      id: 'patient003',
      name: [
        {
          use: 'official',
          text: 'Овог3 Нэр3',
          given: ['Нэр3'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог3',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '0000003',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen003',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/patient003',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2019-12-09T13:40:17Z',
      },
    },
    {
      resourceType: 'Patient',
      id: 'patient004',
      name: [
        {
          use: 'official',
          text: 'Овог4 Нэр4',
          given: ['Нэр4'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог4',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '0000004',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen004',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/patient004',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2019-12-09T14:40:17Z',
      },
    },
    {
      resourceType: 'Patient',
      id: 'patient005',
      name: [
        {
          use: 'official',
          text: 'Овог5 Нэр5',
          given: ['Нэр5'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог5',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '0000005',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen005',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/patient005',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2019-12-09T15:40:17Z',
      },
    },
    {
      resourceType: 'Patient',
      id: 'patient006',
      name: [
        {
          use: 'official',
          text: 'Овог6 Нэр6',
          given: ['Нэр6'],
          extension: [
            {
              url:
                'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
              valueString: 'Овог6',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'http://livercenter.mn/barcode',
          value: '0000006',
        },
      ],
    },
    {
      resourceType: 'Specimen',
      id: 'specimen006',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '119364003',
            display: 'Serum sample',
          },
        ],
      },
      subject: {
        reference: 'Patient/patient006',
      },
      request: [
        {
          reference: 'ServiceRequest/3860207119',
        },
      ],
      collection: {
        collector: {
          reference: 'Practitioner/f202',
        },
        collectedDateTime: '2019-12-09T16:40:17Z',
      },
    },
    {
      resourceType: 'Observation',
      id: 'observation006',
      identifier: [
        {
          use: 'official',
          system: 'http://www.bmc.nl/zorgportal/identifiers/observations',
          value: '6327',
        },
      ],
      status: 'final',
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
      subject: {
        reference: 'Patient/patient006',
        display: 'P. van de Heuvel',
      },
      issued: '2013-04-05T15:30:10+01:00',
      performer: [
        {
          reference: 'Practitioner/f005',
          display: 'A. Langeveld',
        },
      ],
      valueCodeableConcept: {
        system: 'http://snomed.info/sct',
        code: '10828004',
        display: 'positive',
      },
    },
  ],
  entry: [
    {
      fullUrl: 'http://localhost:3335/ServiceRequest/serviceRequest001',
      resource: {
        resourceType: 'ServiceRequest',
        id: 'serviceRequest001',
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
        status: 'draft',
        intent: 'order',
        priority: 'routine',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/patient001',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/serviceRequest000',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '0000001',
          },
        ],
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/ServiceRequest/serviceRequest002',
      resource: {
        resourceType: 'ServiceRequest',
        id: 'serviceRequest002',
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
        status: 'draft',
        intent: 'order',
        priority: 'routine',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/patient002',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/serviceRequest002',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '0000002',
          },
        ],
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/ServiceRequest/serviceRequest003',
      resource: {
        resourceType: 'ServiceRequest',
        id: 'serviceRequest003',
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
        status: 'draft',
        intent: 'order',
        priority: 'routine',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/patient003',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/serviceRequest003',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '0000003',
          },
        ],
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/ServiceRequest/serviceRequest004',
      resource: {
        resourceType: 'ServiceRequest',
        id: 'serviceRequest004',
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
        status: 'draft',
        intent: 'order',
        priority: 'routine',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/patient004',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/serviceRequest004',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '0000004',
          },
        ],
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/ServiceRequest/serviceRequest005',
      resource: {
        resourceType: 'ServiceRequest',
        id: 'serviceRequest005',
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
        status: 'draft',
        intent: 'order',
        priority: 'routine',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/patient5',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/serviceRequest005',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '0000005',
          },
        ],
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl: 'http://localhost:3335/ServiceRequest/serviceRequest006',
      resource: {
        resourceType: 'ServiceRequest',
        id: 'serviceRequest006',
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
        status: 'draft',
        intent: 'order',
        priority: 'routine',
        category: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '108252007',
                display: 'Laboratory procedure',
              },
            ],
            text: 'Laboratory procedure',
          },
        ],
        subject: {
          reference: 'Patient/patient006',
        },
        authoredOn: '2019-11-28T12:19:57+08:00',
        basedOn: [
          {
            reference: 'ServiceRequest/serviceRequest006',
          },
        ],
        requisition: {
          use: 'usual',
          system:
            'http://livercenter.mn/fhir/identifiers/service-request-requisition',
          value: '1574914797877',
        },
        identifier: [
          {
            use: 'usual',
            system: 'http://livercenter.mn/fhir/identifiers/barcode',
            value: '0000006',
          },
        ],
      },
      search: {
        mode: 'match',
      },
    },
  ],
})

module.exports = {
  [`GET ${ApiPrefix}/serviceRequest`](req, res) {
    console.log('query', req.query)

    if (req.query) {
      if (req.query.code === 'http://snomed.info/sct|122366001') {
        setTimeout(() => {
          res.json({ data: ViralLoadTests })
        }, 1000)
      } else if (
        req.query._include ===
        'ServiceRequest:subject&_include=ServiceRequest:specimen'
      ) {
        setTimeout(() => {
          res.json({ data: ServiceRequestList })
        }, 1000)
      }
    } else if (
      req.query === 'ServiceRequest:subject&_include=ServiceRequest:specimen'
    ) {
      setTimeout(() => {
        res.status(404).send()
      }, 1000)
    }
    else {
      /* setTimeout(() => {
           res.json({ data: ServiceRequestList })
         }, 1000)
         */
    }
  },
}

const BodySites = [
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire body as a whole',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Бүх бие',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '38266002',
          display: 'Entire body as a whole',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Skin structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьс',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '39937001',
          display: 'Skin structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Skeletal and/or smooth muscle structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Булчин',
      },
    ],
    code: {
      coding: [
        {
          code: '71616004',
          display: 'Skeletal and/or smooth muscle structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Head part',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Толгой',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '123850002',
          display: 'Head part',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both ears',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр чих',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '34338003',
          display: 'Both ears',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Face structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүүр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '89545001',
          display: 'Face structure',
        },
      ],
    },
  },

  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both eyes, entire',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '362508001',
          display: 'Both eyes, entire',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Right eye structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун нүд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '18944008',
          display: 'Right eye structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Left eye structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн нүд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '8966001',
          display: 'Left eye structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire choroid of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний судаслаг бүрхүүл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '368840004',
          display: 'Entire choroid of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire cornea of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний эвэрлэг',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '368821005',
          display: 'Entire cornea of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of iris of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний солонгон бүрхүүл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '87490001',
          display: 'Structure of iris of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire lens of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний болор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '306719005',
          display: 'Entire lens of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire pupil of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний хүүхэн хараа',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '368838009',
          display: 'Entire pupil of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire retina of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний торлог бүрхүүл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '368845009',
          display: 'Entire retina of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of conjunctiva of both eyes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр нүдний салст',
      },
    ],
    code: {
      coding: [
        {
          code: '55654005',
          display: 'Structure of conjunctiva of both eyes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of conjunctiva of right eye',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун нүдний салст',
      },
    ],
    code: {
      coding: [
        {
          code: '13014005',
          display: 'Structure of conjunctiva of right eye',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of conjunctiva of left eye',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн нүдний салст',
      },
    ],
    code: {
      coding: [
        {
          code: '67548002',
          display: 'Structure of conjunctiva of left eye',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nose part',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '120578006',
          display: 'Nose part',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Gingival part',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Буйл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '119209009',
          display: 'Gingival part',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of oropharynx and/or hypopharynx and/or larynx',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоолой',
      },
    ],
    code: {
      coding: [
        {
          code: '716151000',
          display: 'Structure of oropharynx and/or hypopharynx and/or larynx',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Neck structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хүзүү',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '45048000',
          display: 'Neck structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Thoracic structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Цээж',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '51185008',
          display: 'Thoracic structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both breasts',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр хөх',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '63762007',
          display: 'Both breasts',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire interscapular region of back',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр далны хооронд',
      },
    ],
    code: {
      coding: [
        {
          code: '362670000',
          display: 'Entire interscapular region of back',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bone structure of scapula',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Дал',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '79601000',
          display: 'Bone structure of scapula',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire scapular region',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Далны орчим',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '182345000',
          display: 'Entire scapular region',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Shoulder region structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мөр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '16982005',
          display: 'Shoulder region structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of right shoulder region',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун мөр',
      },
    ],
    code: {
      coding: [
        { code: '91774008', display: 'Structure of right shoulder region' },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of left shoulder region',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн мөр',
      },
    ],
    code: {
      coding: [
        { code: '91775009', display: 'Structure of left shoulder region' },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Glenohumeral joint structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мөрний үе',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '85537004',
          display: 'Glenohumeral joint structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of right glenohumeral joint',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун мөрний үе',
      },
    ],
    code: {
      coding: [
        {
          code: '720593001',
          display: 'Structure of right glenohumeral joint',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of left glenohumeral joint',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн мөрний үе',
      },
    ],
    code: {
      coding: [
        {
          code: '720592006',
          display: 'Structure of left glenohumeral joint',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both upper arms',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр гарын бугалга',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '69273007',
          display: 'Both upper arms',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Right upper arm structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун гарын бугалга',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '368209003',
          display: 'Right upper arm structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Left upper arm structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн гарын бугалга',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '368208006',
          display: 'Left upper arm structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Palm (region) structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гарын алга',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '21547004',
          display: 'Palm (region) structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Upper arm structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр гар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '40983000',
          display: 'Upper arm structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire right upper arm',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун гар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '59126009',
          display: 'Entire right upper arm',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire left upper arm',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн гар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '72098002',
          display: 'Entire left upper arm',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both upper extremities',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр гар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '88650009',
          display: 'Both upper extremities',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both forearms',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр гарын шуу',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '9055004',
          display: 'Both forearms',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both hands',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр гарын сарвуу',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '12861001',
          display: 'Both hands',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of right upper quadrant of abdomen',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун хавирганы нум',
      },
    ],
    code: {
      coding: [
        {
          code: '50519007',
          display: 'Structure of right upper quadrant of abdomen',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of left upper quadrant of abdomen',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн хавирганы нум',
      },
    ],
    code: {
      coding: [
        {
          code: '86367003',
          display: 'Structure of left upper quadrant of abdomen',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Epigastric region structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Аюулхай',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '27947004',
          display: 'Epigastric region structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both lungs',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр уушги',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '74101002',
          display: 'Both lungs',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Abdominopelvic structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэвлий',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '113345001',
          display: 'Abdominopelvic structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Lower abdomen structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэвлийн доод хэсэг',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '27033000',
          display: 'Lower abdomen structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both kidneys',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр бөөр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '17373004',
          display: 'Both kidneys',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both ovaries',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр өндгөвч',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '83238006',
          display: 'Both ovaries',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Renal area (surface region)',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Бөөрний орчим',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '243968009',
          display: 'Renal area (surface region)',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire urinary bladder',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Давсаг',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '302512001',
          display: 'Entire urinary bladder',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both testes',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр төмсөг',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '42774007',
          display: 'Both testes',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bilateral hip joint',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр ташааны үе',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '304909008',
          display: 'Bilateral hip joint',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both thighs',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр ташаа',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '57172001',
          display: 'Both thighs',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both lower extremities',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр хөл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '4180000',
          display: 'Both lower extremities',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of right lower limb',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун хөл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '62175007',
          display: 'Structure of right lower limb',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of left lower limb',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн хөл',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '32153003',
          display: 'Structure of left lower limb',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both thighs',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр гуя',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '57172001',
          display: 'Both thighs',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of right thigh',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун гуя',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '11207009',
          display: 'Structure of right thigh',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of left thigh',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн гуя',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '61396006',
          display: 'Structure of left thigh',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of medial surface of thigh',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гуяны дотор тал',
      },
    ],
    code: {
      coding: [
        {
          code: '45180001',
          display: 'Structure of medial surface of thigh',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both knees',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр өвдөг',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '36701003',
          display: 'Both knees',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bilateral knee joints',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр өвдөгний үе',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '304913001',
          display: 'Bilateral knee joints',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of below knee region',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Өвдөгнөөс доош',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '8289001',
          display: 'Structure of below knee region',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both lower legs',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр хөлийн шилбэ',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '40927001',
          display: 'Both lower legs',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire right lower leg',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун хөлийн шилбэ',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '213289002',
          display: 'Entire right lower leg',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire left lower leg',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн хөлийн шилбэ',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '213384005',
          display: 'Entire left lower leg',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both feet',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр хөлийн тавхай',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '8580001',
          display: 'Both feet',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire right foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун хөлийн тавхай',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '239830003',
          display: 'Entire right foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entire left foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн хөлийн тавхай',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '239919000',
          display: 'Entire left foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of dorsum of foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хөлийн магнай',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '2402003',
          display: 'Structure of dorsum of foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of sole of foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хөлийн ул',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '57999000',
          display: 'Structure of sole of foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of skin of sole of right foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун хөлийн ул',
      },
    ],
    code: {
      coding: [
        {
          code: '761975003',
          display: 'Structure of skin of sole of right foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of skin of sole of left foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн хөлийн ул',
      },
    ],
    code: {
      coding: [
        {
          code: '761974004',
          display: 'Structure of skin of sole of left foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Part of toe of foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр хөлийн хуруунууд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '732938000',
          display: 'Part of toe of foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of all toes of right foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Баруун хөлийн хуруунууд',
      },
    ],
    code: {
      coding: [
        {
          code: '785709003',
          display: 'Structure of all toes of right foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Structure of all toes of left foot',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүүн хөлийн хуруунууд',
      },
    ],
    code: {
      coding: [
        {
          code: '785708006',
          display: 'Structure of all toes of left foot',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Both ankles',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоёр хөлийн шагай',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '69948000',
          display: 'Both ankles',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bone part',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Яс',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '119186007',
          display: 'Bone part',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Joint structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үе мөч',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '39352004',
          display: 'Joint structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Back structure, excluding neck',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нуруу',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '77568009',
          display: 'Back structure, excluding neck',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Lower back structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нурууны доод хэсэг',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '37822005',
          display: 'Lower back structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chin structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Эрүү',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '30291003',
          display: 'Chin structure',
        },
      ],
    },
  },
  {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Blood vessel structure',
      },

      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Судас',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '59820001',
          display: 'Blood vessel structure',
        },
      ],
    },
  },
]

module.exports = BodySites

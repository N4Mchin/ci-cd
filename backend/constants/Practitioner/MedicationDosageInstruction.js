const MedicationDosageInstruction = {
  TopicalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Topical route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьс салстаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '6064005',
          display: 'Topical route',
        },
      ],
    },
  },
  AuricularUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Auricular use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Чихэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '10547007',
          display: 'Auricular use',
        },
      ],
    },
  },
  OralUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Oral use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Амаар уух',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '26643006',
          display: 'Oral use',
        },
      ],
    },
  },
  SCUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SC use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьсан дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '34206005',
          display: 'SC use',
        },
      ],
    },
  },
  RectalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Rectal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шулуун гэдсээр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '37161004',
          display: 'Rectal use',
        },
      ],
    },
  },
  SublingualUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Sublingual use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэлэн дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '37839007',
          display: 'Sublingual use',
        },
      ],
    },
  },
  NasalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nasal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамарт',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '46713006',
          display: 'Nasal use',
        },
      ],
    },
  },
  IntravenousUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intravenous use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Венийн судсанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '47625008',
          display: 'Intravenous use',
        },
      ],
    },
  },
  OphthalmicUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ophthalmic use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '54485002',
          display: 'Ophthalmic use',
        },
      ],
    },
  },
  IntraArterialUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intra-arterial use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Артерийн судсанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '58100008',
          display: 'Intra-arterial use',
        },
      ],
    },
  },
  IntrauterineUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrauterine route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үтрээгээр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '62226000',
          display: 'Intrauterine route',
        },
      ],
    },
  },
  IntramuscularUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intramuscular use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Булчинд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '78421000',
          display: 'Intramuscular use',
        },
      ],
    },
  },
  GingivalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Gingival use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Буйланд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372457001',
          display: 'Gingival use',
        },
      ],
    },
  },
  OromucosalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Oromucosal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Амны салстаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372473007',
          display: 'Oromucosal use',
        },
      ],
    },
  },
  UrethralUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Urethral use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шээс дамжуулах сувгаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '90028008',
          display: 'Urethral use',
        },
      ],
    },
  },
  GastrostomyUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Gastrostomy use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ходоодны стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '127490009',
          display: 'Gastrostomy use',
        },
      ],
    },
  },
  JejunostomyUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Jejunostomy use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нарийн гэдэсний стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '127491008',
          display: 'Jejunostomy use',
        },
      ],
    },
  },
  NasogastricUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nasogastric use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар ходоодны гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '127492001',
          display: 'Nasogastric use',
        },
      ],
    },
  },
  DentalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dental use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шүдэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372449004',
          display: 'Dental use',
        },
      ],
    },
  },
  EndocervicalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Endocervical use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Умайн хүзүүний дотуур',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372450004',
          display: 'Endocervical use',
        },
      ],
    },
  },
  EndosinusialUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Endosinusial use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Синусийн хөндийн дотуур',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372451000',
          display: 'Endosinusial use',
        },
      ],
    },
  },
  EndotracheopulmonaryUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Endotracheopulmonary use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Уушги, цагаан мөгөөрсөн хоолойн дотуур',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372452007',
          display: 'Endotracheopulmonary use',
        },
      ],
    },
  },
  ExtraAmnioticUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Extra-amniotic use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Амнионы гадуур',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372453002',
          display: 'Extra-amniotic use',
        },
      ],
    },
  },
  GastroenteralUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Gastroenteral use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ходоод гэдэсний замаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372454008',
          display: 'Gastroenteral use',
        },
      ],
    },
  },
  IntraamnioticUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraamniotic use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Амнионы шингэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372458006',
          display: 'Intraamniotic use',
        },
      ],
    },
  },
  IntrabursalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrabursal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үений уутанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372459003',
          display: 'Intrabursal use',
        },
      ],
    },
  },
  IntracardiacUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracardiac use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүрхний хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372460008',
          display: 'Intracardiac use',
        },
      ],
    },
  },
  IntracavernousUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracavernous use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Каверний хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372461007',
          display: 'Intracavernous use',
        },
      ],
    },
  },
  IntracoronaryUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracoronary use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Титэм судсанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372463005',
          display: 'Intracoronary use',
        },
      ],
    },
  },
  IntradermalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intradermal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьсан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372464004',
          display: 'Intradermal use',
        },
      ],
    },
  },
  IntradiscalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intradiscal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Дискэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372465003',
          display: 'Intradiscal use',
        },
      ],
    },
  },
  IntralesionalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intralesional use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гэмтсэн хэсэгт',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372466002',
          display: 'Intralesional use',
        },
      ],
    },
  },
  IntralymphaticUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intralymphatic use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Лимфийн булчирхайн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372467006',
          display: 'Intralymphatic use',
        },
      ],
    },
  },
  IntraocularUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraocular use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдэн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372468001',
          display: 'Intraocular use',
        },
      ],
    },
  },
  IntrapleuralUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrapleural use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Плеврийн шингэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372469009',
          display: 'Intrapleural use',
        },
      ],
    },
  },
  IntrasternalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrasternal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Өвчүүн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372470005',
          display: 'Intrasternal use',
        },
      ],
    },
  },
  IntravesicalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intravesical use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Давсаган дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372471009',
          display: 'Intravesical use',
        },
      ],
    },
  },
  PeriarticularUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Periarticular use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үений орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372474001',
          display: 'Periarticular use',
        },
      ],
    },
  },
  PerineuralUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Perineural use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мэдрэлийн орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372475000',
          display: 'Perineural use',
        },
      ],
    },
  },
  SubconjunctivalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Subconjunctival use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний эвэрлэгийн дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '372476004',
          display: 'Subconjunctival use',
        },
      ],
    },
  },
  TransmucosalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transmucosal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Салстаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '404815008',
          display: 'Transmucosal route',
        },
      ],
    },
  },
  IntratrachealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intratracheal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Цагаан мөгөөрсөн хоолойд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '404818005',
          display: 'Intratracheal route',
        },
      ],
    },
  },
  IntrabiliaryRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrabiliary route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Цөсөнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '404819002',
          display: 'Intrabiliary route',
        },
      ],
    },
  },
  EpiduralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Epidural route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Эпидурал',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '404820008',
          display: 'Epidural route',
        },
      ],
    },
  },
  SuborbitalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Suborbital route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний алиман дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '416174007',
          display: 'Suborbital route',
        },
      ],
    },
  },
  CaudalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Caudal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ахар сүүлэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '417070009',
          display: 'Caudal route',
        },
      ],
    },
  },
  IntraosseousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraosseous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ясан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '417255000',
          display: 'Intraosseous route',
        },
      ],
    },
  },
  IntrathoracicRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrathoracic route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Цээжний хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '417950001',
          display: 'Intrathoracic route',
        },
      ],
    },
  },
  EnteralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Enteral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Энтерал',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '417985001',
          display: 'Enteral route',
        },
      ],
    },
  },
  IntraductalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraductal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хөхний сувган дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '417989007',
          display: 'Intraductal route',
        },
      ],
    },
  },
  IntratympanicRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intratympanic route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэнгэргэн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418091004',
          display: 'Intratympanic route',
        },
      ],
    },
  },
  IntravenousCentralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intravenous central route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Төвийн венээр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418114005',
          display: 'Intravenous central route',
        },
      ],
    },
  },
  IntramyometrialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intramyometrial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Умайн булчин давхаргад',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418133000',
          display: 'Intramyometrial route',
        },
      ],
    },
  },
  GastroIntestinalStomaRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Gastro-intestinal stoma route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ходоод нарийн гэдэсний стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418136008',
          display: 'Gastro-intestinal stoma route',
        },
      ],
    },
  },
  ColostomyRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Colostomy route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Бүдүүн гэдэсний стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418162004',
          display: 'Colostomy route',
        },
      ],
    },
  },
  PeriurethralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Periurethral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шээс дамжуулах суваг орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418204005',
          display: 'Periurethral route',
        },
      ],
    },
  },
  IntracoronalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracoronal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Титэм судас орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418287000',
          display: 'Intracoronal route',
        },
      ],
    },
  },
  RetrobulbarRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Retrobulbar route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний алимны ард',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418321004',
          display: 'Retrobulbar route',
        },
      ],
    },
  },
  IntracartilaginousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracartilaginous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мөгөөрсөн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418331006',
          display: 'Intracartilaginous route',
        },
      ],
    },
  },
  IntravitrealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intravitreal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний шиллэг биеэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418401004',
          display: 'Intravitreal route',
        },
      ],
    },
  },
  IntraspinalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraspinal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нугасанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418418000',
          display: 'Intraspinal route',
        },
      ],
    },
  },
  OrogastricRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Orogastric route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар ходоодны гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418441008',
          display: 'Orogastric route',
        },
      ],
    },
  },
  TransurethralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transurethral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шээс дамжуулах сувгаар дамжуулан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418511008',
          display: 'Transurethral route',
        },
      ],
    },
  },
  IntratendinousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intratendinous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шөрмөсөн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418586008',
          display: 'Intratendinous route',
        },
      ],
    },
  },
  IntracornealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracorneal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Эвэрлэг дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418608002',
          display: 'Intracorneal route',
        },
      ],
    },
  },
  OropharyngealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Oropharyngeal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар хоолойд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418664002',
          display: 'Oropharyngeal route',
        },
      ],
    },
  },
  PeribulbarRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Peribulbar route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний алимны орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418722009',
          display: 'Peribulbar route',
        },
      ],
    },
  },
  NasojejunalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nasojejunal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар нарийн гэдэсний гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418730005',
          display: 'Nasojejunal route',
        },
      ],
    },
  },
  FistulaRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fistula route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Фистулд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418743005',
          display: 'Fistula route',
        },
      ],
    },
  },
  SurgicalDrainRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Surgical drain route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мэс заслын урсгуураар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418813001',
          display: 'Surgical drain route',
        },
      ],
    },
  },
  IntracameralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracameral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний камерт',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418821007',
          display: 'Intracameral route',
        },
      ],
    },
  },
  ParacervicalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Paracervical route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Умайн хүзүүний орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418851001',
          display: 'Paracervical route',
        },
      ],
    },
  },
  IntrasynovialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrasynovial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үений синновиал бүрхүүлд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418877009',
          display: 'Intrasynovial route',
        },
      ],
    },
  },
  IntraduodenalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraduodenal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нарийн гэдсэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418887008',
          display: 'Intraduodenal route',
        },
      ],
    },
  },
  IntracisternalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracisternal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Тархинй цистернээр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418892005',
          display: 'Intracisternal route',
        },
      ],
    },
  },
  IntratesticularRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intratesticular route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Төмсөгөнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418947002',
          display: 'Intratesticular route',
        },
      ],
    },
  },
  IntracranialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracranial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гавлын хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418987007',
          display: 'Intracranial route',
        },
      ],
    },
  },
  TumorCavityRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tumor cavity route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хавдрын хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419021003',
          display: 'Tumor cavity route',
        },
      ],
    },
  },
  ParavertebralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Paravertebral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нугаламын орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419165009',
          display: 'Paravertebral route',
        },
      ],
    },
  },
  IntrasinalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrasinal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар болон нүд орчмын синусын хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419231003',
          display: 'Intrasinal route',
        },
      ],
    },
  },
  TranscervicalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transcervical route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Умайн хүзүүгээр дамжуулан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419243002',
          display: 'Transcervical route',
        },
      ],
    },
  },
  SubtendinousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Subtendinous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шөрмөсөн доор хийх',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419320008',
          display: 'Subtendinous route',
        },
      ],
    },
  },
  IntraabdominalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraabdominal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэвлийн хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419396008',
          display: 'Intraabdominal route',
        },
      ],
    },
  },
  SubgingivalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Subgingival route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Буйлан дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419601003',
          display: 'Subgingival route',
        },
      ],
    },
  },
  IntraovarianRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraovarian route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Өндгөвчинд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419631009',
          display: 'Intraovarian route',
        },
      ],
    },
  },
  UreteralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ureteral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шээсний сувагт',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419684008',
          display: 'Ureteral route',
        },
      ],
    },
  },
  PeritendinousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Peritendinous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шөрмөс орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419762003',
          display: 'Peritendinous route',
        },
      ],
    },
  },
  IntrabronchialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrabronchial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гуурсан хоолойд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419778001',
          display: 'Intrabronchial route',
        },
      ],
    },
  },
  IntraprostaticRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraprostatic route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Түрүү булчирхайд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419810008',
          display: 'Intraprostatic route',
        },
      ],
    },
  },
  SubmucosalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Submucosal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Салстын дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419874009',
          display: 'Submucosal route',
        },
      ],
    },
  },
  SurgicalCavityRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Surgical cavity route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мэс заслын хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419894000',
          display: 'Surgical cavity route',
        },
      ],
    },
  },
  IleostomyRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ileostomy route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Цутгалан гэдэсний стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419954003',
          display: 'Ileostomy route',
        },
      ],
    },
  },
  IntravenousPeripheralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intravenous peripheral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Захын венийн судсанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '419993007',
          display: 'Intravenous peripheral route',
        },
      ],
    },
  },
  PeriostealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Periosteal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Периостод',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420047004',
          display: 'Periosteal route',
        },
      ],
    },
  },
  EsophagostomyRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Esophagostomy route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Улаан хоолойн стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420163009',
          display: 'Esophagostomy route',
        },
      ],
    },
  },
  UrostomyRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Urostomy route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шээс дамжуулах сувгийн стомийн гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420168000',
          display: 'Urostomy route',
        },
      ],
    },
  },
  LaryngealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Laryngeal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Төвөнхөд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420185003',
          display: 'Laryngeal route',
        },
      ],
    },
  },
  IntrapulmonaryRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrapulmonary route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Уушгин дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420201002',
          display: 'Intrapulmonary route',
        },
      ],
    },
  },
  MucousFistulaRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Mucous fistula route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Салстын фистулд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420204005',
          display: 'Mucous fistula route',
        },
      ],
    },
  },
  NasoduodenalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nasoduodenal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хамар нарийн гэдэсний гуурсаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420218003',
          display: 'Nasoduodenal route',
        },
      ],
    },
  },
  BodyCavityRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Body cavity route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Биеийн хөндийд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420254004',
          display: 'Body cavity route',
        },
      ],
    },
  },
  IntraventricularRouteCardiac: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraventricular route - cardiac',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Зүрхний ховдол дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420287000',
          display: 'Intraventricular route - cardiac',
        },
      ],
    },
  },
  IntracerebroventricularRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracerebroventricular route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Тархины ховдол дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420719007',
          display: 'Intracerebroventricular route',
        },
      ],
    },
  },
  PercutaneousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Percutaneous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьсан дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '428191002',
          display: 'Percutaneous route',
        },
      ],
    },
  },
  InterstitialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Interstitial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Завсрын эдэд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '429817007',
          display: 'Interstitial route',
        },
      ],
    },
  },
  IntraesophagealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraesophageal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Улаан хоолой дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445752009',
          display: 'Intraesophageal route',
        },
      ],
    },
  },
  IntragingivalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intragingival route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Буйлан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445754005',
          display: 'Intragingival route',
        },
      ],
    },
  },
  IntravascularRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intravascular route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Судсан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445755006',
          display: 'Intravascular route',
        },
      ],
    },
  },
  IntraduralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intradural route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Дураль хальсан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445756007',
          display: 'Intradural route',
        },
      ],
    },
  },
  IntrameningealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrameningeal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мэнэн хальсан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445767008',
          display: 'Intrameningeal route',
        },
      ],
    },
  },
  IntragastricRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intragastric route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ходоодонд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445768003',
          display: 'Intragastric route',
        },
      ],
    },
  },
  IntracorpusCavernosumRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracorpus cavernosum route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Корпус кавернозумд хийх',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445769006',
          display: 'Intracorpus cavernosum route',
        },
      ],
    },
  },
  IntrapericardialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrapericardial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үнхэлцгийн шингэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445771006',
          display: 'Intrapericardial route',
        },
      ],
    },
  },
  IntralingualRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intralingual route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэлэн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445913005',
          display: 'Intralingual route',
        },
      ],
    },
  },
  IntrahepaticRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrahepatic route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Элгэн дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '445941009',
          display: 'Intrahepatic route',
        },
      ],
    },
  },
  ConjunctivalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Conjunctival route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нүдний салстанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '446105004',
          display: 'Conjunctival route',
        },
      ],
    },
  },
  IntraepicardialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraepicardial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Эпикардад',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '446407004',
          display: 'Intraepicardial route',
        },
      ],
    },
  },
  TransendocardialRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transendocardial route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Эндокардид',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '446435000',
          display: 'Transendocardial route',
        },
      ],
    },
  },
  TransplacentalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transplacental route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Эхэсэд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '446442000',
          display: 'Transplacental route',
        },
      ],
    },
  },
  IntracerebralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracerebral route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Тархинд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '446540005',
          display: 'Intracerebral route',
        },
      ],
    },
  },
  IntrailealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraileal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нарийн гэдсэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447026006',
          display: 'Intraileal route',
        },
      ],
    },
  },
  PeriodontalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Periodontal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Перидонтид',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447052000',
          display: 'Periodontal route',
        },
      ],
    },
  },
  PeriduralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Peridural route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Дураль хальс орчимд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447080003',
          display: 'Peridural route',
        },
      ],
    },
  },
  LowerRespiratoryTractRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Lower respiratory tract route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Амьсгалын доод замд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447081004',
          display: 'Lower respiratory tract route',
        },
      ],
    },
  },
  IntramammaryRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intramammary route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хөхөнд хийх',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447121004',
          display: 'Intramammary route',
        },
      ],
    },
  },
  IntratumorRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intratumor route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хавдаранд хийх',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447122006',
          display: 'Intratumor route',
        },
      ],
    },
  },
  TranstympanicRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transtympanic route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэнгэргээр дамжуулан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447227007',
          display: 'Transtympanic route',
        },
      ],
    },
  },
  TranstrachealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transtracheal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Цагаан мөгөөрсөн хоолойгоор дамжуулан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447229005',
          display: 'Transtracheal route',
        },
      ],
    },
  },
  RespiratoryTractRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Respiratory tract route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Амьсгалын замаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447694001',
          display: 'Respiratory tract route',
        },
      ],
    },
  },
  DigestiveTractRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Digestive tract route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хоол боловсруулах замаар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '447964005',
          display: 'Digestive tract route',
        },
      ],
    },
  },
  IntraepidermalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraepidermal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьсан доорх давхаргад',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '448077001',
          display: 'Intraepidermal route',
        },
      ],
    },
  },
  IntrajejunalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrajejunal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Өлөн гэдсэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '448491004',
          display: 'Intrajejunal route',
        },
      ],
    },
  },
  IntracolonicRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intracolonic route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Бүдүүн гэдсэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '448492006',
          display: 'Intracolonic route',
        },
      ],
    },
  },
  CutaneousRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Cutaneous route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьсанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '448598008',
          display: 'Cutaneous route',
        },
      ],
    },
  },
  ArteriovenousFistulaRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Arteriovenous fistula route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Артер венийн фистулд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '697971008',
          display: 'Arteriovenous fistula route',
        },
      ],
    },
  },
  IntraneuralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraneural route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Мэдрэлд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '711360002',
          display: 'Intraneural route',
        },
      ],
    },
  },
  IntramuralRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intramural route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ханаар нь дамжуулан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '711378007',
          display: 'Intramural route',
        },
      ],
    },
  },
  ExtracorporealRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Extracorporeal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Биеийн гаднаас',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '714743009',
          display: 'Extracorporeal route',
        },
      ],
    },
  },
  InfiltrationRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Infiltration route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нэвчүүлж',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '718329006',
          display: 'Infiltration route',
        },
      ],
    },
  },
  SublesionalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Sublesional route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гэмтлийн дор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '1611000175109',
          display: 'Sublesional route',
        },
      ],
    },
  },
  Intraventricular: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraventricular',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ховдол хооронд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '420287000',
          display: 'Intraventricular',
        },
      ],
    },
  },
  IntraArticularRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intra-articular route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үений шингэнд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '12130007',
          display: 'Intra-articular route',
        },
      ],
    },
  },
  VaginalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Vaginal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Үтрээгээр',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '16857009',
          display: 'Vaginal use',
        },
      ],
    },
  },
  IntraluminalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraluminal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Гогцоонд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '37737002',
          display: 'Intraluminal use',
        },
      ],
    },
  },
  IntraperitonealUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intraperitoneal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хэвлийн гялтан хальсанд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '38239002',
          display: 'Intraperitoneal use',
        },
      ],
    },
  },
  TransdermalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Transdermal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Арьсаар дамжуулан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '45890007',
          display: 'Transdermal use',
        },
      ],
    },
  },
  BuccalUse: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Buccal use',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хацраар',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '54471007',
          display: 'Buccal use',
        },
      ],
    },
  },
  IntramedullaryRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intramedullary route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нугасан дотор',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '60213007',
          display: 'Intramedullary route',
        },
      ],
    },
  },
  IntrathecalRoute: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Intrathecal route',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нугасны сувганд',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '72607000',
          display: 'Intrathecal route',
        },
      ],
    },
  },
}

module.exports = MedicationDosageInstruction

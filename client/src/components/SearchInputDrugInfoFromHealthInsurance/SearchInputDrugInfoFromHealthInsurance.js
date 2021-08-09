import React, { useEffect, useState } from 'react'
import { Select, Spin, Col } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import * as helper from 'utils/helper'
const { Option } = Select

const SearchInputDrugInfoFromHealthInsurance = props => {
  const { patient } = props
  const [rawData, setRawData] = useState([])
  const [selectedValue, setSelectedValue] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [filteredData, setFilteredData] = useState(false)
  const [diagnoseData, setdiagnoseData] = useState()
  const handleSearch = async value => {
    if (value === '') {
      setFilteredData(rawData)
      //refresh()
    } else {
      const processed = rawData.filter(rawDataItem => {
        return rawDataItem.tbltNameInter.startsWith(`${value}`)
      })
      setRawData(processed)
    }
  }
  const refresh = () => {}

  function fetchData(values) {
    let patientNationalId
    if (values) {
      if (!helper.isEmptyObject(patient)) {
        patientNationalId = patient.getNationalIdentificationNumber()
        return props
          .dispatch({
            type: 'app/getDrugInfoByDiagnose',
            payload: {
              diagCode: values,
              regNo: patientNationalId,
            },
          })
          .then(response => {
            console.log('---------------------------', response)
            const { listTabletModel, diagModel } = response
            if (response) {
              setdiagnoseData(diagModel)
              setRawData(listTabletModel)
              setFilteredData(listTabletModel)
            } else {
              console.log('responseeeeeeeeeeeee')
            }
          })
      }
    } else {
      // props
      //   .dispatch({
      //     type: 'app/queryPrescription',
      //   })
      //   .then(response => {
      //     if (response) {
      //       setRawData(response)
      //       setFilteredData(response)
      //     }
      //   })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleMedicationChange = optionId => {
    const selectedData = rawData.find(opt => (opt.tbltId = optionId))
    setSelectedValue(selectedData)
    props.onChange({ selectedData, diagnoseData })
    setRawData([])
  }

  const handleDiagnosisChange = values => {
    fetchData(values)

    props.onChange()
  }

  const Diagnose_ICD10 = [
    {
      diagnoseCode: 'B18',
      internationalName: 'Архаг вирүст хепатит',
    },
    {
      diagnoseCode: 'B18.0',
      internationalName: 'Дельта вирүс хавсарсан архаг B вирүст хепатит',
    },
    {
      diagnoseCode: 'B18.1',
      internationalName: 'Дельта вирүс хавсраагүй архаг B вирүст хепатит',
    },
    {
      diagnoseCode: 'B18.2',
      internationalName: 'Архаг С вирүст хепатит',
    },
    {
      diagnoseCode: 'B18.8',
      internationalName: 'Бусад архаг вирүст хепатит',
    },
    {
      diagnoseCode: 'B18.9',
      internationalName: 'Архаг вирүст хепатит, тодорхойгүй',
    },
    {
      diagnoseCode: 'K74',
      internationalName: 'Элэгний фиброз ба цирроз',
    },
    {
      diagnoseCode: 'K74.0',
      internationalName: 'Элэгний фиброз',
    },
    {
      diagnoseCode: 'K74.3',
      internationalName: 'Анхдагч цөсөн цирроз (Primary Biliary Cirrhosis)',
    },
    {
      diagnoseCode: 'C22.0',
      internationalName: 'Элэгний эсийн карцином',
    },
    {
      diagnoseCode: 'K22.7',
      internationalName: 'Барреттийн улаан хоолой',
    },
    {
      diagnoseCode: 'K29.3',
      internationalName: 'Архаг өнгөц гастрит',
    },
    {
      diagnoseCode: 'K29.4',
      internationalName: 'Архаг хатингарт гастрит',
    },
    {
      diagnoseCode: 'K73',
      internationalName: 'Өөр бүлэгт ангилагдаагүй архаг хепатит',
    },
    {
      diagnoseCode: 'K21',
      internationalName: 'Ходоод-улаан хоолойн сөргөө',
    },
    {
      diagnoseCode: 'K75.4',
      internationalName: 'Аутоиммун хепатит',
    },
    {
      diagnoseCode: 'K76',
      internationalName: 'Элэгний бусад өвчин',
    },
    {
      diagnoseCode: 'K76.0',
      internationalName: 'Өөр бүлэгт ангилаагүй элэгний өөхжилт (NAFLD)',
    },

    {
      diagnoseCode: 'K80',
      internationalName: 'Цөсний чулуу Гхолелитиаз]',
    },
    {
      diagnoseCode: 'I10',
      internationalName: 'Анхдагч даралт ихсэх өвчин',
    },

    {
      diagnoseCode: 'E11',
      internationalName:
        'Инсулинээс үл хамаарах чихрийн шижин (Diabetus Mellitus Type 2)',
    },
    {
      diagnoseCode: 'N10',
      internationalName: 'Сувганцрын завсрын эдийн цочмог нефрит',
    },
    {
      diagnoseCode: 'E03',
      internationalName: 'Бусад бамбай булчирхайн дутмагшил',
    },
    {
      diagnoseCode: 'E05',
      internationalName: 'Бамбай булчирхайн хордлого [хипертироз]',
    },

    {
      diagnoseCode: 'E78.5',
      internationalName: 'Цусны холестрин дангаар ихсэх',
    },
    {
      diagnoseCode: 'E83.1',
      internationalName:
        'Төмрийн солилцооны хямрал (Secondary Hemochromatosis)',
    },
    {
      diagnoseCode: 'E88.8',
      internationalName:
        'Бодисын солилцооны бусад тодорхой хямрал (Metabolic Syndrome)',
    },
    {
      diagnoseCode: 'K81',
      internationalName: 'Холецистит',
    },
    {
      diagnoseCode: 'K81.1',
      internationalName: 'Архаг холецистит',
    },

    {
      diagnoseCode: 'K81.2',
      internationalName: 'Цочмог холецистит',
    },
    {
      diagnoseCode: 'K70',
      internationalName: 'Архины шалтгаант элэгний өвчин',
    },
    {
      diagnoseCode: 'K71',
      internationalName: 'Элэгний хордлогот өвчин',
    },
    {
      diagnoseCode: 'K71.1',
      internationalName: 'Элэгний үхжилтэй хордлогот өвчин',
    },
    {
      diagnoseCode: 'K71.2',
      internationalName: 'Холестазтай хавсарсан элэгний хордлогот өвчин',
    },
    {
      diagnoseCode: 'K71.7',
      internationalName:
        'Элэгний фиброз ба циррозтой хавсарсан элэгний хордлогот өвчин',
    },
    {
      diagnoseCode: 'K71.8',
      internationalName:
        'Элэгний бусад эмгэгтэй хавсарсан элэгний хордлогот өвчин',
    },
    {
      diagnoseCode: 'K71.9',
      internationalName:
        'Элэгний хордлогот өвчин тодорхойгүй (Toxic liver disease, unspecified- Drug Induced Liver Injury)',
    },
    {
      diagnoseCode: 'J06',
      internationalName:
        'Амьсгалын дээд замын тодорхойгүй, олон байрлалт цочмог халдвар',
    },
    {
      diagnoseCode: 'J42',
      internationalName: 'Архаг бронхит, тодорхойгүй',
    },
    {
      diagnoseCode: 'I11',
      internationalName: 'Зүрхний даралт ихсэх өвчин',
    },
    {
      diagnoseCode: 'I13',
      internationalName: 'Зүрх ба бөөрний даралт ихсэх өвчин',
    },
    {
      diagnoseCode: 'I15',
      internationalName: 'Бөөрний судасны гаралтай даралт ихсэх',
    },
    {
      diagnoseCode: 'K29',
      internationalName: 'Гастрит дуоденит',
    },
    {
      diagnoseCode: 'K29.1',
      internationalName: 'Бусад цочмог гастрит',
    },
    {
      diagnoseCode: 'K29.2',
      internationalName: 'Архины шалтгаант гастрит',
    },
    {
      diagnoseCode: 'K29.3',
      internationalName: 'Архаг өнгөц гастрит',
    },
    {
      diagnoseCode: 'K29.4',
      internationalName: 'Цочмог цусархаг гастрит',
    },
    {
      diagnoseCode: 'K29.5',
      internationalName: 'Архаг гастрит тодорхойгүй',
    },

    {
      diagnoseCode: 'K29.6',
      internationalName: 'Бусад гастрит',
    },
    {
      diagnoseCode: 'K29.7',
      internationalName: 'Гастрит, тодорхойгүй',
    },
    {
      diagnoseCode: 'K29.8',
      internationalName: 'Дуоденит',
    },
    {
      diagnoseCode: 'K86.1',
      internationalName: 'Архаг панкреатит',
    },
    {
      diagnoseCode: 'K86.0',
      internationalName: 'Архины шалтгаант панкреатит',
    },
    {
      diagnoseCode: 'K25.4',
      internationalName:
        'Ходоодны цус алдалт (Chronic or unspecified gastric ulcer with hemorrhage)',
    },

    {
      diagnoseCode: 'I85',
      internationalName: 'Улаан хоолойн венийн бүдүүрэл',
    },
    {
      diagnoseCode: 'I85.0',
      internationalName: 'Улаан хоолойн венийн цус алдалттай бүдүүрэл',
    },
    {
      diagnoseCode: 'I85.9',
      internationalName: 'Улаан хоолойн венийн цус алдалтгүй бүдүүрэл',
    },
    {
      diagnoseCode: 'K21.0',
      internationalName:
        'Улаан хоолойн сөргөөт үрэвсэл ( Gastro-esophageal reflux disease with esophagitis)',
    },
    {
      diagnoseCode: 'K25',
      internationalName: 'Ходоодны шархлаа',
    },
    {
      diagnoseCode: 'B16.0',
      internationalName:
        'Элэгний комтой цочмог В хепатит ба дельта хавсарсан халдвар',
    },
    {
      diagnoseCode: 'B16.1',
      internationalName:
        'Элэгний комгүй цочмог В хепатит ба дельта хавсарсан халдвар',
    },
    {
      diagnoseCode: 'B16.2',
      internationalName: 'Элэгний комтой, дельта үүсгэгчгүй цочмог В хепатит',
    },
    {
      diagnoseCode: 'B17.1',
      internationalName: 'Цочмог С хепатит',
    },
  ]

  const renderOptions = rawData.map(opt => {
    let displayValue = opt.tbltNameInter

    const dosage = opt.tbltSizeMixture
    let drugType = opt.tbltTypeName

    return (
      <Option
        key={opt.tbltId}
        title={`
          ${displayValue} | ${dosage} - ${drugType}
          `}
      >
        <span style={{ color: '#f44336', whiteSpace: 'normal' }}>
          {displayValue}
        </span>
        &nbsp;|&nbsp;{dosage}
        &nbsp;-&nbsp;{drugType}
        {/* <div
          style={{ height: '1px', background: 'grey', marginTop: '1px' }}
        ></div>
        <div>{descriptionValue}</div> */}
      </Option>
    )
  })

  return (
    <div>
      {' '}
      <Col span={12}>
        <Select onChange={handleDiagnosisChange}>
          {Diagnose_ICD10.map(element => (
            <Option value={element.diagnoseCode}>
              {element.internationalName}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={12}>
        <Select
          allowClear
          showSearch
          showArrow={false}
          defaultActiveFirstOption={false}
          style={{ width: '100%' }}
          // placeholder={
          // props.i18n.t`Select drug`
          // }
          notFoundContent={loadingData ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleMedicationChange}
        >
          {renderOptions}
        </Select>
      </Col>
    </div>
  )
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(SearchInputDrugInfoFromHealthInsurance))

import React, { useState } from 'react'
import { Select, Spin } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const { Option } = Select

const SearchInputDrugInfoFullList = props => {
  const [rawData, setRawData] = useState([])
  const [selectedValue, setSelectedValue] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  const handleSearch = async value => {
    if (value === '') {
      setRawData([])
    } else {
      setLoadingData(true)
      const newOptions = await fetchData(value)
      setRawData(newOptions)
      setLoadingData(false)
    }
  }

  function fetchData(value) {
    return props
      .dispatch({
        type: 'app/queryDrugInfo',
        payload: {
          internationalProprietaryName: value,
        },
      })
      .then(response => {
        if (response.data) {
          return response.data
        }
      })
      .catch(errorInfo => {
        // eslint-disable-next-line no-console
        console.log(errorInfo)
      })
  }

  const handleChange = optionId => {
    const selectedData = rawData.find(opt => opt.id === optionId)

    setSelectedValue(selectedData)
    props.onChange(selectedData)
    setRawData([])
  }

  const renderOptions = rawData.map(opt => {
    let displayValue = resolveDisplay(
      opt.InternationalProprietaryName,
      props.i18n._language
    )

    // let descriptionValue = opt.InternationalProprietaryName.designation.find(
    //   des => des.language === 'mn'
    // ).value

    const dosage = opt.Dosage
    let drugType = resolveDisplay(opt.DrugType, props.i18n._language)

    return (
      <Option
        key={opt.id}
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
        onChange={handleChange}
      >
        {renderOptions}
      </Select>
    </div>
  )
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(SearchInputDrugInfoFullList))

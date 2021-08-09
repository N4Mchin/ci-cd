import React, { useState } from 'react'
import { Select, Spin, Row } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import * as controller from 'utils/controller'

const { Option } = Select

const SearchInputICD9 = props => {
  const { i18n } = props
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
        type: 'app/queryICD9',
        payload: {
          designationEn: value,
          designationMn: value,
        },
      })
      .then(response => {
        if (response.data) {
          return response.data
        }
      })
      .catch(errorInfo => {
        console.log(errorInfo)
        return []
      })
  }

  const handleChange = (optionId, name) => {
    const selectedData = rawData.find(
      opt => opt.code.coding[0].code === optionId
    )

    setSelectedValue(optionId)
    if (selectedData && selectedData.code) {
      props.onChange({ code: selectedData.code })
    } else {
      props.onChange()
    }
    setRawData([])
  }

  const renderOptions = rawData.map(opt => {
    let displayValue = opt.designation.find(
      des => des.language === i18n._language
    ).value
    let descriptionValue = opt.description.designation.find(
      des => des.language === i18n._language
    ).value
    // let description = opt.description.designation.find(
    //   des => des.language === 'en'
    // ).value

    const code = opt.code.coding[0].code

    // console.log(displayValue, code)
    return (
      <Option
        key={code}
        title={`
          ${displayValue} |
          `}
        value={code}
      >
        <Row style={{ whiteSpace: 'normal' }}>
          <span style={{ color: '#f44336' }}>{code}</span> |{' '}
          <span>{displayValue}</span>
        </Row>
        <div
          style={{ height: '1px', background: 'grey', marginTop: '1px' }}
        ></div>
        <Row style={{ whiteSpace: 'normal' }}>
          <div>{descriptionValue}</div>
        </Row>
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
        style={{ width: '100%', height: '32px', overflow: 'hidden' }}
        disabled={props.disabled}
        // placeholder={
        // props.i18n.t`Select drug`
        // }
        notFoundContent={loadingData ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
      >
        {rawData && renderOptions}
      </Select>
    </div>
  )
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(SearchInputICD9))

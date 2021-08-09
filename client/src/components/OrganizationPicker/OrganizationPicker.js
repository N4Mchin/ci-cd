import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'

const { Option } = Select

const OrganizationPicker = props => {
  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({ current: 1 })

  const handleSearch = async value => {
    searchData(value)
  }

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function searchData(value, _page) {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'app/queryOrganizationList',
        payload: {
          name: value,
          _page: _page && _page,
        },
      })
      .then(response => {
        setPagination(response.pagination)
        setDataSource(response.dataSource)
      })
      .catch(errorInfo => {
        console.error(errorInfo)
        return []
      })
      .finally(() => {
        setLoadingData(false)
      })
  }

  function loadMore(value, _page) {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'app/queryOrganizationList',
        payload: {
          name: value,
          _page: _page && _page,
        },
      })
      .then(response => {
        setPagination(response.pagination)
        setDataSource([...dataSource, ...response.dataSource])
      })
      .catch(errorInfo => {
        console.error(errorInfo)
        return []
      })
      .finally(() => {
        setLoadingData(false)
      })
  }

  const handleChange = optionId => {
    const organization = dataSource.find(data => data.id === optionId)

    if (organization) {
      props.onChange(organization.getReference())
    } else {
      props.onChange()
    }
  }

  const handlePopupScroll = event => {
    const { target } = event

    if (
      !loadingData &&
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 10
    ) {
      // next page
      loadMore(null, pagination.current && pagination.current + 1)
      target.scrollTo(0, target.scrollHeight)
    }
  }

  const renderOptions = dataSource.map(organization => {
    let displayValue = organization.name

    const code = organization.id

    return (
      <Option key={code} title={displayValue} value={code}>
        <span>{displayValue}</span>
      </Option>
    )
  })

  const onFocus = () => {
    searchData('')
  }

  console.log(props)

  return (
    <div>
      <Select
        allowClear
        showSearch
        showArrow={false}
        defaultActiveFirstOption={false}
        style={{ width: '100%' }}
        // placeholder={props.i18n.t`Select healthcare provider`}
        // notFoundContent={loadingData ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        onPopupScroll={handlePopupScroll}
        onFocus={onFocus}
        // organization reference damjuulsan gej uzeed
        value={props.value && props.value.display}
      >
        {dataSource && renderOptions}
        {loadingData && <Option key="loading">Loading</Option>}
      </Select>
    </div>
  )
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(OrganizationPicker))

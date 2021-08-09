import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Select } from 'antd'
import { withI18n } from '@lingui/react'

const { Option } = Select

const LanguageSwitcher = props => {
  const currentLang = props.i18n._language

  function changeLocale(lang) {
    props.dispatch({ type: 'app/changeLanguage', payload: lang })
  }

  return (
    <Select defaultValue={currentLang} onChange={changeLocale}>
      <Option value="mn">МОН</Option>
      <Option value="en">ENG</Option>
    </Select>
  )
}

LanguageSwitcher.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(withI18n()(LanguageSwitcher))

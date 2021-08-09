import React, { useEffect, useState } from 'react'
import withRouter from 'umi/withRouter'
import { ConfigProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import { defaultLanguage } from 'utils'
import mn_MN from 'antd/lib/locale-provider/mn_MN'
import en_US from 'antd/lib/locale-provider/en_US'
import BaseLayout from './BaseLayout'
import { connect } from 'dva'

const languages = {
  mn: mn_MN,
  en: en_US,
}

const Layout = props => {
  const [catalogs, setCatalogs] = useState({})
  const [language, setLanguage] = useState(defaultLanguage)

  async function loadCatalog(lang) {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../locales/${lang}/messages.json`
    )

    return catalog
  }

  async function changeLanguage(newLanguage) {
    const prevCatalogs = { ...catalogs }
    if (language !== newLanguage && !catalogs[newLanguage]) {
      const catalog = await loadCatalog(newLanguage)
      prevCatalogs[newLanguage] = catalog
      setCatalogs(prevCatalogs)
    }

    // If the language pack is not loaded or is loading, use the default language
    if (!prevCatalogs[newLanguage]) {
      setLanguage(defaultLanguage)
    } else {
      setLanguage(newLanguage)
    }
  }

  useEffect(() => {
    const { lang } = props
    setLanguage(lang)

    async function loadFirst() {
      const catalog = await loadCatalog(lang)
      setCatalogs({
        ...catalogs,
        [lang]: catalog,
      })
    }

    loadFirst()
  }, [])

  useEffect(() => {
    changeLanguage(props.lang)
  }, [props.lang])

  const { children } = props

  return (
    <ConfigProvider locale={languages[language]}>
      <I18nProvider language={language} catalogs={catalogs}>
        <BaseLayout>{children}</BaseLayout>
      </I18nProvider>
    </ConfigProvider>
  )
}

// class Layout extends Component {
//   state = {
//     catalogs: {},
//   }

//   language = defaultLanguage

//   componentDidMount() {
//     const { lang } = this.props

//     this.language = lang
//     this.loadCatalog(lang)
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     const language = nextProps.lang
//     const preLanguage = this.language
//     const { catalogs } = nextState

//     if (preLanguage !== language && !catalogs[language]) {
//       this.loadCatalog(language)
//       this.language = language
//       return false
//     }
//     this.language = language

//     return true
//   }

//   loadCatalog = async language => {
//     const catalog = await import(
//       /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
//       `@lingui/loader!../locales/${language}/messages.json`
//     )

//     this.setState(state => ({
//       catalogs: {
//         ...state.catalogs,
//         [language]: catalog,
//       },
//     }))
//   }

//   render() {
//     const { children } = this.props
//     const { catalogs } = this.state

//     let language = this.props.lang
//     // If the language pack is not loaded or is loading, use the default language
//     if (!catalogs[language]) language = defaultLanguage

//     return (
//       <ConfigProvider locale={languages[language]}>
//         <I18nProvider language={language} catalogs={catalogs}>
//           <BaseLayout>{children}</BaseLayout>
//         </I18nProvider>
//       </ConfigProvider>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    lang: state.app.lang,
  }
}

export default withRouter(connect(mapStateToProps)(Layout))

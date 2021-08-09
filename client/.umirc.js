// https://umijs.org/config/
import { resolve } from 'path'
import { i18n } from './src/utils/config'

export default {
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  hash: true,
  treeShaking: true,
  plugins: [
    [
      // https://umijs.org/plugin/umi-plugin-react.html
      'umi-plugin-react',
      {
        dva: { immer: true },
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loader/Loader',
        },
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
            /chart\/Container\.js$/,
            /chart\/ECharts\/.+Component\.js$/,
            /chart\/ECharts\/.+ComPonent\.js$/,
            /chart\/ECharts\/theme\/.+\.js$/,
            /chart\/highCharts\/.+Component\.js$/,
            /chart\/highCharts\/mapdata\/.+\.js$/,
            /chart\/Recharts\/.+Component\.js$/,
            /chart\/Recharts\/Container\.js$/,
          ],
          // update: routes => {
          //   // return routes
          //   if (!i18n) return routes
          //   console.log('\n\n\n\n\n\n\n\n')
          //   // console.log(JSON.stringify(routes))
          //   const newRoutes = []
          //   for (const item of routes[0].routes) {
          //     newRoutes.push(item)
          //     if (item.path) {
          //       newRoutes.push(
          //         Object.assign({}, item, {
          //           path:
          //             `/:lang(${i18n.languages
          //               .map(item => item.key)
          //               .join('|')})` + item.path,
          //         })
          //       )
          //     }
          //   }
          //   routes[0].routes = newRoutes
          //   // console.log(JSON.stringify(routes))
          //   return routes
          // },
        },
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        // hardSource: /* isMac */ process.platform === 'darwin',
        pwa: {
          manifestOptions: {
            srcPath: 'manifest.json',
          },
        },
      },
    ],
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: './config/theme.config.js',
  // Webpack Configuration
  proxy: {
    // 'https://id.who.int/api/v1/icd/entity': {
    //   target: 'https://id.who.int',
    //   changeOrigin: true,
    //   pathRewrite: { '^https://id.who.int/api/v1/': '' },
    // },
  },
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
    schemas: resolve(__dirname, './src/schemas'),
    public: resolve(__dirname, './public'),
    assets: resolve(__dirname, './assets'),
  },
  extraBabelPresets: ['@lingui/babel-preset-react'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
}

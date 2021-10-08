/*
 * @Descripttion:
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-07-10 14:47:42
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 20:09:12
 */
const path = require('path')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const proxy = require('./proxy.js')

const name = '系统管理Demo'

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: './',
  lintOnSave: isDev,
  productionSourceMap: false,
  devServer: {
    port: process.env.VUE_APP_PORT,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    progress: false,
    proxy,
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ],
    },
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config.when(isDev, (config) => config.devtool('cheap-eval-source-map'))

    config.plugin('cache').use(HardSourceWebpackPlugin)

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config
      .plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [
        {
          format: 'compact',
        },
      ])

    config.when(!isDev, (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
}

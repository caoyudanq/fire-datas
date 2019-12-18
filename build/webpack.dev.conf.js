'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

  const express = require('express')
  const app = express()
  var appData = require('../data.json')//加载本地数据文件
  var seller = appData.seller
  var user = appData.user
  var goods = appData.goods
  var citys = appData.citys
  var unitInfo = appData.unitInfo
  var tableData1 = appData.tableData1
  var tableData2 = appData.tableData2
  var tableData3 = appData.tableData3
  var tableData4 = appData.tableData4
  var tableData5 = appData.tableData5
  var section = appData.section1  
  var section2 = appData.section2
  var section3 = appData.section3
  var apiRoutes = express.Router()
  app.use('/api', apiRoutes)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,


  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.get('/api/appData', (req, res) => {
          res.json({
            errno: 0,
            data: appData
          }) //接口返回json数据，上面配置的数据appData就赋值给data请求后调用
        }),
        app.get('/api/unitInfo', (req, res) => {
          res.json({
            errno: 0,
            data: unitInfo
          })
        }),
        app.get('/api/section1', (req, res) => {
          res.json({
            errno: 0,
            data: section
          })
        }),
        app.get('/api/section2', (req, res) => {
          res.json({
            errno: 0,
            data: section2
          })
        }),
        app.get('/api/section3', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: section3
          })
        }),
        app.get('/api/seller', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: seller
          })
        }),
        app.get('/api/citys', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: citys
          })
        }),
        app.get('/api/goods', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: goods
          })
        }),
        app.get('/api/tableData1', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: tableData1
          })
        }),
        app.get('/api/tableData2', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: tableData2
          })
        }),
        app.get('/api/tableData3', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: tableData3
          })
        }),
        app.get('/api/tableData4', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: tableData4
          })
        }),
        app.get('/api/tableData5', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: tableData5
          })
        }),
        app.get('/api/user', (req, res) => {
          res.json({
            // 这里是你的json内容
            errno: 0,
            data: user
          })
        })
    }
      
    
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

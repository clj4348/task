const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin') //css处理包
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../src/server-entry.js'),
  devtool: '#source-map',
  output:{
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // package.json 依赖的包
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test:/\.styl/,
        use:ExtractPlugin.extract({
          fallback:'vue-style-loader',
          use:[
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true 
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  // import Vue from 'vue'
  plugins:[
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.NODE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
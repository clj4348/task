const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin') //css处理包
const merge = require('webpack-merge') // 合并webpack的配置
const baseConfig = require('./webpack.config.base') // 基础的配置
// 环境变量
const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port:'8000',//端口
  host: '0.0.0.0',
  overlay:{
    errors:true
  },
  hot: true
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_EN: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

let config
if(isDev){
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module:{
      rules: [
        {
          test:/\.styl/,
          use:[
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true 
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else{
  config = merge(baseConfig, {
    entry: {
      app:path.join(__dirname, '../src/index.js'),
      vendor : ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules:[
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
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 将webpack打包生成的代码单独分开
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config; 
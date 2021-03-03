'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env')  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[contenthash].js'),
    chunkFilename: utils.assetsPath('js/[id].[contenthash].js')
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: config.build.uglify
      },
      sourceMap: config.build.sourceMaps,
      parallel: true
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath(path.join('styles', '[name].[contenthash].css')),
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, path.join('..', 'static')),
          to: config.build.assetsSubDirectory,
          globOptions:{
            ignore: ['.*']
          }
        }
      ]
    }),
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

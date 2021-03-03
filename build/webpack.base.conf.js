'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')

const { VueLoaderPlugin } = require('vue-loader')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.app': config.app,
      'process.env': config.env,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,

      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },
      title: config.app.name,
      env: process.env
    }),
    new CopyWebpackPlugin({
      patterns:[{
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        globOptions:{
          ignore: ['.*']
        }
      }]
    }),
    new VueLoaderPlugin(),
    new WebpackPwaManifest({
      background_color: config.app.background,
      description: config.app.description,
      theme_color: config.app.color,
      short_name: config.app.short,
      display: config.app.display,
      name: config.app.name,
      start_url: '/',
      ios: true,
      gcm_sender_id: "103953800507",
      icons: [
        {
          src: config.dev.appIconPath,
          destination: path.join(config.dev.assetsSubDirectory, 'icons'),
          sizes: [36, 48, 72, 96, 144, 192, 512]
        },
        {
          src: config.dev.appIconPath,
          destination: path.join(config.dev.assetsSubDirectory, 'icons'),
          sizes: [120, 152, 167, 180, 1024],
          ios: true
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.resolve('src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        oneOf: [
          // this matches `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          // this matches plain `<style>` or `<style scoped>`
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
          },
          'sass-loader'
        ]
      },
      {
        resourceQuery: /\bblockType=i18n\b/,
        loader: '@kazupon/vue-i18n-loader',
        options: { modules: true }
      },
      { test: /.json$/i, loader: 'json-loader', type: 'javascript/auto' },
    ]
  }
}

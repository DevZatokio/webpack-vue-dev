/**
 * Webpack development config build module.
 *
 * @module build/webpack.dev.conf
 */

 var FailOnErrorsPlugin = require('fail-on-errors-webpack-plugin');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

// add hot-reload related code to entry chunks
for (let name of Object.keys(baseWebpackConfig.entry)) {
  const entry = path.join(__dirname, '..', 'server', 'client.js');

  baseWebpackConfig.entry[name] = [entry].concat(baseWebpackConfig.entry[name]);
}

const webpackConfig = {
  devtool: config.dev.devtool,

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new FailOnErrorsPlugin({failOnErrors:true,failOnWarnings:true})]
};

console.log('base webpack config' , baseWebpackConfig);


module.exports = merge(baseWebpackConfig, webpackConfig);
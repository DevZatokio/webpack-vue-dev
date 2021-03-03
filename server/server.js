/**
 * Development server module.
 *
 * @module server/server
 */

const connectHistoryAPIFallback = require('connect-history-api-fallback');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const ora = require('ora');

const config = require('../config');


module.exports = () => {
  const webpackConfig = process.env.NODE_ENV === 'testing' ? require('../build/webpack.prod.conf') : require('../build/webpack.dev.conf');

  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  const { proxyTable } = config.dev;

  const compiler = webpack(webpackConfig);

  const app = express();

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: config.headers,
  });

  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.log,
    heartbeat: 2000
  });

  compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
    hotMiddleware.publish({
          action: 'reload'
    });
 });


  // Enable hot-reload and state-preserving compilation error display
  app.use(hotMiddleware);


  // Proxy api requests
  Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];

    if (typeof options === 'string') {
      options = { target: options };
    }

    app.use(proxyMiddleware(options.filter || context, options));
  });

  // Handle fallback for HTML5 history API
  app.use(connectHistoryAPIFallback());

  // Serve webpack bundle output
  app.use(devMiddleware);

  // Serve pure static assets
  const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);

  app.use(staticPath, express.static('./static'));

  const uri = `http://localhost:${config.dev.port}`;

  let ready;

  const readyPromise = new Promise(resolve => {
    ready = resolve;
  });

  const spinner = ora(`[${process.env.NODE_ENV}] Starting development server...`).start();

  devMiddleware.waitUntilValid(() => {
    spinner.info(`[${process.env.NODE_ENV}] Development server listening at ${chalk.bold(uri)}\n`);
    ready();
  });

  const server = app.listen(config.dev.port);

  return {
    close: () => server.close(),
    ready: readyPromise
  };
};

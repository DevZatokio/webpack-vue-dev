/**
 * Development client module.
 *
 * @module build/dev-client
 */

/* eslint-env browser */
(function(window) {
  'use strict';

  require('eventsource-polyfill');

  var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

  hotClient.subscribe(function(event) {
    if (event.action === 'reload') {
      window.location.reload();
    }
  });
})(window);

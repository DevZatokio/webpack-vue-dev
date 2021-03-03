/**
 * Configure build module.
 *
 * @module build/configure
 */

const { merge } = require('webpack-merge');

const Package = require('../package.json');
const config = require('../config');
const ora = require('ora');

const envJS = require('../env');

module.exports = () => {
  const spinner = ora('Configuring...').start();

  const stage = require(`../config/${process.env.NODE_ENV}`); // Per stage config

  // environment variables env.js
  let env;
  if (process.env.NODE_ENV === 'production') {
    env = envJS.default.production
  } else {
    env = envJS.default.local
  }
  const obj = {
    app: {},
    env: env
  };

  // Stringify config env vars.
  if (config.env) {
    for (let key of Object.keys(config.env)) {
      obj.env[key] = JSON.stringify(config.env[key]);
    }
  }

  // Assign process env vars to config env as stringified values for replacement.
  if (process.env) {
    for (let key of Object.keys(process.env)) {
      obj.env[key] = JSON.stringify(process.env[key]);
    }
  }

  // Stringify stage env values for replacement.
  if (stage.env) {
    for (let key of Object.keys(stage.env)) {
      obj.env[key] = JSON.stringify(stage.env[key]);
    }
  }

  // Stringify package app values
  if (Package.app) {
    for (let key of Object.keys(Package.app)) {
      obj.app[key] = JSON.stringify(Package.app[key]);
    }
  }

  // Merge and assign stage values to config
  Object.assign(config, merge(config, stage, obj));

  spinner.succeed('Configuration complete.');
};

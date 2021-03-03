/**
 * Cleanup build module.
 *
 * @module build/cleanup
 */

const rm = require('rimraf');
const ora = require('ora');

const config = require('../config');

module.exports = async () => {
  const spinner = ora(`Cleaning up ${config.build.assetsRoot}...`).start();

  await new Promise((resolve, reject) =>
    rm(config.build.assetsRoot, err => {
      if (err) {
        spinner.fail('Cleanup failed!');

        reject(err);

        return;
      }

      spinner.succeed('Cleanup complete.');

      resolve();
    })
  );
};

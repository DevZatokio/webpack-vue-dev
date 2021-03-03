/* Ensure a valid NODE_ENV */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

/* Set proper AWS profile */
process.env.AWS_PROFILE = process.env.NODE_ENV || 'default';
const configure = require('./configure');
const cleanup = require('./cleanup');



(async () => {
  await cleanup();
  await configure();
  require('./build');
})();

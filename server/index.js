
/* Ensure a valid NODE_ENV */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

/* Set proper AWS profile */
process.env.AWS_PROFILE = 'default';

const server = require('./server');
const configure = require('../build/configure');

(async () => {
 
  await configure()
  // Start server


  await server();
})();

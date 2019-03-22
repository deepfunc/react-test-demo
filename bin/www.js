require('@babel/polyfill');

const env = process.env.NODE_ENV;

// Require Hook
if (env === 'development') {
  require('@babel/register');
}

require('../src/server');

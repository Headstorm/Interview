/* eslint-disable key-spacing */
const Promise = require('bluebird');

const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);
const debug = require('../server/helpers/loggers')('DATABASE');
const {
  nodeEnv,
  databaseUrl,
  pgDatabase,
  pgHost,
  pgIdleTimeoutMilliS,
  pgMax,
  pgPassword,
  pgPort,
  pgSslMode,
  pgUser,
} = require('../config');
// console.log(`__dirname in database index.js:     ${__dirname}`)


if (nodeEnv === 'development') {
  const pgConfig = {
    user               : pgUser,
    password           : pgPassword,
    database           : pgDatabase,
    host               : pgHost,
    port               : pgPort,
    max                : pgMax,
    idleTimeoutMillis  : pgIdleTimeoutMilliS,
    ssl                : pgSslMode,
  };

  debug(pgConfig);
  const db = pgp(pgConfig);

  module.exports = db;
} else {
  const connectionString = databaseUrl;
  const db = pgp(connectionString);

  module.exports = db;
}

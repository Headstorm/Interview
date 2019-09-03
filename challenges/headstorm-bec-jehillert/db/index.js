/* eslint-disable key-spacing */
const Promise = require('bluebird');

const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);

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

  const db = pgp(pgConfig);
  // console.log(pgConfig);

  module.exports = db;
} else {
  const connectionString = databaseUrl;
  const db = pgp(connectionString);

  module.exports = db;
}

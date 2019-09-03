require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const router = require('./routes.js');
const {
  pgDatabase,
  port,
} = require('../config');

app.use(cors());

app.set('port', port);
app.set('host', '0.0.0.0');

app.use('/api/db/data', router); // localhost
app.use(`/api/${pgDatabase}/data`, router); // heroku

app.listen(app.get('port'), app.get('host'), () => (
  console.log(`Node app started. Listening on port ${port}`)
));

module.exports = express;

/* eslint-disable max-len */
require('dotenv').config();

const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const queries = require('./queries');
const { pgDatabase, port } = require('../config');
const { validateJSON, validateAndParseList } = require('./middleware');

// create app
const app = express();

// mount middleware
app.use(cors());
router.use('/', validateJSON);
router.post('/', validateAndParseList);

// ROUTES ('controllers')
router.post('/', (req, res) => queries.tableOfUnsortedListValues
  .post(req.body.list)
  .then(() => res.sendStatus(201))
  .catch(error => console.log('Error', error)));

router.get('/', (req, res) => queries.tableOfUnsortedListValues
 .getSorted()
 .then(queryResults => { // [{unsorted_val:'-9991.337857418925'},{unsorted_val:'-9945.065004258193'},{unsorted_val:'-9899.736328430434'},...and so on...]
   const numListArr = queryResults.map(randomValue => Number(randomValue.unsorted_val));
   return JSON.stringify(numListArr);
 })
 .then(results => res.send(results))
 .catch(error => console.log('Error', error)));
// router.get('/', (req, res) => queries.tableOfUnsortedListValues
//   .getSorted()
//   .then(queryResults => JSON.stringify(queryResults).replace(/\{|\}|"|:|unsorted_val/gi, ''))
//   .then(results => res.send(results))
//   .catch(error => console.log('Error', error)));

router.patch('/', (req, res) => {
  return queries.tableOfUnsortedListValues
  .insertValue(req.body.randomValue)
  .then(() => res.sendStatus(201))
  .catch(error => console.log('Error', error));
});

app.set('port', port);
app.set('host', '0.0.0.0');

app.use('/api/db/data', router); // localhost
app.use(`/api/${pgDatabase}/data`, router); // heroku

app.listen(app.get('port'), app.get('host'), () => (
  console.log(`Node app started. Listening on port ${port}`)
));

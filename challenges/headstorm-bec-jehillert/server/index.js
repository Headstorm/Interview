require('dotenv').config();

const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const queries = require('./queries');
const { pgDatabase, port } = require('../config');
const { validateJSON, validateAndParseList } = require('./middleware');

// create app
const app = express();

app.use(cors());

// mount middleware
router.post('/', validateJSON);
router.post('/', validateAndParseList);

// ROUTES ('controllers')
router.post('/', (req, res) => queries.tableOfUnsortedListValues
  .post(req.body.list)
  .then(() => res.sendStatus(201))
  .catch(error => console.log('Error', error)));

// version 1 - map array of objects to array of numbers.
// Note are elements of queryResults look like this:
//    { unsorted_val: '-8120.001186261061' }
router.get('/', (req, res) => queries.tableOfUnsortedListValues
  .getSorted()
  .then(queryResults => {
    const numListArr = queryResults.map(val => Number(val.unsorted_val));
    const numListJSON = JSON.stringify(numListArr);
    return numListJSON;
  })
  .then(results => res.send(results))
  .catch(error => console.log('Error', error)));

app.set('port', port);
app.set('host', '0.0.0.0');

app.use('/api/db/data', router); // localhost
app.use(`/api/${pgDatabase}/data`, router); // heroku

app.listen(app.get('port'), app.get('host'), () => (
  console.log(`Node app started. Listening on port ${port}`)
));

// version 2 - use regex to produce JSON array
// router.get('/', (req, res) => queries.tableOfUnsortedListValues
//   .getSorted()
//   .then(queryResults => {
//     let results = JSON.stringify(queryResults); // " {"unsorted_val":"9861.676502263701"},... "
//     results = results.replace(/\{|\}|"|:|unsorted_val/gi, '');
//     // console.log(typeof results);
//     return results;
//   })
//   .then(results => res.send(results))
//   .catch(error => console.log('Error', error))
// );

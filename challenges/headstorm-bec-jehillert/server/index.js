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
  .catch(error => console.log('Error', error)),
);

router.get('/', (req, res) => queries.tableOfUnsortedListValues
  .getSorted()
  .then(queryResults => {
    const numListArr = queryResults.map((val) => {
      return Number(val.unsorted_val);
    });
    const numListJSON = JSON.stringify(numListArr);
    // const numListJSON = '[' + JSON.stringify(numListArr) + ']';
    // console.log(numListJSON)
    return numListJSON;
  })
  .then(results => res.send(results))
  .catch(error => console.log('Error', error))
);

app.set('port', port);
app.set('host', '0.0.0.0');

app.use('/api/db/data', router); // localhost
app.use(`/api/${pgDatabase}/data`, router); // heroku

app.listen(app.get('port'), app.get('host'), () => (
  console.log(`Node app started. Listening on port ${port}`)
));



// const router = require('./routes.js');
// module.exports = router;

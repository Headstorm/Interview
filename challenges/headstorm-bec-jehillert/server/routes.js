const router = require('express').Router();
const {
  validateJSON,
  validateAndParseList,
} = require('./middleware');
const queries = require('./queries');

// MIDDLEWARE
router.post('/', validateJSON);
router.post('/', validateAndParseList);

// ROUTES ('controllers')
router.post('/', (req, res) => queries.tableOfUnsortedListValues
  .post(req.body.list)
  .then(() => res.sendStatus(201))
  .catch(error => console.log('Error', error))
);

router.get('/', (req, res) => queries.tableOfUnsortedListValues
  .getSorted()
  .then(results => res.send(results))
  .catch(error => console.log('Error', error))
);

module.exports = router;

const db = require('../db');

module.exports.tableOfUnsortedListValues = {
  // POST
  post: list => db
      .query('INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST(ARRAY[$1:csv])', [list])
      .catch(err => console.log(err)),
  // GET
  getSorted: () => db
      .query('SELECT unsorted_val FROM unsorted ORDER BY unsorted_val')
      .catch(err => console.log(err)),
  // PATCH
  insertValue: value => db
      .query('INSERT INTO unsorted(unsorted_val) VALUES ($1)', value)
      .catch(err => console.log(err)),
};

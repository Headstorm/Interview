const db = require('../db');

module.exports.tableOfUnsortedListValues = {
  post: list => {
    console.log('Insert list...');

    let strList = String(list)
    const delimiter = ',';

    return db
      .query('INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST(STRING_TO_ARRAY($1, $2)::numeric[])', [strList, delimiter])
      .catch(err => console.log(err))
  },

  getSorted: () => {
    console.log('Getting and sorting unsorted list...');
    return db
      .query('SELECT unsorted_val FROM unsorted ORDER BY unsorted_val')
      .catch(err => console.log(err))
  }
}

// queries.data.postListAsUnparsedJSON = () => db
//   .query('INSERT_QUERY_HERE', params)
//   .catch(err => console.log(err));

// queries.data.getUnparsedJSONList = () => db
//   .query('INSERT_QUERY_HERE', params)
//   .catch(err => console.log(err));

/* queries.data.patch = () => db
  .query('INSERT_QUERY_HERE', params)
  .catch(err => console.log(err)); */


const db = require('../db');


// const ids = [1, 2, 3];
// db.any('SELECT * FROM table WHERE id IN ($1:csv)', [ids])
//=> SELECT * FROM table WHERE id IN (1,2,3)

module.exports.tableOfUnsortedListValues = {
  // re POST request
  post: list => {
    console.log(Array.isArray(list));
    return db
      .query('INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST(ARRAY[$1:csv])', [list])
      .catch(err => console.log(err))
  },

  // re GET request
  getSorted: () => {
    return db
      .query('SELECT unsorted_val FROM unsorted ORDER BY unsorted_val')
      .catch(err => console.log(err))
  }

  // re PATCH request
//   addNumberValue: () => {
//
//   },
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

const db = require('../db');

module.exports.tableOfUnsortedListValues = {
  post: params => db
    .query('INSERT INTO unsorted_list (unsorted_id, unsorted_val) VALUES (1, 9053)', params)
    .catch(err => console.log(err)),

  getSorted: () => db
    .query('SELECT unsorted_val FROM unsorted_list ORDER BY unsorted_val')
    .catch(err => console.log(err)),
};

// queries.data.postListAsUnparsedJSON = () => db
//   .query('INSERT_QUERY_HERE', params)
//   .catch(err => console.log(err));

// queries.data.getUnparsedJSONList = () => db
//   .query('INSERT_QUERY_HERE', params)
//   .catch(err => console.log(err));

/* queries.data.patch = () => db
  .query('INSERT_QUERY_HERE', params)
  .catch(err => console.log(err)); */

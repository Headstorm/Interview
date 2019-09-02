PLANNING
———————————————————————————————————————————————————————————————————————————————
 - do not worry about the bonus until you have the basic requirements met


NOTES
———————————————————————————————————————————————————————————————————————————————
- "By default, axios serializes JavaScript objects to JSON."
- "In JSON, array values must be of type string, number, object, array, boolean or null."


GRAVEYARD
———————————————————————————————————————————————————————————————————————————————
express language:
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '/../client/build')));

  app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, 'index.html'));
  });

  router.post('/data', controllers.data.post);
  router.get('/data', controllers.data.get);
  app.use('/api/db', router);
  app.use(`/api/${pgDatabase}`, router);

SQL queries:
  .query('SELECT * FROM sorted_list LEFT JOIN list_sets ON list_sets.list_set_id = sorted_list.list_set_id WHERE list_sets.list_set_id = $1 ORDER BY sorted_list.sorted_value ASC', list_set_id)
  .query('SELECT * FROM unsorted_list LEFT JOIN list_sets ON list_sets.list_set_id = unsorted_list.list_set_id WHERE list_sets.list_set_id = $1 ORDER BY unsorted_list.unsorted_value ASC', list_set_id)

  SORTED INDEX (interesting but unnecessary):
    CREATE INDEX unsorted_as_sorted_index
    ON unsorted_list(unsorted_value);
    DROP INDEX unsorted_as_sorted_index;
    EXPLAIN SELECT * FROM unsorted_list WHERE unsorted_value = '9053';

ENDPOINTS
———————————————————————————————————————————————————————————————————————————————
  TYPE: POST
  PATH: /api/db/data

  DATA VALIDATION:
    - Data structure must be some type of list
    - List must be JSON-formatted
    - List members must all be numbers
    - List must contain only 500 members (numbers)

  REQUIREMENTS:
    form: list            // Error: Invalid data type.  Request payload
                          // is not a JSON-formatted list.

    item-type: numbers    // Error: Each member of list must be a number.

    number-of-items: 500  // Error: List contains too many/too few numbers.
                          // Please check that list contains 500 numbers and
                          // try again.

  MAYBE INCLUDE:
    list-format: json     // Error: Invalid data format. Please resubmit
                          // request payload in JSON format.

  INSTRUCTIONS:
    Provides a POST endpoint at `/data` where a user submits a JSON formatted
    list of 500 random numbers.  The list has to be exactly 500 numbers, if
    there are more or less than 500 an error must be returned.  Similarly, if
    something other than a list of numbers is submitted, an error must be
    returned.

-------------------------------------------------------------------------------
  TYPE: GET
  PATH: /api/db/data

  REQUIREMENTS:
    - List must contain the same members as in list originally posted
    - list must be sorted from lowest to highest
    - Must be a list
    - Must be JSON-formatted

  INSTRUCTIONS:
    Provides a GET endpoint at `/data` which provides the same JSON formatted
    list of 500 numbers that are sorted from lowest to highest.

-------------------------------------------------------------------------------
  ***OPTIONAL***
  TYPE: PATCH
  PATH: /api/db/data
  INSTRUCTIONS:
    Provides a PATCH endpoint at `/data` which inserts a random number into
    the list in the proper order which will be returned by the above POST api.

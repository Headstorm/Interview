TO DO
———————————————————————————————————————————————————————————————————————————————
  Provide API documentation.  Specifically, instructions on the form the data should be in (e.g., array or object), json, etc.

  Figure out why square brackets in GET response are removed in response.body received by client.

REMARKS & FEEDBACK
———————————————————————————————————————————————————————————————————————————————
  - If you would like to test the code but you do not use Postgres, I can create the database on my Heroku account, and change the code to query the host url instead of localhost.  It should not take me too long to set up.  Errors should show up on the client size for all circumstances specified in the instructions, but note that some of my customized error messages I was only able to make show up on the server-side console.

  - I did not include formal tests that use a 3rd party library, but did include a few scripts that should make testing the code relatively painless:

    $ npm run create-numbers-list
      This script creates an array of 500 numbers in a file called 'numbers-list.json'. Requirements can be tested by modifying the generated file (e.g., by adding or removing numbers from the file, changing some numbers to words, etc.), or by modifying the script (e.g., changing the 'listLength' variable at the head of the file).

    $ npm run test
      This script does the following:
        - terminates active sessions (which would otherwise prevent the next steps)
        - wipes the database
        - creates a new database and tables according to 'scripts/schema.sql'
        - makes a Post request to populate the database table with the contents of 'numbers-list.json' as a list of unsorted numbers.
        - makes a Get request to retrieve the numbers as a sorted JSON-formatted list.

      $ Testing different requirements:
        - I may have missed something, but I believe all requirements can be tested by running "npm run create-numbers-list" once, then modifying the generated list file, 'numbers-list.json' between different runs of 'npm run test' to produce breaking conditions.
        - Some times the test script will get stuck at the beginning for about 10 seconds and show some errors. If this happens, just execute the command again and the script will run normally the second time.

  - One thing I tried and could not make work was bubbling my personalized errors back to the client console.  An error is returned, but it is Axios's mega-error, with everything possible included.  When I tried to end the response early in my route with a custom error message, Express returned it's own error message:
    "Error Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
  I understand the point of the message, but cannot finding anything in the preceding code that is writing to headers. Still have a bit to learn about express...

INSTRUCTIONS
———————————————————————————————————————————————————————————————————————————————
  Create REST API with the following functionality:

  Provides POST endpoint at `/data` where user submits JSON-formatted list of 500 random numbers.  List must be exactly 500 numbers. API returns error if list length +/- 500. API returns error if payload is not list of numbers.

  Provides a GET endpoint at `/data` which provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.

  Provides a PATCH endpoint at `/data` which inserts a random number into the list in the proper order which will be returned by the above POST api.

  https://www.restapitutorial.com

ASSUMPTIONS & PLANNING
———————————————————————————————————————————————————————————————————————————————
  - Instructions state "user submits a JSON formatted list of 500 random numbers", so API will not consider URL-encoded data.
  - The error is not triggered when the Patch request inserts an extra number into the list.
  - "list of numbers" is refering to an array
  - Requirement in instructions to return various errors is testing middleware skills.
    > check if body-parser.json() automatically returns error if receives improperly formatted data.
    > review how to propagate errors in middleware
  - 500 number limitation is only

NOTES
———————————————————————————————————————————————————————————————————————————————
  - "By default, axios serializes JavaScript objects to JSON."
  - "In JSON, array values must be of type string, number, object, array, boolean or null."

TESTING QUERIES VIA POSTGRES TERMINAL
———————————————————————————————————————————————————————————————————————————————
  POST QUERY - Posting numbers
    Insert UNORDERED_JSON as COLUMN value:
      INSERT INTO list_sets (unsorted_json_list) VALUES ('[9053,-1069,7056,-5551,775]');

      const unordered_json_list = [9053,-1069,7056,-5551,775];
      db.query('INSERT INTO list_sets (unsorted_json_list) VALUES ($1)', unordered_json_list)

    Insert UNSORTED_LIST as TABLE values
      INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, 9053);
      INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, -1069);
      INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, 7056);
      INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, -5551);
      INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, 775);

      const list_set_id = 1;
      const unsorted_value = __________;
      params = [list_set_id, unsorted_value];
      db.query('INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES ($1, $2)', params)

  GET QUERY - Retrieve numbers as ordered list
      db.query('SELECT unsorted_value FROM unsorted_list ORDER BY unsorted_value');

  GET QUERY - Retrieve numbers as unordered list
      db.query('SELECT unsorted_value FROM unsorted_list')

GRAVEYARD
———————————————————————————————————————————————————————————————————————————————

  // axios.post(url, { list })
  //   .then(response => console.log(response.data))
  //   .catch(err => console.log(err));
  //
  // axios.get(url)
  //   .then(response => console.log(response.data))
  //   .catch(err => console.log(err));

  // rejects if 'list' payload is not an array
  function rejectIfNotArray(req, res, next) {
    Promise.resolve().then(() => {
      const isArray = Array.isArray(req.body.list);
      if (!isArray) {
        throw new Error(`Request body does not contain a resource designated as 'list' of type 'Array'.`);
      }
      next();
    }).catch(next);
  }

  function validateListLength(req, res, next) {
    Promise.resolve().then() => {
      const listLength = req.body.list.length;
      if ( listLength !== 500 ) {
        throw new Error(`Resource 'list[]' should contain 500 members/elements, but has ${listLength} instead.`));
      }
      next();
    }).catch(next);
  }

  function rejectIfNonNumberListElements(req, res, next) {
    Promise.resolve().then() => {
      listArr = req.body.list.
    }
  }

  const isNumber = (randomValue) => {
    return typeof randomValue === 'number';
  }
  list.every(isNumber);

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
    - Data structure must be some type of list (test & error on fail)
    - List must be JSON-formatted (test & error on fail)
    - List members must all be numbers (test & error on fail)
    - List must contain only 500 members (numbers) (test & error on fail)

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

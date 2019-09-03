TO DO
———————————————————————————————————————————————————————————————————————————————
  Make sure error from bodyparser indicates the correct information.

  X Make sure content of rest api tutorial is not something that is going to change what you thought the assignment was about.

  Provide API documentation.  Specifically, instructions on the form the data should be in (e.g., array or object), json, etc.

  Changes to make to variable names:
    sorted_list_val_id ==> sorted_val_id
    unsorted_list_val_id ==> unsorted_val_id

QUESTIONS
———————————————————————————————————————————————————————————————————————————————
  Hi Gianna,

  Would it be possible to pass the following questions on to the developers in charge of the Back End Challenge?  Brief answers would be fine (and greatly appreciated)

  Thanks much,

  John

  -----------------------------------------------

  QUESTION 1: Should we store the data as a table row containing a JSON, a table of parsed number values (each number a row), or is there another preferred structure. My [imperfect] understanding is that a table of values is strongly preferred, at least in the context of relational databases.

  QUESTION 2:  May we store the data in unsorted form, and handle sorting at the retrieval stage?  My understanding is that adding new values to the bottom rows of a table as the values come in, and then handling sorting when the data is needed, is preferred.

  QUESTION 3:  Is the 500 number constraint only applicable to execution of the Post request or is the PATCH request supposed to conform to the same limitation?  In the latter case, should the code delete another member of the list every time a new one is inserted?

  QUESTION 4: Can you clarify what is meant by "a PATCH endpoint at `/data` which inserts a random number into the list in the proper order which will be returned by the above POST api?"  This question ties in to 2nd and 3rd. Is this part of the instructions suggesting that the data should be maintained/stored at the back-end as an ordered list (Q2)?  Is the PATCH supposed to conclude by utilizing some part of the POST route? Also, the POST API suggests the list should stay at 500 members, but the effect of the PATCH would create 501 (Q3).

  // BACKSTORY


  QUESTION 1: Should we store the data as a JSON, a table of values, or is there another preferred structure.

  I ask for two reasons. First, I have run into a few Stack Overflow questions where the OP asks about storing a list as a single entry/row in a database table. The question is always met with three or four backend engineers warning that it is bad practice to do so, even if it is possible.

  Storing as a table seems fine to me, except for the second part.  The bonus instructions indicate that the PATCH request should "insert a random number into the list." I may misunderstand, but it seems a PATCH request would be applicable to modifying a json than it would inserting values into a table.  An article I read descries a PATCH request as follows:

    A PATCH request...is used to make changes to part of the resource at a location. That is, it PATCHES the resource — changing its properties... [I]f a PATCH request is made to a non-existent url...it should simply fail without creating a new resource unlike PUT.

  If I store the list in the database as a JSONB, then I think I see how "inserting the number" is changing 'part of the resource at a location'.  But if the list is stored as a table of values, then I am confused, as inserting the value creates a new entry, either by the new value occupying a new spot in memory or by the new value forcing an old one to move to a new spot (unless the 500 limit is enforced here, then I can see how a substitution would count).

  QUESTION 2: Are the instructions requesting that we store the data as a sorted list, or in unsorted form?

  Is storing in unsorted form and then sorting via retrieval query acceptable? My [somewhat unscholarly] understanding of databases is that it is better to add new values to the end of a database table and not worry about moving stuff around.  Then when the data is needed, it can be reorganzied appropriately.

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

  const isNumber = (val) => {
    return typeof val === 'number';
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

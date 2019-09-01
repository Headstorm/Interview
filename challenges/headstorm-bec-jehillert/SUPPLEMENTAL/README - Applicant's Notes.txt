PLANNING
———————————————————————————————————————————————————————————————————————————————
 - do not worry about the bonus until you have the basic requirements met


NOTES
———————————————————————————————————————————————————————————————————————————————

REMINDERS
———————————————————————————————————————————————————————————————————————————————


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

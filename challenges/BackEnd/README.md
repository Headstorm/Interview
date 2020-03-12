# Headstorm Backend Challenge

by Javier Castro

## How to run

From command line:

1. Navigate to BackEnd directory
2. Run the `challenge.py` file using python3

NOTE: requires python3, Flask and Flask-RESTful to be installed

3. API will run on indicated host and port #

## How to test

1. Make `POST`, `GET`, `PATCH` requests to indicated host and port #
2. Endpoint is `/data`
   > Example: `http://host:port/data`
3. API expects JSON object syntax:

   POST

   ```
   {
       "list": [int,int,...]
   }
   ```

   PATCH

   ```
   {
       "number": int
   }
   ```

   GET

   ```
   //no body needed
   ```

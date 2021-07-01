# Headstorm Programming Challenges

## Front End Challenge

The project is in frontend folder. Just open the folder and open the index.html file.

## Back End Challenge

Create a REST API using java Spring web framework which performs the following functionality:

- Provides a POST endpoint at `/data` where a user submits a JSON formatted list of 500 random numbers. The list has to be exactly 500 numbers, if there are more or less than 500 an error must be returned. Similarly, if something other than a list of numbers is submitted, an error must be returned.
- Provides a GET endpoint at `/data` which provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.

> random-rest foolder holds colder to this challenge. A jar file is generated that solves the challenge

```sh
$ java -jar target/random-rest-0.0.1-SNAPSHOT.jar

# use curl, postman or browser to query the api
# using curl to GET
curl http://localhost:8080/data 
# to POSt user array in random-rest folder test.json
```

## Database Challenge

### Part 1

Relational data model visualization.
 > open db-challenge folder; there is uml, and png file.

### Part 2

A basic program i that read in a JSON file that contains the records from the old database (Nosql), format the data to match your new data model, and print SQL statements to console/standard IO that would insert these records into the new database.

> The jar file is in the folder with the generated json file

```sh
java -jar db-challenge-1.0-SNAPSHOT.jar no-sql-data.json

```

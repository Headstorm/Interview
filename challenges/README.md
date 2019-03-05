# Headstorm Programming Challenges

  The following is a set of front-end, back-end, and database challenges that can be completed to supplement your resume as part of the interview process with Headstorm. Technology is a core element of our culture at Headstorm and we hope you find these challenges interesting. Complete as many of the challenges as you desire.  It is acceptable to submit an incomplete solution to any challenge.

### Submission Instructions

  Submit a [Pull Request](https://help.github.com/en/articles/about-pull-requests) (PR) to this repository. Once your PR is created, engineers at Headstorm will review the request and engage in commentary and questions on your PR.

## Front End Challenge

A company has approached you for help in developing their product and establishing an online presence. You have been tasked with quickly creating a web page for them. This page has the following requirements:

* Startup name title

* Startup logo as icon in browser tab

* Contact us web form that captures contact information

* Google reCaptcha V3 implement in page. Submission of form requires Google captcha pass

* Dump all the information from the form submission to browser console. Google reCaptcha Reference: https://developers.google.com/recaptcha/docs/display

## Back End Challenge

  Create a [REST API](https://www.restapitutorial.com) using any language or web framework you prefer, which performs the following functionality: 
  - Provides a POST endpoint at `/data` where a user submits a JSON formatted list of 500 random numbers.  The list has to be exactly 500 numbers, if there are more or less than 500 an error must be returned.  Similarly, if something other than a list of numbers is submitted, an error must be returned.
  - Provides a GET endpoint at `/data` which provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.
  
  **BONUS:**
  
  - Provides a PATCH endpoint at `/data` which inserts a random number into the list in the proper order which will be returned by the above POST api.
  

## Database Challenge

  **Part 1**
  
  The startup client chose to use a NoSQL database in their original system so that they could skip data modeling. The number of users for their system is growing rapidly. To support the new demands the client has chosen to move to a relational database. Please review the current data stored in the NoSQL database and submit a new relational data model visualization.

Startup Order NoSQL Database

|Field Name | Type   | Sample Value |
| --------- | ------ | ------------ |
|Record ID  | Number | 1234         |
|Name       | String | Joe Smith    |
|Cell Phone | String | 405.867.5309 |
|Work Phone | String | 123.123.1234 |
|Email      | String |joe_s@gmail.com |
|Address    | String | 123 Vic Way, Dallas TX 75001 |
|Basic Widget Order | Number | 37 |
|Advanced Widget Order | Number | 12 |
|Protection Plan | Boolean | True |

**Part 2**

  The next step is to create a solution for the client that can migrate the data from their current database to your new relational database. Write a basic program in a language of your choice such as Python or Java. Read in a JSON file that contains the records from the old database, format the data to match your new data model, and print SQL statements to console/standard IO that would insert these records into the new database.
  

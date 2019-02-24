# Headstorm Programming Challenges

  The following is an optional front end and back end challenge that can be completed to supplement your resume as part of the interview process with Headstorm. Technology is a core element of our culture at Headstorm and we hope you find these challenges interesting. Complete as much of each challenge as you are able. It is acceptable to submit an incomplete solution but be sure to turn in your best work.

### Submission Instructions

  Submit a Pull Request(PR) to this repository. Once your PR is created, engineers at Headstorm will review the request and engage in commentary and questions on your PR.

## Front End Challenge

An exciting startup has approached us for help in developing their product and establishing an online presence. You have been tasked with quickly creating a placeholder web page for this startup to establish a basic online presence. This page has the following requirements:

* Startup name title.

* Startup logo as icon in browser tab.

* Contact us web form that captures contact information.

* Google reCaptcha V2 implement in page. Submission of form requires Google captcha pass.

* Dump all the information from the form submission to browser console. Google reCaptcha Reference: https://developers.google.com/recaptcha/docs/display

## Back End Challenge
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

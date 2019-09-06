## Database Challenge

  **Part 1**

  The company client chose to use a NoSQL database in their original system so that they could skip data modeling. The number of users for their system is growing rapidly. To support the new demands the client has chosen to move to a relational database. Please review the current data stored in the NoSQL database and submit a new relational data model visualization.

Company Order NoSQL Database

|Field Name              | Type    | Sample Value                 |
| -----------------------| ------  | -----------------------------|
|Record ID               | Number  | 1234                         |
|Name                    | String  | Joe Smith                    |
|Cell Phone              | String  | 405.867.5309                 |
|Work Phone              | String  | 123.123.1234                 |
|Email                   | String  | joe_s@gmail.com              |
|Address                 | String  | 123 Vic Way, Dallas TX 75001 |
|Basic Widget Order      | Number  | 37                           |
|Advanced Widget Order   | Number  | 12                           |
|Protection Plan         | Boolean | True                         |

**Part 2**

  The next step is to create a solution for the client that can migrate the data from their current database to your new relational database. Write a basic program in a language of your choice such as Python or Java. Read in a JSON file that contains the records from the old database, format the data to match your new data model, and print SQL statements to console/standard IO that would insert these records into the new database.

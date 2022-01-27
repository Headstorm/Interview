# Database Challenge for Headstorm

By Philip Kaufholz


# Entity relationship diagram
An ER diagram for what I think the new relational database should be is included. Customer personal info would be in the "Customers" table, while their ID would also be used to store
the widgets and any other information. This keeps internal product-related information separate from more sensitive personal information, and just helps keep all of the data organized.

# Introduction

Node.js Javascript program that takes in the specified NoSQL input and outputs PostgreSQL queries to insert the data into the new database. Reference queries are provided towards the end of the file to create the PostgreSQL tables that the data is inserted to.

The NoSQL database is contained within nosql.json, and is imported by the program. The PostgreSQL queries are outputed to psqlOut.txt. 



# How to run
Instructions to run: 
1. install node packages ('npm install' in console)
2. run 'node index.js' in console
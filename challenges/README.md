# Headstorm Programming Challenges

These are my solutions to the 3 challenges provided.

## Front End Challenge

The front end proved troublesome in regards to the reCaptcha v3 verification. Setting up the page itesl (icon, title, and form) was easy enough, but I was unable to print info to console when integrating reCaptcha. Advice on how to accomplish this would be greatly appreciated.

## Backend Challenge

Three APIs at the endpoint /data with the features below:

- GET the list of numbers after being sorted.

- POST a list of numbers with the following format: `{"numbers":[1,2,...,500]}`

**BONUS:**

- PATCH a number into the list in the following JSON format: `{"number":1}`.
  <br>The number will be placed into the list in sorted order.

API testing done using Postman on localhost:3000.

Created with express and node.js. Run using:

```text
npm install
node index.js
```

## Database Challenge

The database program reads data from a "data.json" file which is checked for. The program also checks whether a person's name exist so that the same customer ID can be assigned to the current widget order. It was done in a python 3.10 venv.

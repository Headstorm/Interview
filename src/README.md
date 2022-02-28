# Backend Challenge

Three APIs at /data that will perform the following functions:

POST a list of numbers in the following JSON format: ```{"numbers":[1,2,3,...]}```. The list of numbers must contain 500 numbers (no more, no less).

GET the list of numbers that was posted, in ascending sorted order.

PATCH a new number into the list in the following JSON format: ```{"number":1}```. The number will be placed into the list in sorted order.

## Usage

Created using express and node.js. To run, navigate to this directory in the command line and run the following commands:

```text
npm install
npm start
``` 
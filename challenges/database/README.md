### Database

This program takes JSON data from a NoSQL database and prints out commands to create a relational database in MySQL. The JSON data must be formatted as shown in the example.json file which was generated with [Mockaroo](https://mockaroo.com). 

### Usage

Make sure you have Python 3 installed and run:

`python translate.py [json file here]`

I have included an example.json file which can be used for testing purposes. 

### Model

The data is constrained to what was provided in the challenge question. If you see `model.png` you can see that I have opted for 2 tables. The first is for storing data on users and the other is storing data for orders. The order table has a foreign key which references the record ID from the user table. This lets a user have many orders. 

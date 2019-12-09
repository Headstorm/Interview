# Accomplished
* For this challenge, I created a small flask app that
	* accepts a json request as `{"array": []}` where the list contains 500 numbers
	* has a GET endpoint that returns the last array, sorted. 
	* json must contain an array of 500 numerical values. 

# Folder Structure
|back-end-challenge/
|- test_files/
   |- __init__.py
   |- test_json_methods.py
|- myapp
   |- data/
      |- arrays.json
   |- template/
      |- data.html
      |- index.html
   |- __init__.py
   |- app.py
   |- json_methods.py
   |- README.md

# Future Work
* Include css for each page
* Refactor code to extend html files using flask api and not just hardcode my html pages
* Move files from a json file to a database file (mongo)
* Create an ORM for the database to interact with the data

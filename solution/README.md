# HeadStormInterview
Programming Challenge by Headstorm

Before running the app; you will need to export the `SITE_KEY` and the `SECRET_KEY` of Google Recaptcha V3 into environment variables.

Once the above step has been completed, to run the app, go to **webapp/**  and execute 
    
    1. npm install (only the first time)
    2. npm start
    3. Open localhost:3000 in the browser

To run the script to transfer data from non-relational to relational database, go to the **database/** and execute
  
	python loaddb.py <filename> 

The script takes input a json file which contains data that is to be moved to a relational database

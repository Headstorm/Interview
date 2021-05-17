# Back End Challenge 

I really enjoyed this challenge, the PATCH method was new to me. I have doubts that I implemented it incorrectly, but I hope that my approach was in line with proper implementation. In order to complete the bonus challenge, I took two things into account that lead me to the implementation of a Binary Insert: first, we have a set a data that is sorted; second, we need to insert an integer in the proper order. 

# Setup 

Create a virtual environment:
  `python3 -m venv .venv`

Activate the virtual environment:
  `source .venv/bin/activate`

Install Libaries:
  `pip install -r ./requirements.txt`
  
Make `.env` file and insert the following: 
  `FLASK_APP='run.py'`
OR execute this in bash/zshshell:
  ```sh
  echo FLASK_APP='run.py' >> .env
  ```

The `.env` file is for the dotenv library to automatically export the variables when the application runs. Therefore you don't have to re initilize the variables each time.

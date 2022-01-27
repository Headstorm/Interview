# Backend Challenge for Headstorm

By Philip Kaufholz


# Introduction

Javascript program that uses Node.js Express to host a local server that implements the REST API as specified in the challenge writeup.

POSTing a list of 500 numbers to /data will sort the list and become accessible through a GET call. Posting a list that isn't 500 numbers will return an error. The "bonus" PATCH functionality is also implemented, sorting the new element into the existing list.

Note that a sample list isn't there on load, so using the GET endpoint before POSTing a list will show that no list has been uploaded.

# How to run

1. install node packages ('npm install' in console)
2. run 'node index.js' in console. Server hosted on port 3000 by default.
3. To make REST calls, suggested to use a GUI like Postman or Reqbin (what I used for testing) https://reqbin.com/ .


import sys
import os
import requests
import json
import random
''' 
main.py
backendChallenge_client.py
By: Derek Hernandez


Client task: 
Generate  500 random numbers and POST to main server, sort them and use GET, get random user number and PATCH.


***If server is not re-ran after each client, it will append each client to api 
'''

url = "http://127.0.0.1:5000/"
urljson = "http://127.0.0.1:5000/data"

list_object = []
#Iterate 500 times, and generate 500 random numbers in range of +-sys.argv[1]
for x in range(0,500):
    json_object = {
        "Index": x,
        "Random Value": random.randint(-int(sys.argv[1]), int(sys.argv[1]))
    }
    list_object.append(json_object)
    json_object = {}

#POST
r = requests.post(urljson, json=(json.dumps(list_object)))
#GET
r = requests.get(urljson)
#PATCH
#list_object.append(user_num)
r = requests.patch(urljson, json = json.dumps({
    "Index": 500,
    "Random Value": int(sys.argv[2])})
)
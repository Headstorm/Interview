"""
Assumptions made:
1. For the GET method, assuming that whenever that GET method is ran, list will always be size 500,
so no need to check and just return the sorted list. 

2. For the overall API, assuming this would be ran locally so enabled it to be ran locally. Otherwise,
possible to corrected and be ran on a server and use a curl command to access it. 
"""

"""
Used Flask to be able to create the REST API and used some in built functions to be able to execute 
certain calculations more efficiently. 
"""

from flask import Flask, request
from flask_restful import Resource, Api, reqparse, abort
import pandas as pd
import ast
import random, json, requests, re, bisect

app = Flask(__name__)
api = Api(app)
NUMBERLIST = {"list":[]}

# Class Declaration that contains all 3 different methods
class ListData(Resource):
    # Retrieve Data, sort before returning 
    def get(self):
        NUMBERLIST['list'].sort()
        return NUMBERLIST

    # Create Data, make sure all entries are numbers and size is of 500
    def post(self):
        numlist = []
        templist = str(request.data).split(',')
        for i in templist:
            temp = re.sub("[^0-9]", "", i)
            numlist.append(int(temp))
        
        if(len(numlist) == 500):
            result = all(isinstance(x, int) for x in numlist)
            if (result == True):
                NUMBERLIST['list'] = numlist
                return NUMBERLIST
            else:
                abort(400,"Invalid Input. All entries have to be numbers.")
        else:
            abort(400, "Invalid input. Length is not 500.")

    # Insert one element in corresponding order
    def patch(self):
        entry = str(request.data).strip()
        temp = re.sub("[^0-9]", "", entry)
        
        # Check if the single entry is a number or not
        if(temp.isnumeric()):
            # Use built in function to insert entry in a sorted list
            bisect.insort(NUMBERLIST['list'], int(temp))
            return NUMBERLIST
        else:
            abort(400,"Invalid Input. All entries have to be numbers.")

api.add_resource(ListData, '/data/')  # '/data' is our entry point
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


# Testing Commands
payload = []
for i in range(0, 500):
    payload.append(random.randint(0,1000))

newPayload = json.dumps(payload)
newData = str(random.randint(0,1000))

r=requests.post("http://localhost:5000/data/",data=newPayload)
r=requests.get("http://localhost:5000/data/")
r=requests.patch("http://localhost:5000/data/",data=newData)


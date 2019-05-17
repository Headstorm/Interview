from flask import Flask
from flask import request
import json
import requests

app = Flask(__name__)
arr = []

@app.route('/')
def index():
	return "Hello World!"

@app.route('/data', methods = ['GET'])
def sortnumbers():
        if len(arr) == 0:
                return "Number list is empty"
        arr.sort()
        res = dict()
        res['numberList'] = arr
        return json.dumps(res)

@app.route('/data', methods = ['POST'])
def validatenumbers():
        if request.heads['Content-Type']!='application/json':
                return "Invalid format"
        response = requests.request('POST', 'http://localhost:5000/data/list.txt')
        e = response.json()
        arr = e['numberList']
        if(len(arr)!=500):
                return "Invalid length!"
        else:
                return "List accepted successfully!"




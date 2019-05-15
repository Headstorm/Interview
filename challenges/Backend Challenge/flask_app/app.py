from flask import Flask
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
	res = ""
	for ele in arr:
		res += str(ele) + " "
	return res

@app.route('/data', methods = ['POST'])
def validatenumbers():
	response = requests.request('POST', 'http://localhost:5000/data/list.txt')
    e = response.json()
    arr = e['numberList']
    if(len(arr)<500):
    	return "Invalid length!"
    else:
    	return "List accepted successfully!"
from flask import Flask, request
from flask_restful import Resource,Api,reqparse, abort
import requests

app = Flask(__name__)
api = Api(app)

NUMBERLIST = {"list":[]}

class ListProcess(Resource):
	def get(self):
		#Sort before returning
		if(len(NUMBERLIST['list']) > 0):
			NUMBERLIST['list'].sort()
			return NUMBERLIST
		else:
			abort(404, message="No lists found.")
	
	def post(self):
		numlist = str(request.data).strip()
		numlist = numlist.split(sep=',')
		templist = []
		if(len(numlist) == 500):
			allnumbers = True
			for entry in numlist:
				entry = entry.replace('b\'','')
				entry = entry.replace('\'','')
				if(entry.isdigit() == False):
					allnumbers = False
				else:
					templist.append(int(entry))
			if(allnumbers == True):
				NUMBERLIST['list'] = templist
				return NUMBERLIST
			else:
				abort(400,message="Bad input. All entries must be numbers.")
		else:
			abort(400, message="Bad input. Length must be 500.")
	
	def patch(self):
		entry = str(request.data).strip()
		entry = entry.replace('b\'', '')
		entry = entry.replace('\'', '')
		if(entry.isdigit()):
			NUMBERLIST['list'].append(int(entry))
			NUMBERLIST['list'].sort()
			return NUMBERLIST
		else:
			abort(400,message="Bad input. All entries must be numbers.")

api.add_resource(ListProcess, "/data/",endpoint='data')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, Api
from operator import itemgetter
import copy
import json

app = Flask(__name__)
api = Api(app)

holder = []
sortholder = []
patch = []
patchsort = []
temp = []
space = ["Normal:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------", "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"]
sortspace = ["Sorted:----------------------------------------------------------------------------------------------------------------------------------------------------------------------", "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"]
patchspace = ["PATCH:----------------------------------------------------------------------------------------------------------------------------------------------------------------------", "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"]

'''
main.py (server)
backendChallenge_client.py (client)
By: Derek Hernandez

Client task: 
Receive Data from client and process it. Display them. 

* Note: 
I was able to get api requests working correctly, in reguards to the /data url. However, displaying on /data was tricky.
Hence, the reason all three versions of the api are available on /. 
'''


'''
JSON(Resource)
process data sent to /data url. 

***/data return process needs to complete before display. Can't dynamically update page
'''
class JSON(Resource):
    def get(self):
        sortholder.append(sorted(holder[0], key=lambda a: a['Random Value'], reverse=True))
        #sortholder.append(json.loads(request.get_json(force=True)))
        return (redirect("print"))
    def post(self):
        holder.append(json.loads(request.get_json(force=True)))
    def patch(self):
        patch = copy.deepcopy(sortholder)
        patch[0].append(json.loads(request.get_json(force=True)))
        patchsort.append(sorted(patch[0], key=lambda a: a['Random Value'], reverse=True))
'''
Print(Resource)
display data posted on / 

'''
class Print(Resource):
    def get(self):
        return self.printStuff(space) + self.printStuff(holder) + self.printStuff(sortspace) + self.printStuff(sortholder) + self.printStuff(patchspace) + self.printStuff(patchsort)
    def printStuff(self, list):
        return list

"""
url paths
"""
api.add_resource(JSON, '/data')
api.add_resource(Print, '/')

if __name__ == "__main__":
    app.run(debug=True)
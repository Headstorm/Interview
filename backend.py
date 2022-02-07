from flask import Flask, request
from flask_restful import Api, Resource
import json

app  = Flask(__name__)
api = Api(app)

class backend(Resource):
    def post(self,fileName):
        with open(fileName, "r") as Data:
            data = json.load(Data)

        size = len(data)
        #checks if each variable is a number
        for i in data:
            if(type(i) != int):
                return{"Error": "A list of numbers must be submitted"}

        #checks if there are 500 numbers
        if(size != 500):
            return{"Error": "Incorrect amount of numbers, needs to be 500"}

        return {"Success": "Valid JSON File"}
    
    #sorts the json formatted list from highest to lowest
    def get(self,fileName):
        with open(fileName, "r") as Data:
            data = json.load(Data)

        SortedData = data.sort()
        return SortedData
    
api.add_resource(backend, "/data/<int:video_id>")

if __name__ == "__main__":
    app.run(debug=True)
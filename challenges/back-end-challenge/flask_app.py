
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, Response
import json
from os import path

app = Flask(__name__)

sorted_data = []

@app.route('/data', methods=["GET","POST","PATCH"])
def hello_world():

    try:
        if request.method == "POST":

            data = request.json
            if data is None or len(data) != 500:
                return Response("Exactly 500 numbers are required, please try again.", status=400)
            data.sort()
            with open('numbers.json', 'w') as f:
                json.dump(data, f)
            return "Data captured successfully! Use GET request to receive sorted list!"
        elif request.method == "GET":

            if path.exists("numbers.json"):
                with open('numbers.json', 'r') as f:
                    data = json.load(f)
                    return str(data)
            else:
                return Response("Please send a list of 500 numbers via POST request first.", status=400)
        elif request.method == "PATCH":

            if path.exists("numbers.json"):
                number = request.json
                if number is None or len(number) != 1:
                    return Response("Exactly 1 number is required, please try again.", status=400)
                with open('numbers.json', 'r') as f:
                    data = json.load(f)
                data.extend(number)
                data.sort()
                with open('numbers.json', 'w') as f:
                    json.dump(data, f)
                return str(data)
            else:
                return Response("Please send a list of 500 numbers via POST request first.", status=400)

    except Exception as e:
        return Response(str(e), status=400)



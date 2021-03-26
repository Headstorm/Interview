import sys
import flask
from flask import request, session
import json

app = flask.Flask("backend-challenge")
app.config["DEBUG"]=True
app.secret_key = 'secret_key'

@app.route('/', methods=['POST'])
def postRequest():
    sessionNumbers = json.loads(request.form['Numbers'])

    if(len(sessionNumbers) != 500):
        return json.dumps({'message':'POST Error - Incorrect amount of numbers'}), 400, {'Content-Type':'application/json'}
    
    for n in sessionNumbers:
        if(type(n) != int):
            return json.dumps({'message':'POST Error - Values must be numbers'}), 400, {'Content-Type':'application/json'}
    
    return json.dumps({'message':'POST Success'}), 200, {'Content-Type':'application/json'}

@app.route('/', methods=['GET'])
def getRequest():
    sessionNumbers = json.loads(request.form['Numbers'])
    sessionNumbers.sort()
    
    return json.dumps(sessionNumbers), 200, {'Content-Type':'application/json'}
    
app.run(debug=True)

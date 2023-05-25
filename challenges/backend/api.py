import flask
from flask import request, session
import json


app = flask.Flask("App name")
app.config["DEBUG"] = True
app.secret_key = 'secret'

# default route
@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome to the web api</h1>\n<p>Methods are POST, GET, and PATCH to /data</p>"

# post 500 nums
# body: {'nums': json list of 500 numbers}
# returns: success or failure with message
@app.route('/data', methods=['POST'])
def acceptNums():
    try:
        # check if nums was passed
        nums = json.loads(request.form['nums'])
        
        # check for 500 values
        if len(nums) != 500:
            return json.dumps({'success':False, 'message': 'ERROR: Method requires 500 nums'}), 400, {'ContentType':'application/json'} 

        # check for any non-numbers
        for n in nums:
            if type(n) != int and type(n) != float:
                return json.dumps({'success':False, 'message': 'ERROR: All values must be numbers'}), 400, {'ContentType':'application/json'} 
        
        # save to session (sorted)
        nums.sort()
        session['nums'] = nums
        
        # return success
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
    except: 
        return json.dumps({'success':False, 'message': 'ERROR: "nums" json list not provided in body'}), 400, {'ContentType':'application/json'} 
   
# get nums back
# returns: a message of success/failure and json list of 500 nums
@app.route('/data', methods=['GET'])
def returnNums():
    if 'nums' in session:
        return json.dumps({'success':True, 'nums': session['nums']}), 200, {'ContentType':'application/json'} 
    else:
        return json.dumps({'success':False, 'message': 'No nums sent to sort yet'}), 400, {'ContentType':'application/json'} 

# insert a number
# body: {"toInsert": number}
# returns: a message of success/failure and the new list of numbers
@app.route('/data', methods=['PATCH'])
def patchNums():
    # check if numbers are in the session
    if 'nums' in session:
        try:
            toInsert = int(request.form['toInsert'])
            # interate through numbers until a number larger than toInsert is found, then insert
            for i, n in enumerate(session['nums']):
                if n > toInsert:
                    session['nums'] = session['nums'][:i:] + [toInsert] + session['nums'][i::]
                    # return successful
                    return json.dumps({'success':True, 'nums': session['nums']}), 200, {'ContentType':'application/json'} 
        except:
            return json.dumps({'success':False, 'message': 'Must provide a "toInsert" number in body'}), 400, {'ContentType':'application/json'} 
    else:
        return json.dumps({'success':False, 'message': 'No nums sent to sort yet'}), 400, {'ContentType':'application/json'} 


app.run()
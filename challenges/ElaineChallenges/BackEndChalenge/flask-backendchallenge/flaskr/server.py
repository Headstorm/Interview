from flask import Flask
from flask import request
import json
from flask import jsonify

app = Flask(__name__)


numbers = [0]*500

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/data', methods=['GET', 'POST', 'PATCH'])
def data():
    global numbers
    if request.method == 'POST':
        #get raw data
        try:
            data = request.get_json()

        except ValueError as data_type_error:
            return "Error! data type is not json"

        if not data:
            return "Error! data type is not json"

        #validate JSON
        try:
            data = json.loads(data)

        except ValueError as err:
            return "Error! data type is not json"

        # check len == 500
        data_Len = len(data)

        if data_Len != 500:
            return "Error! data length is not 500 numbers"

        # check is number
        non_num = any(not isinstance(x, (int, float, complex)) for x in data)

        if non_num:
            return "Error! data contains non-number element"

        numbers = data
        #print(numbers)
        return "POST"

    elif request.method == 'GET':
        numbers.sort()
        #print(numbers)
        return jsonify(numbers)

    elif request.method == 'PATCH':
        single_number = request.get_json()
        single_number = json.loads(single_number)
        numbers.append(single_number)
        numbers.sort()

        #print(numbers)
        return jsonify(numbers)




if __name__ == '__main__':
    app.run()
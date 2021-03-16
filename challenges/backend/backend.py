from flask import Flask, jsonify, request
import json
app = Flask(__name__)

data_list = []

@app.route('/data', methods=['GET', 'POST', 'PATCH'])
def data_api():
    global data_list
    if request.method == 'GET':
        return jsonify(data_list)
    elif request.method == 'POST':
        in_json = request.get_json()
        if len(in_json) == 500 and all(map(lambda x: type(x) == int, in_json)):
            data_list = list(sorted(in_json))
            return jsonify(data_list)
        else:
            return 'Bad request', 400
    elif request.method == 'PATCH':
        pass

if __name__ == '__main__':
    app.run(debug=True)

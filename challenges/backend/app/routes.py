from flask import request, url_for
from app import app, Data


@app.route('/')
@app.route('/index')
def index():
    return "Please visit {}.".format(url_for('get_data'))


# --- GET data ---
@app.route('/data', methods=['GET'])
def get_data():
    data = Data.get_data()
    return data


#  --- POST data ---
@app.route('/data', methods=['POST'])
def post_data():
    data, status_code = Data.set_data(request)
    return data, status_code


# --- PATCH data ---
@app.route('/data', methods=['PATCH'])
def patch_data():
    data, status_code = Data.patch_data(request)
    return data, status_code


# --- DELETE data ---
# for testing purposes
@app.route('/data', methods=['DELETE'])
def delete_data():
    data, status_code = Data.delete_data()
    return data, status_code

from flask import Flask
from flask import render_template, request
from json_methods import add_data, get_recent_array
import json
import os

# init

app = Flask(__name__, template_folder='template')
directory = os.path.abspath(os.path.dirname(__file__))

# index page
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/data", methods=["GET", "POST"])
def data():
    if request.method == "POST":
        json_ = request.form["json"]
        json_ = json.loads(json_)
        data_dir = os.path.join(directory, "data")
        res = add_data(json_, filepath=data_dir, filename="arrays.json")
        if res is None:
            return render_template('data.html', message='<h1>Thank you for your submission!</h1>')
        if res[0] == 404:
            return render_template('data.html', message=res[1][1])
    if request.method == "GET":
        data_dir = os.path.join(directory, "data")
        recent_sorted_array = get_recent_array(filepath=data_dir, filename="arrays.json")
        return recent_sorted_array
    return render_template('data.html', message="None")

# Run server
if __name__=="__main__":
    app.run(debug=True)
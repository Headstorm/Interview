#  py, sql alchemy, marshmallow REST API (JSON Microservice)
#  postman
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os

# init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
#  database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# init db
db = SQLAlchemy(app)

#init ma
ma = Marshmallow(app)

# product class/model
class Product(db.Model);
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)


@app.route('/data', methods=['GET'])
def get():
    name = request.json['name']

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

    # return jsonify({ 'number': '500 numbers'})

# run server
if __name__ == '__main__':
    app.run(debug=True)

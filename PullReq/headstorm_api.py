import json
import random

from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

LIST_NUM = json.loads('''file''')

if __name__ == "__main__":
  app.run(debug=True)

class NumList(Resource):
  def get(self):
          return NumList
  parser = reqparse.RequestParser()
  def post(self):
          parser.add_argument("num");
          id = random.randint(1, 500);
          return NumList[id];
          
api.add_resource(NumList, '/data/')


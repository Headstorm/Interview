from flask import Flask
from flask_restful import Resource, Api
from flask import render_template
from flask import request
from flask import jsonify
from flask import redirect
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
import re
from flask import flash


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


class Number(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numbers = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '%s' % (
        self.numbers)

    def __init__(self, numbers):
        self.numbers = numbers

db.create_all()

@app.route('/')
def home_page():
    example_embed='Hello! Welcome to my submission for the backend challenge.'
    return render_template('index.html', embed=example_embed)

@app.route('/data',methods = ['POST', 'GET'])
def data():
   if request.method == 'POST':
      numbers = request.form['numbers']
      stringList = numbers 
      number1 = Number(stringList)
      db.session.add(number1)
      db.session.commit()
      idNumber = number1.id
      listOfNumbers = str(stringList)
      user = listOfNumbers.split(',')
      for x in user:
        try:
            int(x)
        except: 
            error_msg='There is something wrong with your formatting. Make sure you did not enter any letters. The only acceptable input is numbers separated by commas (with no space at the end)'
            return render_template('index.html', embed=error_msg)
      intList = [int(x) for x in user]
      print(intList)
      if (len(intList)!=5):
        error_msg='You have to enter 5 numbers. You did not. Try again'
        return render_template('index.html', embed=error_msg)
      print(idNumber)
      return redirect(url_for('success',listOfNumbers = Number.query.filter_by(id=idNumber).all()))
   else:
      user = request.args.get('numbers')
      lastQuery = Number.query.count()
      print(Number.query.all())
      return redirect(url_for('success',listOfNumbers = Number.query.filter_by(id=lastQuery).all()))

@app.route('/getValue',methods = ['POST'])
def getValue():
    numbers = request.form['numbersOfRequest']
    return redirect(url_for('success',listOfNumbers = Number.query.filter_by(id=numbers).all()))

@app.route('/success/<listOfNumbers>')
def success(listOfNumbers):
   listOfNumbers = str(listOfNumbers)
   user = listOfNumbers.split(',')
   print(user)
   intList = [int(x) for x in user]
   intList.sort()
   print(intList)
   return 'This is your sorted list of numbers:%s' % str(intList)

@app.route('/showAll', methods = ['POST', 'GET'])
def showAll():
   print(Number.query.count())
   list = []
   for x in range(Number.query.count()):
       print(Number.query.filter_by(id=x).all())
       list.append("%d:" %x)
       list.append(Number.query.filter_by(id=x).all())
   listOfNumbers = Number.query.all()
   print(listOfNumbers)
   return 'This is all of the submissions:%s' % list
   
if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
import json

app = Flask(__name__)
api = Api(app)

#I did not code the heap sort, source: https://www.geeksforgeeks.org/heap-sort/

def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    l = 2 * i + 1     # left = 2*i + 1
    r = 2 * i + 2     # right = 2*i + 2
 
    # See if left child of root exists and is
    # greater than root
    if l < n and arr[largest] < arr[l]:
        largest = l
 
    # See if right child of root exists and is
    # greater than root
    if r < n and arr[largest] < arr[r]:
        largest = r
 
    # Change root, if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap
 
        # Heapify the root.
        heapify(arr, n, largest)
# The main function to sort an array of given size 
def heapSort(arr):
    n = len(arr)
 
    # Build a maxheap.
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
 
    # One by one extract elements
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)

#verifies json formatting by dumping 
def is_json(myjson):
  try:
    json_object = json.dumps(myjson)
  except ValueError as e:
    return False
  return True

class Data(Resource):
    #Get
    def get(self):
        #opens local file where data is stored, if none posted it will return that
        try:
          with open("data.json", "r") as d:
              text = d.read()       
              split = text.split(',')
              list = []
              for k in range (0, 500):      #puts each number from JSON list into a new list of only floats
                  tempList = split[k].split(':', 1)
                  temp = tempList[1]
                  temp = temp.lstrip("\" ")
                  temp = temp.rstrip("\"}")
                  try:
                    list.append(float(temp))
                  except:
                      return("Please ensure your file contains numbers only")
              heapSort(list)            #sort and return
              return(list)
        except:
              return("no data found, try posting")

    def post(self):
      try:
        data = request.get_json()
        if is_json(data):       #checks file type
            f = open("data.json", "w")
            text = json.dumps(data)
            split = text.split(',')
            if len(split) == 1:     #backup file check, if it is in list format it will be one long string with a length of 1
                return("Please ensure your file is a JSON formatted list")
            if len(split) != 500:   #number check
                return("Please ensure your file is 500 numbers")
            list = []
            period = False
            for k in range (0, 500):        #puts each number from JSON list into a new list of only floats
                  tempList = split[k].split(':', 1)
                  temp = tempList[1]
                  temp = temp.lstrip("\" ")
                  temp = temp.rstrip("\"}")
                  try:
                    list.append(float(temp))
                  except:
                      return("Please ensure your file contains numbers only")

            f.write(text)
            return("Data posted")       #success
        else:
            return("Please ensure your file is a JSON formatted list")
      except:
          return("Formatting error in JSON input")

    def patch(self):
        new = request.get_json()        #new number to patch in JSON format
        text = json.dumps(new)
        split = text.split(',')
        list = []
        if len(split) != 1:             #quantity check
            return("Please only input 1 number")

        tempList = split[0].split(':', 1)
        temp = tempList[1]
        temp = temp.lstrip("\" ")
        temp = temp.rstrip("\"}")
        try:
            list.append(float(temp))
            new = list[0]
        except:
            return("Please ensure your file contains numbers only")     #type check

        sorted = Data.get(self)         #use get to create sorted list
        i = 0
        found = False
        while found == False:           #find new placement
            if new < sorted[0]:
                sorted.insert(0,new)
                return(sorted)
            elif i + 1 == len(sorted):
                sorted.append(new)
                found = True
            elif sorted[i + 1] < new:
                i = i + 1
            else:
                sorted.insert(i + 1, new)
                found = True
                print("this2")
        return(sorted)      #success


api.add_resource(Data, '/data')

if __name__ == '__main__':
    app.run()

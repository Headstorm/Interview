from flask import Flask, request, abort, jsonify
import json

# The file in which the numbers get saved to in JSON format.
# This way if the server happens to go down the data will persist.
STORED_FILE_NAME = 'numbers.txt'

# The number of numbers we expect the POST request to have.
ARRAY_LENGTH = 500

app = Flask(__name__)

# Helper function to write data to our stored file
#
# numbers - list of numbers to be written
def write_numbers(numbers):
  with open(STORED_FILE_NAME, 'w') as storedFile:
    json.dump(numbers, storedFile)

# Helper function to write data to our stored file
#
# returns - list of numbers read from file
def read_numbers():
  with open(STORED_FILE_NAME, 'r') as storeFile:
    return json.load(storeFile)
    
  # If we cannot return the json then we could not open the file
  raise Exception('Could not read file correctly.')

@app.route('/data', methods=['POST'])
def post_numbers():
  numbers = request.json
  
  if not numbers:
    abort(400, description='No data provided. Please provide 500 numbers as a JSON list to be saved.')
  
  if not isinstance(numbers, list):
    abort(400, description='Data provided is of the wrong type. Please provide 500 numbers as a JSON list to be saved.')
  
  if len(numbers) != ARRAY_LENGTH:
    abort(400, description='Incorrect number of numbers provided. Please provide 500 numbers as a JSON list to be saved.')
    
  numbers.sort()
  try:
    write_numbers(numbers)
  except:
    abort(500, description='An unknown error occurred while writing the numbers to the server.')
  
  return 'Successfully saved 500 numbers!'
    
@app.route('/data', methods=['GET'])
def get_numbers():
  try:
      numbers = read_numbers()
      return jsonify(numbers)
  except:
    abort(400, description='No data has been saved. Please POST 500 numbers first.')
      
@app.route('/data', methods=['PATCH'])
def patch_number():
  numberToInsert = request.json
  
  if not numberToInsert:
    abort(400, description='No data provided. Please provide a single number to be inserted.')
  
  if not isinstance(numberToInsert, int):
    abort(400, description='Data provided is of the wrong type. Please provide a single number to inserted.')

  try:
    numbers = read_numbers()
    numbers.append(numberToInsert)
    numbers.sort()
    
    try:
      write_numbers(numbers)
    except:
      abort(500, description='An unknown error occurred while writing the numbers to the server.')
  except:
    abort(400, description='No data has been saved. Please POST 500 numbers first.')
    
  return 'Successfully inserted the number {} into the list!'.format(numberToInsert)
      
if __name__ == '__main__':
  app.run(debug=True)
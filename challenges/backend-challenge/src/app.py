from flask import Flask, request, redirect, url_for
import ast
import os
import json

app = Flask(__name__)
app.config.from_pyfile('../config.py')

path = os.getcwd() + '/src/data'
new_json_data = 'data.json'


def format_incoming_data(incoming_data: str):
    '''
    Uses `ast.literal_eval` to convert incoming data to a data type that it fits best.

    Because we are expecting a string that is of json list format we can assume that it will be converted to a list.
    '''
    # Convert the incoming data.
    formatted_inc = ast.literal_eval(incoming_data)
    # Is it converted into a list?
    if isinstance(formatted_inc, list):
        # Is the list of size 500?
        if len(formatted_inc) == 500:
            # utilized any for quicker execution.
            # are any values in data list of type other than int?
            if not any(not isinstance(e, int) for e in formatted_inc):
                return formatted_inc
            else:
                # List was of the right size
                # But the contents within were not of integer type.
                raise TypeError
        else:
            # List size is not 500
            raise IndexError
    else:
        # If it isn't converted into a list.
        # Meaning the incoming values are not of correct type.
        raise ValueError


def get_json_file_data(filename=new_json_data) -> dict:
    '''
    Returns Dictionary from JSON file.

    Uses JSON to load data. If the file is empty, it returns a dictionary that displays null.
    '''
    # By default it has read capabilities.
    with open('{0}/{1}'.format(path, filename)) as f:
        try:
            data = json.load(f)
            return data
        except Exception as e:
            data = {'data': None}
            return data


def write_json_data_to_file(inc_data: list, filename=new_json_data) -> None:
    '''
    Opens File 'data.json' JSON dump's incoming data.

    Returns None.
    '''
    with open('{0}/{1}'.format(path, filename), 'w') as f:
        data = {'data': sorted(inc_data)}
        res = json.dump(data, f)
    return res


def binary_insert(lst: list, patch_val: int) -> list:
    ''' Binary Insert given a Sorted list.  '''
    # size halfpoint is 250 because we know that list can only be size of 500
    # but for reusability we will use len()
    size = len(lst)

    # Indexes: low -> midpoint -> high
    # smallest value in asc sorted list should be first in list
    low = 0
    # largest value in asc sorted list should be last in list
    high = size-1
    mp = (high + low) // 2
    mp_val = lst[mp]

    # Check if new # is even in between lowest and highest
    if patch_val not in range(lst[low], lst[high]):
        if patch_val <= lst[low]:
            # If new value is less than lowest, insert before.
            lst.insert(0, patch_val)
            return lst
        elif patch_val >= lst[high]:
            # If new value is greater than highest, append.
            lst.append(patch_val)
            return lst

    # While low index is below high index search to see if the value belongs
    # within
    while low < high:
        # midpoint index value. Floor operator rounds down -> int
        mp = (high + low) // 2  # Calculate midpoint of any two values
        # mp_val: midpoint value || value that will be used for comparison
        mp_val = lst[mp]

        # is midpoint exaclty inbetween the low and high bound?
        if low + 1 == mp or high-1 == mp:
            # is lst[low] <= patch_val < lst[high] ?
            if patch_val in range(lst[low], lst[high]):
                lst.insert(mp, patch_val)
                return lst
            elif patch_val < lst[low]:
                lst.insert(low-1, patch_val)
                return lst
            elif patch_val >= lst[high]:
                lst.insert(high+1, patch_val)
                return lst

        # If the incoming patch value is a duplicate, just place it in at that
        # location and quit.
        if patch_val == mp_val:
            lst.insert(mp, patch_val)
            return lst
        elif patch_val > mp_val:
            low = mp+1
            continue
        elif patch_val < mp_val:
            high = mp-1
            continue


# read/retrive
@app.route('/data/', defaults={'inc_data': ''}, methods=['GET'])
@app.route('/data/<inc_data>', methods=['POST'])  # create
@app.route('/data/<inc_data>', methods=['PATCH'])  # update existing data
def process_incoming(inc_data=''):
    if request.method == 'GET':
        # Get data from JSON data file.
        return get_json_file_data(new_json_data)
    elif request.method == 'POST':
        # Insert new data, re-writing existing file data.
        try:
            formated_data = format_incoming_data(inc_data)
            write_json_data_to_file(formated_data)
            return get_json_file_data(new_json_data)
        except Exception as e:
            message = f'{e.__class__.__name__}: {e.__class__.__doc__}'
            return redirect(url_for('dataIndexError', exception=message))
    elif request.method == 'PATCH':
        # Appending data to json file.
        # Get existing_data from existing JSON data file.
        existing_data = get_json_file_data(new_json_data)
        # Insert in order. Update JSON data file.
        write_json_data_to_file(binary_insert(
            existing_data['data'], int(inc_data)))
        return get_json_file_data(new_json_data)
    else:
        return redirect(url_for('root'))


@app.route('/<exception>')
def dataIndexError(exception):
    return f'{exception} \n Please provide a JSON formatted list of integers that is of size exactly 500.'


@app.route('/')
def root():
    return "Hello! Please provide a JSON formatted list of integers that is of size 500!"

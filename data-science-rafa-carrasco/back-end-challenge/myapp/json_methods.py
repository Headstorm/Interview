import os
import json

def load_data(filepath="data", filename="arrays.json"):
    full_file_path=os.path.join(filepath, filename)
    with open(full_file_path, 'r') as f:
        lst = json.load(f)
    return lst


def check_data(data):
    error = "Data Error: {}"
    passed = True
    if not data:
        passed = False
        error = error.format("no data given")
    elif len(data['array'])!=500:
        passed = False
        error = error.format("you did  not submit a list of 500 numbers")
    else:
        try:
            arr = [float(i) for i in data['array']]
        except:
            passed = False
            error = error.format("array contains non numerical information")
    if passed:
        error = None
    return [passed, error]


def add_data(data=None, filepath="data", filename="arrays.json"):
    full_file_path = os.path.join(filepath, filename)
    lst = load_data(filepath=filepath, filename=filename)
    res = check_data(data)
    if res[0]:
        lst.append(data)
        with open(full_file_path, 'w') as f:
            lst = json.dump(lst, f)
        return None
    else:
        return (404, res)


def get_recent_array(filepath="data", filename="arrays.json"):
    full_file_path = os.path.join(filepath, filename)
    with open(full_file_path, 'r') as f:
        lst = json.load(f)
    data = lst[-1]
    data['array'] = sorted(data['array'])
    return data


if __name__=="__main__":
    arr = get_recent_array()
    print(arr)
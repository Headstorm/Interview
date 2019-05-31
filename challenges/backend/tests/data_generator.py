import json
import random
import os


def name_files(filename):
    does_exist = True
    i = 1

    while does_exist is True:
        exists = os.path.isfile(str(filename))
        if not exists:
            does_exist = False
            return filename
        else:
            filename = filename + str(i)
            i += 1


def list_generator(num=500, filename=None):
    json_list = []

    for i in range(num):
        json_list.append(random.randint(-1000, 1000))

    if filename is not None:
        with open(str(filename), '+w') as file:
            json.dump(json_list, file)
    return json_list


def dict_generator(num=500, key="test_key", filename=None):
    json_list = []
    json_dict = {}

    for i in range(num):
        json_list.append(random.randint(-1000, 1000))
    json_dict[key] = json_list

    if filename is not None:
        with open(str(filename), '+w') as file:
            json.dump(json_dict, file)
    return json_dict


def invalid_generator(num_data, num_keys):
    # dict type
    invalid_json = {}
    key0 = "inv_test"

    for i in range(num_keys):
        key = key0 + str(i)
        invalid_json[key] = list_generator(num=num_data)
    return invalid_json

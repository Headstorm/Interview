import numpy as np
from myapp.json_methods import *

def test_no_data():
    data = None
    passed=False
    error='Data Error: no data given'
    actual = check_data(data)
    print(actual)
    expected = (passed, error)
    print(expected)
    assert actual==expected, "failed test for NO DATA"


def test_less_than_500():
    arr = np.random.randint(0, 100, 300)
    arr = list(arr)
    data = {}
    data["array"] = arr
    passed = False
    error = 'Data Error: you did  not submit a list of 500 numbers'
    actual = check_data(data)
    expected = (passed, error)
    assert actual==expected, "failed test for LESS THAN 500 DATA POINTS"


def test_greater_than_500():
    arr = np.random.randint(0, 100, 600)
    arr = list(arr)
    data = {}
    data["array"] = arr
    passed = False
    error = 'Data Error: you did  not submit a list of 500 numbers'
    actual = check_data(data)
    expected = (passed, error)
    assert actual == expected, "failed test for LESS THAN 500 DATA POINTS"


def test_array_contains_all_numbers():
    arr = np.random.randint(0, 100, 499)
    arr = list(arr)
    arr.append("another element")
    data = {}
    data["array"] = arr
    passed = False
    error = 'Data Error: array contains non numerical information'
    actual = check_data(data)
    expected = (passed, error)
    assert actual == expected, "failed test for LESS THAN 500 DATA POINTS"
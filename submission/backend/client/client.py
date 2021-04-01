import requests
import random
import json

from requests.api import patch

URL = "http://localhost:8080/data"


def generate_list():
    n_list = []
    for _ in range(0, 500):
        n = random.randint(1, 100)
        n_list.append(n)

    with open('test/data.json', 'w') as o:
        data = {"data": n_list}
        json_data = json.dumps(data)
        o.write(json_data.lstrip('\"').rstrip('\"'))


def post_data():
    with open('test/data.json') as f:
        json_data = json.load(f)
    response = requests.post(URL, json=json_data)
    print(response.text)


def patch_data(value):
    json_data = {"insert": value}
    response = requests.patch(URL, json=json_data)
    print(response.text)


def get_data():
    response = requests.get(URL)
    print(response.text)


def run_test():
    post_data()
    patch_data(1)
    patch_data(1)
    patch_data(1)
    patch_data(1)
    patch_data(1)
    get_data()


patch_data(1)

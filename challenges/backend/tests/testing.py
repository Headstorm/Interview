import requests
import json
from tests import data_generator as dg


def posting(url):
    payload = dg.dict_generator(500)
    print(payload, type(payload))
    posted = requests.post(url=url, json=payload)
    return posted


def getting(url):
    gotten = requests.get(url=url)
    return gotten


def patching(url):
    payload = dg.dict_generator(1)
    print(payload)
    # patch = requests.patch(url=url, data=payload)
    ppp = requests.patch(url=url, params=payload)
    return ppp


test_url = 'http://127.0.0.1:5000/data'

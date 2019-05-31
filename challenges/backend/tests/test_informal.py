import pytest
import requests
from tests import data_generator as dg


@pytest.fixture
def url():
    url = 'http://127.0.0.1:5000/data'
    yield url


def test_getting(url):
    gotten = requests.get(url=url)
    print(gotten.content)
    assert gotten.status_code != 0


def test_post_json_dict(url):
    payload = dg.dict_generator(500)
    posted = requests.post(url=url, json=payload)
    print(posted.json())
    assert posted.status_code != 0


def test_post_not_json(url):
    payload = dg.dict_generator(500)
    posted = requests.post(url=url, data=payload)
    assert posted.status_code != 404


def test_patching(url):
    patched = requests.patch(url=url)
    print(patched.status_code)
    assert patched.status_code != 0

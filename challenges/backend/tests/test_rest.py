import pytest
from app import app
from tests import data_generator as dg


@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client


def valid_data(client):
    data = dg.list_generator(num=500)
    post = client.post('/data', json=data)
    return post


def no_data(client):
    delete = client.delete('/data')
    return delete


def test_get_data_exists(client):
    valid_data(client)
    get = client.get('/data')
    assert get.status_code == 200


def test_get_no_data(client):
    no_data(client)
    get = client.get('/data')
    assert get.status_code == 404


def test_list_sorted(client):
    new_data = dg.list_generator(num=500)
    request = client.post('/data', json=new_data)
    raw_json = request.get_json()
    assert raw_json == sorted(new_data)


def test_dict_validate(client):
    valid_dict = dg.dict_generator(num=500, key="test_key")
    request = client.post('/data', json=valid_dict)
    for key, val in valid_dict.items():
        valid_dict[key] = sorted(val)
    raw_json = request.get_json()
    assert raw_json == valid_dict


def test_list_validate(client):
    valid_list = dg.list_generator(num=500)
    request = client.post('/data', json=valid_list)
    valid_list = sorted(valid_list)
    raw_json = request.get_json()
    assert raw_json == valid_list


def test_invalid_length(client):
    short_data = dg.list_generator(num=320)
    request = client.post('/data', json=short_data)
    assert request.status_code == 400


def test_invalid_dict(client):
    invalid_dict = dg.invalid_generator(num_data=500, num_keys=3)
    request = client.post('/data', json=invalid_dict)
    assert request.status_code == 400


def test_invalid_content(client):
    data = dg.list_generator(num=500)
    data[350] = 'xyz'
    request = client.post('/data', json=data)
    assert request.status_code == 400


def test_delete(client):
    delete = client.delete('/data')
    assert delete.status_code == 204


def test_patch_exists(client):
    valid_data(client)
    patch = client.patch('/data')
    assert patch.status_code == 204


def test_patch_not_exists(client):
    no_data(client)
    patch = client.patch('/data')
    assert patch.status_code == 404

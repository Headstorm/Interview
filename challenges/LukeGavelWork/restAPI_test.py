from restAPI import restAPI
from flask import json
from random import randint

def test_add():
	d = []
	for i in range(500):
		d.append(i)
		
	
	response = restAPI.test_client().post("/data", data = jsonify(d), content_type='application/json',)
	
	data = json.loads(response.get_data(as_test=True))
	
	assert response.status_code == 200
	assert data['1'] == d

from flask import Flask, request, jsonify

restAPI = Flask(__name__)

data_pool = [

]


@restAPI.post("/data")
def sendData():
	if type(request) != list:
		return {"Error": "list of numbers not submitted"}, 415
	elif len(request) != 500:
		return {"Error": "incorrect number of data entries"}, 415
	elif not(all(item.isdigit() for item in request)):
		return {"Error": "list contains none numeric values"}, 415
	elif not(request.is_json):
		return {"Error": "Request must be JSON"} , 415
	else:
		data = request.get_json()
		data["id"] = _find_next_id()
		data_pool.append(data)
		

@restAPI.get("/data")
def getData():
	return jsonify(data_pool)

#@restAPI.patch("/data")

	

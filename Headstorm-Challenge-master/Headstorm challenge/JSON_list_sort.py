from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route("/", methods=['GET', 'POST', 'PATCH'])
def index():
	if (request.method == 'POST'):
		json_list = request.get_json(intArray[]) #gets json list of ints  Dont know if this is proper
																						 #format for json array
		return jsonify({'you sent': json_list}), 201 #201 properly sent item and then prints list
	else:
		return jsonify({"about":"did not receive file"})
def verify(json_list):
	if(len(json_list)!= 500):
		return jsonify({'improper list size': len(json_list)}), 204 #204 improper data format
		break
	for x in json_list:
		if(isinstance(json_list[x],int)):  #iterates over list to check each one is type int
		else:
			return jsonify({'object': x: 'is not of type int'}), 204
			break

json_list = json_list.sort()  #sorts list after verification

@app.route('/', methods=['PATCH'])
def insert_list(json_list):
	if (request.method == 'PATCH'):
		json_item = request.get_json(int)  #gets new item from user
	json_list = bisect.insort(json_list, json_item) #inserts item into proper order

@app.route('/', methods=['GET']) 
def get_list(json_list):
	return jasonify({'result': json_list})  #prints list sorted

if __name__ == '__main__':
	app.run(debug=True)

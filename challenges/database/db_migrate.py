import sqlite3
import json
import sys
json_dict = {}
if(len(sys.argv) == 3):
	with open (sys.argv[1], 'r') as handle:
		json_dict = json.load(handle)
	con = sqlite3.connect(sys.argv[2])
	cur = con.cursor()
	values = ('(' + str(json_dict['record_id']) + ',' + 
		str(json_dict['basic_order']) + ',' + 
		str(json_dict['advanced_order']) + ',' + 
		str(int(json_dict['protection_plan'])) + ')')
	query = "INSERT INTO record " + values
	print(query)
	#This is the query, but doing this directly is insecure. Instead, we do this:
	cur.execute("INSERT INTO record values (?,?,?,?)",(
	 json_dict['record_id'],
	 json_dict['basic_order'],
	 json_dict['advanced_order'],
	 int(json_dict['protection_plan'])))
	values = ('(\'' + json_dict['name'] + '\',\'' +
		json_dict['email'] + '\',\'' + 
		json_dict['work'] + '\',\'' + 
		json_dict['cell'] + '\',\'' + 
		json_dict['address'] + '\',' + 
		str(json_dict['record_id']) + ')') 
	query = "INSERT INTO custormer " + values 
	print(query)
	cur.execute("INSERT INTO customer values (?,?,?,?,?,?)",(
	 json_dict['name'],
	 json_dict['email'],
	 json_dict['work'],
	 json_dict['cell'],
	 json_dict['address'],
	 json_dict['record_id']))
	con.commit()
	con.close()
else:
	print("Expected input: python3 db_migrate.py <json file> <database file>")
import json
ids = {}
i = 1
rid = 0
name = ""
cellphone = ""
workphone = ""
email = ""
address = ""
b_order = -1
aorder = -1
pplan = False

query = ""
with open("db.txt") as data:
	d = json.loads(data.read())
	for r in d:
		rid = r["Record ID"]
		name = r["Name"]
		cellphone = r["Cell Phone"]
		workphone = r["Work Phone"]
		email = r["Email"]
		address = r["Address"]
		b_order = r["Basic Widget Order"]
		aorder = r["Advanced Widget Order"]
		pplan = r["Protection Plan"]

		if email not in ids.keys():
			ids[email] = i
			print("INSERT INTO PERSON VALUES("+str(i)+", \""+str(name)+"\", \""+str(email)+"\", \""+str(address)+"\")")
			print("INSERT INTO CPhone VALUES("+str(i)+", \""+str(cellphone)+"\")")
			print("INSERT INTO WPhone VALUES("+str(i)+", \""+str(workphone)+"\")")
			print("INSERT INTO RECORDS VALUES("+str(i)+", "+str(rid)+", "+str(b_order)+", "+str(aorder)+")")
			i+=1
		else:
			i = ids[email]
			print("INSERT INTO RECORDS VALUES("+str(i)+", "+str(rid)+", "+str(b_order)+", "+str(aorder)+")")

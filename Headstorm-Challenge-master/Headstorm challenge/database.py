import json, mysql.connector

new_db = mysql.connector.connect(
	host="localhost",
	user="yourusername",
	passwd="yourpassword",
	database="newdatabase")
	
mycursor = new_db.cursor()

mycursor.execute("CREATE TABLE startup_order(Record_ID INT, Name VARCHAR(63), Cell_Phone VARCHAR(14), Work_Phone VARCHAR(14), Email VARCHAR(127), Address VARCHAR(255), Basic_Widget_Order INT, Advanced_Widget_Order INT, Protection_Plan BOOL)") #Initializes new sql db

file_path = input("Enter file path here: ")

parsed_file = json.loads(file_path) #parses data in old file 
for x in parse_json: #iterates through each data point in old file
	sql = "INSERT INTO startup_order(Record_ID, Name, Cell_Phone, Work_Phone, Email, Address, Basic_Widget_Order, Advanced_Widget_Order, Protection_Plan) VALUES(%d, %s, %s, %s, %s, %s, %d, %d, %r)"  #set up values to be inserted in the proper order with proper format
	mycursor.execute(sql,parse_json[x])  #takes values in the parsed json file and inserts them into the new sql database with the proper formating
	new_db.commit() #commits the changes to the db
		

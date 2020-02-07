# -*- coding: utf-8 -*-
import json
import sys
import os


""" 
	The loadDB function takes in an  json file as an input 
	parameter. The json file contains data from the 
	non-relational data that needs to be transfered to the 
	relational database setting
"""
def loadDB(filename):
	"""
	Args:
		filename (str): The json file
	"""
	# check of the file passed as input exists
	if not os.path.exists(filename):
		print("The file does not exist")
		return

	# define table names and static variables
	USER_TABLE = "User_Info"
	USER_ORDER_TABLE = "Order_Info"
	INSERT_PREFIX = "INSERT INTO"
	DB_NAME = "Startup_Order"

	# statement to create and use the database
	createDBStatement = "CREATE DATABASE "+DB_NAME+";\n" + \
						"USE " + DB_NAME +";"

	# statements required to create the tables
	createUserTableStatement = "CREATE TABLE " + USER_TABLE +"(" + \
							   "RecordID  int NOT NULL, " + \
							   "Name nvarchar(255) NOT NULL, " +\
							   "CellPhone varchar(15), " + \
							   "WorkPhone varchar(15), " + \
							   "Email nvarchar(255), " + \
							   "Address nvarchar(255), " + \
							   "PRIMARY KEY (RecordID));"

	createWidgetTableStatement = "CREATE TABLE " + USER_ORDER_TABLE +"(" + \
							   "OrderNumber int NOT NULL, " +\
							   "RecordID int NOT NULL, " + \
							   "BasicWidgetOrder int, "+ \
							   "AdvancedWidgetOrder int, " +\
							   "ProtectionPlan Boolean, " +\
							   "PRIMARY KEY (OrderNumber)," +\
							   "FOREIGN KEY (RecordID) REFERENCES "+ USER_TABLE+ "(RecordID));"
	print(createDBStatement +"\n")
	print(createUserTableStatement + "\n")
	print(createWidgetTableStatement + "\n")

	# open the file and iterate through the records
	with open(filename, encoding='utf-8') as f:
		data = None
		# check if the file is a vlid json
		try:
			data = json.load(f)
		except ValueError:
			print("The file is not a valid json")
			return

		# print insert statements into the two tables
		for row in data:
			try:
				print(INSERT_PREFIX +" "+ USER_TABLE + "(RecordID, Name, CellPhone, WorkPhone, "+\
					"Email, Address) VALUES (%d, \'%s\', \'%s\', \'%s\', \'%s\', \'%s\');"% \
					(row['Record_ID'] , row['Name'], row['Cell_Phone'], row["Work_Phone"], \
					row["Email"], row["Address"]) )
				
				print(INSERT_PREFIX +" "+ USER_ORDER_TABLE + "(RecordID, BasicWidgetOrder, "+\
					"AdvancedWidgetOrder, ProtectionPlan) VALUES (%d, %d, %d, %r);\n"% \
					(row['Record_ID'] , row['Basic_Widget_Order'], row['Advanced_Widget_Order'],\
					row["Protection_Plan"]))
			except KeyError:
				print("The data to be imported is missing fields")


if __name__ == "__main__":
	loadDB(sys.argv[1])
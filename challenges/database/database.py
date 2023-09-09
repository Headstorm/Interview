import sqlite3
import sys
#This program should only be run once to construct the database.
if(len(sys.argv) == 2): 
	handle = sys.argv[1]
	con = sqlite3.connect(handle)
	cur = con.cursor()
	query = '''CREATE TABLE record
			(id smallint,
			basic int,
			advanced int,
			plan bool,
			PRIMARY KEY(id))'''
	print(query)
	cur.execute(query)
	query = '''CREATE TABLE customer
			(name varchar(20),
			email varchar(50),
			workphone varchar(20),
			cellphone varchar(20),
			address tinytext,
			order_id smallint,
			PRIMARY KEY(name,email),
			FOREIGN KEY(order_id) REFERENCES record(id))'''
	print(query)
	cur.execute(query)
	con.commit()
	con.close()
else:
	print("Expected input: python3 database.py <database file>")
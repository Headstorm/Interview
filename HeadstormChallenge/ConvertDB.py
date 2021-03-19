#Jared Gatlin

import json
import sqlite3

#Connects to database already created with sqlite3
#Already created Person table in the DB
connection = sqlite3.connect('data.db')


#Opens JSON file, loading the data into the DATA dictionary
file = open('data.json')
data = json.load(file)

# This loop inserts the data from the VALUES list into the Persons TABLE.
# v0-v8 are values for that iteration of the directory with their specific attribute name.
for i in data['Person']:

    v0 = i.get('RecordID')
    v1 = i.get('Name')
    v2 = i.get('CPhone')
    v3 = i.get('WPhone')
    v4 = i.get('Email')
    v5 = i.get('Address')
    v6 = i.get('BasicWidgetO')
    v7 = i.get('AdvWidgetO')
    v8 = i.get('ProjectPlan')

    #Inserts the data directly into the sqlite3 database
    conn.execute("INSERT INTO Person(RecordID,Name,CPhone,WPhone, \
    Email,Address,BasicWidgetO,AdvWidgetO,ProectPlan]) \
    VALUES (v0,v1,v2,v3,v4,v5,v6,v7,v8)");

    #Prints the data to console
    print("INSERT INTO Person(RecordID,Name,CPhone,WPhone, \
    Email,Address,BasicWidgetO,AdvWidgetO,ProectPlan]) \
    VALUES (v0,v1,v2,v3,v4,v5,v6,v7,v8)")

file.close

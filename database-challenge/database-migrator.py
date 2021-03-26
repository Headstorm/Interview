import sys
import json
import os.path

################# Usage #######################
# This program will read a given json file and: 
# 1. Output the results to the console
# 2. Write the script to a .sql file for the 
#    client to run in their database environment
#
# Example: "database-migrator.py Orders.json"
################################################

class DatabaseMigrator():
    #Declare variables
    fileInput = open(sys.argv[1]).read()
    user_records = []
    order_records = []
    user_id = 1
    sqlScript = ''
 
    #readFile: returns json data
    def readFile(file):
        return json.loads(file)

    #extractRecords: builds list of records for users and orders
    def extractRecords(json, user_records, order_records, user_id=user_id,):
        for r in json:
            if(r['Protection Plan']==True):
                protection_plan = 1
            else:
                protection_plan = 0

            user = {
                'UserId': user_id,
                'Name': r['Name'],
                'CellPhone': r['Cell Phone'],
                'WorkPhone': r['Work Phone'],
                'Email': r['Email'],
                'Address': r['Address']
                }
            order = {
                'RecordId': r['Record ID'],
                'UserId': user_id,
                'BasicWidgetOrder': r['Basic Widget Order'],
                'AdvancedWidgetOrder': r['Advanced Widget Order'],
                'ProtectionPlan': protection_plan
            }

            user_records.append(user)
            order_records.append(order)
            user_id+=1

    #buildSQL: returns SQL insert statements for users and orders
    def buildSQL(user_records, order_records):
        insertUsersSQL = ''
        for r in user_records:
            insertUsersSQL = insertUsersSQL + 'INSERT INTO dbo.Users (UserId, Name, CellPhone, WorkPhone, Email, Address)\nVALUES ('+str(r.get('UserId'))+', \''+r.get('Name')+'\', \''+r.get('CellPhone')+'\', \''+r.get('WorkPhone')+'\', \''+r.get('Email')+'\', \''+r.get('Address')+'\');\n'
        
        insertOrdersSQL = ''
        for r in order_records:
            insertOrdersSQL = insertOrdersSQL + 'INSERT INTO dbo.Orders (RecordId, UserId, BasicWidgetOrder, AdvancedWidgetOrder, ProtectionPlan)\nVALUES ('+str(r.get('RecordId'))+', '+str(r.get('UserId'))+', '+str(r.get('BasicWidgetOrder'))+', '+str(r.get('AdvancedWidgetOrder'))+', '+str(r.get('ProtectionPlan'))+');\n'

        return '--Insert New Users\n'+insertUsersSQL + '\n--Insert New Orders\n' + insertOrdersSQL    
    
    def outputSQLFile(sql):
        scriptFolder = os.path.dirname(os.path.realpath(__file__))
        outputFile = scriptFolder + '\\insert_records.sql'
        if(os.path.exists(outputFile)):
            file = open(outputFile, 'w')
        else: 
            file = open(outputFile, 'x')
        
        file.write(sql)


    #Step 1: create json_data variable
    print('Begin program')
    json_data = readFile(fileInput)
    
    #Step 2: extract records from json_data and build lists of records for each table
    extractRecords(json_data, user_records, order_records)

    #Step 3: build SQL insert statements
    sqlScript = buildSQL(user_records, order_records)

    #Step 4: print SQL script to console
    print('\nSQL console output:\n' + sqlScript)

    #Step 5: output SQL file for client to copy/paste into SQL Server
    outputSQLFile(sqlScript)
    print('Generated SQL Script: insert_records.sql\n')
    print('End program')
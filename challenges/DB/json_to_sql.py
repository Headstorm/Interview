import sys
import json

# read data from file
inp = open(sys.argv[1]).read()
data = json.loads(inp)

# set of users' emails (assumed unique to the user) already in DB, so queries dont have to be made to check if a user exists already
usedEmails = []

# collect all user info here
allUsers = []
# all record data here
allRecords = []

# current next user ID starting at 1
userID = 1

for row in data:
    
    # fetch user data
    user = {'name': row['Name'],
            'cell_phone': row['Cell Phone'], 
            'work_phone': row['Work Phone'],
            'email': row['Email'],
            'address': row['Address']}
    
    # check if the user already exists in the DB, if not give them a new id and add them
    try:
        index = usedEmails.index(user['email'])
        user['user_id'] = index + 1
    except:
        user['user_id'] = userID
        allUsers.append(user)
        usedEmails.append(user['email'])
        userID += 1
    
        
    # create and append record
    record = {'user_id': user['user_id'],
              'basic_widget': row['Basic Widget Order'],
              'advanced_widget': row['Advanced Widget Order'],
              'protection_plan': row['Protection Plan']} 
    
    allRecords.append(record)          
    
    
# create user insert statement
userSQL = '''INSERT INTO User \n\t(user_id, name, cell_phone, work_phone, email, address) \nVALUES\t'''   
for user in allUsers:
    userSQL = userSQL + '''({}, '{}', '{}', '{}', '{}', '{}'),\n\t'''.format(user['user_id'], user['name'], user['cell_phone'], user['work_phone'], user['email'], user['address'])

# remove final ",\n\t" and add a ";"
userSQL = userSQL[:-3:] + ''';'''
    
# create record insert statement
recordSQL = '''INSERT INTO Record \n\t(user_id, basic_widget, advanced_widget, protection_plan) \nVALUES\t'''    
for record in allRecords:
    recordSQL = recordSQL + '''({}, {}, {}, {}),\n\t'''.format(record['user_id'], record['basic_widget'], record['advanced_widget'], record['protection_plan'])

# remove final ",\n\t" and add a ";"
recordSQL = recordSQL[:-3:] + ''';'''

# print out final statements
print(userSQL, '\n')
print(recordSQL)






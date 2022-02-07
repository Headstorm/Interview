import json
import os.path
def readJson(filename):
    with open(filename, "r") as Data:
        data = json.load(Data)

    print('CREATE TABLE Customer (\n'
          'recordID INT\n'
          'name VARCHAR(100),\n'
          'cellPhone VARCHAR(15),\n'
          'workPhone VARCHAR(15),\n'
          'email VARCHAR(100),\n'
          'address VARCHAR(100),\n'
          'PRIMARY KEY (recordID)\n'
          ');\n'

          'CREATE TABLE Orders (\n'
          'recordID INT not NULL,\n'
          'basicWidgetOrder INT,\n'
          'advancedWidgetOrder INT,\n'
          'protectionPlan BOOLEAN,\n'
          'PRIMARY KEY (recordID),\n'
          ');')


    for item in data:   
        print('INSERT INTO Customer (recordID, name, cellPhone, workPhone, email, address)\n'
              'VALUES ({}, {}, {}, {}, {}, {});\n'.format(item['recordID'], item['name'], item['cellPhone'], item['workPhone'], item['email'], item['address']))

        print('INSERT INTO Orders (recordID, basicWidgetOrder, advancedWidgetOrder, protectionPlan)\n'
              'VALUES ({}, {}, {}, {});\n'.format(item['recordID'], item['basicWidgetOrder'], item['advancedWidgetOrder'], item['protectionPlan']))


if __name__ == '__main__':
    readJson('data.json')
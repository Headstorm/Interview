import json


def readJsonFile(filename):
    try:
        with open(filename, "r") as myData:
            data = json.load(myData)
    except:
        return "filename not found!"

    print('CREATE TABLE Customers_Info (\n'
          'customerID INT Not NULL.\n'
          'name VARCHAR(75),\n'
          'cellPhone VARCHAR(15),\n'
          'workPhone VARCHAR(15),\n'
          'email VARCHAR(75) NOT NULL,\n'
          'address VARCHAR(100),\n'
          'PRIMARY KEY (recordID)\n'
          ');\n\n'
          'CREATE TABLE Orders (\n'
          'orderID INT not NULL,\n'
          'customerID INT NOT NULL,\n'
          'basicWidgetOrder INT,\n'
          'advancedWidgetOrder INT,\n'
          'protectionPlan BOOLEAN,\n'
          'PRIMARY KEY (orderID),\n'
          'FOREIGN KEY (customerID) REFERENCES Customers_Info(recordID)\n'
          ');\n')

    for ind, key in enumerate(data):
        print('INSERT INTO CUSTOMER_INFORMATION (customerID, name, cellPhone, workPhone, email, address)\n'
              'VALUES ({}, {}, {}, {}, {}, {})\n'.format(key['customerID'], key['name'], key['cellPhone'],
                                                         key['workPhone'],key['email'], key['address']))

        print('INSERT INTO Order_Information (orderID, customerID, Basic_Widget_Order, Advanced_Widget_Order, '
              'Protection_Plan)\n '
              'VALUES ({}, {}, {}, {}, {})\n'.format(ind + 1, key['customerID'], key['basicWidgetOrder'],
                                                     key['advancedWidgetOrder'], key['protectionPlan']))


if __name__ == '__main__':
    readJsonFile('data.json')

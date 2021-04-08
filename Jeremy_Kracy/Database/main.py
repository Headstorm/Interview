import json


def read_in(file_name):
    file = open(file_name, 'r')
    data = json.load(file)

    print('CREATE TABLE Customer_Information (\n'
          'Email varchar(50) NOT NULL,\n'
          'Name varchar(50),\n'
          'Cell_Phone varchar(10),\n'
          'Work_Phone varchar(10),\n'
          'Address varchar(50),\n'
          'PRIMARY KEY (Email)\n'
          ').\n')
    print('CREATE TABLE Order_Information (\n'
          'Record_ID int NOT NULL,\n'
          'Basic_Widget_Order int,\n'
          'Advanced_Widget_Order int,\n'
          'Protection Plan BOOLEAN,\n'
          'Email varchar(50) NOT NULL,\n'
          'PRIMARY KEY (Record_ID),\n'
          'FOREIGN KEY (Email) REFERENCES Customer_Information(Email)\n'
          ').\n')

    for i in data:
        print('INSERT INTO CUSTOMER_INFORMATION (Email, Name, Cell_Phone, Work_Phone, Address)\n'
              'VALUES ({}, {}, {}, {}, {})\n'.format(i['Email'], i['Name'], i['Cell Phone'], i['Work Phone'], i['Address']))

        print('INSERT INTO Order_Information (Record_ID, Basic_Widget_Order, Advanced_Widget_Order, Protection_Plan, Email)\n'
              'VALUES ({}, {}, {}, {}, {})\n'.format(i['Record ID'], i['Basic Widget Order'], i['Advanced Widget Order'], i['Protection Plan'], i['Email']))

if __name__ == '__main__':

    read_in('data.json')


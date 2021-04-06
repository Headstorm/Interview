import json
#import sqlite3

def main():
    # potential improvements include using command line arguments
    # (or another method) to pick the input file
    input_file = 'in.json'
    with open(input_file, 'r') as f:
        old_database = json.loads(f.read())
        #new_database = sqlite3.connect('output.db')
        create='''CREATE TABLE Customer (
    customerID int, 
    name varchar(255),
    cellPhone varchar(255),
    workPhone varchar(255),
    email varchar(255),
    address varchar(255)
);'''
        #new_database.execute(create)
        print(create)
        create2='''CREATE TABLE Order (
    customerID int, 
    basicWidgetOrder int, 
    advancedWidgetOrder int, 
    protectionPlan int, 
);'''
        print(create2)
        for obj, values in old_database.items():
            print(f"\
INSERT INTO Customer VALUES({obj}, \'{values['name']}\',\
\'{values['cellPhone']}\', \'{values['workPhone']}\',\
\'{values['email']}\', \'{values['address']}\');")
            print(f"\
INSERT INTO Order VALUES({obj}, {values['basicWidgetOrder']}, \
{values['advancedWidgetOrder']}, {values['protectionPlan']});")

if __name__ == '__main__':
    main()

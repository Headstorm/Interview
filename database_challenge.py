import psycopg2

# Variables that will be used for this program
customerTable = '''CREATE TABLE IF NOT EXISTS Customer
        (customerID     INT     PRIMARY KEY     NOT NULL,
        Name            VARCHAR(50) NOT NULL,
        Address         VARCHAR(256) NOT NULL,
        CellPhone       VARCHAR(30) NOT NULL,
        Email           VARCHAR(30) NOT NULL,
        WorkPhone       VARCHAR(50) NOT NULL)
        ;'''

recordsTable = '''CREATE TABLE IF NOT EXISTS Records
        (recordID           INT     PRIMARY KEY     NOT NULL,
        AdvWidgetOrder      INT     NOT NULL,
        BasicWidgetOrder    INT     NOT NULL,
        ProtectPlan         BOOLEAN NOT NULL,
        customerID          INT     NOT NULL,
        FOREIGN KEY(customerID) REFERENCES Customer(customerID))
        ;'''

#establishing the connection
conn = psycopg2.connect(
   database="postgres", user='postgres', password='password', host='127.0.0.1', port= '5432'
)
#Creating a cursor object using the cursor() method
cursor = conn.cursor()

# Create Tables if the tables don't exist
cursor.execute(customerTable)
cursor.execute(recordsTable)

#Closing the connection
conn.close()

# Since Database is created and the tables have been created successfully, we need to migrate the old data
# into this new database model. Here we will read in the JSON file (assuming it is structured in a normal text
# file). We will also assume that the data will come in as defined in the table on Github under the Database Challenge
# Description. 
# Assumption here is that the data will be separated by semicolons to make the splitting easier but depending how they are split,
# we can make changes to the splitting logic and it would still work. 

dataFile = open('oldData.txt', 'r')
i = 1
j = 2
for line in dataFile:
    tempLine = line.split(';')
    customerString = '''INSERT INTO Customer(customerID, Name, Address, CellPhone, Email, WorkPhone) 
    VALUES ({}, {}, {}, {}, {}, {})'''.format(i, tempLine[1], tempLine[5], tempLine[2], tempLine[4], tempLine[3])
    
    recordString = '''INSERT INTO Records(recordID, AdvWidgetOrder, BasicWidgetOrder, ProtectPlan,
    customerID) VALUES ({}, {}, {}, {}, {})'''.format(j, int(tempLine[7]), int(tempLine[6]), bool(tempLine[8]), i)
    j = j + 1
    i = i + 1

dataFile.close()

#This program will read json file and print SQL queries to inerst the read data into relational DB.
import json

with open("data.json") as f:
    data = json.load(f)

custID = 100

customerVals = (custID,data['Name'],data['Cell Phone'],
data['Work Phone'],data['Email'],data['Address'])
orderVals = (data['Record ID'],custID,data['Basic Widget Order'],data['Advanced Widget Order'],bool(data['Protection Plan']))

customerSql =  f"INSERT INTO customer (CustomerId,Name,CellPhone,WorkPhone,Email,Address) \
VALUES {customerVals}"
orderSql = f"INSERT INTO order (OrderId,CustomerId,BasicWidgetOrder,AdvancedWidgetOrder,\
ProtectionPlan) VALUES {orderVals}"

print(customerSql)
print(orderSql)
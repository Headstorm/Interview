import json

with open('oldDb.json') as f:
    data = json.load(f)

record_id = int(data["record_id"])
name = str(data["name"])
cell_phone = str(data["cell_phone"])
work_phone = str(data["work_phone"])
email = str(data["email"])
address = str(data["address"])
basic_widget = str(data["basic_widget"])
advanced_widget = str(data["advanced_widget"])
protection_plan = data["protection_plan"]
print("Since the readme just mentioned printing insert statements, assume the PK is set at autoincrement :)")
print("and assume that the tables are created & filled in with the proper information as shown in the entity diagram")

print("SQL statements for new SQL db")
print("CREATE DATABASE widgetShop;")
print("CREATE TABLE Customer (...)")
print("CREATE TABLE Records (...)")
print("CREATE TABLE Order_Details (...)")

print("INSERT INTO Customer (customer_name, customer_cell_phone, customer_work_phone, customer_email, customer_address)")
print(('VALUES (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\')').format(name, cell_phone, work_phone, email, address))

print("INSERT INTO Records (customer_id, order_date)")
print('VALUES (\'1\')')

print("INSERT INTO Order_Details (record_id, protection_plan, widget_type)")
print(('VALUES (\'{}\', \'{}\', \'{}\')').format(record_id, protection_plan, basic_widget))

f.close()

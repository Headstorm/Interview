import json
from Models.customer import Customer
from Models.contact_info import ContactInfo
from Models.address import Address
from Models.basic_widget_order import BasicWidgetOrder
from Models.advanced_widget_order import AdvancedWidgetOrder

def print_insert_statements(items):
    for item in items:
        print(item.to_insert_statement())

with open('data.json', 'r') as data_file:
    data = json.load(data_file)

customers = []
contact_infos = []
addresses = []
basic_orders = []
adv_orders = []

for item in data:
    customer_id = item['Record ID']
    customer = Customer(customer_id, item['Name'])
    customers.append(customer)

    contact_info = ContactInfo(customer_id, item['Cell Phone'], item['Work Phone'], item['Email'])
    contact_infos.append(contact_info)

    address = Address(customer_id, item['Address'])
    addresses.append(address)

    basic_order = BasicWidgetOrder(customer_id, item['Basic Widget Order'])
    basic_orders.append(basic_order)

    adv_order = AdvancedWidgetOrder(customer_id, item['Advanced Widget Order'], item['Protection Plan'])
    adv_orders.append(adv_order)

print_insert_statements(customers)
print_insert_statements(contact_infos)
print_insert_statements(addresses)
print_insert_statements(basic_orders)
print_insert_statements(adv_orders)
'''
load JSON to dictionary
Hydrate models from dictionary
Output INSERT statements from models
'''
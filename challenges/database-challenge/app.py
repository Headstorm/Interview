import os
import sys
import random
import json
from Models import User, Record
from pprint import pp

path = os.getcwd()

root_dir = os.path.abspath(os.curdir)


def extract_json_data():
    # Extracts Unormalized Data from JSON file.
    # Returns Dictionary of the Data.
    filename = 'records.json'
    with open('{0}/{1}'.format(path, filename)) as f:
        # data = json.load(f)
        data = json.load(f)

    return data


def format_unormalized_data():
    # Formats Unormalized Data to Normalized Format.
    data = extract_json_data()
    records = data['records']

    for record in records:
        user = User(record['name'], record['cell_phone'],
                    record['work_phone'], record['email'], record['address'])
        rec = Record(record['record_id'], record['basic_widget_order'],
                     record['advanced_widget_order'], record['protection_plan'], user.ID)
        given_record_print_query(rec)
        given_user_print_query(user)


def given_record_print_query(rec: Record):
    table_name = 'RECORDS'
    query = "INSERT INTO {0} ( {1.record_id}, {1.customer_id}, {1.basic_widget_quantity}, {1.advanced_widget_quantity}, {1.protection_plan} )".format(
        table_name, rec)

    print(query, end="\n")


def given_user_print_query(user: User):
    table_name = 'CUSTOMERS'
    query = "INSERT INTO {0} ( {1.name}, {1.cell_num}, {1.work_num}, {1.email}, {1.address} )".format(
        table_name, user)

    print(query, end="\n")


if __name__ == "__main__":
    format_unormalized_data()

class Customer:
    TABLE_NAME = "Customer"

    def __init__(self, customerId, name):
        self.customerId = customerId
        self.name = name

    def to_insert_statement(self):
        return '''INSERT INTO {TABLE} (RecordId, Name)
        VALUES ({CUSTOMER_ID}, {NAME})'''.format(TABLE = Customer.TABLE_NAME, CUSTOMER_ID = self.customerId, NAME = self.name)
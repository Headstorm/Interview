class Address:
    TABLE_NAME = "Address"

    def __init__(self, customerId, address):
        self.customerId = customerId
        self.address = address

    def to_insert_statement(self):
        return '''INSERT INTO {TABLE} (CustomerId, Address)
        VALUES ({CUSTOMER_ID}, {ADDRESS})'''.format(TABLE = Address.TABLE_NAME, CUSTOMER_ID = self.customerId, ADDRESS = self.address)
class Address:
    def __init__(self, customerId, address):
        self.customerId = customerId
        self.address = address

    def to_insert_statement(self):
        return ""
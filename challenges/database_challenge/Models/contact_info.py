class ContactInfo:
    def __init__(self, customerId, cellPhone, workPhone, email):
        self.customerId = customerId
        self.cellPhone = cellPhone
        self.workPhone = workPhone
        self.email = email

    def to_insert_statement(self):
        return ""
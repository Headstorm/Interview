class ContactInfo:
    TABLE_NAME = "ContactInformation"

    def __init__(self, customerId, cellPhone, workPhone, email):
        self.customerId = customerId
        self.cellPhone = cellPhone
        self.workPhone = workPhone
        self.email = email

    def to_insert_statement(self):
        return '''INSERT INTO {TABLE} (CustomerId, CellPhone, WorkPhone, Email)
        VALUES ({CUSTOMER_ID}, {CELL_PHONE}, {WORK_PHONE}, {EMAIL})'''.format(TABLE = ContactInfo.TABLE_NAME, CUSTOMER_ID = self.customerId, CELL_PHONE = self.cellPhone, WORK_PHONE = self.workPhone, EMAIL = self.email)
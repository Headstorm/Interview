class Customer:
    def __init__(self, recordId, name):
        self.recordId = recordId
        self.name = name

    def to_insert_statement(self):
        return ""
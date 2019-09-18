class ContactInfo:
    def __init__(self, customerId, orderId, hasProtectionPlan):
        self.customerId = customerId
        self.orderId = orderId
        self.hasProtectionPlan = hasProtectionPlan

    def to_insert_statement(self):
        return ""
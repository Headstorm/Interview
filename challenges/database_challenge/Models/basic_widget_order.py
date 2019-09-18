class BasicWidgetOrder:
    def __init__(self, customerId, orderId):
        self.customerId = customerId
        self.orderId = orderId

    def to_insert_statement(self):
        return ""
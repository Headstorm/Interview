class BasicWidgetOrder:
    TABLE_NAME = "BasicWidgetOrder"

    def __init__(self, customerId, orderId):
        self.customerId = customerId
        self.orderId = orderId

    def to_insert_statement(self):
        return '''INSERT INTO {TABLE} (CustomerId, OrderId)
        VALUES ({CUSTOMER_ID}, {ORDER_ID})'''.format(TABLE = BasicWidgetOrder.TABLE_NAME, CUSTOMER_ID = self.customerId, ORDER_ID = self.orderId)
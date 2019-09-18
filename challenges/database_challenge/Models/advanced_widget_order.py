class AdvancedWidgetOrder:
    TABLE_NAME = "AdvancedWidgetOrder"

    def __init__(self, customerId, orderId, hasProtectionPlan):
        self.customerId = customerId
        self.orderId = orderId
        self.hasProtectionPlan = hasProtectionPlan

    def to_insert_statement(self):
        return '''INSERT INTO {TABLE} (CustomerId, OrderId, ProtectionPlan)
        VALUES ({CUSTOMER_ID}, {ORDER_ID}, {PROTECTION_PLAN})'''.format(TABLE = AdvancedWidgetOrder.TABLE_NAME, CUSTOMER_ID = self.customerId, ORDER_ID = self.orderId, PROTECTION_PLAN = self.hasProtectionPlan)
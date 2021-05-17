
class Record:

    def __init__(self, record_id: int, basic_widget_order: int, advanced_widget_order: int, protection_plan: bool = False, customer_id: int = None) -> None:
        self.record_id = record_id
        self.customer_id = customer_id
        self.basic_widget_quantity = basic_widget_order
        self.advanced_widget_quantity = advanced_widget_order
        self.protection_plan = protection_plan


class User:
    _UserID = 1

    def __init__(self, name: str, cell_number: str, work_number: str, email: str, address: str):
        self.ID = self._UserID
        self.__class__._UserID += 1
        self.name = name
        self.cell_num = cell_number
        self.work_num = work_number
        self.email = email
        self.address = address

    def __repr__(self) -> str:
        return (' Name: {0.name!r} | Cell#: {0.cell_num!r} | Work#: {0.work_num!r} | Email: {0.email!r} | Address: {0.address!r} '.format(self))

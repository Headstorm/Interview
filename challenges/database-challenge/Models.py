
class Record:
    '''
    This is the Records Model.

    Functionality:
        Records are suppose to store the transaction details, for each customer.

    Returns:
        Record that contains the details and the Customers Reference Key.

    '''

    def __init__(self, record_id: int, basic_widget_order: int, advanced_widget_order: int, protection_plan: bool = False, customer_id: int = None) -> None:
        self.record_id = record_id
        self.customer_id = customer_id
        self.basic_widget_quantity = basic_widget_order
        self.advanced_widget_quantity = advanced_widget_order
        self.protection_plan = protection_plan

    def __repr__(self) -> str:
        return ('Record: {0.record_id} | {0.customer_id} | {0.basic_widget_quantity} | {0.advanced_widget_quantity} | {0.protection_plan}'.format(self))


class User:
    '''
    User Model. Used to store User data.
    '''
    _UserID = 1

    def __init__(self, name: str, cell_number: str, work_number: str, email: str, address: str):
        self.ID = self._UserID
        self.__class__._UserID += 1
        self.name = name
        self.cell_num = cell_number
        self.work_num = work_number
        self.email = email
        self._Address = address

    @property
    def Address(self):
        return self._Address

    @Address.setter
    def Address(self, value):
        address = Address()
        self._Address = address.distribute(value)

    def __repr__(self) -> str:
        return (' Name: {0.name!r} | Cell#: {0.cell_num!r} | Work#: {0.work_num!r} | Email: {0.email!r} | Address: {0.Address}'.format(self))


class Address():
    '''
    Address Model that should be used to store addresses. To prevent duplication.
    '''

    def __init__(self):
        self.street_address = ''
        self.state = ''
        self.city = ''
        self.zip_code = ''

    @property
    def street_address(self) -> str:
        return self._street_address

    @street_address.setter
    def street_address(self, value):
        self._street_address = str(value)

    def distribute(self, full_address):
        partitioned = full_address.split(', ')
        self.street_address = partitioned[0]
        addr_specifics = partitioned[1].split(' ')
        self.city = addr_specifics[0]
        self.state = addr_specifics[1]
        self.zip_code = addr_specifics[2]

    def __repr__(self) -> str:
        return ('{0.street_address}, {0.city} {0.state} {0.zip_code}'.format(self))

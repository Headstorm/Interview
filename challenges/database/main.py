import json

def createQuery(filename):
    try:
        with open(filename, "r") as data_file:
            data = json.load(data_file)
    except FileNotFoundError:
        print(f"{filename} not found")
    else:
        # Dictionary to tie customer name to an ID
        cust_dict = {}
        i = 1
        print(
            'CREATE TABLE customers (\n'
            'cust_id INT NOT NULL\n'
            'name VARCHAR(255) NOT NULL,\n'
            'cell VARCHAR(12) NOT NULL,\n'
            'work VARCHAR(12) NOT NULL,\n'
            'email VARCHAR(100) NOT NULL,\n'
            'address VARCHAR(100) NOT NULL,\n'
            'PRIMARY KEY (cust_id)\n'
            ');\n'

            'CREATE TABLE widgets (\n'
            'rec_id INT NOT NULL,\n'
            'basic INT NOT NULL,\n'
            'advanced INT NOT NULL,\n'
            'plan BOOLEAN NOT NULL,\n'
            'fk_cust_id INT NOT NULL,\n'
            'PRIMARY KEY (rec_id),\n'
            'FOREIGN KEY (fk_cust_id) REFERENCES customers(cust_id),\n'
            ');\n'
        )

        for item in data:
            # If a name already exist, assign the same cust_id to that widget order
            if item['name'] in cust_dict:
                print(f"INSERT INTO widgets VALUES" 
                    f"({item['basic']}, {item['advanced']}, {item['plan']}, {cust_dict.get(item['name'])});")
            else:
                cust_dict.update({item['name']: i})

                print(f"INSERT INTO customers VALUES" 
                    f"({cust_dict.get(item['name'])}, {item['rec_id']}, {item['name']}, " 
                    f"{item['cell']}, {item['work']}, "
                    f"{item['email']}, {item['address']});")

                print(f"INSERT INTO widgets VALUES" 
                    f"({item['basic']}, {item['advanced']}, {item['plan']}, {cust_dict.get(item['name'])});")

                i += 1


if __name__ == '__main__':
    createQuery('data.json')

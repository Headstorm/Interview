import json
with open('in.json', 'w') as f:
    f.write(json.dumps({
        1234: {
            'name': 'Joe Smith',
            'cellPhone': '405.867.5309',
            'workPhone': '123.123.1234',
            'email': 'joe_s@gmail.com',
            'address': '123 Vic Way, Dallas TX 75001',
            'basicWidgetOrder': 37,
            'advancedWidgetOrder': 12,
            'protectionPlan': True
            }
        }))

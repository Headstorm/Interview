import json

# json.loads converts .json file into py dictionary {},
# open "r" for reading
# converts JSON file to python dictionary
with open('data.json', 'r') as d:
    data_dictionary = json.load(d)


for data in data_dictionary:
    print(data['field name'])
    print(data['type'])
    print(data['sample value'])

# popSQL query statements to insert from JSON into new relational MySQL DB
print('CREATE TABLE startupOrder ('
      'field_name VARCHAR(30),'
      'type_ VARCHAR(30),'
      'sample_value VARCHAR(30)'
      ')'


      'DECLARE @Counter INT'
      'SET @Counter = 0'
      'WHILE @Counter < 9'
      'BEGIN'
      'INSERT INTO startupOrder(field name, type, sample value) VALUES(data.json);'

      'SET @Counter += 1'
      'END')

# parsed_json = (json.loads(json_data))

# use MySQL relational database, import data using JSON and PopSQL from original NoSQL DB

import json
import sys

def main():
  if len(sys.argv) <= 1:
    print('Usage: ' + sys.argv[0] + ' [json file with data]')
    sys.exit(0)

  # Statement to create Users SQL table
  print('CREATE TABLE Users (\n'
        + '  RecordID int NOT NULL,\n'
        + '  Name varchar(255),\n'
        + '  CellPhone varchar(255),\n'
        + '  WorkPhone varchar(255),\n'
        + '  Email varchar(255),\n'
        + '  Address varchar(255),\n'
        + '  PRIMARY KEY (RecordID)\n'
        + ');\n')
  
  # Statement to create Orders SQL table
  print('CREATE TABLE Orders (\n'
        + '  OrderID int NOT NULL,\n'
        + '  BasicWidgetOrder int,\n'
        + '  AdvancedWidgetOrder int,\n'
        + '  ProtectionPlan boolean,\n'
        + '  RecordID int NOT NULL,\n'
        + '  PRIMARY KEY (OrderID),\n'
        + '  FOREIGN KEY (RecordID) REFERENCES Users(RecordID)\n'
        + ');\n')
        
  # We already have record IDs so we want to insert them ourselves
  print('SET IDENTITY_INSERT Users ON;\n')
        
  jsonFileName = sys.argv[1]
  sqlData = None
  try:
    with open(jsonFileName, 'r') as jsonFile:
      sqlData = json.load(jsonFile)
  except:
    print('An error occurred while reading the provided json file.')
    sys.exit(1)
    
  for record in sqlData:
    write_statement(record)
    
  # Revert to default behavior after we're done
  print('SET IDENTITY_INSERT Users OFF;\n')

def write_statement(record):
  id = record['record_id']
  name = record['name']
  cellPhone = record['cell_phone']
  workPhone = record['work_phone']
  email = record['email']
  address = record['address']
  basicWidgetOrder = record['basic_widget_order']
  advancedWidgetOrder = record['advanced_widget_order']
  protectionPlan = str(record['protection_plan']).upper() # Required to fix the capitalized boolean
  
  # Check for malformed objects
  if (any(x == None for x in 
    [id, name, cellPhone, workPhone, email, address, basicWidgetOrder, advancedWidgetOrder, protectionPlan])):
    print('Malformed JSON record found.')
    return
  
  print('INSERT INTO Users\n'
        + "VALUES ({}, '{}', '{}', '{}', '{}', '{}');"
          .format(id, name, cellPhone, workPhone, email, address))
          
  # We let the DB decide what the OrderID should be
  print('INSERT INTO Orders\n'
        + "VALUES ({}, {}, {}, {});\n"
          .format(basicWidgetOrder, advancedWidgetOrder, protectionPlan, id))

if __name__ == '__main__':
  main()
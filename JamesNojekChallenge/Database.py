import json

def oldToNewDB(filename):
    try:   
        with open(filename, "r") as f:
            text = json.load(f) #get data from file
            print("Input the new database name: ")
            DBname = str(input())   #select database to edit
            for i in range (0, len(text['Customer Records'])):
                #define database being edited and column names being edited
                print("INSERT INTO " + DBname + " (Record ID, Name, Cell Phone, Work Phone, Email, Address, Basic Widget Order, Advanced Widget Order, Protection Plan)")
                if text['Customer Records'][i]['Protection Plan'] == True:  #determine boolean of Protection Plan to make sure the keyword is the correct format for SQL
                    print('VALUES (' + str(text['Customer Records'][i]['ID']) + ', \'' + str(text['Customer Records'][i]['Name']) +  '\', \'' + str(text['Customer Records'][i]['Cell Phone']) + '\', \'' + 
                         str(text['Customer Records'][i]['Work Phone']) + '\', \'' + str(text['Customer Records'][i]['Email']) + '\', \'' + str(text['Customer Records'][i]['Address']) + '\', ' + 
                         str(text['Customer Records'][i]['Basic Widget Order']) + ', ' + str(text['Customer Records'][i]['Advanced Widget Order']) + ', TRUE)')
                else:       #if false
                    print('VALUES (' + str(text['Customer Records'][i]['ID']) + ', \'' + str(text['Customer Records'][i]['Name']) +  '\', \'' + str(text['Customer Records'][i]['Cell Phone']) + '\', \'' + 
                         str(text['Customer Records'][i]['Work Phone']) + '\', \'' + str(text['Customer Records'][i]['Email']) + '\', \'' + str(text['Customer Records'][i]['Address']) + '\', ' + 
                         str(text['Customer Records'][i]['Basic Widget Order']) + ', ' + str(text['Customer Records'][i]['Advanced Widget Order']) + ', FALSE)')

    except:
        return("Your file was not found")

#test driver
print("Input the old data file name")
filename = str(input())
oldToNewDB(filename)

#{   Sample json used for testing
#	"Customer Records": [
#		{
#		"ID": 1234,
#		"Name": "Joe Smith",
#		"Cell Phone": "405.867.5309",
#		"Work Phone": "123.123.1234",
#		"Email": "joe_s@gmail.com",
#		"Address": "123 Vic Way, Dallas TX 75001",
#		"Basic Widget Order": 37,
#		"Advanced Widget Order": 12,
#		"Protection Plan": true
#		}
#    ]
#}
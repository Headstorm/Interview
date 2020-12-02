import json
import sqlite3


with open('clientdata.json') as f:
    client_data = json.load(f)


def main():

    #create a new database for relational db

    conn = sqlite3.connect('client.db')
    c = conn.cursor()

    cmd_createtb='''CREATE TABLE IF NOT EXISTS client
             (Record_ID int NOT NULL, Name text, Cell_Phone varchar(15), Work_Phone varchar(15), 
             Email nvarchar(255), Address text,  Basic_Widget_Order int, Advanced_Widget_Order int, Protection_plan boolean, PRIMARY KEY (Record_ID))
             
        '''
    print(client_data)
    c.execute(cmd_createtb)

    for record in client_data:
        cmd_insert = '''INSERT INTO client
             (Record_ID, Name, Cell_Phone, Work_Phone, 
             Email , Address ,  Basic_Widget_Order , Advanced_Widget_Order , Protection_plan) 
             VALUES(%d, '%s', '%s', '%s','%s','%s',%d,%d,%d)
             ''' %(record["Record ID"],record["Name"],record["Cell Phone"],record["Work Phone"],record["Email"],
                    record["Address"]	,
                    record["Basic Widget Order"]	,
                    record["Advanced Widget Order"]  	,
                    int(record["Protection Plan"]))
        print(cmd_insert)
        c.execute(cmd_insert)
    conn.commit()
    conn.close()


if __name__ == '__main__':
    main()
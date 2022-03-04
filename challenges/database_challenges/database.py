import json
import random
import string 

def generate_phone_number():
    phone = ''.join(str(random.randint(0, 9)) for i in range(3)) 
    phone += "."+ ''.join(str(random.randint(0, 9)) for i in range(3))
    phone += "."+ ''.join(str(random.randint(0, 9)) for i in range(4))
    return phone


def generate_test_data(size):
    nosql_data =[]
    letters = string.ascii_lowercase
  

    for i in range(1,size+1):
        name =  ''.join(random.choice(letters) for i in range(5)) + " " +''.join(random.choice(letters) for i in range(5))
        cellphone = generate_phone_number()
        workphone = generate_phone_number()
        email = name.replace(" ","")+ "@gmail.com"
        address = ''.join(str(random.randint(0, 9)) for i in range(3)) + " Test Way, Dallas TX 75205"
        basic_widget_order = random.randint(1, 100)
        advanced_widget_order = random.randint(1, 100)
        if random.randint(0,1)==0:
            protection=False
        else:
            protection=True
        pydict = {
            "Record ID": i,
            "Name": name,
            "Cell Phone":cellphone,
            "Work Phone": workphone,
            "Email": email,
            "Address":address,
            "Basic Widget Order": basic_widget_order,
            "Advanced Widget Order": advanced_widget_order,
            "Protection": protection
        }
        nosql_data.append(pydict)
    with open ("test.json","w") as outfile:
        json.dump(nosql_data, outfile,indent=4)

if __name__ =="__main__":
    # generate_test_data(10)
    with open ("test.json") as test:
        test_data = json.load(test)
    # print(json.dumps(test_data,indent=4))
    create_stmt = """
        create database if not exists headstorm_backend;
        use headstorm_backend;
        create table if not exists application_user (
            record_id Int auto_increment primary key,
            username varchar(255) not null,
            email varchar(255),
            address varchar(255)
        );
        create table if not exists application_phone_number(
            phone_id Int auto_increment primary key,
            record_id Int,
            isWork tinyint(1) not null default 0,
            contact varchar(15) not null,
            foreign key (record_id) references application_user(record_id)
            on update restrict 
            on delete cascade
        );

        create table if not exists application_order(
            order_id int auto_increment primary key,
            record_id int, 
            basic_widget_order int not null, 
            advanced_widget_order int not null, 
            protection tinyint(1) not null default 0,
            foreign key (record_id) references application_user(record_id)
            on update restrict 
            on delete cascade
        );
        show tables;
    """
    # print(create_stmt)

    for element in test_data:
        insert_stmt_user = """
            insert into application_user(
            record_id, username, email, address
            )
            Values({0},\"{1}\",\"{2}\", \"{3}\");
        """
        print(insert_stmt_user.format(element["Record ID"], element["Name"], element["Email"],element["Address"]))
        insert_stmt_phone_number ="""
            insert into application_phone_number(
            record_id, isWork,contact
            )
            Values({0},{1},\"{2}\");
        """
        if element["Cell Phone"]!="":
            print(insert_stmt_phone_number.format(element["Record ID"], 0, element["Cell Phone"]))
        if element["Work Phone"]!="":
            print(insert_stmt_phone_number.format(element["Record ID"], 1, element["Work Phone"]))
        insert_stmt_order ="""
            insert into application_order (
            record_id, basic_widget_order, advanced_widget_order,protection)
            Values({0},{1},{2},{3});
        """
        if element["Protection"]:
            protected =1
        else:
            protected =0
        print(insert_stmt_order.format(element["Record ID"], element["Basic Widget Order"], element["Advanced Widget Order"],protected))
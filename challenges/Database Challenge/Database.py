# Import libraries
import json

#Variables to accept details from the JSON file
person = {}
p_id = 1
record_id = 0
name = ""
mobile = ""
work = ""
email = ""
address = ""
b_order = -1
adv_order = -1
p_plan = False
q = ""
with open("C:/Users/Admin/Desktop/db.txt") as data:
    flag = False
    d = json.loads(data.read())
    for rec in d:
        #print(type(rec))
        record_id = rec["Record ID"]
        name = rec["Name"]
        mobile = rec["Cell Phone"]
        work = rec["Work Phone"]
        email = rec["Email"]
        address = rec["Address"]
        b_order = rec["Basic Widget Order"]
        for k,v in rec.items():
            if(k=="Advanced Widget Order"):
                flag = True
                adv_order = rec["Advanced Widget Order"]
        p_plan = rec["Protection Plan"]
        #print(flag)
        if email not in person.keys():
            person[email] = p_id
            temp = name.split(" ")
            #print(temp)
            temp1 = address.split(" ")
            print("INSERT INTO PERSON VALUES("+str(p_id)+ ", \""+str(temp[0])+"\", \""+str(temp[1])+"\", \""+str(email)+"\")")
            print("INSERT INTO ADDRESS VALUES("+str(p_id)+", \""+str(temp1[0])+"\", \""+str(temp1[1])+"\", \""+str(temp1[2])+"\", \""+str(temp1[3])+"\", \""+str(temp1[4])+"\", \""+str(temp1[5])+"\")")
            print("INSERT INTO CONTACT VALUES("+str(p_id)+", \""+str(mobile)+"\", \""+str(work)+"\")")
            if(flag==True):
                print("INSERT INTO RECORDS_ADV VALUES("+str(record_id)+", "+str(adv_order)+")")
            else:
                print("INSERT INTO RECORDS VALUES("+str(record_id)+", "+str(p_id)+", "+str(b_order)+", "+str(p_plan)+")")
            p_id+=1
        else:
            p_id = person[email]
            if(flag==True):
                print("INSERT INTO RECORDS_ADV VALUES("+str(record_id)+", "+str(adv_order)+")")
            else:
                print("INSERT INTO RECORDS VALUES("+str(record_id)+", "+str(p_id)+", "+str(b_order)+", "+str(p_plan)+")")
                

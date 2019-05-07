## Challenge
Solutions to the challenges by Headstorm

I enjoyed working on these problems, I think this is a very innovative way to screen candidates. Has been a definitely unique experience. I have had very limited exposure with REST APIs, and this challenge helped me learn more about it. The one I enjoyed specifically working on was the 3rd database question. 

### For solution 2:
I deployed the .war file on Tomcat, and tested the APIs using Postman.
Calls made to /TestProject/rest/data

### For solution 3: 
The relational schema has the following relations:
1) PERSON: We generate a unique 'id' for each person in the database. This is done to avoid name and other details redundancy with respect to the orders placed.
2) CELLPHONE: Has keys id and cellphone, together forming a composite key. A person may or may not have a cellphone. If not, wont be present in this relation. Also useful when a person has more than one cellphone.
3) WORKPHONE: Has keys id and workphone. Motivation behind it similar to relation CELLPHONE.
4) RECORDS: Has key r_id (record id) which is obtained from the json file. Person is identified by the foreign key id: Reference PERSON. Has attributes Basic#, Advanced# and ProtectionPlan.

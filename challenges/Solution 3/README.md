# For solution 3:
The relational schema has the following relations:

## PERSON: 
We generate a unique 'id' for each person in the database. This is done to avoid name and other details redundancy with respect to the orders placed.
## CELLPHONE: 
Has keys id and cellphone, together forming a composite key. A person may or may not have a cellphone. If not, wont be present in this relation. Also useful when a person has more than one cellphone.
## WORKPHONE: 
Has keys id and workphone. Motivation behind it similar to relation CELLPHONE.
## RECORDS: 
Has key r_id (record id) which is obtained from the json file. Person is identified by the foreign key id: Reference PERSON. Has attributes Basic#, Advanced# and ProtectionPlan.

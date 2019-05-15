# DATABASE CHALLENGE 
## Author: Neha Prabhune

### Goal
> We are trying to migrate from NoSQL to relational database schema. Thus we need to normalize the data inorder to remove redundancy.

### Tools
* Python 3.x - Programming language
* JSON

### Relational Schema

##### PERSON
Person_id, First_name, Last_name, email
- Person_id uniquely identifies the person.
- A Person_id is generated for every email address, We suppose that peope having different email ids are different.
##### ADDRESS
Person_id, Street_address, apt_no, city, state, country, zip
- Multiple address can be stored related to the same person.
##### CONTACT
Person_id, mobile, work
##### RECORDS
Record_id, Person_id, basic_widget_order,Protection_plan
- Record id uniquely identifies the order and whoes order it is.
##### RECORDS_ADV
Record_id, advanced_widget_order
- A new relation is created for advanced widget order as a person may or may not have advanced widget order.
### Deployment
```sh
$ python Database.py
```
> NOTE: The data file is already given in the code.

 

## Database Model

The new database will have only a single table called **Order_Table**. The reason a single table has been used is because it's a simple design (in our case) and more efficient performance compared to using two separate tables. 

However, from a security point of view; a single table design that consists of both user info and order info will not be feasible. This is because as user info is more sensitive; we'll need more stricter ACL for the user-info table


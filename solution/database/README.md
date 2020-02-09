## Database Model

The new database will have only a single table called **Order_Table**. With a simple schema like in the case, the database design, for keeping a single table, has been made keeping performance in mind.

However, from a security point of view; a single table design that consists of both user info and order info will not be feasible. This is because as user info is more sensitive; we'll need more stricter ACL for the user-info table.

P.S. As per my understanding, the RecordID will always be unique as it corresponds to an order rather than the user.


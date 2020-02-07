## Database Model

The new database model has been broken down into two tables **User_Info** and **Order_Info**. Since a user can have multiple orders; a new column *OrderNumber* is introduced which acts as a Primary Key and the *RecordID* is used as a Foreign Key reference to the **User_Info** table.


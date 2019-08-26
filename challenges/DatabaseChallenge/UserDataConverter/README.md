# Database Challenge ASP.NET Core
The Database Challenge implemented in .NET Core 2.1.

### Thought Process
The NoSQL record appear to contain 
* user information
* contact information
* order information

As such, when converting to SQL, the NoSQL record was broken into 3 separate tables:
* User - this is the main table that simply holds the user's name and the Record ID.
It also contains the Email address for an additional identity.
* Contact - this table contains the contact information and refers back to the User table
via the UserId.  It has a one-to-one relationship with the User table
* Order - this table contains the order information.  It was not clear exactly what the order
values were so I just put them in one table.  It also has a one-to-one relationship with the
User table.

The database diagram is in the file: DatabaseDiagram/DatabaseDiagram.jpg

### Prerequisites:
* .NET Core 2.1 installed on the operating system.

### Build Instructions:
This project uses the dotnet CLI to build and run the web service.
To build the application type:

  ```dotnet restore``` 
  
  ```dotnet build```
    
### Run Instructions:
To run the application type:

  ```dotnet run testdata/data.json```
  
The application takes a single argument that points to JSON data from the NoSQL User data.
The application converts each record to a set of SQL insert statements and prints them to the console.
  

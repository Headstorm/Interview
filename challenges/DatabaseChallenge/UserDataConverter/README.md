# Database Challenge ASP.NET Core
The Database Challenge implemented in .NET Core 2.1.

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
  

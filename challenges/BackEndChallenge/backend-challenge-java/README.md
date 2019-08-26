# Backend Challenge Java
The Backend Challenge implemented in Java using SpringBoot.

### Prerequisites:
* Java JDK 1.8 needs to be installed on the operating system.

### Build Instructions:
This project uses Maven to build and run the web service.
To build and run tests for the application type:

  ```./mvnw clean package```
  
The unit tests will load the application and run all the test cases through the web service.
  
### Run Instructions:
To run the web service type:

  ```./mvnw spring-boot:run```
  
When running, the web service listens on port 8080.  Use tools like Postman to issue GET and POST
commands to web service:

  ```GET http://127.0.01:8080/data```
   
  ```POST http://127.0.01:8080/data```

## Software Platform and Libraries used##

Python 3.7.6
Django==3.1.3

## How to run ##

1. Run the command python manage.py runserver 0.0.0.0:8000
2. API end point tested using Postman
3. Select query type (POST/ GET/ PATCH) and localhost:8000/data
4. Based on the type of query add appropriate data in the body section
5. No need of adding additional data for the GET request
6. For POST request, reference JSON file used while developing framework has been added. Kindly add that file in the valules with the key name as 'jsondata'
7. For PATCH request, Add the data in the body section with the key name 'num'
8. List of numbers is stored as a session variable



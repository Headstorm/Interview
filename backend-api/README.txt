This is a Headstorm <Back End Challenge> Project.

## Requirements:
Create a REST API using any language or web framework you prefer, which performs the following functionality:
1. Provides a POST endpoint at /data where a user submits a JSON formatted list of 500 random numbers. The list has to be exactly 500 numbers, if there are more or less than 500 an error must be returned. Similarly, if something other than a list of numbers is submitted, an error must be returned.
2. Provides a GET endpoint at /data which provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.
3. (BONUS) Provides a PATCH endpoint at /data which allows insertion of a single number into the list which gets placed in the proper order.

## Used framework
Node.js (Express.js)

## Project setup
npm install

## Run server
node app.js
(server runs on localhost:3000)

## Request details
1. Valid POST request needs a JSON formatted data included in the request body
   Example: { "data": [3,110,20,37,66,0,5,...,20] }
2. Valid PATCH request needs a JSON formatted data included in the request body
   Example: { "data": 5 }
2. Nothing will be returned for GET & PATCH request before making a valid POST request
3. To keep the size of the list (which is 500 numbers), a PATCH request will insert a number and pop the largest number
4. A PATCH request with a number that is larger than all numbers in the current list leads to no action in the server (since we remove the largest number for each PATCH request)

## Randomly generated 500-number list (for testing)
[183,198,22,325,56,162,295,184,7,433,125,272,156,35,207,340,240,188,181,342,218,91,254,210,376,471,111,334,351,303,433,155,226,194,13,86,473,51,443,445,270,232,344,130,273,132,432,128,174,269,142,444,292,81,80,144,16,489,59,63,67,36,462,298,346,251,139,448,342,317,194,10,398,146,497,226,283,201,424,81,98,120,469,447,75,496,224,244,3,370,256,203,146,105,273,302,14,398,276,76,384,108,81,129,384,63,274,378,134,69,108,102,38,465,88,362,131,95,295,461,258,127,70,146,345,311,383,12,22,203,324,245,151,53,200,309,237,297,78,367,93,375,266,370,160,370,36,202,76,79,294,267,297,173,143,447,407,404,282,254,492,345,394,265,49,477,46,211,5,39,78,322,2,136,201,144,291,48,463,54,438,444,449,246,145,293,172,287,383,80,9,181,412,450,74,204,372,366,325,267,369,99,147,211,76,168,165,308,123,262,326,492,190,158,375,110,435,423,54,448,211,441,37,275,282,443,329,319,443,297,345,434,53,293,379,420,432,20,4,281,82,393,127,409,229,355,52,217,28,132,406,79,111,194,380,455,293,471,288,341,270,312,359,312,406,90,104,29,154,26,249,115,450,169,487,220,223,394,151,209,411,463,412,160,480,43,297,22,5,351,143,204,101,81,475,52,13,147,464,251,232,117,180,165,300,156,296,136,171,493,417,154,74,373,392,40,327,188,6,91,380,23,400,295,192,360,330,327,443,249,126,31,234,185,105,102,453,145,3,22,20,354,85,120,64,177,17,149,499,459,308,233,403,483,155,326,410,415,458,146,185,144,395,436,177,342,98,166,268,289,112,279,246,0,219,341,439,302,164,173,256,325,8,323,334,177,47,34,321,405,225,108,295,92,45,488,467,300,146,411,473,151,175,259,169,344,396,83,327,444,338,230,129,218,122,60,206,144,390,159,202,208,303,137,52,381,305,226,105,13,30,398,341,460,347,71,73,93,153,293,275,252,52,214,97,404,354,344,155,132,170,310,35,324,392,304,155,75,485,264,49,54,497,88,94,9,216,400,291,106,68,149,229,219,280,289,6,192,223,123,469,39,363,120,299,204,139,133,411,463,392,473,442,461,103,204,368,338,422,242]
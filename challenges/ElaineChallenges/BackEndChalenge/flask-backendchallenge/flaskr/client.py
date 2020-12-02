import json
import requests
import random

numbers = []

for i in range(500):
    numbers.append(random.randint(1,10))

requests.post("http://127.0.0.1:5000/data", json=json.dumps(numbers))
#requests.post("http://127.0.0.1:5000/data", "hiiiiiiiii")
response = requests.get("http://127.0.0.1:5000/data")
print("after send get request: ", response.text)

response = requests.patch("http://127.0.0.1:5000/data", json =json.dumps(-5))
print("after send patch request: ", response.text)
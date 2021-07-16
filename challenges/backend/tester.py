import requests
import random
payload = ''
for i in range(499):
	temp = random.randint(0,500)
	payload = payload + str(temp) + ','
payload = payload + str(random.randint(0,500))
patchload = str(random.randint(0,500))
r=requests.get("http://localhost:5000/data/")
print("get", r.text)
r=requests.post("http://localhost:5000/data/",data=payload)
print("post",r.text)
r=requests.get("http://localhost:5000/data/")
print("get", r.text)
r=requests.patch("http://localhost:5000/data/",data=patchload)
print("patch", r.text)
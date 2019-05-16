import requests
import json
import random
from random import randint


numberlist = []
for x in range(500):
    randnumber = randint(0, 1000)
    randnumber = str(randnumber)
    numberlist.extend([randnumber])

json_to_send = {'vals': numberlist}
   
res = requests.post('http://localhost:8080/', json = json_to_send)

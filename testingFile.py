import random, names, string
from faker import Faker
import json
from random import randint

oldData = []
fake = Faker()

def random_char(y):
   return ''.join(random.choice(string.ascii_letters) for x in range(y))

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)


textfile = open("oldData.txt", "w")
for i in range(0,25):
    record = random.randint(0,2000)
    basicWidgetOrder = random.randint(0,2000)
    advWidgetOrder = random.randint(0,2000)
    protectPlan = bool(random.getrandbits(1))
    fullName = names.get_full_name()
    cellPhone = str(random_with_N_digits(10))
    workPhone = str(random_with_N_digits(10))
    email = (random_char(15) + "@gmail.com")
    address = fake.address().replace('\n', ' ')
    tempData = [record, fullName, cellPhone, workPhone, email, address, basicWidgetOrder, advWidgetOrder, protectPlan]
    for j in tempData:
        textfile.write(str(j) + '; ')
    textfile.write('\n')

textfile.close()
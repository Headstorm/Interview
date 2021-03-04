import json
import random

nums = []
for i in range(0, 500):
    nums.append(random.randint(0, 9999))
    
f = open('nums.json', 'w')

j = json.dumps(nums)
print(j, file=f)
import random
import numpy as np

def Rand(start, end, num):
    array = []

    for j in range(num):
        array.append(random.randint(start, end))
    
    return array

list arr = Rand(1,500, 500)
for x in range(len(list)): 
    print list[x], 

def Solve(encode):
    my_hashmap = {}

    # count the charcter frequency 
    for i in encode:
        my_hashmap[i] = my_hashmap.get(i,0) + 1
   
    res = []

    # append tuple of value and key into list res
    for key, value in my_hashmap.items():
        res.append((value, key))
    # return res    
    return res

def main():
    print(Solve(['t', 't', 't', 't', 'b', 'c', 'c', 'a', 'a', 'd', 'r', 'r', 'r', 'r']))

if __name__ == "__main__":
    main()  

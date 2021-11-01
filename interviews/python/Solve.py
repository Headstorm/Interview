#values added to dictionary recursively to save some time over iterative
def encode(arr,dictionary,ind):
	#if gone through whole array
	if ind == len(arr):
		return dictionary
	#if the letter/number has been seen before and exists in dictionary, increase the value by 1
	elif arr[ind] in dictionary:
		dictionary[arr[ind]] = dictionary.get(arr[ind]) + 1
		encode(arr,dictionary,ind+1)
	#the value is not in the dictionary and therefore needs to be added
	else:
		dictionary[arr[ind]] = 1
		encode(arr,dictionary,ind+1)

#empty dictionary and data set
dictionary = {}
data = ['t','t','t','t','b','c','c','a','a','d','r','r','r','r','d','y','x','x','y','j','q','u','i']

encode(data,dictionary,0)
print(dictionary)

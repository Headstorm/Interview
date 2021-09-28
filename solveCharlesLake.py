
def encode(l): #s is the input string 

	encoding = " " #ouput string for encode(l)

	i = 0
	while i < len(l):
		# the number of same characters and a certain index
		count = 1

		while i + 1 < len(l) and l[i] == l[i + 1]:
			count = count + 1
			i = i + 1

		# record the ammount of times a character is used and add it to hte output string
		encoding += str(count) + l[i]
		i = i + 1

	return encoding


if __name__ == '__main__':

	l = 'ttttbccaadrrrr'
	print(encode(l))
